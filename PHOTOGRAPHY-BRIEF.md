# Photography brief — Higgsfield prompt pack

Every image slot on the site, with a ready-to-paste prompt. Slot ids match
`src/data/restaurant.js`; filenames match what the build expects in
`src/assets/photos/`.

> **Status:** three images have been generated or upscaled and are live
> (`spread.jpg`, now retired to `unused/`, plus the `team` and `storefront`
> upscales). **Four dishes are queued and blocked on credits** — items 2, 3, 5
> and 11, at 2 credits each on `nano_banana_pro` 2K, so **8 credits** to clear
> all four, or 16 to allow one re-roll each. Balance is currently 0.
>
> Item **1B** is not a generation job: it wants one of the owner's real
> Vietnamese sub photographs, which needs re-uploading.
>
> Nothing below is speculative about the food — it is all transcribed from the
> flyer.

---

## 0. Before you generate: attach the references

The strongest lever on food accuracy is reference images, not prompt wording.

1. **Crop the flyer.** The grand-opening flyer carries a numbered photo for
   items 1, 1A, 4, 6, 7, 8, 9, 10 and 11. Crop each hexagon to its own file
   (`ref-1a.jpg`, `ref-04.jpg`, …). These are the visual source of truth.
2. **Attach the crop** to that dish's generation as an image reference. In the
   Higgsfield MCP that is `medias: [{ value: <media_id>, role: <reference role> }]`
   after `media_upload_widget`; in the web UI it is the reference slot.
3. **`storefront` should be a real photo, not a generated one.** The image in
   place is only 165x220 and is being upscaled. A phone photo taken outside the
   store beats anything generated here, because it has to match the actual
   building someone is looking for.

Items **1B, 2, 3, 5** have no photo on the flyer. Use the closest sibling as the
reference (1A for 1B; 1 for 3; 4 for 5; 4 for 2) so the styling stays in family.

---

## 1. House style — append to every prompt

Paste this block verbatim at the end of each prompt. It is what makes the set
look like one shoot rather than eleven stock photos.

```
HOUSE STYLE: Shot as a single professional restaurant photography session.
Natural window light from camera left, soft and directional, warm 5200K, with a
subtle unfilled shadow side — no flash, no ring light, no HDR. Surfaces are warm
dark walnut wood and matte off-white ceramic. Warm neutral colour grade, gentle
film contrast, slightly lifted blacks, no colour cast, no oversaturation.
Full-frame camera look, 85mm or 50mm prime, f/2.8, crisp focus on the food with a
naturally soft background. Real steam and real condensation only. Clean, honest,
appetising, editorial — restaurant advertising quality, not stylised, not
illustrated, not CGI. Photorealistic.

DO NOT: add garnishes, sauces, herbs, sesame, chilli, lime or plating elements
that are not named in the dish description. Do not change the protein. Do not add
restaurant signage, logos, text, watermarks or menus. Do not add hands unless the
prompt asks. No unrealistic portion sizes. No perfect symmetry. No blue or teal
grade. No dark moody underexposure that hides the food.
```

---

## 2. Priority order

If credits are limited, generate in this order — the first six carry most of
the page.

| # | Slot | Why first |
|---|---|---|
| 1 | `hero` | Full-bleed, first thing anyone sees |
| 2 | `1A` Vietnamese Sub | The signature dish, used in the hero and gallery |
| 3 | `8` Vermicelli | Most visually complex bowl on the menu |
| 4 | `4` Fresh Rolls | Wide gallery tile, the signature fresh dish |
| 5 | `about` | The four-dish spread — carries the whole kitchen in one frame |
| 6 | `storefront` | Replaces the 165x220 photo currently in place |
| 7–14 | Remaining gallery dishes | Fills the portfolio grid |
| 15+ | Menu thumbnails | Smallest on screen, lowest payoff |

Menu thumbnails render at 96px. The gallery image for the same dish can be reused — no separate generation needed. Set the same filename on both slots.

---

## 3. Scene photography

### `hero` → `hero.jpg` · 16:9

Used full-bleed behind the hero headline, darkened by a gradient scrim. **Keep
the right two-thirds visually quiet** — the headline sits over the left.

```
Subject: An overhead-angled restaurant counter scene for a Vietnamese take-out
kitchen. A Vietnamese sub on a crisp baguette, cut on the diagonal to show
grilled BBQ pork, pickled carrot and daikon, cucumber spears and fresh
coriander, sits right of centre on warm dark walnut. Beside it, two fresh rice
paper rolls with visible pink shrimp, and a small dish of dipping sauce.
Camera angle: 35 degrees above the table, looking down the length of the counter.
Lens: 50mm prime, f/2.8.
Lighting: soft directional window light from camera left, warm, one clean
shadow direction, gentle falloff into the right of the frame.
Composition: food weighted to the left and centre, the right third falling into
soft shadow and empty wood so headline type can sit over it. Generous negative
space. Horizontal.
Background: dark walnut counter dissolving into a warm unlit interior, no
signage, no people.
Food styling: honest and un-fussed, as served in a take-out shop. Baguette crust
visibly crisp and flaking. Herbs fresh, not arranged.
Depth of field: shallow, sharp on the sub, background softly out of focus.
Mood: warm, cinematic, appetising, quietly premium.
Aspect ratio: 16:9.
```

*Variation B (for choice):* same prompt, but `Camera angle: near-flat 15 degrees,
eye-level with the counter edge` — a lower, more cinematic hero.

### `about` → `about.jpg` · 3:4 — **the four-dish spread**

The main image in the About section. **Generate at 3:4 and keep the spread
centred with margin on all sides** — mobile re-crops this same file to 4:3, so
anything pushed to the top or bottom edge gets cut.

Four dishes from the actual menu, plated together. This is the one shot on the
site that has to sell the whole kitchen in a single frame.

```
Subject: An overhead flat-lay of four Vietnamese and Thai dishes plated together
on a warm dark walnut table, styled as one restaurant spread.
Dishes, all on matte off-white ceramic plates and shallow bowls:
  1. A Vietnamese sub on a crisp baguette, cut on the diagonal, the halves
     stacked to show grilled BBQ pork, pickled carrot and daikon, cucumber
     spears and fresh coriander.
  2. Two fresh rice paper rolls, cut in half and standing cut-side up, the
     translucent wrapper showing pink shrimp, vermicelli noodles and herbs,
     with a small bowl of dipping sauce.
  3. A plate of Pad Thai — rice noodles wok-tossed to a light orange-brown with
     shrimp, bean sprouts, egg and spring onion, gathered with height.
  4. A vermicelli bowl — cool rice vermicelli under sliced grilled BBQ pork,
     with lettuce, cucumber, shredded carrot and herbs in distinct sections.
Camera angle: directly overhead, 90 degrees, flat lay.
Lens: 50mm prime, f/4 for even sharpness across all four plates.
Lighting: soft directional window light from camera left, one clean shadow
direction across the whole table, warm and natural.
Composition: vertical 3:4. The four plates arranged as a loose, slightly
irregular cluster in the centre of the frame with clear walnut visible between
them and an even margin of empty table on all four sides. Not a rigid grid, not
perfectly symmetrical. Every dish fully in frame, none cropped by the edge.
Background: warm dark walnut tabletop only.
Food styling: honest take-out portions, generous and real, not miniature
tasting plates. A pair of chopsticks and a folded linen napkin may rest to one
side. No extra props, no drinks, no flowers, no menus, no signage.
Depth of field: deep enough that all four dishes are sharp.
Mood: abundant, warm, appetising, editorial — a table you want to sit down at.
Aspect ratio: 3:4.
```

*Variation B:* same four dishes, but `Camera angle: 45 degrees, three-quarter
view across the table` — a more cinematic, less catalogue-like read. Worth
generating both and comparing; the flat lay usually wins for showing four
dishes clearly, the 45-degree usually wins for atmosphere.

*Variation C:* swap dish 4 for `a generous bowl of fried chicken wings glazed in
glossy sweet and sour sauce` if the spread needs more colour contrast.

### `team` → `team.png` · 1:1 — **supplied, in place**

The small inset over the About image. The owner supplied a photograph of the
team (1179x1460), cropped square and biased upward so the faces sit in frame.
Nothing to generate.

### `storefront` → `storefront.jpg` · 3:2

Location section. **Use a real photo if at all possible** — a generated
storefront will not match the actual building, and this is the one image where a
mismatch actively misleads a customer trying to find the door.

```
Subject: The interior of a small neighbourhood convenience store, looking toward
a hot-food counter at the back, shot in the early evening. Warm light spilling
from the food counter. No readable signage, no logos, no brand names, no text of
any kind. No people.
Camera angle: eye level, one-point perspective down the aisle.
Lens: 28mm, f/4.
Lighting: mixed warm interior light, natural and unstyled.
Composition: horizontal, counter at the far end on the centre-right.
Depth of field: deep enough to keep the counter legible.
Mood: familiar, warm, inviting — a good thing hiding in an ordinary place.
Aspect ratio: 3:2.
```

---

## 4. Dish photography

All dish prompts share a frame recipe. **Gallery** ratios are listed per dish; generate at that ratio and reuse the file for the 1:1 menu thumbnail
(the `<img>` crops to centre with `object-fit: cover`, so keep the dish centred).

### `1A` Vietnamese Sub — BBQ pork / BBQ beef / BBQ chicken · $9.95
Slots: gallery `g1` (2:3 tall), menu thumbnail.
Reference: flyer hexagon **1A**.

```
Subject: A Vietnamese sub (banh mi) on a crisp baguette, cut on the diagonal and
the two halves stacked so the filling faces camera.
Dish: grilled BBQ pork, pickled shredded carrot and daikon, cucumber spears,
fresh coriander, in a light crackly baguette.
Camera angle: 30 degrees above, three-quarter.
Lens: 85mm prime, f/2.8.
Composition: single sub, centred, on warm dark walnut. Room around the subject.
Background: dark walnut, softly falling off.
Food styling: filling generous and visible at the cut, crust flaking, herbs
fresh and loose. As handed over a take-out counter.
Depth of field: shallow, sharp along the cut face.
Aspect ratio: 2:3 for the tall gallery tile.
```

*Variations:* run the same prompt three times swapping `grilled BBQ pork` for
`grilled BBQ beef` and `grilled BBQ chicken` — the menu offers all three.

### `1B` Special Vietnamese Sub · $8.95
Slots: gallery tile **1B**, menu thumbnail. **Not a generation job.**

The owner supplied three photographs of Vietnamese subs. Two are in use —
`sub-bbq-pork.jpg` on the menu and `sub-closeup.jpg` in the gallery — and the
third is to be used here. **That third file needs re-uploading**; it was deleted
during a cleanup pass.

Do **not** generate this one. The flyer never says what makes the Special
different from 1A, so any generated filling would be invented, and a photograph
that invents a filling is the one failure mode that actually misleads a
customer. A real photograph of the kitchen's own sub is honest even without
knowing the exact variant; a generated one is not.

### `1` Deep Fried Chicken and Vegetables Spring Rolls (3 pcs) · $7.95
Slots: gallery `g4` (1:1), menu thumbnail. Reference: flyer hexagon **1**.

```
Subject: Three deep-fried spring rolls, golden and blistered, stacked on a small
matte off-white plate, one broken open to show the chicken and vegetable filling.
Camera angle: 30 degrees above.
Lens: 85mm, f/2.8.
Composition: centred, tight, three rolls only.
Background: warm dark walnut.
Food styling: crisp, freshly fried, natural colour — golden not orange. No dip
unless it is in frame as a plain small bowl.
Depth of field: shallow.
Aspect ratio: 1:1.
```

### `2` Deep Fried Special Shrimp Rolls (2 pcs) · $8.95

Slots: gallery tile **2**, menu thumbnail. **`nano_banana_pro`, 1:1, 2K.**
Sits beside `spring-rolls.jpg` — match that photo's look.

> **Match the photos already on the site, not the dark house style above.** These
> four sit directly beside the owner's real photographs in the gallery. Those are
> bright and clean: white or pale ceramic, light neutral backgrounds, soft even
> daylight, a small bowl of dipping sauce, fresh green garnish. A moody
> dark-walnut treatment would read as obviously imported from somewhere else.

```
Bright, clean food photograph of two deep-fried Vietnamese shrimp rolls, golden
and blistered and crisp, resting on a plain white ceramic plate with a few
leaves of green lettuce. One roll is cut on the diagonal so the shrimp filling
is clearly visible at the cut. A small white bowl of clear red sweet chilli
dipping sauce sits beside them on the plate.

Camera: slightly above, about 30 degrees, three-quarter view. 85mm prime, f/2.8,
sharp on the cut face, background softly out of focus.
Lighting: soft, even, natural daylight. No harsh shadow, no flash, no dark moody
grade. Clean and appetising.
Background: pale neutral grey-white surface, plain and uncluttered.
Composition: square. Two rolls only, centred, comfortable margin all round.
Styling: freshly fried, natural golden colour — golden, never orange or greasy.

Do not add garnish, herbs, sesame, chilli slices, lime or sauces beyond the one
sweet chilli bowl described. Do not change the filling from shrimp. No text,
signage, logos or watermarks. No hands, no people. Photorealistic, not
illustrated, not CGI.
Aspect ratio: 1:1.
```
### `3` Deep Fried JUMBO Veggies Spring Rolls (3 pcs) · $9.99

Slots: gallery tile **3**, menu thumbnail. **`nano_banana_pro`, 1:1, 2K.**
The word JUMBO is the point — these must read as visibly bigger than item 1's.

```
Bright, clean food photograph of three large deep-fried vegetable spring rolls,
noticeably thicker and longer than a standard spring roll, golden and crisp,
stacked on a plain white ceramic plate with a few leaves of green lettuce. One
roll is cut open to show the shredded vegetable filling — cabbage, carrot and
glass noodles, no meat. A small white bowl of clear red sweet chilli dipping
sauce beside them.

Camera: slightly above, about 30 degrees, three-quarter view. 85mm prime, f/2.8.
Lighting: soft, even, natural daylight. Clean and appetising, no dark grade.
Background: pale neutral grey-white surface, plain and uncluttered.
Composition: square, three rolls centred, generous scale in frame so their size
reads clearly.
Styling: freshly fried, natural golden colour, crisp blistered wrapper.

Do not add meat, shrimp or egg — these are vegetable only. Do not add garnish,
herbs, sesame, chilli slices or lime beyond what is described. No text, signage,
logos or watermarks. No hands, no people. Photorealistic, not illustrated.
Aspect ratio: 1:1.
```
### `4` Fresh Roll with Shrimp and Vegetables (2 pcs) · $7.99
Slots: gallery `g2` (3:2 wide), menu thumbnail. Reference: flyer hexagon **4**.

```
Subject: Two fresh rice paper rolls, cut in half and standing cut-side up, the
translucent wrapper showing pink shrimp, vermicelli noodles, lettuce and herbs.
A small bowl of dipping sauce beside them.
Camera angle: 25 degrees above, three-quarter.
Lens: 85mm, f/2.8.
Composition: horizontal, rolls left of centre, sauce bowl right, walnut between.
Background: warm dark walnut.
Food styling: wrapper glossy and taut, filling clearly legible through it.
Depth of field: shallow, sharp on the cut faces.
Aspect ratio: 3:2.
```

### `5` Fresh Veggies Roll (2 pcs) · $7.99

Slots: gallery tile **5**, menu thumbnail. **`nano_banana_pro`, 1:1, 2K.**
Sits beside `fresh-rolls.jpg` (item 4). Same styling — the only difference is
that item 5 has **no shrimp**. That distinction is the whole point of the shot.

```
Bright, clean overhead food photograph of two fresh Vietnamese rice paper rolls,
vegetable only, cut in half and standing cut-side up on a white speckled ceramic
plate. The translucent rice paper wrapper clearly shows the filling: white
vermicelli noodles, green lettuce, shredded orange carrot, cucumber and fresh
mint — and no shrimp, no pork, no meat of any kind. A small bowl of peanut
dipping sauce sits beside them, with a few loose mint leaves on the plate.

Camera: directly overhead, 90 degrees, flat lay. 85mm prime, f/4.
Lighting: soft, even, natural daylight from one side. Clean and fresh.
Background: pale cream surface, plain and uncluttered.
Composition: square, rolls and sauce bowl centred with even margin.
Styling: wrapper glossy and taut, filling crisp and clearly legible through it.

Do not add shrimp, prawn, pork or any meat — this dish is vegetable only, and
adding protein makes the photograph lie about the dish. Do not add chilli, lime
or sesame. No text, signage, logos or watermarks. No hands, no people.
Photorealistic, not illustrated.
Aspect ratio: 1:1.
```
### `6` Chicken Wings with Sweet and Sour Sauce (10 pcs) · $16.95
Slots: gallery `g6` (1:1), menu thumbnail. Reference: flyer hexagon **6**.

```
Subject: A generous pile of fried chicken wings glazed in a glossy sweet and
sour sauce, in a shallow matte off-white bowl.
Camera angle: 35 degrees above.
Lens: 85mm, f/2.8.
Composition: bowl centred and filling most of the frame — this is a ten-piece
portion and should read as plentiful.
Background: warm dark walnut.
Food styling: glaze catching the light, wings piled naturally not arranged.
Depth of field: shallow, sharp across the front wings.
Aspect ratio: 1:1.
```

### `7` Pad Thai — Shrimps or Chicken · $16.95 · (with Vegetables $15.95)
Slots: gallery `g3` (1:1), menu thumbnail. Reference: flyer hexagon **7**.

```
Subject: A plate of Pad Thai — rice noodles wok-tossed to a light orange-brown,
with shrimp, bean sprouts, egg and spring onion.
Camera angle: 35 degrees above.
Lens: 85mm, f/2.8.
Composition: noodles gathered with height in the centre of a matte off-white
plate, a natural twirl rather than a flat spread.
Background: warm dark walnut.
Food styling: noodles glossy and separate, shrimp visible on top. Only the
ingredients named here.
Depth of field: shallow.
Aspect ratio: 1:1.
```

*Variation:* swap `shrimp` for `sliced chicken`, and a third with no protein for
the vegetable version.

### `8` Vermicelli with BBQ Chicken, BBQ Beef, Pork with Vegetables · $16.95
Slot: menu thumbnail. Reference: flyer hexagon **8**.

```
Subject: A vermicelli bowl — cool rice vermicelli noodles under sliced grilled
BBQ pork and BBQ chicken, with fresh lettuce, cucumber, shredded carrot and
herbs arranged in distinct sections, in a wide shallow bowl.
Camera angle: 40 degrees above, three-quarter.
Lens: 85mm, f/2.8.
Composition: bowl centred and generously filled, the separate components clearly
readable — this dish's appeal is that you can see everything in it.
Background: warm dark walnut.
Food styling: grill marks on the meat, vegetables crisp and fresh, noodles pale
beneath. Sections distinct, not mixed.
Depth of field: shallow, sharp across the meat.
Aspect ratio: 4:3.
```

### `9` Rice & Egg Noodles Soup with BBQ Chicken, Beef, Pork or Shrimp · $16.95
Slots: gallery `g5` (2:3 tall), menu thumbnail. Reference: flyer hexagon **9**.

```
Subject: A large bowl of noodle soup in clear golden broth, with rice noodles,
sliced BBQ pork, shrimp and green vegetables, real steam rising.
Camera angle: 30 degrees above, three-quarter.
Lens: 85mm, f/2.8.
Composition: vertical, bowl filling the lower two-thirds, steam and warm empty
space above.
Background: warm dark walnut.
Food styling: broth clear not cloudy, toppings arranged over the noodles, steam
genuine and soft — not a smoke effect.
Depth of field: shallow, sharp on the toppings.
Aspect ratio: 2:3.
```

### `10` Fried Rice with Shrimp or Chicken · $15.95
Slots: gallery `g7` (1:1), menu thumbnail. Reference: flyer hexagon **10**.

```
Subject: A plate of fried rice with shrimp, peas, carrot and egg, grains
separate and glossy.
Camera angle: 40 degrees above.
Lens: 85mm, f/2.8.
Composition: rice mounded with height on a matte off-white plate, centred.
Background: warm dark walnut.
Food styling: individual grains visible, shrimp on top, no extra garnish.
Depth of field: shallow. Aspect ratio: 1:1.
```

### `11` Egg Noodles with Wonton Soup · $15.95

Slots: gallery tile **11** (tall), menu thumbnail. **`nano_banana_pro`, 3:4, 2K.**
This one is portrait — it fills a tall gallery tile. Keep the bowl centred so the
square menu-thumbnail crop still works.

```
Bright, appetising food photograph of a bowl of Chinese egg noodle wonton soup.
Clear golden broth, yellow egg noodles clearly visible, five or six plump pork
wontons with soft folded wrappers, and green bok choy leaves. Real steam rising
gently. Served in a white ceramic bowl with a soup spoon resting on the rim.

Camera: three-quarter view from about 30 degrees above, looking into the bowl so
the noodles and wontons are both readable. 85mm prime, f/2.8, sharp on the
wontons.
Lighting: soft warm natural daylight from one side, gentle highlight on the
broth surface. Clean, not moody.
Background: warm pale neutral surface, softly out of focus.
Composition: vertical 3:4, bowl centred and filling most of the frame with the
steam and a little empty space above.
Styling: broth clear rather than cloudy, wontons intact and plump, noodles
distinctly yellow so they read as egg noodles.

Do not add shrimp, quail eggs, beef or pork slices — that is item 9, a different
dish. Do not add chilli oil, spring onion curls, sesame or lime. No text,
signage, logos or watermarks. No hands, no people. Photorealistic, not
illustrated.
Aspect ratio: 3:4.
```
---

## 5. Checking a result before you use it

Reject and regenerate if any of these are true:

- An ingredient appears that is not named on the menu (a common failure: chilli,
  lime wedges, sesame seeds, spring onion curls added "for looks").
- The protein is wrong or ambiguous.
- The portion looks like a restaurant tasting plate rather than a take-out
  portion.
- There is any text, signage or logo in frame.
- Hands, faces or people appear where the prompt didn't ask for them.
- The colour grade drifts cool or the lighting direction flips — it will break
  the set.

The test to apply: **would a customer who ordered this dish recognise it when
the container is opened?** If not, it fails, however attractive it looks.

---

## 6. Wiring an approved image in

Save to `src/assets/photos/`, then set the filename in
`src/data/restaurant.js` and run `npm run build`. Full instructions in
[`src/assets/photos/README.md`](src/assets/photos/README.md).
