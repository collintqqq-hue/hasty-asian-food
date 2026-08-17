# Sign options

Two signs are going up: one **roadside**, on the road outside the building, and
one on the **window**. These are the candidates — pick one of each.

| File | For | What it says | Ready? |
| --- | --- | --- | --- |
| `ROAD-A-vietnamese.jpg` | Roadside | One hero sub. "VIETNAMESE SUBS" | **Yes** |
| `ROAD-B-everything.jpg` | Roadside | Both menus. "ASIAN FOOD & MORE" | Photo shows pizza |
| `WINDOW-A-asian.jpg` | Window | Asian menu, dish list, hours | **Yes** |
| `WINDOW-B-comfort.jpg` | Window | Burgers/hot dogs/poutine, hours | Photo shows pizza |
| `POSTER-two-kitchens.jpg` | Handbill / board | Full info, both menus | Photo shows pizza |
| `05-business-card-with-bleed.jpg` | Print shop | Card with bleed | **Yes** |
| `05-business-card-trim.jpg` | Preview only | Card as cut | **Yes** |

All signs 1792 × 2400 px, 3:4 portrait, tagged 300 dpi.

## Pizza is out; vermicelli is in

Every line of **copy** has been updated — no piece mentions pizza any more.
Vermicelli is a Vietnamese dish (menu item 8), so on the pieces that separate
the two menus it joins the Vietnamese line rather than standing among the
burgers and poutine. On the road signs, which have only one "and also" line, it
leads that line.

**Three pieces still show pizza in the photograph.** The type is drawn here in
Python, but the food photography is generated, and `p3-mixed.png` and
`p2-comfort.png` each contain pizza that cannot be typeset away:

- `p3-mixed.png` — a pizza pan top right and a large slice centre right
  (used by `ROAD-B` and `POSTER-two-kitchens`)
- `p2-comfort.png` — two slices centre right (used by `WINDOW-B`)

Regenerating those two frames needs Higgsfield credits. Nothing else is
blocked: `p4-roadsign.png`, `p1-asian.png` and `card-bg.png` never had pizza in
them, so `ROAD-A`, `WINDOW-A` and the business card are finished and printable
as they stand — one complete roadside option and one complete window option.

Compositing a real photo of a vermicelli bowl over the pizza was tried and
rejected: in both owner photos the bowl runs off the edge of the frame, so
there is no whole bowl to cut out, and a half bowl dropped into a flat-lay
reads as a mistake at print size.

### The regeneration, ready to run

Edit `p3-mixed.png` rather than generating a new frame, so only the pizza
changes and the rest of the composition survives. Model `nano_banana_pro`,
3:4, 2K, with `p3-mixed.png` as the input image:

> Using the supplied photograph, remove the two pepperoni pizza items — the
> pizza pan at the top right edge and the large pizza slice at centre right —
> and replace them with Vietnamese vermicelli bowls: rice vermicelli topped
> with sliced grilled pork, a crisp fried spring roll, shredded lettuce, bean
> sprouts, julienned pickled carrot and daikon, cucumber, fresh herbs and
> crushed peanuts, in wide shallow bowls. Match the existing overhead flat-lay
> perspective, the warm directional lighting and the soft shadows, and the dark
> walnut table. Keep every other element exactly as it is: the banh mi at top
> left, the plate of fresh shrimp rolls with peanut dipping sauce, the
> cheeseburger, the poutine, and the pho bowl at bottom left. Keep the lower
> third of the frame empty dark table — no food, no text.

Save the result over `raw/p3-mixed.png` and re-run the script. The empty lower
band matters: the type is bottom-anchored into it, and a frame with food low in
the composition will put the phone number on top of a burger.

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
