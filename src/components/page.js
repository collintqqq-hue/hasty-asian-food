import { site, brand, logo, contact, location, hours, menu, offer } from '../data/restaurant.js';
import {
  header,
  hero,
  offerStrip,
  about,
  menuSection,
  gallerySection,
  visit,
  footer,
} from './sections.js';

/** schema.org Restaurant — built from the same data, so it can never drift. */
function structuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `${brand.name} at ${brand.host}`,
    description: site.description,
    servesCuisine: ['Vietnamese', 'Thai', 'Southeast Asian'],
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.line1,
      addressLocality: 'Ottawa',
      addressRegion: 'ON',
      postalCode: 'K2B 7G7',
      addressCountry: 'CA',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        opens: '11:00',
        closes: '21:00',
      },
    ],
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: menu.map((c) => ({
        '@type': 'MenuSection',
        name: c.name,
        hasMenuItem: c.items.map((i) => ({
          '@type': 'MenuItem',
          name: i.name,
          ...(i.options ? { description: i.options } : {}),
          offers: { '@type': 'Offer', price: i.price, priceCurrency: 'CAD' },
        })),
      })),
    },
    ...(offer.active
      ? {
          makesOffer: {
            '@type': 'Offer',
            name: `${offer.kicker} — ${offer.headline}`,
            description: `${offer.headline} ${offer.window}`,
          },
        }
      : {}),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function head() {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${site.title}</title>
<meta name="description" content="${site.description}">
<meta name="theme-color" content="${site.themeColor}">
<link rel="canonical" href="${site.url}/">

<link rel="icon" href="favicon.png" type="image/png" sizes="256x256">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<!-- Share card. og:image MUST be an absolute URL — Facebook, Instagram,
     iMessage, WhatsApp and Slack all refuse to resolve a relative one, which is
     why a link preview silently falls back to whatever image it can scrape. -->
<meta property="og:type" content="restaurant">
<meta property="og:site_name" content="${brand.name} at ${brand.host}">
<meta property="og:title" content="${brand.name} — at ${brand.host}">
<meta property="og:description" content="${site.description}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:url" content="${site.url}/">
<meta property="og:image" content="${site.url}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${brand.name} at ${brand.host}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${brand.name} — at ${brand.host}">
<meta name="twitter:description" content="${site.description}">
<meta name="twitter:image" content="${site.url}/og.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="styles/main.css">

<script>document.documentElement.classList.add('js')</script>

${structuredData()}`;
}

export function body(ctx = {}) {
  return `<!-- Opening splash: logo, a loading bar, then the whole panel slides
     up and away. Rendered only when scripting is confirmed, and torn down three
     independent ways — see .splash in components.css and initSplash in main.js.
     A full-screen overlay that fails to clear would hide the entire site. -->
<div class="splash" aria-hidden="true">
  <div class="splash__mark">
    <img class="splash__logo" src="assets/photos/${logo.mark}" alt="" width="640" height="640">
    <span class="splash__bar"><span class="splash__bar-fill"></span></span>
  </div>
</div>

${header()}

<main id="main">
  ${hero()}
  ${offerStrip()}
  ${about()}
  ${menuSection(ctx)}
  ${gallerySection()}
  ${visit()}
</main>

${footer()}

<script type="module" src="scripts/main.js"></script>`;
}
