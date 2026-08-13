/** Inline SVG icons. Stroke-based, currentColor, decorative by default. */

const wrap = (body, box = 24) =>
  `<svg class="icon" viewBox="0 0 ${box} ${box}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  phone: wrap(
    '<path d="M6.6 3.5h3l1.5 3.8-1.9 1.4a11.5 11.5 0 0 0 5.1 5.1l1.4-1.9 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"/>'
  ),
  pin: wrap(
    '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>'
  ),
  clock: wrap('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 1.9"/>'),
  arrow: wrap('<path d="M5 12h13"/><path d="m12.5 6.5 6 5.5-6 5.5"/>'),
  arrowUpRight: wrap('<path d="M8 16 16 8"/><path d="M9.5 8H16v6.5"/>'),
  dine: wrap(
    '<path d="M6.2 3v6a2.4 2.4 0 0 0 4.8 0V3"/><path d="M8.6 11.4V21"/><path d="M17.8 3c-1.6 1.9-2.4 4.1-2.4 6.3v2.6h4.4V3Z"/><path d="M17.8 11.9V21"/>'
  ),
  document: wrap(
    '<path d="M14 3H7a1.8 1.8 0 0 0-1.8 1.8v14.4A1.8 1.8 0 0 0 7 21h10a1.8 1.8 0 0 0 1.8-1.8V7.8Z"/><path d="M14 3v4.8h4.8"/><path d="M8.8 13.2h6.4"/><path d="M8.8 16.8h4.2"/>'
  ),
};
