export type Product = { slug: string; name: string; eyebrow: string; description: string; color: string; image: string }
export type Collection = { slug: string; name: string; intro: string; products: Product[] }

const product = (slug: string, name: string, eyebrow: string, description: string, image = '/images/first-signal/texture.jpeg'): Product => ({ slug, name, eyebrow, description, color: 'Obsidian / Stone / Rust', image })

export const collections: Collection[] = [
  { slug: 'first-signal', name: 'First Signal', intro: 'The first transmission. Five essential forms, cut in Morocco and held for the few who were already listening.', products: [
    product('001-heavyweight-tee', '001 — Heavyweight Tee', 'First Signal / 001', 'A dense cotton silhouette with an architectural shoulder and a hidden inner mark.'),
    product('002-signature-hoodie', '002 — Signature Hoodie', 'First Signal / 002', 'A quiet, oversized layer built for the long way through the city.'),
    product('003-inner-code-piece', '003 — Inner Code Piece', 'First Signal / 003', 'A private construction. The details reveal themselves only at close range.'),
    product('004-oversized-longsleeve', '004 — Oversized Longsleeve', 'First Signal / 004', 'Long proportions, weighted jersey and a single signal at the cuff.'),
    product('005-structured-cap', '005 — Structured Cap', 'First Signal / 005', 'A six-panel object with a low profile and a hidden code under the brim.'),
  ] },
  { slug: 'atlas-edition', name: 'Atlas Edition', intro: 'A study in Moroccan stone, desert light and the geometry of the Atlas.', products: [
    product('atlas-overshirt', 'Atlas Overshirt', 'Atlas Edition / 001', 'A structured overshirt shaped by the lines of mountain architecture.'),
    product('desert-tailored-trouser', 'Desert Tailored Trouser', 'Atlas Edition / 002', 'Relaxed tailoring in a warm mineral palette.'),
    product('zellige-knit', 'Zellige Knit', 'Atlas Edition / 003', 'A tactile knit with a pattern that shifts like tiled light.'),
    product('medina-utility-jacket', 'Medina Utility Jacket', 'Atlas Edition / 004', 'Utility refined through proportion, pocket and shadow.'),
    product('dune-cap', 'Dune Cap', 'Atlas Edition / 005', 'A dry-textured cap for the edge of the signal.'),
  ] },
  { slug: 'inner-code-objects', name: 'Inner Code Objects', intro: 'Small objects for the people who keep the larger story.', products: [
    product('inner-code-cap', 'Inner Code Cap', 'Objects / 001', 'The mark is inside. The object is yours.'),
    product('ribbed-beanie', 'Ribbed Beanie', 'Objects / 002', 'A winter signal in dense ribbed knit.'),
    product('signature-tote-bag', 'Signature Tote Bag', 'Objects / 003', 'A daily carrier with a private interior.'),
    product('metal-keychain', 'Metal Keychain', 'Objects / 004', 'A cast metal key to a room not yet opened.'),
    product('fragrance-object', 'Fragrance Object', 'Objects / 005', 'A mineral scent held in a sculptural vessel.'),
    product('collector-packaging', 'Collector Packaging', 'Objects / 006', 'The first chapter, wrapped for the archive.'),
  ] },
]

export const allProducts = collections.flatMap((collection) => collection.products.map((product) => ({ ...product, collection: collection.slug, collectionName: collection.name })))
export const findCollection = (slug: string) => collections.find((collection) => collection.slug === slug)
export const findProduct = (slug: string) => allProducts.find((product) => product.slug === slug)
