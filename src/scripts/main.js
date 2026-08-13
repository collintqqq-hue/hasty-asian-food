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

/* ─────────────────── header + order bar ───────────────────── */

function initScrollChrome() {
  const header = document.querySelector('[data-header]');
  const orderbar = document.querySelector('[data-orderbar]');
  const hero = document.querySelector('.hero');
  if (!header || !hero) return;

  // Sentinel sits at the point where the hero stops covering the header.
  const trigger = Math.max(hero.offsetHeight - header.offsetHeight * 2, 120);

  let ticking = false;
  const update = () => {
    const past = window.scrollY > trigger;
    header.classList.toggle('is-stuck', past);
    if (orderbar) orderbar.classList.toggle('is-on', past);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}

/* ────────────────────────── drawer ────────────────────────── */

function initDrawer() {
  const drawer = document.querySelector('[data-drawer]');
  const openBtn = document.querySelector('[data-burger]');
  const closeBtn = document.querySelector('[data-drawer-close]');
  if (!drawer || !openBtn) return;

  const panel = drawer.querySelector('.drawer__panel');
  let lastFocused = null;

  const focusables = () =>
    [...panel.querySelectorAll('a[href], button:not([disabled])')].filter(
      (el) => el.offsetParent !== null
    );

  let hideTimer = null;

  function open() {
    lastFocused = document.activeElement;
    clearTimeout(hideTimer);
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';

    // Force a reflow so the browser registers the pre-transition state.
    // rAF would be throttled in a background or non-compositing tab, which
    // would leave the panel parked off-screen with the scrim already up.
    void drawer.offsetHeight;
    drawer.classList.add('is-open');

    openBtn.setAttribute('aria-expanded', 'true');
    focusables()[0]?.focus();
  }

  function close() {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');

    // Re-hide on whichever comes first: the close transition ending, or a
    // timeout. Waiting on transitionend alone would strand a transparent
    // full-screen scrim over the page if the transition never fires.
    const done = () => {
      clearTimeout(hideTimer);
      panel.removeEventListener('transitionend', done);
      drawer.hidden = true;
    };
    panel.addEventListener('transitionend', done);
    hideTimer = setTimeout(done, reduceMotion ? 0 : 500);

    // A pointer click never focuses the button, so activeElement may be <body>.
    const target = lastFocused && lastFocused !== document.body ? lastFocused : openBtn;
    target.focus();
  }

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);

  // Click the scrim, or any link inside, to close.
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer || e.target.closest('.drawer__list a, .drawer__foot a')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (drawer.hidden) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab') return;

    // Keep focus inside the open drawer.
    const list = focusables();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
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

initReveal();
initScrollChrome();
initDrawer();
initSpy('.menu-tab', '.menu-group');
initSpy('.nav__link', 'main > section[id]');
