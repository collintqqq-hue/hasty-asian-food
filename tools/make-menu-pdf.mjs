/**
 * Renders the in-store menu to a one-page, print-ready PDF from the same data
 * the website uses, so the two can never disagree.
 *
 *   npm run menu:pdf   →  src/assets/menu/in-store-menu.pdf
 *
 * Written by hand against the PDF 1.4 spec — no dependencies. Uses the base-14
 * fonts (Times / Helvetica), which every reader has built in, so nothing is
 * embedded and the file stays a few kilobytes.
 *
 * NOTE: this is generated from the transcribed menu, not a scan of the printed
 * flyer. To publish the real flyer instead, drop the scan at
 * src/assets/menu/in-store-menu.pdf and skip this script — the site links to
 * the filename, not to this generator.
 */

import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { brand, contact, location, hours, menu, offer } from '../src/data/restaurant.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src', 'assets', 'menu', 'in-store-menu.pdf');

/**
 * The published PDF is currently the real flyer, produced by
 * tools/flyer-to-pdf.mjs. Refuse to silently replace it with this generated
 * fallback — the real thing always wins unless someone asks explicitly.
 */
if (existsSync(outFile) && !process.argv.includes('--force')) {
  console.error(
    `Refusing to overwrite src/assets/menu/in-store-menu.pdf.\n` +
      `  That file already exists, and it is very likely the real in-store flyer\n` +
      `  (see "npm run menu:flyer"). This script writes a generated stand-in.\n` +
      `  Pass --force if you really want to replace it.`
  );
  process.exit(1);
}

/* ── page geometry (US Letter) ─────────────────────────────── */
const W = 612;
const H = 792;
const M = 56;
const PRICE_X = 494;
const NAME_W = PRICE_X - M - 12;

/* ── fonts ─────────────────────────────────────────────────── */
const F = { bold: '/F1', roman: '/F2', italic: '/F3', sans: '/F4' };
/** Rough advance widths, good enough for wrapping and never for centring. */
const EM = { '/F1': 0.52, '/F2': 0.48, '/F3': 0.47, '/F4': 0.56 };
const widthOf = (s, font, size) => s.length * EM[font] * size;

/* ── colours ───────────────────────────────────────────────── */
const INK = '0.07 0.06 0.055';
const MUTED = '0.36 0.32 0.28';
const RED = '0.63 0.11 0.11';
const RULE = '0.85 0.82 0.76';

const ops = [];
let y = 0;

/** PDF strings are Latin-1; fold the typographic characters we actually use. */
function pdfText(s) {
  return String(s)
    .replace(/[–—]/g, '-')
    .replace(/·/g, '-')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/&/g, '&')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '');
}

function text(str, { font = F.roman, size = 10, x = M, color = INK } = {}) {
  ops.push(`${color} rg`, 'BT', `${font} ${size} Tf`, `1 0 0 1 ${x} ${y} Tm`, `(${pdfText(str)}) Tj`, 'ET');
}

function rule(color = RULE, x1 = M, x2 = W - M) {
  ops.push(`${color} RG`, '0.6 w', `${x1} ${y} m ${x2} ${y} l S`);
}

function wrap(str, font, size, maxWidth) {
  const words = String(str).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (widthOf(next, font, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/* ── compose the page ──────────────────────────────────────── */

y = H - 56;
if (offer.active) {
  text(`${offer.kicker.toUpperCase()} - ${offer.headline.toUpperCase()} - ${offer.window.toUpperCase()}`, {
    font: F.sans,
    size: 8,
    color: RED,
  });
  y -= 26;
}

text(brand.name, { font: F.bold, size: 29 });
y -= 19;
text(`at ${brand.host}`, { font: F.italic, size: 13, color: MUTED });
y -= 22;
text(location.full, { font: F.roman, size: 10, color: MUTED });
y -= 14;
text(`${contact.phone}   |   ${hours.kitchen.label} ${hours.kitchen.value}`, {
  font: F.roman,
  size: 10,
  color: MUTED,
});
y -= 14;
rule('0.55 0.5 0.44');

for (const category of menu) {
  y -= 30;
  text(category.name.toUpperCase(), { font: F.sans, size: 8.5, color: RED });
  y -= 8;
  rule();

  for (const item of category.items) {
    y -= 19;
    const label = `${item.ref}    ${item.name}`;
    const lines = wrap(label, F.bold, 10.5, NAME_W);

    text(lines[0], { font: F.bold, size: 10.5 });
    text(`$${item.price}`, { font: F.bold, size: 10.5, x: PRICE_X });
    for (const extra of lines.slice(1)) {
      y -= 13;
      text(extra, { font: F.bold, size: 10.5, x: M + 26 });
    }

    if (item.options) {
      y -= 12.5;
      text(item.options, { font: F.italic, size: 9.5, x: M + 26, color: MUTED });
    }

    for (const variant of item.variants || []) {
      y -= 13.5;
      text(variant.name, { font: F.roman, size: 9.5, x: M + 26, color: MUTED });
      text(`$${variant.price}`, { font: F.roman, size: 9.5, x: PRICE_X, color: MUTED });
    }

    if (item.note) {
      y -= 13;
      text(`** ${item.note}`, { font: F.italic, size: 9, x: M + 26, color: RED });
    }
  }
}

y = 74;
rule();
y -= 15;
text('Item numbers match the printed menu in store - you can order by number.', {
  font: F.italic,
  size: 8.5,
  color: MUTED,
});
y -= 12;
text(`Call ${contact.phone} to order for pickup.   ${location.inside}.`, {
  font: F.italic,
  size: 8.5,
  color: MUTED,
});

/* ── assemble the file ─────────────────────────────────────── */

const stream = ops.join('\n');
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R /F4 8 0 R >> >> /Contents 4 0 R >>`,
  `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefAt = Buffer.byteLength(pdf, 'latin1');
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`;

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, Buffer.from(pdf, 'latin1'));

const items = menu.reduce((n, c) => n + c.items.length, 0);
console.log(`wrote src/assets/menu/in-store-menu.pdf — ${items} items, ${(Buffer.byteLength(pdf, 'latin1') / 1024).toFixed(1)} kB`);
