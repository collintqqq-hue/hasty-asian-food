# Sign options

Two signs are going up: one **roadside**, on the road outside the building, and
one on the **window**. These are the candidates — pick one of each.

| File | For | What it says | Ready? |
| --- | --- | --- | --- |
| `POSTER-two-kitchens.jpg` | Handbill / board | Full info, both menus | **Yes** |
| `ROAD-A-vietnamese.jpg` | Roadside | One hero sub. "VIETNAMESE SUBS" | **Yes** |
| `ROAD-B-everything.jpg` | Roadside | Both menus. "ASIAN FOOD & MORE" | **Yes** |
| `WINDOW-A-asian.jpg` | Window | Asian menu, dish list, hours | **Yes** |
| `WINDOW-B-comfort.jpg` | Window | Burgers/hot dogs/poutine, hours | Photo shows pizza |
| `05-business-card-with-bleed.jpg` | Print shop | Card with bleed | **Yes** |
| `05-business-card-trim.jpg` | Preview only | Card as cut | **Yes** |

All signs 1792 × 2400 px, 3:4 portrait, tagged 300 dpi.

## Pizza is out; vermicelli is in

Every line of **copy** has been updated — no piece mentions pizza any more.
Vermicelli is a Vietnamese dish (menu item 8), so on the pieces that separate
the two menus it joins the Vietnamese line rather than standing among the
burgers and poutine. On the road signs, which have only one "and also" line, it
leads that line.

`p3-mixed.png` has been **regenerated without pizza** — the pizza pan and the
slice are now two vermicelli bowls, and everything else in the frame is
unchanged. That fixes both pieces that used it, `POSTER-two-kitchens` and
`ROAD-B`. The original pizza version is in git history at commit `0e7ffcb` if
it is ever needed back.

**One piece still shows pizza: `WINDOW-B-comfort.jpg`.** Its background
`p2-comfort.png` has two slices centre right. Its *copy* no longer mentions
pizza, so the sign contradicts itself and should not be printed as-is. It was
left alone deliberately — only the poster was asked for. Fixing it is the same
one-step edit described below, pointed at `p2-comfort.png`.

### How the frame was fixed, and how to fix the next one

Edit the existing frame rather than generating a new one, so only the pizza
changes and the rest of the composition survives. Model `nano_banana_pro`
(`nano_banana_2`), 3:4, 2K, with the frame itself as the input image. Two
things have to be spelled out or the model gets them wrong:

1. **Name every dish that must stay, individually.** The first attempt said
   "keep every other element" and the model silently deleted the cheeseburger —
   on a poster that advertises burgers. Listing the cheeseburger explicitly,
   with its description and position, fixed it on the retry.
2. **Say the lower third stays empty dark table.** The type is bottom-anchored
   into that band; a frame with food low in the composition puts the phone
   number on top of a burger.

Also add "no text or lettering anywhere in the image" — image models like to
invent signage, and this frame sits under real typesetting.

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

**No prices.** None were supplied for the burgers, hot dogs or poutine, so any
number would have been invented — and a sign outlives a price list.

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
