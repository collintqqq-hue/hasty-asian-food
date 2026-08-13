# Asian Food Take Out — at Hasty Market

Website for the Vietnamese take-out kitchen inside Hasty Market,
2361 Carling Avenue, Ottawa.

```bash
npm run dev     # build, then serve on http://localhost:4321
npm run build   # render to ./dist
```

No dependencies, no install step, no framework. Node 18+.

---

## How it's put together

```
src/data/restaurant.js      every fact on the site — the single source of truth
src/components/             photo.js · icons.js · sections.js · page.js
src/styles/                 tokens.css · base.css · components.css
src/scripts/main.js         progressive enhancement only
src/assets/brand/           logo, favicon, apple-touch-icon, og share card
src/assets/photos/          drop photography here
src/assets/menu/            the printed in-store flyer, as a PDF
tools/flyer-to-pdf.mjs      crops a photo of the flyer into that PDF
tools/make-menu-pdf.mjs     typesets a text-only PDF from the menu data
build.mjs                   renders dist/index.html
serve.mjs                   dev static server
```

`build.mjs` renders the page to static HTML at build time, so the menu ships in
the markup — indexable, and fully readable with JavaScript off. The three CSS
files are concatenated into one `dist/styles/main.css`.

**To change a price, a name, an hour or a phone number, edit
`src/data/restaurant.js` and rebuild.** Nothing is hard-coded in the markup.
The schema.org `Restaurant` block is generated from the same data, so the
structured data can't drift from the page.

### The paper/ink rhythm

Sections alternate between warm paper and near-black ink:

```
hero (ink) → offer (red) → about (ink) → menu (paper) → gallery (ink) → visit (paper) → footer (ink)
```

The hero and About are both dark on purpose — the red offer band between them
is the separator. The menu is paper because a long price list scans best on
light, and the gallery is ink because photographs sit better on dark.

**Tone is a switchable property, not a hand-painted one.** Each section carries
`section--ink` or `section--paper`, which set a small group of variables:

```
--surface-bg  --surface-raised  --surface-fg  --surface-fg-muted
--surface-line  --surface-accent  --surface-accent-soft
```

Everything inside a section resolves through those rather than naming `--ink`
or `--paper` directly, so flipping a section is a one-word change instead of
recolouring thirty properties. `:root` carries the light values as defaults so
anything outside a toned section still resolves.

If you flip a section, re-check the sequence above — and check contrast. Two
rules (`.prose` and `.link-arrow`) live in files outside the section blocks and
were left dark-on-dark by the first flip, at 2.4:1. They use the surface
variables now, but the lesson generalises: anything styled outside a section
block will not follow the tone unless it uses these variables.

### Mobile layout

Phones get their own treatment rather than a squeezed desktop one.

**One fixed bar, and only one.** The header is solid from the first pixel —
paper with a blur, never transparent, never changing colour on scroll. It used
to fade in from transparent, which meant the wordmark and the hero headline
overlapped and both became unreadable mid-scroll. Row one is the wordmark and
the Call to order button; row two is the four section links, with a filled pill
marking the current section.

Removed, because they stacked into four competing bars at the menu:

- the hamburger button and its drawer — the four links are always visible now,
  and Call to order sits in the bar
- the sticky bottom order bar — it duplicated the header's Call to order
- the menu category bar's *stickiness* — it is still there as a jump list at the
  top of the menu, just smaller and no longer pinned

**Gallery captions clamp to two lines.** Full menu names are long
("Rice & Egg Noodles Soup with BBQ Chicken, BBQ Beef…") and on a 162px tile one
wrapped to *twelve* lines and overflowed the tile entirely. The full name stays
in the DOM for screen readers and in the image `alt`.

**Menu rows drop the leader dots** and give the name the full column, so it
wraps to fewer lines. **`--space-2xl` and `--space-xl` shrink** so the page is
not mostly padding.

Desktop is untouched: single-row header, transparent over the hero then paper
once scrolled, leader dots, sticky category bar, three-column gallery.

### Brand assets and link previews

`src/assets/brand/` holds the owner's logo and everything derived from it. The
build copies favicon, apple-touch-icon and og.jpg to the **site root**, not
under `assets/` — crawlers and share-card scrapers look for `/favicon.png` and
resolve `og:image` against the origin.

**`og:image` must be an absolute URL.** Facebook, Instagram, iMessage, WhatsApp
and Slack all refuse to resolve a relative one, and silently fall back to
scraping whatever image they can find on the page — which is why the link
preview was showing the hero photo. The absolute origin lives in `site.url`; if
the domain ever changes, change it there and everything follows.

The share card is the logo centred on a 1200×630 black canvas. The canvas is
pure black rather than `--ink` because the logo art has a solid black plate, and
any other value shows a visible seam around it.

Social platforms cache previews aggressively. After deploying, re-scrape at
`developers.facebook.com/tools/debug/` to see the new card immediately.

### The splash screen

The logo, a loading bar that fills, then the whole panel slides up and away —
under a second and a half in total. It is the most
dangerous element on the site — if it fails to clear, nothing is visible — so it
is deliberately over-engineered:

- **Shown only when scripting is confirmed.** `.splash` is `display: none` until
  the `.js` class is set inline in `<head>`. No JavaScript means no splash at
  all, rather than a stuck one.
- **Torn down three ways:** the CSS animation, an `animationend` listener that
  removes it from the DOM, and a 1.5s hard timeout in case the animation never
  runs (reduced motion, background tab, animations disabled).
- `prefers-reduced-motion` skips it entirely.
- The `animationend` listener checks `e.animationName`. That event **bubbles**,
  and the logo and loading bar inside finish long before the panel slides away —
  listening for any of them tore the splash off mid-reveal.

### The gallery lightbox

Clicking a tile opens a full-screen viewer with the item number, the **full**
menu name, its options and price, prev/next arrows, a counter, arrow-key and
swipe support, focus trapping and Escape to close.

The markup ships `hidden` and is only ever opened by script, so with JavaScript
off the gallery stays a plain grid of pictures rather than a pile of dead
controls.

Tile captions are never truncated and carry no ellipsis. They use a **short
label** (`short` in `gallery[]`) — a compression of the menu name, never a
different dish. The complete name appears in the lightbox and in the menu, so
nothing is lost.

Two CSS ordering traps to know about if you edit this. Both cost real time:

1. **A mobile `@media` block must come *after* the base rules it overrides.**
   Media queries carry no extra specificity, so a later plain rule wins. This
   silently ate the tile-caption and nav-link overrides.
2. **`gap` on a wrapping flex row applies between rows too.** The header's
   24px gap pushed the nav row outside the header box, and outside its blurred
   background, until `row-gap: 0` was set.

### Deploying

`dist/` is a plain static folder — drop it on Netlify, Vercel, Cloudflare Pages,
GitHub Pages or any host. Build command `npm run build`, publish directory
`dist`.

---

## Where the content came from

Everything on the site is transcribed from two supplied sources:

- the printed **grand-opening flyer** (menu, prices, phone, hours, offer)
- the **Google Business listing** for Hasty Market at 2361 Carling Ave

Nothing was invented. Four things need the owner's confirmation:

| Item | What's on paper | What the site uses |
|---|---|---|
| **Postal code** | Flyer prints `L2B 7G7` | `K2B 7G7` — L2B is a Niagara prefix; every Ottawa code starts with K, and the Google listing shows K2B 7G7. The flyer has a typo. |
| **Restaurant name** | Flyer says only "HASTY MARKET" over "Asian Food Take Out" — no separate trading name | Leads with **Asian Food Take Out**, with "at Hasty Market" as the locator, so the kitchen reads as its own destination. If there's a real trading name, change `brand.name` in the data file — one line. |
| **Second phone number** | `hastymarketcorp.com` lists `613-721-3898` for "Hasty Market #44" | Not published. That's the corporate store line; the flyer and the Google listing both give `(343) 998-8051` for the kitchen. Publishing both would send food orders to the wrong phone. |
| **Item 1B** | "Special Vietnamese Sub — $8.95", no description | Listed by name and price only. What makes it *special* isn't on the flyer, so nothing was written for it. |

Two smaller notes:

- **Hours.** The flyer prints `11am to 9pm` with no days, so the site says
  "Kitchen · 11:00 AM – 9:00 PM" without claiming which days. The convenience
  store's own opening hours are deliberately not shown — the only hours on the
  site are the kitchen's.
- **Menu grouping.** The flyer prints one heading ("Special Vietnamese Sub") and
  then numbers 1–11 ungrouped. The site groups them into *Signature Subs*,
  *Rolls & Starters* and *Noodles & Rice* so the sticky category nav has
  something to navigate. No name, option, price or item number was changed, and
  the printed numbers are shown on every row so customers can still order by
  number. This is the only editorial change to the menu.
- **Ordering.** The Google listing shows a "Place an order" action, but no
  ordering URL was supplied, so every order CTA is a phone link. If there's an
  online ordering page, add it to `contact` in the data file.

---

## The printed menu (PDF)

The menu section ends with a card linking to `assets/menu/in-store-menu.pdf`,
opened in a new tab.

That PDF is **the real grand-opening flyer** — the owner's photo of it, cropped
to the page and wrapped in a US Letter PDF (496 kB).

To refresh it from a new photo or screenshot:

```bash
npm run menu:flyer -- "C:/path/to/flyer.png"
```

`tools/flyer-to-pdf.mjs` finds the bright page inside the black letterbox bars a
phone screenshot arrives with, crops to it — which also removes any viewer
overlay sitting in those bars — and embeds the cropped JPEG via `/DCTDecode`, so
the image bytes are copied in without a second round of compression. It scales
to fit the page preserving aspect exactly, so the menu is never stretched.
Requires `ffmpeg` on PATH; no npm dependencies.

### The generated fallback

`tools/make-menu-pdf.mjs` (`npm run menu:pdf`) writes a *different* PDF —
typeset from the menu data rather than scanned, about 5 kB. It was the stand-in
before the real flyer arrived, and it's still useful if you ever want a clean
text version.

It now **refuses to overwrite** an existing `in-store-menu.pdf`, so it can't
silently replace the real flyer. Pass `--force` if you genuinely want the
generated one published instead.

### Known limitation

The published PDF is an image, so it has no selectable or screen-readable text.
That's fine here because the complete menu is already on the page as real HTML
directly above the download card — the accessible path is the page itself, and
the PDF is a convenience for printing and saving. If you ever want a
text-searchable PDF, `npm run menu:pdf -- --force` produces exactly that.

`build.mjs` fails with an explanatory error if the PDF is missing, so a broken
link can't reach production.

---

## Photography

**29 of 30 slots have a photograph.** The rest render a designed placeholder: a
warm, film-grained plate in that dish's own colour with the flyer's item number
set in the display serif. It's an intentional state, not a broken one — the page
reads finished, and each slot becomes a photograph the moment a file is dropped
in.

Drop photos in `src/assets/photos/` and run `npm run build`. The build reports
how many slots are filled, and — more usefully — names any file in the folder
that no slot references, which is almost always a filename typo that would
otherwise fail silently as a still-empty slot.

### What's in place

16 files fill 29 slots. Files are reused across the menu and gallery where the
dish is the same — a 96px thumbnail and a 400px tile can share a source.

| File | Size | Where it appears | Source |
| --- | --- | --- | --- |
| `vermicelli.jpg` | 1100×1540 | About (main), menu 8 | Owner |
| `team.jpg` | 700×866 | About (inset) | Owner, upscaled 4K |
| `storefront.jpg` | 1400×934 | Visit | Owner, upscaled 4K, cropped 3:2 |
| `sub-bbq-pork.jpg` | 900×896 | Menu 1A | Owner |
| `sub-closeup.jpg` | 720×540 | Gallery 1A | Owner |
| `sub-wrapped.jpg` | 475×475 | Menu 1B, gallery 1B | Owner |
| `pad-thai.jpg` | 616×462 | Menu 7, gallery 7 | Owner |
| `spring-rolls.jpg` | 554×554 | Menu 1, gallery 1 | Owner |
| `fried-rice.jpg` | 1000×1482 | Menu 10, gallery 10 | Owner |
| `chicken-wings.jpg` | 639×480 | Menu 6, gallery 6 | Owner |
| `fresh-rolls.jpg` | 900×600 | Menu 4, gallery 4 | Owner, upscaled 2K |
| `noodle-soup.jpg` | 1000×632 | Menu 9, gallery 9 | Owner, upscaled 2K |
| `shrimp-rolls.jpg` | 800×800 | Menu 2, gallery 2 | Generated, `nano_banana_pro` |
| `jumbo-veggie-rolls.jpg` | 800×800 | Menu 3, gallery 3 | Generated, `nano_banana_pro` |
| `veggie-rolls.jpg` | 800×800 | Menu 5, gallery 5 | Generated, `nano_banana_pro` |
| `wonton-soup.jpg` | 900×1206 | Menu 11, gallery 11 | Generated, `nano_banana_pro` |

`unused/spread.jpg` is the generated four-dish image, removed from the gallery
but kept on disk. Files in `unused/` are not copied to `dist/` and are not
reported as orphans.

Total 1.8 MB, every image lazy-loaded. The initial page (HTML + CSS + JS) is
88 kB.

### Still needed

**Only the hero.** The full-bleed image behind the headline is the last empty
slot and the largest single visual on the page. Its prompt is first in the
priority list in `PHOTOGRAPHY-BRIEF.md`; 2 credits on `nano_banana_pro`.

Every other slot on the site is filled.

### A note on 1B

`sub-wrapped.jpg` is a photograph of the kitchen's Vietnamese subs — it is *not*
a photograph of the Special specifically, because the flyer never says how 1B
differs from 1A. It was deliberately not generated: a real, representative
photograph is honest, whereas a generated one would have had to invent a filling.
If the owner says what goes in the Special, revisit the photo and the alt text.

### The four generated dishes

Items 2, 3, 5 and 11 had no supplied photograph and were generated with
`nano_banana_pro` at 2K, 2 credits each. They were prompted to match the owner's
real photographs they sit beside — bright, white ceramic, pale neutral
backgrounds — rather than the darker house style used for the earlier `about`
image, which would have looked imported next to them.

Each carried an explicit negative constraint against its specific failure mode,
and each was checked against the menu wording before being wired in:

| Item | The risk | Result |
| --- | --- | --- |
| 2 | filling drifting off shrimp | shrimp visible at the cut ✓ |
| 3 | not reading as JUMBO; meat creeping in | visibly larger, vegetable only ✓ |
| 5 | shrimp being added, which would make it item 4 | no shrimp, no meat ✓ |
| 11 | picking up item 9's shrimp and quail eggs | wontons and egg noodles only ✓ |

None needed a re-roll. Item 3 came back with two dipping-sauce bowls instead of
one — cosmetic, and it does not misstate the dish, so it was kept.

### Gallery captions

Each gallery tile shows the menu item number and name. Both are read directly
off the menu item at build time — never re-typed — so a tile cannot drift out of
sync with the row it points at. The tiles are also in menu order, so the gallery
doubles as a visual index of the menu.

### Two supplied files were not used

- **A branded marketing graphic for "Nhà Bánh Mì / Bánh Mì House"** — a
  different business, with its logo and wordmark across the image. Using it
  would put another company's branding on this site.
- **A third Vietnamese sub photo** (475×475) — two were already in use, one in
  the menu and one in the gallery, and this was the lowest resolution of the
  three.

### Note on the wings photo

`chicken-wings.jpg` shows celery and a creamy dip. The menu calls item 6
"Chicken Wings with **Sweet and Sour Sauce**". Worth swapping for a photo of the
dish as actually served, so the picture and the price line agree.

### storefront.jpg has invented text

The storefront original was only 165×220. The 4K upscale recovered the building
convincingly and the main yellow awning reads **"Hasty Market"** correctly — but
the upscaler could not recover the smaller window sign and **invented** it. The
left window now reads **"Harly Maress"**.

It is small at render size and easy to miss, but it is wrong, and this is the
one image on the site whose job is to match a real building someone is trying to
find. **Replace it with a real photo when you can** — a phone photo taken
outside the store will be several thousand pixels wide and needs no upscaling.
Keep the filename `storefront.jpg`.

This is the general risk with upscaling: it does not recover detail, it invents
plausible detail. Fine for texture and faces, unreliable for text and signage.

Generation via Higgsfield was attempted and is blocked: the connected workspace
reports **0 credits on a free plan** against a cost of **2 credits per image**,
and the separate `higgsfield` MCP connector needs an OAuth sign-in that can't be
done in a non-interactive session. Authorise it from claude.ai connector
settings (or `claude mcp` in an interactive terminal) and top up credits, and
the prompts are ready to run.

- [`PHOTOGRAPHY-BRIEF.md`](PHOTOGRAPHY-BRIEF.md) — a prompt for every slot, a
  shared house-style block for consistency, the reference-image workflow, and a
  rejection checklist.
- [`src/assets/photos/README.md`](src/assets/photos/README.md) — how to wire an
  approved image in.

---

## Accessibility & performance notes

- Contrast measured in-browser: body and muted text sit at **6.9:1** on paper
  and **7.2:1** on dark, against a 4.5:1 requirement. No text is below 15px.
- Full keyboard path: skip link, visible `:focus-visible` rings, a focus-trapped
  mobile drawer that closes on <kbd>Esc</kbd> and returns focus to the button.
- Touch targets are ≥44px on mobile.
- `prefers-reduced-motion` disables every transition, the reveal animation and
  the offer marquee.
- Reveal animations are gated behind a `.js` class set inline in `<head>`, so a
  blocked or failed script leaves the page fully visible rather than blank.
- No layout shift: every image slot has a locked `aspect-ratio`; photos use
  `object-fit: cover` so nothing is ever stretched.
- One external request (Google Fonts, preconnected). Everything else is local.
