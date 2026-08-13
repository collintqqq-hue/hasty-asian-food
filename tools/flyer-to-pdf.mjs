/**
 * Turns a photo or screenshot of the printed in-store flyer into the menu PDF
 * the site links to.
 *
 *   npm run menu:flyer -- "C:/path/to/flyer.png"
 *
 * Phone screenshots arrive letterboxed — black bars above and below, often with
 * a viewer overlay badge sitting in the black. This finds the bright page inside
 * those bars and crops to it, which removes the bars and any overlay above or
 * below the page in one step. Then it wraps the cropped JPEG in a PDF.
 *
 * The JPEG is embedded as-is via /DCTDecode: the bytes are copied into the PDF
 * without being re-encoded, so there is no second generation of quality loss.
 *
 * Requires ffmpeg on PATH. No npm dependencies.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, unlinkSync } from 'node:fs';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const input = process.argv[2];
const output = resolve(process.argv[3] || join(root, 'src', 'assets', 'menu', 'in-store-menu.pdf'));

if (!input) {
  console.error('usage: node tools/flyer-to-pdf.mjs <image> [output.pdf]');
  process.exit(1);
}

/* US Letter, which is what this flyer is proportioned to. */
const PAGE_W = 612;
const PAGE_H = 792;

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', ...args], { maxBuffer: 1 << 30 });

function dimensions(file) {
  const out = execFileSync(
    'ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', file],
    { encoding: 'utf8' }
  ).trim();
  const [w, h] = out.split('x').map(Number);
  if (!w || !h) throw new Error(`could not read dimensions of ${file}`);
  return { w, h };
}

/** Bounding box of the bright page inside the letterbox bars. */
function findPage(file, w, h) {
  const rawPath = join(tmpdir(), `flyer-${process.pid}.gray`);
  ff(['-i', file, '-f', 'rawvideo', '-pix_fmt', 'gray', rawPath, '-y']);
  const px = readFileSync(rawPath);
  unlinkSync(rawPath);

  const BRIGHT = 200;
  const COVER = 0.6;

  const rowBright = (y) => {
    let n = 0;
    for (let x = 0; x < w; x++) if (px[y * w + x] > BRIGHT) n++;
    return n / w;
  };

  let top = 0;
  let bottom = h - 1;
  while (top < h && rowBright(top) <= COVER) top++;
  while (bottom > top && rowBright(bottom) <= COVER) bottom--;
  if (top >= bottom) throw new Error('no bright page found — is this the right image?');

  const colBright = (x) => {
    let n = 0;
    for (let y = top; y <= bottom; y++) if (px[y * w + x] > BRIGHT) n++;
    return n / (bottom - top + 1);
  };

  let left = 0;
  let right = w - 1;
  while (left < w && colBright(left) <= COVER) left++;
  while (right > left && colBright(right) <= COVER) right--;

  // Pull in a pixel on each edge so no anti-aliased border line survives.
  const inset = 1;
  return {
    x: left + inset,
    y: top + inset,
    w: right - left + 1 - inset * 2,
    h: bottom - top + 1 - inset * 2,
  };
}

/* ── PDF assembly ──────────────────────────────────────────── */

const enc = (s) => Buffer.from(s, 'latin1');

function buildPdf(jpeg, imgW, imgH) {
  // Fit the page, preserving aspect exactly — never stretch the menu.
  const scale = Math.min(PAGE_W / imgW, PAGE_H / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const offX = (PAGE_W - drawW) / 2;
  const offY = (PAGE_H - drawH) / 2;

  const content = `q ${drawW.toFixed(3)} 0 0 ${drawH.toFixed(3)} ${offX.toFixed(3)} ${offY.toFixed(3)} cm /Im0 Do Q`;

  const objects = [
    enc('<< /Type /Catalog /Pages 2 0 R >>'),
    enc('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'),
    enc(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`
    ),
    enc(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`),
    Buffer.concat([
      enc(
        `<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} ` +
          `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`
      ),
      jpeg,
      enc('\nendstream'),
    ]),
    enc('<< /Title (Asian Food Take Out at Hasty Market - Menu) /Producer (flyer-to-pdf) >>'),
  ];

  const chunks = [enc('%PDF-1.4\n')];
  let offset = chunks[0].length;
  const offsets = [];

  objects.forEach((body, i) => {
    offsets.push(offset);
    const head = enc(`${i + 1} 0 obj\n`);
    const tail = enc('\nendobj\n');
    chunks.push(head, body, tail);
    offset += head.length + body.length + tail.length;
  });

  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) xref += `${String(off).padStart(10, '0')} 00000 n \n`;
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${offset}\n%%EOF\n`;
  chunks.push(enc(xref));

  return Buffer.concat(chunks);
}

/* ── run ───────────────────────────────────────────────────── */

const src = resolve(input);
await stat(src);

const { w, h } = dimensions(src);
const box = findPage(src, w, h);
console.log(`source    ${w}x${h}`);
console.log(`page area ${box.w}x${box.h} at ${box.x},${box.y}`);

const jpegPath = join(tmpdir(), `flyer-${process.pid}.jpg`);
ff(['-i', src, '-vf', `crop=${box.w}:${box.h}:${box.x}:${box.y}`, '-q:v', '2', jpegPath, '-y']);
const jpeg = await readFile(jpegPath);

const pdf = buildPdf(jpeg, box.w, box.h);
await mkdir(dirname(output), { recursive: true });
await writeFile(output, pdf);

console.log(`wrote     ${output} — ${(pdf.length / 1024).toFixed(0)} kB`);
