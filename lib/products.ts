import { Product, ProductCategory, ProductSubcategory } from './types';

/**
 * Helper to generate timestamps
 */
const now = new Date().toISOString();

/**
 * Helper to create a product with sensible defaults
 */
function createProduct(
  partial: Partial<Product> & {
    id: string;
    name: string;
    slug: string;
    category: ProductCategory;
    subcategory: ProductSubcategory;
    price: number;
  }
): Product {
  return {
    descriptionShort: '',
    descriptionLong: '',
    images: ['/images/products/placeholder.jpg'],
    cost: undefined,
    compareAtPrice: undefined,
    trackInventory: true,
    stock: 50,
    reorderThreshold: 10,
    isActive: true,
    isCheckoutAddon: false,
    rarity: 'common',
    vendorName: undefined,
    vendorUrl: undefined,
    regionTag: undefined,
    bundleEligible: true,
    createdAt: now,
    updatedAt: now,
    ...partial,
  };
}

/**
 * Nostalgia Dept Product Catalog
 * Complete product data following the new schema
 */
export const products: Product[] = [
  // ============================================
  // POCKET TECH & VIRTUAL PETS
  // ============================================
  createProduct({
    id: 'retro-pixel-pet-classic',
    name: 'Retro Pixel Pet – Classic Shell',
    slug: 'retro-pixel-pet-classic-shell',
    category: 'pocket-tech-virtual-pets',
    subcategory: 'virtual-pets',
    descriptionShort: 'Tamagotchi-style digital pet keychain with 90s pixel graphics.',
    descriptionLong: 'Tamagotchi-style digital pet keychain with simple 90s-style pixel graphics and three-button controls. Off-brand but tested for basic reliability.',
    images: ['/images/products/retro-pixel-pet-classic.jpg'],
    price: 14.99,
    cost: 7.0,
    stock: 50,
  }),
  createProduct({
    id: 'retro-pixel-pet-pastel',
    name: 'Retro Pixel Pet – Pastel Shells',
    slug: 'retro-pixel-pet-pastel-shells',
    category: 'pocket-tech-virtual-pets',
    subcategory: 'virtual-pets',
    descriptionShort: 'Same retro pixel pet in softer pastel shells.',
    descriptionLong: 'Same retro pixel pet in softer pastel shells; colors picked to match notebook doodle aesthetics.',
    images: ['/images/products/retro-pixel-pet-pastel.jpg'],
    price: 15.99,
    cost: 7.5,
    stock: 40,
  }),
  createProduct({
    id: 'official-tamagotchi-gen1',
    name: 'Official Tamagotchi Gen 1 – Nostalgia Dept Edition',
    slug: 'official-tamagotchi-gen1-nostalgia-edition',
    category: 'pocket-tech-virtual-pets',
    subcategory: 'virtual-pets',
    descriptionShort: 'Genuine Bandai Tamagotchi Gen 1 in assorted shells.',
    descriptionLong: 'Genuine Bandai Tamagotchi Gen 1 in assorted shells, sourced from authorized distributors and packaged with a Nostalgia Dept info card.',
    images: ['/images/products/tamagotchi-gen1.jpg'],
    price: 29.99,
    cost: 18.0,
    stock: 25,
    featured: true,
  }),
  createProduct({
    id: 'pocket-brick-game',
    name: 'Pocket Brick Game – Handheld 8-Bit',
    slug: 'pocket-brick-game-handheld-8bit',
    category: 'pocket-tech-virtual-pets',
    subcategory: 'pocket-games-keychains',
    descriptionShort: 'Simple brick-stacking handheld game inspired by 90s travel toys.',
    descriptionLong: 'Simple brick-stacking handheld game inspired by 90s travel toys; features multiple game modes and classic beep sounds.',
    images: ['/images/products/pocket-brick-game.jpg'],
    price: 19.99,
    cost: 8.0,
    stock: 60,
  }),
  createProduct({
    id: 'mini-retro-console-keychain',
    name: 'Mini Retro Console Keychain',
    slug: 'mini-retro-console-keychain',
    category: 'pocket-tech-virtual-pets',
    subcategory: 'pocket-games-keychains',
    descriptionShort: 'Tiny keychain shaped like a 90s handheld console.',
    descriptionLong: 'Tiny keychain shaped like a 90s handheld console with a simple built-in LCD game, perfect for backpacks and lanyards.',
    images: ['/images/products/mini-retro-console.jpg'],
    price: 12.99,
    cost: 5.0,
    stock: 80,
  }),

  // ============================================
  // GROW KITS & ROOM DÉCOR
  // ============================================
  createProduct({
    id: 'bob-ross-chia-head',
    name: 'Bob Ross Chia Head – Nostalgia Edition',
    slug: 'bob-ross-chia-head-nostalgia-edition',
    category: 'grow-kits-room-decor',
    subcategory: 'chia-pets-planters',
    descriptionShort: 'Official Bob Ross Chia planter with seed packet.',
    descriptionLong: 'Official Bob Ross Chia planter with seed packet; grows a leafy "afro" over a few weeks, boxed with a Nostalgia Dept sleeve.',
    images: ['/images/products/bob-ross-chia.jpg'],
    price: 29.99,
    cost: 15.0,
    stock: 30,
    featured: true,
  }),
  createProduct({
    id: 'classic-chia-pet-animal',
    name: 'Classic Chia Pet – Animal Mix',
    slug: 'classic-chia-pet-animal-mix',
    category: 'grow-kits-room-decor',
    subcategory: 'chia-pets-planters',
    descriptionShort: 'Assorted official Chia Pet animals.',
    descriptionLong: 'Assorted official Chia Pet animals (ram, puppy, cat, etc.), shipped as a surprise design with full instructions and seed pack.',
    images: ['/images/products/chia-pet-animal.jpg'],
    price: 24.99,
    cost: 12.0,
    stock: 40,
  }),
  createProduct({
    id: 'lava-style-motion-lamp',
    name: 'Lava-Style Motion Lamp',
    slug: 'lava-style-motion-lamp',
    category: 'grow-kits-room-decor',
    subcategory: 'room-decor-desk-toys',
    descriptionShort: 'Retro-style motion lamp with slow-moving wax.',
    descriptionLong: 'Retro-style motion lamp with slow-moving wax and colored liquid, sized for nightstands and gaming setups; colorways vary.',
    images: ['/images/products/lava-lamp.jpg'],
    price: 39.99,
    cost: 18.0,
    stock: 20,
    featured: true,
  }),
  createProduct({
    id: 'neon-string-light-clips',
    name: 'Neon String Light Photo Clips',
    slug: 'neon-string-light-photo-clips',
    category: 'grow-kits-room-decor',
    subcategory: 'room-decor-desk-toys',
    descriptionShort: 'String light set with mini clips for photos.',
    descriptionLong: 'String light set with mini clips for hanging printed photos, Polaroids, and ticket stubs to recreate a 90s bedroom vibe.',
    images: ['/images/products/string-light-clips.jpg'],
    price: 24.99,
    cost: 10.0,
    stock: 45,
  }),

  // ============================================
  // TOYS, GAMES & FIDGETS
  // ============================================
  createProduct({
    id: 'recess-yoyo-twin-pack',
    name: 'Recess Yo-Yo Twin Pack',
    slug: 'recess-yoyo-twin-pack',
    category: 'toys-games-fidgets',
    subcategory: 'playground-classics',
    descriptionShort: 'Two classic string yo-yos in neon colors.',
    descriptionLong: 'Two classic string yo-yos in neon colors; beginner-friendly but capable of basic tricks.',
    images: ['/images/products/yoyo-twin.jpg'],
    price: 12.99,
    cost: 5.0,
    stock: 70,
  }),
  createProduct({
    id: 'og-jax-bounce-set',
    name: 'OG Jax & Bounce Set',
    slug: 'og-jax-bounce-set',
    category: 'toys-games-fidgets',
    subcategory: 'playground-classics',
    descriptionShort: 'Metal jacks and a rubber ball in a drawstring pouch.',
    descriptionLong: 'Metal jacks and a rubber ball in a drawstring pouch, styled after playground sets from the 80s and 90s.',
    images: ['/images/products/jax-set.jpg'],
    price: 11.99,
    cost: 4.0,
    stock: 55,
  }),
  createProduct({
    id: 'neon-slap-bracelet-party-12',
    name: 'Neon Slap Bracelet Party 12-Pack',
    slug: 'neon-slap-bracelet-party-12-pack',
    category: 'toys-games-fidgets',
    subcategory: 'arcade-prizes-party-toys',
    descriptionShort: 'Twelve bright slap bracelets with 90s patterns.',
    descriptionLong: 'Twelve bright slap bracelets with cassette, sneaker, and smiley-face patterns inspired by 90s party favors.',
    images: ['/images/products/slap-bracelets-12.jpg'],
    price: 18.99,
    cost: 7.0,
    stock: 60,
  }),
  createProduct({
    id: 'mystery-capsule-toy-10',
    name: 'Mystery Capsule Toy 10-Pack',
    slug: 'mystery-capsule-toy-10-pack',
    category: 'toys-games-fidgets',
    subcategory: 'vending-capsules-refills',
    descriptionShort: 'Ten prefilled vending capsules with random toys.',
    descriptionLong: 'Ten prefilled vending capsules with random toys such as charms, mini animals, or micro-figures.',
    images: ['/images/products/capsule-toys-10.jpg'],
    price: 18.99,
    cost: 8.0,
    stock: 45,
  }),
  createProduct({
    id: 'pocket-fidget-mix-20',
    name: 'Pocket Fidget Mix 20-Pack',
    slug: 'pocket-fidget-mix-20-pack',
    category: 'toys-games-fidgets',
    subcategory: 'vending-capsules-refills',
    descriptionShort: 'Twenty-piece assortment of coils, squishies, poppers.',
    descriptionLong: 'Twenty-piece assortment of coils, squishies, poppers, and small stress toys packaged in a resealable bag.',
    images: ['/images/products/fidget-mix-20.jpg'],
    price: 24.99,
    cost: 10.0,
    stock: 35,
  }),

  // ============================================
  // STICKERS, STATIONERY & SCHOOL
  // ============================================
  createProduct({
    id: '90s-icon-sticker-sheet',
    name: '90s Icon Sticker Sheet',
    slug: '90s-icon-sticker-sheet',
    category: 'stickers-stationery-school',
    subcategory: 'stickers-tattoos',
    descriptionShort: 'Single sticker sheet with cassettes, VHS labels, and more.',
    descriptionLong: 'Single sticker sheet with cassette tapes, VHS labels, roller skates, smiley faces, and neon shapes.',
    images: ['/images/products/sticker-sheet-90s.jpg'],
    price: 3.99,
    cost: 1.0,
    stock: 150,
  }),
  createProduct({
    id: '90s-sticker-sheet-10-pack',
    name: '90s Sticker Sheet 10-Pack',
    slug: '90s-sticker-sheet-10-pack',
    category: 'stickers-stationery-school',
    subcategory: 'stickers-tattoos',
    descriptionShort: 'Ten assorted 90s-themed sticker sheets.',
    descriptionLong: 'Ten assorted 90s-themed sticker sheets bundled together at a discount, ideal for teachers or journaling.',
    images: ['/images/products/sticker-sheets-10.jpg'],
    price: 17.99,
    cost: 6.0,
    stock: 80,
  }),
  createProduct({
    id: 'trapper-style-notebook-set',
    name: 'Trapper-Style Notebook & Pen Set',
    slug: 'trapper-style-notebook-pen-set',
    category: 'stickers-stationery-school',
    subcategory: 'notebooks-writing',
    descriptionShort: 'Spiral notebook with 90s-inspired cover and gel pen.',
    descriptionLong: 'Spiral notebook with 90s-inspired cover and matching gel pen, evoking trapper keeper energy without the bulk.',
    images: ['/images/products/trapper-notebook.jpg'],
    price: 11.99,
    cost: 4.5,
    stock: 65,
  }),
  createProduct({
    id: 'neon-gel-pen-12-pack',
    name: 'Neon Gel Pen 12-Pack',
    slug: 'neon-gel-pen-12-pack',
    category: 'stickers-stationery-school',
    subcategory: 'notebooks-writing',
    descriptionShort: 'Twelve neon gel pens with smooth ink.',
    descriptionLong: 'Twelve neon gel pens with smooth ink suitable for journaling and doodling in dark-lined notebooks.',
    images: ['/images/products/gel-pens-12.jpg'],
    price: 14.99,
    cost: 5.0,
    stock: 70,
  }),
  createProduct({
    id: 'locker-starter-kit-90s',
    name: 'Locker Starter Kit – 90s Edition',
    slug: 'locker-starter-kit-90s-edition',
    category: 'stickers-stationery-school',
    subcategory: 'locker-accessories',
    descriptionShort: 'Kit with mirror, magnets, pen cup, and sticker sheet.',
    descriptionLong: 'Kit with mirror, magnets, pen cup, and a sticker sheet, all in coordinated 90s patterns and colors.',
    images: ['/images/products/locker-kit.jpg'],
    price: 29.99,
    cost: 12.0,
    stock: 25,
    featured: true,
  }),

  // ============================================
  // VHS & ANALOG CORNER
  // ============================================
  createProduct({
    id: 'blank-vhs-3-pack',
    name: 'Blank VHS 3-Pack – Recording Grade',
    slug: 'blank-vhs-3-pack-recording-grade',
    category: 'vhs-analog-corner',
    subcategory: 'blank-tapes',
    descriptionShort: 'Three new blank VHS tapes for recording or art projects.',
    descriptionLong: 'Three new blank VHS tapes, sourced from modern duplicator-grade suppliers, suitable for recording or analog art projects.',
    images: ['/images/products/blank-vhs-3.jpg'],
    price: 19.99,
    cost: 8.0,
    stock: 40,
  }),
  createProduct({
    id: 'mystery-vhs-5-pack',
    name: 'Mystery VHS 5-Pack – Mixed Genres',
    slug: 'mystery-vhs-5-pack-mixed-genres',
    category: 'vhs-analog-corner',
    subcategory: 'mystery-vhs-bundles',
    descriptionShort: 'Five randomly selected pre-owned VHS tapes.',
    descriptionLong: 'Five randomly selected pre-owned VHS tapes pulled from bulk lots; genres may include family, action, comedy, or oddities.',
    images: ['/images/products/mystery-vhs-5.jpg'],
    price: 24.99,
    cost: 8.0,
    stock: 30,
    featured: true,
  }),
  createProduct({
    id: 'vhs-cleaning-rewind-kit',
    name: 'VHS Cleaning & Rewind Kit',
    slug: 'vhs-cleaning-rewind-kit',
    category: 'vhs-analog-corner',
    subcategory: 'analog-accessories',
    descriptionShort: 'Kit with dry cleaning cassette and tape rewinder.',
    descriptionLong: 'Kit with a dry cleaning cassette and a compact tape rewinder to help clean heads and rewind tapes safely.',
    images: ['/images/products/vhs-kit.jpg'],
    price: 29.99,
    cost: 12.0,
    stock: 20,
  }),
  createProduct({
    id: 'vhs-label-sticker-pack',
    name: 'VHS Label & Sticker Pack',
    slug: 'vhs-label-sticker-pack',
    category: 'vhs-analog-corner',
    subcategory: 'analog-accessories',
    descriptionShort: 'Set of spine labels, face labels, and themed stickers.',
    descriptionLong: 'Set of spine labels, face labels, and themed stickers for organizing home-recorded tapes and mystery boxes.',
    images: ['/images/products/vhs-labels.jpg'],
    price: 9.99,
    cost: 3.0,
    stock: 60,
  }),

  // ============================================
  // CANDY, SNACKS & DRINKS
  // ============================================
  createProduct({
    id: '90s-candy-mini-mix',
    name: '90s Candy Mini Mix',
    slug: '90s-candy-mini-mix',
    category: 'candy-snacks-drinks',
    subcategory: '90s-candy-mixes',
    descriptionShort: 'Small bag with 8–10 pieces of nostalgic candy.',
    descriptionLong: 'Small bag with 8–10 pieces of nostalgic candy such as taffy, lollipops, and bubble gum, portioned as a snack-sized add-on.',
    images: ['/images/products/candy-mini-mix.jpg'],
    price: 9.99,
    cost: 4.0,
    stock: 100,
  }),
  createProduct({
    id: '90s-candy-time-capsule',
    name: '90s Candy Time Capsule Box',
    slug: '90s-candy-time-capsule-box',
    category: 'candy-snacks-drinks',
    subcategory: '90s-candy-mixes',
    descriptionShort: 'Gift box with 1.5–2 pounds of assorted retro candy.',
    descriptionLong: 'Gift box with 1.5–2 pounds of assorted retro candy, chosen from current nostalgic lines.',
    images: ['/images/products/candy-time-capsule.jpg'],
    price: 34.99,
    cost: 15.0,
    stock: 25,
    featured: true,
  }),
  createProduct({
    id: 'regional-snack-box-arizona',
    name: 'Regional Snack Box – Arizona Corner Store',
    slug: 'regional-snack-box-arizona',
    category: 'candy-snacks-drinks',
    subcategory: 'regional-snacks',
    descriptionShort: 'Box of chips, candies, and treats popular in Arizona.',
    descriptionLong: 'Box of chips, candies, and shelf-stable treats popular in Arizona, curated from regional distributors.',
    images: ['/images/products/arizona-snacks.jpg'],
    price: 39.99,
    cost: 18.0,
    stock: 20,
    regionTag: 'AZ',
  }),
  createProduct({
    id: 'regional-snack-box-southern',
    name: 'Regional Snack Box – Southern Gas Station Run',
    slug: 'regional-snack-box-southern',
    category: 'candy-snacks-drinks',
    subcategory: 'regional-snacks',
    descriptionShort: 'Mix of salty and sweet snacks from southern U.S.',
    descriptionLong: 'Mix of salty and sweet snacks associated with southern U.S. gas stations, including chips, nuts, and candy bars.',
    images: ['/images/products/southern-snacks.jpg'],
    price: 44.99,
    cost: 20.0,
    stock: 18,
    regionTag: 'South',
  }),
  createProduct({
    id: 'glass-bottle-soda-flight-4',
    name: 'Glass Bottle Soda Flight – 4 Pack',
    slug: 'glass-bottle-soda-flight-4-pack',
    category: 'candy-snacks-drinks',
    subcategory: 'single-snacks-drinks',
    descriptionShort: 'Four different glass bottle sodas for taste-testing.',
    descriptionLong: 'Four different glass bottle sodas for taste-testing; flavors vary by batch.',
    images: ['/images/products/soda-flight-4.jpg'],
    price: 19.99,
    cost: 8.0,
    stock: 35,
  }),

  // ============================================
  // MYSTERY & SUBSCRIPTION BOXES
  // ============================================
  createProduct({
    id: 'monthly-90s-time-capsule',
    name: 'Monthly 90s Time Capsule Box',
    slug: 'monthly-90s-time-capsule-box',
    category: 'mystery-subscription-boxes',
    subcategory: 'monthly-subscriptions',
    descriptionShort: 'Monthly subscription with toys, candy, stickers, and analog items.',
    descriptionLong: 'Subscription box that ships monthly with a mix of toys, candy, stickers, and one surprise analog item tied to a 90s theme.',
    images: ['/images/products/monthly-time-capsule.jpg'],
    price: 44.99,
    cost: 22.0,
    stock: 999,
    featured: true,
  }),
  createProduct({
    id: '90s-toy-mystery-box-classic',
    name: '90s Toy Mystery Box – Classic Edition',
    slug: '90s-toy-mystery-box-classic',
    category: 'mystery-subscription-boxes',
    subcategory: 'one-time-mystery-boxes',
    descriptionShort: 'One-time box with 10–14 small toys.',
    descriptionLong: 'One-time box with a mix of 10–14 small toys such as slap bracelets, fingerboards, slime, and capsule toys.',
    images: ['/images/products/mystery-box-classic.jpg'],
    price: 39.99,
    cost: 18.0,
    stock: 30,
  }),
  createProduct({
    id: 'back-to-99-party-kit-basic',
    name: "Back To '99 Party Kit – Basic",
    slug: 'back-to-99-party-kit-basic',
    category: 'mystery-subscription-boxes',
    subcategory: 'event-kits-party-boxes',
    descriptionShort: 'Event kit with plates, cups, napkins, and toys for 8 guests.',
    descriptionLong: 'Event kit with plates, cups, napkins, and a handful of toys for roughly 8 guests at a 90s-themed party.',
    images: ['/images/products/party-kit-basic.jpg'],
    price: 54.99,
    cost: 25.0,
    stock: 15,
  }),

  // ============================================
  // RETRO APPAREL & ACCESSORIES
  // ============================================
  createProduct({
    id: 'be-kind-rewind-tee',
    name: '"Be Kind, Rewind" VHS Tee',
    slug: 'be-kind-rewind-vhs-tee',
    category: 'retro-apparel-accessories',
    subcategory: 'graphic-tees-tops',
    descriptionShort: 'Unisex t-shirt featuring a retro VHS tape graphic.',
    descriptionLong: 'Unisex t-shirt featuring a retro VHS tape graphic and simple "Be Kind, Rewind" text in pastel colors.',
    images: ['/images/products/be-kind-tee.jpg'],
    price: 29.99,
    cost: 12.0,
    stock: 50,
    featured: true,
  }),
  createProduct({
    id: 'neon-grid-bucket-hat',
    name: 'Neon Grid Bucket Hat',
    slug: 'neon-grid-bucket-hat',
    category: 'retro-apparel-accessories',
    subcategory: 'hats-socks-bags',
    descriptionShort: 'Bucket hat with 90s grid and neon shapes pattern.',
    descriptionLong: 'Bucket hat with 90s grid and neon shapes pattern, sized for teens and adults.',
    images: ['/images/products/bucket-hat.jpg'],
    price: 24.99,
    cost: 10.0,
    stock: 35,
  }),
  createProduct({
    id: 'retro-fanny-pack-arcade',
    name: 'Retro Fanny Pack – Arcade Print',
    slug: 'retro-fanny-pack-arcade-print',
    category: 'retro-apparel-accessories',
    subcategory: 'hats-socks-bags',
    descriptionShort: 'Adjustable waist bag with colorful arcade print.',
    descriptionLong: 'Adjustable waist bag with a colorful arcade print, fits phones, candy, and small toys.',
    images: ['/images/products/fanny-pack-arcade.jpg'],
    price: 24.99,
    cost: 9.0,
    stock: 40,
  }),
  createProduct({
    id: '90s-icon-enamel-pin-4-pack',
    name: '90s Icon Enamel Pin 4-Pack',
    slug: '90s-icon-enamel-pin-4-pack',
    category: 'retro-apparel-accessories',
    subcategory: 'pins-jewelry',
    descriptionShort: 'Four enamel pins featuring 90s icons.',
    descriptionLong: 'Four enamel pins featuring common 90s icons like tapes, game controllers, and smiley faces.',
    images: ['/images/products/enamel-pins-4.jpg'],
    price: 24.99,
    cost: 8.0,
    stock: 45,
  }),

  // ============================================
  // THE VAULT (DISCONTINUED & RARE)
  // ============================================
  createProduct({
    id: 'vintage-furby-preloved',
    name: 'Vintage Furby – Pre-Loved Assortment',
    slug: 'vintage-furby-pre-loved',
    category: 'the-vault',
    subcategory: 'vintage-toys-collectibles',
    descriptionShort: 'Authentic pre-owned Furby units, cleaned and tested.',
    descriptionLong: 'Authentic pre-owned Furby units from late 90s or early 2000s, cleaned and tested; shell colors vary by stock.',
    images: ['/images/products/vintage-furby.jpg'],
    price: 79.99,
    cost: 35.0,
    stock: 8,
    rarity: 'hard_to_find',
  }),
  createProduct({
    id: 'sealed-vhs-feature-classic',
    name: 'Sealed VHS Feature – Classic Title',
    slug: 'sealed-vhs-feature-classic-title',
    category: 'the-vault',
    subcategory: 'limited-run-finds',
    descriptionShort: 'Individual sealed VHS of a recognizable film.',
    descriptionLong: 'Individual sealed VHS of a recognizable film or family title, condition and exact movie listed per product page.',
    images: ['/images/products/sealed-vhs.jpg'],
    price: 49.99,
    cost: 20.0,
    stock: 5,
    rarity: 'limited',
  }),
  createProduct({
    id: 'closeout-toy-treasure-bag',
    name: 'Closeout Toy Treasure Bag',
    slug: 'closeout-toy-treasure-bag',
    category: 'the-vault',
    subcategory: 'closeout-treasure-packs',
    descriptionShort: 'Mixed bag of closeout toys from liquidator lots.',
    descriptionLong: 'Mixed bag of closeout toys and novelties picked from liquidator lots; at least 20 items inside.',
    images: ['/images/products/closeout-toys.jpg'],
    price: 34.99,
    cost: 12.0,
    stock: 15,
  }),

  // ============================================
  // CHECKOUT CANDY LANE (IMPULSE ADD-ONS)
  // All items in this category have isCheckoutAddon = true
  // ============================================
  createProduct({
    id: 'addon-mini-90s-candy-sampler',
    name: 'Add-On: Mini 90s Candy Sampler',
    slug: 'addon-mini-90s-candy-sampler',
    category: 'checkout-candy-lane',
    subcategory: 'mini-snacks',
    descriptionShort: 'Tiny pack of nostalgic candies to toss in your box.',
    descriptionLong: 'Small packet with 4–6 pieces of nostalgic candy, sized to toss into any order at checkout.',
    images: ['/images/products/addon-candy-sampler.jpg'],
    price: 3.99,
    cost: 1.25,
    stock: 200,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-tiny-sour-candy-shot',
    name: 'Add-On: Tiny Sour Candy Shot',
    slug: 'addon-tiny-sour-candy-shot',
    category: 'checkout-candy-lane',
    subcategory: 'mini-snacks',
    descriptionShort: 'Mini tube of sour candies.',
    descriptionLong: 'Mini tube or bag of sour candies chosen from current wholesale sour lines.',
    images: ['/images/products/addon-sour-candy.jpg'],
    price: 2.99,
    cost: 0.8,
    stock: 250,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-single-glass-soda',
    name: 'Add-On: Single Glass Bottle Soda',
    slug: 'addon-single-glass-bottle-soda',
    category: 'checkout-candy-lane',
    subcategory: 'mini-snacks',
    descriptionShort: 'One glass soda bottle added to the order.',
    descriptionLong: 'One additional glass soda bottle added to the order; specific flavor depends on current stock.',
    images: ['/images/products/addon-glass-soda.jpg'],
    price: 4.49,
    cost: 1.5,
    stock: 150,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-single-snack-bag-chips',
    name: 'Add-On: Single Snack Bag – Chips',
    slug: 'addon-single-snack-bag-chips',
    category: 'checkout-candy-lane',
    subcategory: 'mini-snacks',
    descriptionShort: 'One small bag of chips in a rotating flavor.',
    descriptionLong: 'One small bag of chips in a rotating flavor from current snack inventory.',
    images: ['/images/products/addon-chips.jpg'],
    price: 2.49,
    cost: 0.75,
    stock: 180,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-movie-night-candy',
    name: 'Add-On: Extra Movie Night Candy Pack',
    slug: 'addon-extra-movie-night-candy-pack',
    category: 'checkout-candy-lane',
    subcategory: 'mini-snacks',
    descriptionShort: 'Small candy pack for VHS or movie-night orders.',
    descriptionLong: 'Small candy pack designed to pair with any VHS or movie-night order.',
    images: ['/images/products/addon-movie-candy.jpg'],
    price: 3.99,
    cost: 1.2,
    stock: 120,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-sleepover-snack-mini',
    name: 'Add-On: Sleepover Snack Mini Pack',
    slug: 'addon-sleepover-snack-mini-pack',
    category: 'checkout-candy-lane',
    subcategory: 'mini-snacks',
    descriptionShort: 'Tiny mix of individually wrapped sweets.',
    descriptionLong: 'Tiny mix of individually wrapped sweets sized for a single late-night snack.',
    images: ['/images/products/addon-sleepover-snack.jpg'],
    price: 2.99,
    cost: 0.9,
    stock: 160,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mystery-capsule-toy',
    name: 'Add-On: Mystery Capsule Toy',
    slug: 'addon-mystery-capsule-toy',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'Single prefilled capsule toy from bulk assortments.',
    descriptionLong: 'Single prefilled capsule toy drawn from bulk vending assortments.',
    images: ['/images/products/addon-capsule-toy.jpg'],
    price: 1.99,
    cost: 0.5,
    stock: 300,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-3-pack-capsule-surprise',
    name: 'Add-On: 3-Pack Capsule Surprise',
    slug: 'addon-3-pack-capsule-surprise',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'Three random capsules bundled together.',
    descriptionLong: 'Three random capsules bundled as one small upgrade at checkout.',
    images: ['/images/products/addon-capsule-3.jpg'],
    price: 4.99,
    cost: 1.4,
    stock: 200,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-pocket-squish-friend',
    name: 'Add-On: Pocket Squish Friend',
    slug: 'addon-pocket-squish-friend',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'One small squishy toy from assortments.',
    descriptionLong: 'One small squishy toy selected from squishie assortments.',
    images: ['/images/products/addon-squish.jpg'],
    price: 3.99,
    cost: 1.0,
    stock: 180,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mini-rainbow-spring',
    name: 'Add-On: Mini Rainbow Spring',
    slug: 'addon-mini-rainbow-spring',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'One small coil spring toy.',
    descriptionLong: 'One small coil spring toy, good for desk fiddling or stair experiments.',
    images: ['/images/products/addon-spring.jpg'],
    price: 1.99,
    cost: 0.4,
    stock: 250,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-tiny-puzzle-maze',
    name: 'Add-On: Tiny Puzzle or Maze Game',
    slug: 'addon-tiny-puzzle-maze-game',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'One mini handheld puzzle or maze game.',
    descriptionLong: 'One mini handheld puzzle or maze game sized to fit in a pocket.',
    images: ['/images/products/addon-maze.jpg'],
    price: 3.49,
    cost: 1.0,
    stock: 140,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-glow-stick-trio',
    name: 'Add-On: Glow Stick Trio',
    slug: 'addon-glow-stick-trio',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'Three small glow sticks bundled together.',
    descriptionLong: 'Three small glow sticks bundled together for night-time nostalgia.',
    images: ['/images/products/addon-glow-sticks.jpg'],
    price: 2.99,
    cost: 0.7,
    stock: 200,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-single-slap-bracelet',
    name: 'Add-On: Single Neon Slap Bracelet',
    slug: 'addon-single-neon-slap-bracelet',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'One random slap bracelet design.',
    descriptionLong: 'One random design slap bracelet added to the cart as a last-second treat.',
    images: ['/images/products/addon-slap-bracelet.jpg'],
    price: 2.49,
    cost: 0.6,
    stock: 220,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mini-fingerboard',
    name: 'Add-On: Mini Fingerboard',
    slug: 'addon-mini-fingerboard',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'Single mini skateboard toy.',
    descriptionLong: 'Single mini skateboard toy from fingerboard-style assortments.',
    images: ['/images/products/addon-fingerboard.jpg'],
    price: 3.49,
    cost: 1.0,
    stock: 160,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-scented-eraser',
    name: 'Add-On: Scented Eraser Buddy',
    slug: 'addon-scented-eraser-buddy',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'One small scented eraser shaped like food.',
    descriptionLong: 'One small scented eraser shaped like food or a character.',
    images: ['/images/products/addon-eraser.jpg'],
    price: 2.49,
    cost: 0.6,
    stock: 190,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mini-gel-pen-duo',
    name: 'Add-On: Mini Gel Pen Duo',
    slug: 'addon-mini-gel-pen-duo',
    category: 'checkout-candy-lane',
    subcategory: 'tiny-toys-capsules',
    descriptionShort: 'Two mini gel pens in bright colors.',
    descriptionLong: 'Two mini gel pens in bright colors, sized for pencil cases or pockets.',
    images: ['/images/products/addon-gel-pens.jpg'],
    price: 3.49,
    cost: 1.0,
    stock: 170,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mystery-sticker-sheet',
    name: 'Add-On: Mystery Sticker Sheet',
    slug: 'addon-mystery-sticker-sheet',
    category: 'checkout-candy-lane',
    subcategory: 'stickers-pins',
    descriptionShort: 'One random 90s icon sticker sheet.',
    descriptionLong: 'One random 90s icon sticker sheet from the sticker category.',
    images: ['/images/products/addon-sticker-sheet.jpg'],
    price: 2.99,
    cost: 0.75,
    stock: 200,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mini-sticker-3-pack',
    name: 'Add-On: Mini Sticker 3-Pack',
    slug: 'addon-mini-sticker-3-pack',
    category: 'checkout-candy-lane',
    subcategory: 'stickers-pins',
    descriptionShort: 'Three small sticker sheets bundled.',
    descriptionLong: 'Three small sticker sheets bundled at a slight discount as an impulse add.',
    images: ['/images/products/addon-sticker-3pack.jpg'],
    price: 4.99,
    cost: 1.5,
    stock: 150,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-random-enamel-pin',
    name: 'Add-On: Random 90s Enamel Pin',
    slug: 'addon-random-90s-enamel-pin',
    category: 'checkout-candy-lane',
    subcategory: 'stickers-pins',
    descriptionShort: 'One enamel pin pulled from assortments.',
    descriptionLong: 'One enamel pin pulled from pin assortments, design may vary.',
    images: ['/images/products/addon-enamel-pin.jpg'],
    price: 5.99,
    cost: 2.0,
    stock: 120,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-scratch-n-sniff-single',
    name: 'Add-On: Scratch-n-Sniff Single',
    slug: 'addon-scratch-n-sniff-single',
    category: 'checkout-candy-lane',
    subcategory: 'stickers-pins',
    descriptionShort: 'One small scratch-n-sniff sticker.',
    descriptionLong: 'One small scratch-n-sniff sticker, food- or candy-scented.',
    images: ['/images/products/addon-scratch-sniff.jpg'],
    price: 1.49,
    cost: 0.35,
    stock: 300,
    isCheckoutAddon: true,
  }),
  createProduct({
    id: 'addon-mini-locker-magnet-set',
    name: 'Add-On: Mini Locker Magnet Set',
    slug: 'addon-mini-locker-magnet-set',
    category: 'checkout-candy-lane',
    subcategory: 'stickers-pins',
    descriptionShort: 'Two or three tiny magnets for lockers.',
    descriptionLong: 'Two or three tiny magnets for lockers or fridges, chosen from current magnet designs.',
    images: ['/images/products/addon-magnets.jpg'],
    price: 3.99,
    cost: 1.2,
    stock: 140,
    isCheckoutAddon: true,
  }),
];

// For backward compatibility
export const mockProducts = products;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category && p.isActive);
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(subcategory: ProductSubcategory): Product[] {
  return products.filter((p) => p.subcategory === subcategory && p.isActive);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.isActive);
}

/**
 * Get products on sale
 */
export function getOnSaleProducts(): Product[] {
  return products.filter(
    (p) => p.compareAtPrice && p.compareAtPrice > p.price && p.isActive
  );
}

/**
 * Get regional products
 */
export function getRegionalProducts(): Product[] {
  return products.filter((p) => p.regionTag && p.isActive);
}

/**
 * Get checkout addon products (for upsell)
 */
export function getCheckoutAddons(): Product[] {
  return products.filter((p) => p.isCheckoutAddon && p.isActive && p.stock > 0);
}

/**
 * Get all active products
 */
export function getActiveProducts(): Product[] {
  return products.filter((p) => p.isActive);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.isActive &&
      (p.name.toLowerCase().includes(lowerQuery) ||
        p.descriptionShort.toLowerCase().includes(lowerQuery) ||
        p.descriptionLong.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get low stock products (stock <= reorderThreshold)
 */
export function getLowStockProducts(): Product[] {
  return products.filter(
    (p) => p.trackInventory && p.reorderThreshold && p.stock <= p.reorderThreshold
  );
}
