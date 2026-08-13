# Changing the menu

Prices, dish names, hours, the phone number and the offer banner all live in one
file. You do not need to install anything or use a terminal — you can edit it
from any browser.

**You cannot break the live website.** If an edit has a mistake in it, the
publish step stops and the site stays exactly as it is. Worst case, nothing
changes and you get an email saying the build failed. More on that at the bottom.

---

## The one file

Everything is in **`src/data/restaurant.js`**.

Open it on GitHub:

1. Go to the repository
2. Click into `src` → `data` → `restaurant.js`
3. Click the **pencil icon** (top right of the file) to edit
4. Make your change
5. Scroll down, click **Commit changes**

The website updates itself about a minute later. There is no other step.

---

## Changing a price

Find the dish and change the number between the quote marks.

```js
{
  ref: '7',
  name: 'Pad Thai',
  options: 'Shrimps or Chicken',
  price: '16.95',        ←  change this
  ...
}
```

**Write the price as digits only.** No dollar sign, and always two numbers after
the dot:

| Write this | Not this |
| --- | --- |
| `'16.95'` | `'$16.95'` |
| `'16.95'` | `'16,95'` |
| `'16.00'` | `'16'` or `'16.0'` |

The dollar sign is added automatically on the website.

---

## Changing a dish name or its options

```js
{
  ref: '10',
  name: 'Fried Rice',                  ←  the dish name
  options: 'Shrimp or Chicken',        ←  the small grey line underneath
  price: '15.95',
}
```

If a dish has no options line, it says `options: null`. To add one, replace
`null` with your text in quotes: `options: 'Large only'`.

---

## Removing a dish

Delete the whole block from its opening `{` down to and including its `},`:

```js
      {
        ref: '5',
        name: 'Fresh Veggies Roll',
        options: '2 pcs',
        price: '7.99',
        photo: 'veggie-rolls.jpg',
        tone: 'jade',
      },
```

One thing to know: the gallery further down the same file has a tile pointing at
each dish. If you remove a dish, remove its gallery tile too — the line starting
`{ slot: 'g7', ...`. If you forget, the publish step will stop and tell you
exactly which tile to fix.

---

## Adding a dish

Copy an existing block, paste it below, and change the details. Give it a `ref`
no other dish uses.

```js
      {
        ref: '12',
        name: 'Chicken Curry',
        options: 'with rice',
        price: '16.95',
        photo: null,        ←  null until you have a photo
        tone: 'amber',
      },
```

Leave `photo: null` if there is no photograph yet — the site draws a designed
plate with the dish number on it, which looks intentional rather than empty.

---

## Other things you can change

All in the same file, near the top:

| What | Looks like |
| --- | --- |
| Phone number | `phone: '(343) 998-8051'` — also change `phoneHref: 'tel:+13439988051'` |
| Kitchen hours | `kitchen: { label: 'Kitchen', value: '11:00 AM – 9:00 PM' }` |
| Address | `line1`, `line2` |
| The red offer banner | `offer: { active: true, headline: '10% off', ... }` |

**To switch the offer banner off entirely**, change `active: true` to
`active: false`. The red strip disappears from the site.

---

## Adding a photo of a dish

1. Put the image in `src/assets/photos/` (drag and drop works on GitHub — open
   that folder and choose **Add file → Upload files**)
2. In `restaurant.js`, find the dish and change `photo: null` to
   `photo: 'your-file-name.jpg'`

Name files without spaces. `chicken-curry.jpg`, not `Chicken Curry.jpg`.

---

## If something goes wrong

The publish step checks your edit before anything goes live. If it finds a
problem it stops and shows a message like:

```
The menu has 1 problem:

  • Item 7: the price reads "$16.95". Write it as digits only with two
    decimals and no dollar sign — '9.95', not '$9.95' or '9,95' or '9.9'.

Nothing was published. Fix the above in src/data/restaurant.js and save.
The website currently online is unaffected.
```

**The live site does not change until an edit passes.** So a mistake is never
visible to customers — it simply doesn't publish. Fix the line, commit again,
and it goes out.

The two things it checks for are the mistakes that are easy to make and hard to
spot: prices written in the wrong format, and two dishes sharing the same number.

---

## The rules of thumb

- Only change what is **between quote marks**
- Every line inside a block ends with a **comma**
- Don't delete the `{` `}` brackets unless you're removing a whole dish
- If in doubt, change one thing at a time and commit — that way if the publish
  step complains, you know exactly which edit caused it
