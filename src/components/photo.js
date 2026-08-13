/**
 * <Photo> primitive
 * -----------------
 * One component governs every image on the site.
 *
 * If `photo` is a filename, it renders a real <img> with lazy loading,
 * async decoding and an explicit aspect ratio so nothing shifts on load.
 *
 * If `photo` is null, it renders a designed "numeral plate" instead: a warm,
 * dark, film-grained field in the dish's own tone with the flyer's item number
 * set in the display serif. This is a deliberate art-directed state, not a grey
 * box — the site reads finished today, and each slot becomes a photograph the
 * moment a file is dropped into src/assets/photos/ and named in restaurant.js.
 */

const RATIOS = {
  hero: '16 / 9',
  portrait: '3 / 4',
  square: '1 / 1',
  landscape: '4 / 3',
  wide: '3 / 2',
  tall: '2 / 3',
};

export function photo({
  photo: file,
  alt,
  tone = 'ember',
  ratio = 'landscape',
  ref = null,
  sizes = '100vw',
  priority = false,
  className = '',
} = {}) {
  const style = `--ratio:${RATIOS[ratio] || ratio}`;
  const cls = ['photo', `photo--${tone}`, className].filter(Boolean).join(' ');

  if (file) {
    const loading = priority ? 'eager' : 'lazy';
    const fetchpriority = priority ? 'high' : 'auto';
    return `<figure class="${cls}" style="${style}">
      <img src="assets/photos/${file}" alt="${esc(alt)}" sizes="${sizes}"
           loading="${loading}" decoding="async" fetchpriority="${fetchpriority}">
    </figure>`;
  }

  // Designed placeholder. aria-hidden numeral; the accessible name carries the
  // dish description so screen-reader users get the same information.
  return `<figure class="${cls} photo--plate" style="${style}" role="img" aria-label="${esc(alt)}">
    <span class="photo__grain" aria-hidden="true"></span>
    ${ref ? `<span class="photo__ref" aria-hidden="true">${esc(ref)}</span>` : ''}
  </figure>`;
}

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Price, split so the dollar sign can be set smaller than the figure. */
export function price(value) {
  return `<span class="price"><span class="price__sym" aria-hidden="true">$</span><span class="price__num">${esc(
    value
  )}</span><span class="u-sr">${esc(value)} dollars</span></span>`;
}
