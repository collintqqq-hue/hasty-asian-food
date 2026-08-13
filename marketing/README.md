# Print materials

Four posters and a business card, in `out/`. Hand these straight to a print shop.

| File | Use | Pixels | Prints well at |
| --- | --- | --- | --- |
| `01-poster-asian.jpg` | Window, Asian menu | 1792 × 2400 | up to 12 × 16 in |
| `02-poster-comfort.jpg` | Window, new comfort menu | 1792 × 2400 | up to 12 × 16 in |
| `03-poster-everything.jpg` | Window / A-frame, both menus | 1792 × 2400 | up to 12 × 16 in |
| `04-poster-roadsign.jpg` | Roadside — few words, big type | 1792 × 2400 | up to 12 × 16 in |
| `05-business-card-with-bleed.jpg` | **Give this to the printer** | 1126 × 676 | 3.5 × 2 in + bleed |
| `05-business-card-trim.jpg` | Preview of the cut card | 1050 × 600 | 3.5 × 2 in |

All are 3:4 portrait except the card, and all are tagged 300 dpi.

## Sizes

The posters are 1792 × 2400 px:

- **12 × 16 in at 150 dpi** — right for a window or an A-frame, viewed from a
  few feet away
- **6 × 8 in at 300 dpi** — magazine-sharp, for flyers or table cards

For anything **larger than about 16 in**, tell the print shop it is a
large-format job and ask them to upscale. At road-sign distance nobody resolves
fine detail, so it holds up far better than the numbers suggest — but do not
promise a 4-foot sign at 300 dpi from these files.

## Business card

Use **`05-business-card-with-bleed.jpg`**. It has 1/8 in of bleed on every edge,
which is what printers ask for — the artwork runs past the cut line so a slight
misalignment doesn't leave a white sliver.

`05-business-card-trim.jpg` is only there so you can see the finished card. Don't
send that one.

The card is one-sided. If you want a back, the obvious use is a short menu list
or a QR code to the website.

## What's on them, and what deliberately isn't

Every poster carries: the logo, the dish list, **asianfoodtakeout.ca**,
**(343) 998-8051**, the address, and the kitchen hours.

**No prices.** Two reasons. No prices were ever supplied for the burgers, hot
dogs, pizza or poutine, so any number would have been invented. And a poster
outlives a price list — the website can change in a minute, a printed sign
cannot. Everything drives to the site and the phone instead.

**Hours read "KITCHEN 11 AM – 9 PM", not "OPEN DAILY".** The flyer gives the
times but never says which days. Claiming daily opening on something nailed to a
post is not a claim anyone has actually made.

## How the text was produced

The photography is AI-generated, composed with a deliberately empty band. The
**text is not** — it is drawn afterwards from the real strings, and the logo is
your actual logo file.

That split is on purpose. Image models garble long strings, and
`asianfoodtakeout.ca` on a road sign has to be perfect. Every character here is
typeset, not guessed, and the layout auto-shrinks until it provably fits inside
the canvas with margins.

## Regenerating

```bash
python marketing/make-posters.py
```

Edit the strings at the top of `make-posters.py` to change the phone, website,
address or hours across all five pieces at once. Source photography is in
`marketing/raw/` — swap a file there and rerun to restyle a poster without
regenerating anything.
