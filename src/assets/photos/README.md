# Dropping in real photography

Every image slot on the site is a `null` in [`src/data/restaurant.js`](../../data/restaurant.js)
until you put a file here. Two steps, no code changes anywhere else:

1. Save the image into this folder, e.g. `sub-bbq-pork.jpg`
2. Open `src/data/restaurant.js`, find the slot, and set `photo:`

```js
{ ref: '1A', name: 'Vietnamese Sub', /* … */ photo: 'sub-bbq-pork.jpg', tone: 'ember' },
```

Then rebuild:

```bash
npm run build
```

The `<figure>` swaps from the designed numeral plate to a real `<img>` with lazy
loading, async decode and a locked aspect ratio. Nothing else changes.

## Which slots exist

| Where | Key in `restaurant.js` | Slot id | Best ratio |
| --- | --- | --- | --- |
| Hero background | `scenes.hero` | `hero` | 16:9 |
| About, right column | `scenes.about` | `about` | 3:4 |
| About, inset | `scenes.counter` | `counter` | 1:1 |
| Visit section | `scenes.storefront` | `storefront` | 3:2 |
| Menu thumbnails ×13 | `menu[].items[].photo` | — | 1:1 |
| Gallery ×8 | `gallery[]` | `g1`–`g8` | mixed |

Slot ids map 1:1 to the prompts in [`PHOTOGRAPHY-BRIEF.md`](../../../PHOTOGRAPHY-BRIEF.md).

After a build, the console tells you how many slots are filled and names any
file here that no slot references — that is nearly always a filename typo.

## File guidance

- **Format** — JPEG at quality 80, or WebP. Both are fine; the markup is format-agnostic.
- **Size** — hero 2400px wide; gallery 1600px; menu thumbnails 600px.
  Anything larger is wasted bytes.
- **Crop** — shoot loose. The `<img>` uses `object-fit: cover`, so the frame will
  crop to the ratio above. Keep the subject off-centre-safe.
- **Never** stretch or letterbox a photo to fit. Re-crop the source instead.
- **Name files without spaces** — `storefront.png`, not `Hasty Google Maps.png`.
  Spaces have to be percent-encoded in a URL and are an easy thing to get wrong.
- **Don't undersize.** A photo smaller than its rendered size gets upscaled and
  looks soft. The table above lists the ratio; the sizes are in the next bullet.

## Tones

`tone` only colours the placeholder plate. Once a real photo is in, `tone` is
inert — leave it as-is so the slot degrades gracefully if the file is ever
removed.
