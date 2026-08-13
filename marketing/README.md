# Sign options

Two signs are going up: one **roadside**, on the road outside the building, and
one on the **window**. These are four candidates — pick one of each.

| File | For | What it says |
| --- | --- | --- |
| `ROAD-A-vietnamese.jpg` | Roadside | One hero sub. "VIETNAMESE SUBS" |
| `ROAD-B-everything.jpg` | Roadside | Both menus. "ASIAN FOOD & MORE" |
| `WINDOW-A-asian.jpg` | Window | Asian menu, dish list, hours |
| `WINDOW-B-comfort.jpg` | Window | Burgers/pizza/poutine, dish list, hours |
| `05-business-card-with-bleed.jpg` | Print shop | Card with bleed |
| `05-business-card-trim.jpg` | Preview only | Card as cut |

All 1792 × 2400 px, 3:4 portrait, tagged 300 dpi.

## Why the two are laid out differently

Both signs sit **on the building**, which changes what belongs on them.

**The street address is on neither.** A driver on Carling can already see the
place, and anyone reading the window is standing on it. Dropping it buys size
for the lines that do work.

**Roadside — four elements, nothing more.**
What the food is, what else you do, `INSIDE HASTY MARKET`, the website. No
phone, no hours, no address: nobody dials a number at 50 km/h, and every extra
line shrinks the ones that matter. `INSIDE HASTY MARKET` is the real
instruction — without it a driver looks for a restaurant frontage and goes
straight past a corner store.

**Window — read standing still, so it can carry detail.**
Logo, dish list, and **the hours in white at headline weight**, because "are
they open?" is the question of someone at the glass. Website and phone below.
The locator is there but small — they have already found the door.

## Sizes

1792 × 2400 px is **12 × 16 in at 150 dpi** — right for a window or an A-frame.

For a bigger roadside board, tell the shop it is large format and let them
upscale. At drive-by distance it holds up far better than the number suggests,
but do not promise a 4-foot sign at 300 dpi from these files.

## What is deliberately not on them

**No prices.** None were supplied for the burgers, hot dogs, pizza or poutine,
so any number would have been invented — and a sign outlives a price list.

**Hours read "KITCHEN 11 AM – 9 PM", not "OPEN DAILY".** The flyer gives the
times but never says which days.

## How the text was made

The photography is AI-generated, composed with a deliberately empty band. The
**text is not** — it is typeset from the real strings, and the logo is the
actual logo file. Image models garble long strings, and `asianfoodtakeout.ca` on
a roadside sign has to be perfect.

The layout measures the whole block and shrinks until it provably fits, with
assertions so nothing can be clipped silently.

## Changing them

```bash
python marketing/make-posters.py
```

Phone, website and hours are constants at the top of the script — change once,
all pieces update. Source photography is in `marketing/raw/`.
