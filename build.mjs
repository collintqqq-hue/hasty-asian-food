/**
 * Build — renders the site to ./dist as static HTML.
 *
 * Zero dependencies: plain Node, no bundler, no framework. The menu ships in
 * the markup rather than being drawn by JavaScript, so it is indexable and
 * readable with scripting off.
 *
 *   node build.mjs
 */

import { mkdir, readFile, writeFile, readdir, copyFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { head, body } from './src/components/page.js';
import { menuPdf, menu, gallery, scenes } from './src/data/restaurant.js';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'src');
const out = join(root, 'dist');

/** Concatenated in cascade order. */
const STYLES = ['tokens.css', 'base.css', 'components.css'];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);

async function buildHtml(ctx) {
  const html = `<!doctype html>
<html lang="en-CA">
<head>
${head()}
</head>
<body>
${body(ctx)}
</body>
</html>
`;
  await writeFile(join(out, 'index.html'), html, 'utf8');
  return html.length;
}

/**
 * The printed menu is linked from the page, so its absence is a broken link.
 * Fail the build rather than ship one.
 */
async function copyMenuPdf() {
  const from = join(src, 'assets', 'menu', menuPdf.file);
  const info = await stat(from).catch(() => null);

  if (!info) {
    throw new Error(
      `Missing ${menuPdf.file}.\n` +
        `  The menu section links to assets/menu/${menuPdf.file}, which does not exist.\n` +
        `  Run "npm run menu:pdf" to generate it, or drop a scan of the printed\n` +
        `  flyer at src/assets/menu/${menuPdf.file}.`
    );
  }

  await mkdir(join(out, 'assets', 'menu'), { recursive: true });
  await copyFile(from, join(out, 'assets', 'menu', menuPdf.file));

  const kb = info.size / 1024;
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} kB`;
}

async function buildStyles() {
  const parts = [];
  for (const name of STYLES) {
    parts.push(`/* ${name} */`);
    parts.push(await readFile(join(src, 'styles', name), 'utf8'));
  }
  const css = parts.join('\n\n');
  await mkdir(join(out, 'styles'), { recursive: true });
  await writeFile(join(out, 'styles', 'main.css'), css, 'utf8');
  return css.length;
}

async function buildScripts() {
  await mkdir(join(out, 'scripts'), { recursive: true });
  await copyFile(join(src, 'scripts', 'main.js'), join(out, 'scripts', 'main.js'));
}

/** Favicon lives at the site root, where browsers and crawlers expect it. */
async function copyFavicon() {
  await copyFile(join(src, 'assets', 'favicon.svg'), join(out, 'favicon.svg'));
}

/** Every image slot in the data, so the build can report what is still empty. */
function photoSlots() {
  return [
    ...Object.entries(scenes).map(([k, s]) => ({ slot: k, photo: s.photo })),
    ...gallery.map((g) => ({ slot: g.slot, photo: g.photo })),
    ...menu.flatMap((c) => c.items.map((i) => ({ slot: `menu ${i.ref}`, photo: i.photo }))),
  ];
}

/**
 * Reports which slots have photography and, more usefully, flags files sitting
 * in the folder that nothing references — that is almost always a filename
 * typo, and it would otherwise fail silently as a still-empty slot.
 */
function reportPhotos(files) {
  const slots = photoSlots();
  const filled = slots.filter((s) => s.photo);
  const referenced = new Set(filled.map((s) => s.photo));
  const orphans = files.filter((f) => !referenced.has(f));
  const missing = filled.filter((s) => !files.includes(s.photo));
  return { total: slots.length, filled: filled.length, orphans, missing };
}

async function copyPhotos() {
  const from = join(src, 'assets', 'photos');
  const to = join(out, 'assets', 'photos');
  await mkdir(to, { recursive: true });
  if (!existsSync(from)) return 0;

  const names = [];
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!IMAGE_EXT.has(extname(entry.name).toLowerCase())) continue; // skips README.md
    await copyFile(join(from, entry.name), join(to, entry.name));
    names.push(entry.name);
  }
  return names;
}

async function main() {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  const menuPdfSize = await copyMenuPdf();
  const [htmlBytes, cssBytes] = await Promise.all([buildHtml({ menuPdfSize }), buildStyles()]);
  await buildScripts();
  await copyFavicon();
  const files = await copyPhotos();
  const p = reportPhotos(files);

  const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
  console.log(`built dist/`);
  console.log(`  index.html      ${kb(htmlBytes)}`);
  console.log(`  styles/main.css ${kb(cssBytes)}`);
  console.log(`  scripts/main.js copied`);
  console.log(`  menu PDF        ${menuPdf.file} (${menuPdfSize})`);
  console.log(`  photos          ${p.filled}/${p.total} slots filled, ${files.length} file${files.length === 1 ? '' : 's'} copied`);

  if (p.missing.length) {
    console.log(`\n  MISSING FILES — these slots name a file that isn't in src/assets/photos/:`);
    for (const s of p.missing) console.log(`    ${s.slot} → ${s.photo}`);
  }
  if (p.orphans.length) {
    console.log(`\n  UNUSED FILES — present but no slot references them (check the filename):`);
    for (const f of p.orphans) console.log(`    ${f}`);
    console.log(`  Wire one up by setting photo: '<name>' in src/data/restaurant.js.`);
  }
  if (p.filled === 0) {
    console.log(`\n  No photographs yet — every slot renders its designed numeral plate.`);
    console.log(`  See src/assets/photos/README.md and PHOTOGRAPHY-BRIEF.md.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
