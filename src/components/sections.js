import { photo, price, esc } from './photo.js';
import { icons } from './icons.js';
import {
  brand,
  contact,
  location,
  hours,
  offer,
  menu,
  menuPdf,
  gallery,
  scenes,
  nav,
} from '../data/restaurant.js';

const allItems = menu.flatMap((c) => c.items.map((i) => ({ ...i, category: c.name })));
const byRef = (ref) => allItems.find((i) => i.ref === ref);

/* ─────────────────────────────  header  ───────────────────────────── */

export function header() {
  const links = nav
    .map((l) => `<li><a class="nav__link" href="${l.href}">${esc(l.label)}</a></li>`)
    .join('');

  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="shell site-header__inner">
    <a class="wordmark" href="#top" aria-label="${esc(brand.lockup)} — home">
      <span class="wordmark__name">${esc(brand.name)}</span>
      <span class="wordmark__host">at ${esc(brand.host)}</span>
    </a>

    <nav class="nav" aria-label="Primary">
      <ul class="nav__list">${links}</ul>
    </nav>

    <div class="site-header__actions">
      <a class="btn btn--solid btn--sm" href="${contact.phoneHref}" aria-label="Call to order">
        ${icons.phone}<span>Call<span class="btn__rest"> to order</span></span>
      </a>
    </div>
  </div>
</header>`;
}

/* ──────────────────────────────  hero  ────────────────────────────── */

export function hero() {
  return `<section class="hero" id="top">
  <div class="hero__media">
    ${photo({ ...scenes.hero, ratio: 'hero', priority: true, sizes: '100vw', className: 'photo--fill' })}
  </div>

  <div class="shell hero__inner">
    <div class="hero__top">
      <p class="eyebrow hero__eyebrow" data-reveal>
        <span class="eyebrow__dot" aria-hidden="true"></span>
        <span>${esc(location.inside)}<span class="hero__eyebrow-street"> · Carling Avenue</span></span>
      </p>
      ${
        offer.active
          ? `<p class="hero__badge" data-reveal>
               <span class="hero__badge-kicker">${esc(offer.kicker)}</span>
               <span class="hero__badge-value">${esc(offer.headline)}</span>
             </p>`
          : ''
      }
    </div>

    <div class="hero__main">
    <h1 class="hero__title" data-reveal>
      <span class="hero__title-line">Asian Food</span>
      <span class="hero__title-line hero__title-line--accent">Take Out</span>
    </h1>

    <p class="hero__lede" data-reveal>${esc(brand.tagline)}</p>

    <div class="hero__actions" data-reveal>
      <a class="btn btn--solid btn--lg" href="#menu">View the menu ${icons.arrow}</a>
      <a class="btn btn--outline btn--lg" href="${contact.phoneHref}"
         aria-label="Call ${esc(contact.phone)} to order">${icons.phone}<span>${esc(contact.phone)}</span></a>
    </div>

    <dl class="hero__facts" data-reveal>
      <div class="fact">
        <dt>${icons.clock}<span>${esc(hours.kitchen.label)}</span></dt>
        <dd>${esc(hours.kitchen.value)}</dd>
      </div>
      <div class="fact">
        <dt>${icons.pin}<span>Find us</span></dt>
        <dd>${esc(location.line1)}</dd>
      </div>
      <div class="fact">
        <dt>${icons.dine}<span>Dine in</span></dt>
        <dd>Seating on site</dd>
      </div>
    </dl>
    </div>
  </div>

  <a class="hero__scroll" href="#about" aria-label="Scroll to about">
    <span class="hero__scroll-line" aria-hidden="true"></span>
  </a>
</section>`;
}

/* ───────────────────────────  offer strip  ─────────────────────────── */

export function offerStrip() {
  if (!offer.active) return '';
  const unit = `<span class="ticker__item">
      <span class="ticker__kicker">${esc(offer.kicker)}</span>
      <span class="ticker__headline">${esc(offer.headline)}</span>
      <span class="ticker__window">${esc(offer.window)}</span>
      <span class="ticker__sep" aria-hidden="true"></span>
    </span>`;

  return `<aside class="ticker" aria-label="Current offer">
  <p class="u-sr">${esc(offer.kicker)} special offer: ${esc(offer.headline)}, ${esc(offer.window)}.</p>
  <div class="ticker__rail" aria-hidden="true">
    <div class="ticker__track">${unit.repeat(8)}</div>
  </div>
</aside>`;
}

/* ──────────────────────────────  about  ───────────────────────────── */

export function about() {
  return `<section class="section section--ink about" id="about">
  <div class="shell about__grid">
    <div class="about__copy">
      <p class="eyebrow" data-reveal>The kitchen</p>
      <h2 class="h2" data-reveal>A proper Vietnamese kitchen, tucked inside the corner store.</h2>
      <div class="prose" data-reveal>
        <p>
          Behind the counter at ${esc(brand.host)} on Carling, a kitchen is doing one thing
          seriously. Vietnamese subs on crisp baguette, rolls folded by hand, Pad Thai
          and noodle soups fired to order — <strong>all of it made when you ask for it</strong>.
          Sit down and eat, or take it with you.
        </p>
      </div>

      <ul class="pillars" data-reveal>
        <li><span class="pillars__n">01</span><span class="pillars__t">Made to order</span></li>
        <li><span class="pillars__n">02</span><span class="pillars__t">Rolled by hand</span></li>
        <li><span class="pillars__n">03</span><span class="pillars__t">Eat in or take out</span></li>
      </ul>

      <a class="link-arrow" href="#menu" data-reveal>See what's on ${icons.arrow}</a>
    </div>

    <div class="about__media" data-reveal>
      ${photo({ ...scenes.about, ratio: 'portrait', sizes: '(min-width:900px) 46vw, 92vw' })}
      <div class="about__inset">
        ${photo({ ...scenes.team, ratio: 'square', sizes: '(min-width:900px) 12rem, 8rem' })}
      </div>
    </div>
  </div>
</section>`;
}

/* ──────────────────────────────  menu  ────────────────────────────── */

export function menuSection({ menuPdfSize } = {}) {
  const tabs = menu
    .map(
      (c, i) =>
        `<li><a class="menu-tab${i === 0 ? ' is-active' : ''}" href="#cat-${c.id}" data-tab="${c.id}">${esc(
          c.name
        )}</a></li>`
    )
    .join('');

  const groups = menu
    .map(
      (c) => `<section class="menu-group" id="cat-${c.id}" data-cat="${c.id}">
      <header class="menu-group__head" data-reveal>
        <h3 class="menu-group__name">${esc(c.name)}</h3>
        ${c.flyerHeading ? `<p class="menu-group__alt">${esc(c.flyerHeading)}</p>` : ''}
        <p class="menu-group__blurb">${esc(c.blurb)}</p>
      </header>
      <ul class="menu-list">
        ${c.items.map(menuItem).join('')}
      </ul>
    </section>`
    )
    .join('');

  return `<section class="section section--paper menu" id="menu" aria-labelledby="menu-heading">
  <div class="shell">
    <header class="section-head section-head--center">
      <h2 class="eyebrow" id="menu-heading" data-reveal>
        <span class="eyebrow__dot" aria-hidden="true"></span>The menu
      </h2>
      <p class="section-head__lede" data-reveal>
        Prices as printed in store. Call ${esc(contact.phone)} to order for pickup.
      </p>
    </header>
  </div>

  <div class="menu-nav" data-menu-nav>
    <div class="shell">
      <ul class="menu-nav__list">${tabs}</ul>
    </div>
  </div>

  <div class="shell menu__body">${groups}</div>

  <div class="shell">
    ${printedMenuCard(menuPdfSize)}
    <p class="menu__foot" data-reveal>
      Item numbers match the printed menu in store — you can order by number.
    </p>
  </div>
</section>`;
}

/* The in-store menu, offered as a PDF. */
function printedMenuCard(size) {
  const href = `assets/menu/${menuPdf.file}`;
  const meta = ['PDF', size].filter(Boolean).join(' · ');

  return `<aside class="menu-pdf" data-reveal>
    <div class="menu-pdf__copy">
      <h3 class="menu-pdf__title">${esc(menuPdf.label)}</h3>
      <p class="menu-pdf__blurb">${esc(menuPdf.blurb)}</p>
    </div>
    <div class="menu-pdf__action">
      <a class="btn btn--solid btn--lg" href="${href}" type="application/pdf"
         target="_blank" rel="noopener">
        ${icons.document}<span>${esc(menuPdf.cta)}</span>
      </a>
      <p class="menu-pdf__meta">${esc(meta)}<span class="u-sr"> — opens in a new tab</span></p>
    </div>
  </aside>`;
}

function menuItem(d) {
  const variants = (d.variants || [])
    .map(
      (v) =>
        `<li class="menu-item__variant"><span>${esc(v.name)}</span><span class="menu-item__dots" aria-hidden="true"></span>${price(
          v.price
        )}</li>`
    )
    .join('');

  return `<li class="menu-item" id="menu-${slug(d.name)}" data-reveal>
    <div class="menu-item__thumb">
      ${photo({
        photo: d.photo,
        alt: altFor(d),
        tone: d.tone,
        ratio: 'square',
        ref: d.ref,
        sizes: '96px',
      })}
    </div>
    <div class="menu-item__main">
      <div class="menu-item__row">
        <h4 class="menu-item__name">
          <span class="menu-item__ref">${esc(d.ref)}</span> ${esc(d.name)}
        </h4>
        <span class="menu-item__dots" aria-hidden="true"></span>
        ${price(d.price)}
      </div>
      ${d.options ? `<p class="menu-item__opts">${esc(d.options)}</p>` : ''}
      ${variants ? `<ul class="menu-item__variants">${variants}</ul>` : ''}
      ${d.note ? `<p class="menu-item__note">${esc(d.note)}</p>` : ''}
    </div>
  </li>`;
}

/* ─────────────────────────────  gallery  ──────────────────────────── */

export function gallerySection() {
  const tiles = gallery
    .map((g, i) => {
      // The caption is read straight off the menu item, never re-typed, so a
      // gallery tile can never disagree with the row it points at.
      const d = byRef(g.ref);
      return `<figure class="tile tile--${g.span}" data-reveal style="--i:${i % 4}">
      ${photo({
        photo: g.photo,
        alt: g.alt,
        tone: g.tone,
        ratio: g.span === 'tall' ? 'tall' : g.span === 'wide' ? 'wide' : 'square',
        ref: g.ref,
        sizes: '(min-width:900px) 30vw, 92vw',
        className: 'photo--fill',
      })}
      <figcaption class="tile__cap">
        <span class="tile__name">
          ${d ? `<span class="tile__ref">${esc(d.ref)}</span> ` : ''}${esc(d ? d.name : g.alt)}
        </span>
        ${d ? `<span class="tile__price">${price(d.price)}</span>` : ''}
      </figcaption>
    </figure>`;
    })
    .join('');

  return `<section class="section section--ink gallery" id="gallery">
  <div class="shell">
    <header class="section-head">
      <p class="eyebrow" data-reveal>Gallery</p>
      <h2 class="h2" data-reveal>From the counter</h2>
    </header>
  </div>
  <div class="shell gallery__grid">${tiles}</div>
</section>`;
}

/* ──────────────────────────────  visit  ───────────────────────────── */

export function visit() {
  return `<section class="section section--paper visit" id="visit">
  <div class="shell visit__grid">
    <div class="visit__copy">
      <p class="eyebrow" data-reveal>Visit</p>
      <h2 class="h2" data-reveal>You'll find us inside<br>${esc(brand.host)}.</h2>
      <p class="visit__lede" data-reveal>
        Walk into ${esc(brand.host)} on Carling Avenue and head to the food counter at the
        back. Order at the counter and eat in at the dining area, or call ahead and
        we'll have it ready to go.
      </p>

      <dl class="visit__details" data-reveal>
        <div class="detail">
          <dt>${icons.pin}<span>Address</span></dt>
          <dd>
            <span class="detail__strong">${esc(location.line1)}</span>
            <span>${esc(location.line2)}</span>
            <span class="detail__muted">${esc(location.inside)}</span>
          </dd>
        </div>
        <div class="detail">
          <dt>${icons.clock}<span>Hours</span></dt>
          <dd>
            <span class="detail__strong">${esc(hours.kitchen.label)} · ${esc(hours.kitchen.value)}</span>
          </dd>
        </div>
        <div class="detail">
          <dt>${icons.phone}<span>Phone</span></dt>
          <dd><a class="detail__strong detail__link" href="${contact.phoneHref}">${esc(contact.phone)}</a></dd>
        </div>
      </dl>

      <div class="visit__actions" data-reveal>
        <a class="btn btn--solid btn--lg" href="${location.directionsHref}" target="_blank" rel="noopener">
          ${icons.pin}<span>Get directions</span>${icons.arrowUpRight}
        </a>
        <a class="btn btn--outline btn--lg" href="${contact.phoneHref}">${icons.phone}<span>Call to order</span></a>
      </div>
    </div>

    <div class="visit__media" data-reveal>
      ${photo({ ...scenes.storefront, ratio: 'wide', sizes: '(min-width:900px) 46vw, 92vw' })}
      <a class="visit__map-link" href="${location.mapHref}" target="_blank" rel="noopener">
        <span>Open in Google Maps</span>${icons.arrowUpRight}
      </a>
    </div>
  </div>
</section>`;
}

/* ──────────────────────────────  footer  ──────────────────────────── */

export function footer() {
  const year = new Date().getFullYear();
  return `<footer class="footer">
  <div class="shell footer__grid">
    <div class="footer__brand">
      <p class="wordmark__name wordmark__name--lg">${esc(brand.name)}</p>
      <p class="footer__host">at ${esc(brand.host)}</p>
      <p class="footer__desc">${esc(brand.descriptor)}</p>
    </div>

    <div class="footer__col">
      <h2 class="footer__h">Visit</h2>
      <address class="footer__addr">
        ${esc(location.line1)}<br>${esc(location.line2)}<br>
        <span class="footer__muted">${esc(location.inside)}</span>
      </address>
      <a class="footer__link" href="${location.directionsHref}" target="_blank" rel="noopener">Directions ${icons.arrowUpRight}</a>
    </div>

    <div class="footer__col">
      <h2 class="footer__h">Hours</h2>
      <p class="footer__line"><span>${esc(hours.kitchen.label)}</span><span>${esc(hours.kitchen.value)}</span></p>
    </div>

    <div class="footer__col">
      <h2 class="footer__h">Order</h2>
      <a class="footer__phone" href="${contact.phoneHref}"
         aria-label="Call ${esc(contact.phone)} to order">${esc(contact.phone)}</a>
      <nav aria-label="Footer">
        <ul class="footer__nav">
          ${nav.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}
        </ul>
      </nav>
    </div>
  </div>

  <div class="shell footer__base">
    <p>&copy; ${year} ${esc(brand.name)} at ${esc(brand.host)}.</p>
    <p class="footer__muted">${esc(location.full)}</p>
  </div>
</footer>`;
}

/* ────────────────────────────  helpers  ───────────────────────────── */

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Alt text built from real menu wording — never a generic "food photo". */
function altFor(d) {
  return d.options ? `${d.name} — ${d.options}` : d.name;
}
