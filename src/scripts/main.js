/**
 * Progressive enhancement only.
 * With JavaScript disabled the page is still complete: every section renders,
 * the menu is fully readable, and every link and phone number works.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────────────── reveal on scroll ───────────────────── */

function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  targets.forEach((el) => io.observe(el));

  // Failsafe: whatever is on screen must become visible even if the observer
  // is throttled or never reports. Off-screen items keep their reveal.
  setTimeout(() => {
    for (const el of targets) {
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) el.classList.add('is-in');
    }
  }, 2500);
}

/* ────────────────────────── splash ────────────────────────── */

/**
 * The overlay covers everything, so it gets removed from the DOM rather than
 * merely faded. Two triggers: the animation finishing, and a hard timeout in
 * case the animation never runs (reduced motion, a background tab, animations
 * disabled). Whichever fires first wins.
 */
function initSplash() {
  const splash = document.querySelector('.splash');
  if (!splash) return;

  const remove = () => splash.remove();
  splash.addEventListener('animationend', remove, { once: true });
  setTimeout(remove, 1500);
}

/* ─────────────────────── menu category spy ────────────────────── */

/**
 * Highlights the menu category you are currently reading.
 *
 * This deliberately does NOT use IntersectionObserver. An observer only reports
 * elements crossing a band, so whenever no category happened to sit inside that
 * band — between two groups, or past the last one — every tab went dark, and
 * the highlight lagged a whole group behind while two overlapped.
 *
 * A reference line is unambiguous: the active category is simply the last one
 * whose heading has passed it. Exactly one tab is always lit.
 */
function initMenuSpy() {
  const tabs = [...document.querySelectorAll('.menu-tab')];
  const groups = [...document.querySelectorAll('.menu-group')];
  if (!tabs.length || !groups.length) return;

  let current = null;

  const update = () => {
    const line = window.innerHeight * 0.35;

    // Last group whose top has crossed the line; the first group before that.
    let id = groups[0].id;
    for (const g of groups) {
      if (g.getBoundingClientRect().top <= line) id = g.id;
      else break;
    }
    id = id.replace('cat-', '');

    if (id === current) return;
    current = id;
    for (const t of tabs) t.classList.toggle('is-active', t.dataset.tab === id);
  };

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    },
    { passive: true }
  );
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ──────────────────────── scrollspy ───────────────────────── */

function initSpy(linkSelector, targetSelector, activeClass = 'is-active') {
  const links = [...document.querySelectorAll(linkSelector)];
  const targets = [...document.querySelectorAll(targetSelector)];
  if (!links.length || !targets.length || !('IntersectionObserver' in window)) return;

  const map = new Map(links.map((l) => [l.getAttribute('href')?.slice(1), l]));
  const visible = new Set();

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }

      // Highest section still in view wins, so the marker never flickers.
      const current = targets.find((t) => visible.has(t.id))?.id;
      links.forEach((l) => l.classList.remove(activeClass));
      if (current) map.get(current)?.classList.add(activeClass);
    },
    { rootMargin: '-30% 0px -55% 0px' }
  );

  targets.forEach((t) => io.observe(t));
}

/* ─────────────────────────── boot ─────────────────────────── */

initSplash();
initReveal();
initMenuSpy();
initSpy('.nav__link', 'main > section[id]');
