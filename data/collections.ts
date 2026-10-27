import { IMAGES } from '@/lib/images'

export type CollectionProduct = {
  slug: string
  name: string
  collection: 'inner-code' | 'bilzerian'
  images: string[]
  descriptor: string
  description: string
  price: number | null
  sizes: string[]
  colors: string[]
  status: 'available' | 'coming-soon' | 'sold-out'
}

export const COLLECTION_PRODUCTS: CollectionProduct[] = [
  { slug: 'snake-009', name: 'Snake 009', collection: 'inner-code', images: [IMAGES.snakeCoupleStreet, IMAGES.snakeFlat], descriptor: 'Heavyweight tee · red snake embroidery', description: 'A considered heavyweight tee in dense cotton, finished with the TONNANO snake code.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Obsidian'], status: 'coming-soon' },
  { slug: 'taupe-monogram', name: 'Taupe Monogram', collection: 'inner-code', images: [IMAGES.taupeDuoColumns, IMAGES.taupeFlat], descriptor: 'Heavyweight tee · embossed T', description: 'Soft structure, muted pigment and a quiet monogram built into a heavyweight everyday tee.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Taupe'], status: 'coming-soon' },
  { slug: 'black-essential', name: 'Black Essential', collection: 'inner-code', images: [IMAGES.blackDuoLight, IMAGES.blackFlat], descriptor: 'Heavyweight essential tee', description: 'The foundational TONNANO silhouette: substantial, clean and made in Morocco.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Black'], status: 'coming-soon' },
  { slug: 'rust-sunset', name: 'Rust Sunset', collection: 'inner-code', images: [IMAGES.rustDuoColumns, IMAGES.rustFlat], descriptor: 'Heavyweight tee · sunset graphic', description: 'A warm mineral tone with the weight and hand-feel of a future classic.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Rust'], status: 'coming-soon' },
  { slug: 'violet-edition', name: 'Violet Edition', collection: 'inner-code', images: [IMAGES.purpleDuoLight, IMAGES.purpleFlat], descriptor: 'Heavyweight tee · luxury stitching', description: 'A restrained violet edition with a soft surface and architectural oversized fit.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Violet'], status: 'coming-soon' },
  { slug: 'ivory-arch', name: 'Ivory Arch', collection: 'inner-code', images: [IMAGES.whiteDuoStudio, IMAGES.whiteFlat], descriptor: 'Heavyweight tee · inside label, EST 2026', description: 'Ivory cotton, tonal mark and generous proportion. Designed to settle with time.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Ivory'], status: 'coming-soon' },
]

export const INNER_CODE_PRODUCTS = COLLECTION_PRODUCTS.filter((p) => p.collection === 'inner-code')
export const getCollectionProduct = (slug: string) => COLLECTION_PRODUCTS.find((p) => p.slug === slug)
