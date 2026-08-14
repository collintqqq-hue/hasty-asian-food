/**
 * SINGLE SOURCE OF TRUTH
 * ----------------------
 * Every fact below is transcribed from the two materials supplied by the owner:
 *   (A) the printed "HASTY MARKET / Asian Food Take Out" grand-opening flyer
 *   (B) the Google Business listing for Hasty Market, 2361 Carling Ave
 *
 * Nothing here is invented. Where the two sources disagree, the discrepancy is
 * recorded in a comment so it can be resolved with the owner.
 */

export const brand = {
  /**
   * The flyer does not give the kitchen a name distinct from the store — it
   * reads "HASTY MARKET" above "Asian Food Take Out". We lead with the food
   * line so the kitchen reads as its own destination, and keep Hasty Market as
   * the locator. If the owner has a real trading name, change `name` only.
   */
  name: 'Asian Food Take Out',
  host: 'Hasty Market',
  lockup: 'Asian Food Take Out — at Hasty Market',
  tagline: 'Vietnamese subs, hand-rolled starters and wok noodles, made to order on Carling.',
  /** Descriptor used in metadata + the footer. Both phrases appear on the flyer. */
  descriptor: 'Vietnamese & Southeast Asian kitchen inside Hasty Market. Eat in or take out.',
};

/** Owner-supplied logo. Cropped square to the gold ring; displayed as a circle. */
export const logo = {
  mark: 'logo.png',
  alt: 'Asian Food Take Out at Hasty Market',
};

export const contact = {
  /** Printed on the flyer AND shown on the Google listing. */
  phone: '(343) 998-8051',
  phoneHref: 'tel:+13439988051',
  /**
   * NOTE: hastymarketcorp.com lists 613-721-3898 for "Hasty Market #44".
   * That is the corporate store line, not the kitchen. Not published here to
   * avoid sending food orders to the wrong number — confirm with the owner.
   */
};

export const location = {
  line1: '2361 Carling Avenue',
  line2: 'Ottawa, ON K2B 7G7',
  /**
   * The flyer prints "L2B 7G7". L2B is a Niagara-region prefix; every Ottawa
   * postal code begins with K, and the Google listing shows K2B 7G7.
   * Using K2B 7G7. Flag to owner — the flyer has a typo.
   */
  inside: 'Inside Hasty Market',
  full: '2361 Carling Avenue, Ottawa, ON K2B 7G7',
  directionsHref:
    'https://www.google.com/maps/dir/?api=1&destination=2361%20Carling%20Avenue%2C%20Ottawa%2C%20ON%20K2B%207G7',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=Hasty%20Market%202361%20Carling%20Avenue%20Ottawa',
};

export const hours = {
  /** Flyer: "Business hours: 11am to 9pm". No days are specified on the flyer. */
  kitchen: { label: 'Kitchen', value: '11:00 AM – 9:00 PM' },
};

/**
 * Confirmed by the owner: there is a dining area on site. The flyer is headed
 * "Asian Food Take Out", so the site keeps that name, but nothing on the site
 * may describe the food as take-out only.
 */
export const dining = { seating: true };

/**
 * The printed in-store flyer, offered as a PDF download.
 * `file` lives in src/assets/menu/ and is the real flyer, cropped out of the
 * owner's photo by tools/flyer-to-pdf.mjs. To refresh it from a new photo:
 *   npm run menu:flyer -- "C:/path/to/new-flyer.png"
 * The build fails loudly rather than shipping a dead link if it is missing.
 */
export const menuPdf = {
  file: 'in-store-menu.pdf',
  label: 'The printed menu',
  blurb: 'The grand-opening flyer exactly as it appears in store — every item, option and price on one page. Open it, print it, or save it to your phone.',
  cta: 'Open the printed menu (PDF)',
};

/** Flyer: "GRAND OPENING SPECIAL OFFER 10% Off — Starts Aug 12th, and lasts until Oct 12th" */
export const offer = {
  active: true,
  headline: '10% off',
  kicker: 'Grand Opening',
  window: 'Aug 12 – Oct 12',
  /** The flyer prints no year. Rendered exactly as written. */
};

/**
 * MENU — names, options and prices transcribed verbatim from the flyer.
 * The flyer numbers every item (1A, 1B, 1–11) and prints one heading,
 * "SPECIAL VIETNAMESE SUB". The remaining items are ungrouped on paper; they
 * are grouped here purely for navigation. No name, option or price is altered.
 *
 * `photo` is a filename in src/assets/photos/. null renders the designed
 * numeral plate instead. See src/assets/photos/README.md.
 */
export const menu = [
  {
    id: 'subs',
    name: 'Signature Subs',
    /** Heading printed on the flyer. */
    flyerHeading: 'Special Vietnamese Sub',
    blurb: 'Built to order on a crisp baguette.',
    items: [
      {
        ref: '1A',
        name: 'Vietnamese Sub',
        options: 'with BBQ Pork, BBQ Beef or BBQ Chicken',
        price: '9.95',
        photo: 'sub-bbq-pork.jpg',
        tone: 'ember',
      },
      {
        ref: '1B',
        name: 'Special Vietnamese Sub',
        options: null,
        price: '8.95',
        /**
         * The owner's own photo of subs being built at the counter: cold cuts,
         * pâté and shredded pork floss. That filling is what a Vietnamese
         * "special" sub is, so this is very likely 1B — but the flyer still
         * never says, so confirm before treating it as settled.
         */
        photo: 'sub-special.jpg',
        tone: 'wheat',
      },
    ],
  },
  {
    id: 'rolls',
    name: 'Rolls & Starters',
    blurb: 'Fried crisp or rolled fresh, made by hand.',
    items: [
      {
        ref: '1',
        name: 'Deep Fried Chicken and Vegetables Spring Rolls',
        options: '3 pcs',
        price: '7.95',
        photo: 'spring-rolls.jpg',
        tone: 'gold',
      },
      {
        ref: '2',
        name: 'Deep Fried Special Shrimp Rolls',
        options: '2 pcs',
        price: '8.95',
        photo: 'shrimp-rolls.jpg',
        tone: 'amber',
      },
      {
        ref: '3',
        name: 'Deep Fried JUMBO Veggies Spring Rolls',
        options: '3 pcs',
        price: '9.99',
        photo: 'jumbo-veggie-rolls.jpg',
        tone: 'gold',
      },
      {
        ref: '4',
        name: 'Fresh Roll with Shrimp and Vegetables',
        options: '2 pcs',
        price: '7.99',
        photo: 'fresh-rolls.jpg',
        tone: 'jade',
      },
      {
        ref: '5',
        name: 'Fresh Veggies Roll',
        options: '2 pcs',
        price: '7.99',
        photo: 'veggie-rolls.jpg',
        tone: 'jade',
      },
      {
        ref: '6',
        name: 'Chicken Wings with Sweet and Sour Sauce',
        options: '10 pcs',
        price: '16.95',
        photo: 'chicken-wings.jpg',
        tone: 'lacquer',
      },
    ],
  },
  {
    id: 'noodles',
    name: 'Noodles & Rice',
    blurb: 'Wok-fired and simmered to order.',
    items: [
      {
        ref: '7',
        name: 'Pad Thai',
        options: 'Shrimps or Chicken',
        price: '16.95',
        photo: 'pad-thai.jpg',
        tone: 'amber',
        variants: [{ name: 'Pad Thai with Vegetables', price: '15.95' }],
      },
      {
        ref: '8',
        name: 'Vermicelli with BBQ Chicken, BBQ Beef, Pork with Vegetables',
        options: 'two choices',
        price: '16.95',
        /** The owner's own bowl. Shows exactly what arrives, which matters
         *  more on a menu row than a tidier stock photograph does. */
        photo: 'vermicelli-real.jpg',
        tone: 'jade',
        note: 'Add more items — $4.50 for each',
      },
      {
        ref: '9',
        name: 'Rice & Egg Noodles Soup with BBQ Chicken, BBQ Beef, BBQ Pork or Shrimp',
        options: 'two choices',
        price: '16.95',
        /** Owner's own bowl, replacing a stock photo upscaled from 672x425. */
        photo: 'noodle-soup-real.jpg',
        tone: 'broth',
      },
      {
        ref: '10',
        name: 'Fried Rice',
        options: 'Shrimp or Chicken',
        price: '15.95',
        photo: 'fried-rice.jpg',
        tone: 'wheat',
      },
      {
        ref: '11',
        name: 'Egg Noodles with Wonton Soup',
        options: null,
        price: '15.95',
        photo: 'wonton-soup.jpg',
        tone: 'broth',
      },
    ],
  },
];

/**
 * GALLERY — one tile per menu item, in menu order, so the gallery is a complete
 * picture of what the kitchen makes rather than a selection.
 *
 * `photo` null renders the designed numeral plate; those five are the dishes no
 * photograph has been supplied for yet. Dropping a file in and naming it here
 * completes the set — no layout change needed.
 *
 * `span` sums to 18 grid cells (3 tall x2 + 2 wide x2 + 8 std), which fills
 * exactly 6 rows at 3 columns and 9 rows at 2, so the grid never ends on a hole.
 */
/**
 * The shaped tiles crop hard: `wide` is 2:1 and `tall` is roughly 1:2, while a
 * menu thumbnail is square. A phone photo of a round bowl cannot satisfy both,
 * so items 8 and 9 ship two cuts of the same frame — the square one on the menu
 * row, a slot-shaped one here. Every tile below keeps at least 65% of its
 * photograph visible; check that before moving a photo between slots.
 */
export const gallery = [
  { slot: 'g1', short: 'Vietnamese Sub', ref: '1A', alt: 'Close-up of Vietnamese subs with BBQ beef, pickled carrot and coriander', span: 'std', photo: 'sub-closeup.jpg', tone: 'ember' },
  { slot: 'g2', short: 'Special Vietnamese Sub', ref: '1B', alt: 'A stack of Vietnamese subs filled with cold cuts, pâté and shredded pork', span: 'std', photo: 'sub-special.jpg', tone: 'wheat' },
  { slot: 'g3', short: 'Chicken Spring Rolls', ref: '1', alt: 'Deep fried spring rolls with sweet chilli dipping sauce', span: 'std', photo: 'spring-rolls.jpg', tone: 'gold' },
  { slot: 'g4', short: 'Special Shrimp Rolls', ref: '2', alt: 'Deep fried shrimp rolls, one cut to show the shrimp filling, with sweet chilli dipping sauce', span: 'std', photo: 'shrimp-rolls.jpg', tone: 'amber' },
  { slot: 'g5', short: 'JUMBO Veggie Spring Rolls', ref: '3', alt: 'Jumbo deep fried vegetable spring rolls, one cut open to show the cabbage and carrot filling', span: 'std', photo: 'jumbo-veggie-rolls.jpg', tone: 'gold' },
  { slot: 'g6', short: 'Fresh Shrimp Rolls', ref: '4', alt: 'Fresh rolls with shrimp, mint and peanut dipping sauce', span: 'wide', photo: 'fresh-rolls.jpg', tone: 'jade' },
  { slot: 'g7', short: 'Fresh Veggie Rolls', ref: '5', alt: 'Fresh vegetable rice paper rolls with vermicelli, lettuce and carrot, and peanut dipping sauce', span: 'std', photo: 'veggie-rolls.jpg', tone: 'jade' },
  { slot: 'g8', short: 'Chicken Wings', ref: '6', alt: 'A plate of chicken wings', span: 'std', photo: 'chicken-wings.jpg', tone: 'lacquer' },
  { slot: 'g9', short: 'Pad Thai', ref: '7', alt: 'Pad Thai with shrimp, crushed peanuts and coriander', span: 'std', photo: 'pad-thai.jpg', tone: 'amber' },
  { slot: 'g10', short: 'Vermicelli Bowl', ref: '8', alt: 'A vermicelli bowl with grilled pork, shrimp, spring rolls, pickled vegetables and bean sprouts', span: 'tall', photo: 'vermicelli-tall.jpg', tone: 'jade' },
  { slot: 'g11', short: 'Rice & Egg Noodle Soup', ref: '9', alt: 'Noodle soup with grilled pork, bok choy, coriander and fried shallots', span: 'wide', photo: 'noodle-soup-wide.jpg', tone: 'broth' },
  { slot: 'g12', short: 'Fried Rice', ref: '10', alt: 'Fried rice with shrimp, peas, corn and spring onion', span: 'tall', photo: 'fried-rice.jpg', tone: 'wheat' },
  { slot: 'g13', short: 'Egg Noodle Wonton Soup', ref: '11', alt: 'Egg noodles and pork wontons in clear broth with bok choy', span: 'tall', photo: 'wonton-soup.jpg', tone: 'broth' },
];

/** Editorial imagery outside the menu. */
export const scenes = {
  /**
   * Generated. Composed for this slot specifically: the food sits in the right
   * third and the left half falls to black, because the hero scrim darkens the
   * bottom and left and the headline sits there. Anything centred would fight
   * the type. It is the LCP image, so it is kept to 120 kB.
   */
  hero: {
    slot: 'hero',
    photo: 'hero.jpg',
    tone: 'ember',
    alt: 'A Vietnamese sub with BBQ pork and pickled vegetables beside fresh shrimp rolls, lit by low warm light on a dark wooden table',
  },
  /**
   * Intended shot: four signature dishes plated together as one spread.
   * Prompt is in PHOTOGRAPHY-BRIEF.md under `about`. Generated at 3:4 by
   * nano_banana_pro. Keep the spread centred — mobile re-crops to 1:1.
   */
  about: {
    slot: 'about',
    photo: 'vermicelli.jpg',
    tone: 'jade',
    alt: 'A vermicelli bowl with grilled BBQ pork, spring rolls, fresh herbs and vegetables',
  },
  /** Owner-supplied photograph of the team, AI-upscaled to 4K then sized down. */
  team: { slot: 'team', photo: 'team.jpg', tone: 'wheat', alt: 'The team behind the kitchen' },
  /**
   * The 165x220 original was AI-upscaled to 4K, cropped to 3:2 on the awning,
   * then sized to 1400px. The upscaler invented detail it could not recover:
   * the LEFT window sign now reads "Harly Maress" instead of "Hasty Market".
   * It is small at render size, but it is wrong. Replace with a real photo when
   * one is available — see README, "Photography".
   */
  storefront: {
    slot: 'storefront',
    photo: 'storefront.jpg',
    tone: 'lacquer',
    alt: 'The Hasty Market storefront on Carling Avenue, seen from the parking lot',
  },
};

export const nav = [
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
];

export const site = {
  /** Absolute origin. og:image and canonical must be absolute for Facebook,
   *  Instagram, iMessage, WhatsApp and Slack to resolve the preview card. */
  url: 'https://asianfoodtakeout.ca',
  title: 'Asian Food Take Out at Hasty Market — Vietnamese Subs & Noodles, Carling Ave Ottawa',
  description:
    'Vietnamese subs, hand-rolled spring rolls, Pad Thai and noodle soups made to order inside Hasty Market at 2361 Carling Avenue, Ottawa. Eat in or take out. Kitchen open 11 AM – 9 PM. Call (343) 998-8051.',
  locale: 'en_CA',
  themeColor: '#12100E',
};
