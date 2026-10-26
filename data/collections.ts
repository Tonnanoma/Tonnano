import { IMAGES } from '@/lib/site'

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
  { slug: 'snake-009', name: 'Snake 009', collection: 'inner-code', images: [IMAGES.snakeCoupleStreet, IMAGES.snakeFlat], descriptor: 'Signature heavyweight hoodie', description: 'A considered essential in dense cotton, finished with the TONNANO snake code.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Obsidian'], status: 'coming-soon' },
  { slug: 'taupe-monogram', name: 'Taupe Monogram', collection: 'inner-code', images: [IMAGES.taupeDuoColumns, IMAGES.taupeFlat], descriptor: 'Oversized cotton sweatshirt', description: 'Soft structure, muted pigment and a quiet monogram built for everyday uniform.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Taupe'], status: 'coming-soon' },
  { slug: 'black-essential', name: 'Black Essential', collection: 'inner-code', images: [IMAGES.blackDuoLight, IMAGES.blackFlat], descriptor: 'Heavyweight essential tee', description: 'The foundational TONNANO silhouette: substantial, clean and made in Morocco.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Black'], status: 'coming-soon' },
  { slug: 'rust-sunset', name: 'Rust Sunset', collection: 'inner-code', images: [IMAGES.rustDuoColumns, IMAGES.rustFlat], descriptor: 'Pigment-dyed heavyweight hoodie', description: 'A warm mineral tone with the weight and hand-feel of a future classic.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Rust'], status: 'coming-soon' },
  { slug: 'violet-edition', name: 'Violet Edition', collection: 'inner-code', images: [IMAGES.purpleDuoLight, IMAGES.purpleFlat], descriptor: 'Limited pigment sweatshirt', description: 'A restrained violet edition with a soft surface and architectural oversized fit.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Violet'], status: 'coming-soon' },
  { slug: 'ivory-arch', name: 'Ivory Arch', collection: 'inner-code', images: [IMAGES.whiteDuoStudio, IMAGES.whiteFlat], descriptor: 'Premium heavyweight sweatshirt', description: 'Ivory cotton, tonal mark and generous proportion. Designed to settle with time.', price: null, sizes: ['S','M','L','XL','XXL'], colors: ['Ivory'], status: 'coming-soon' },
]

export const INNER_CODE_PRODUCTS = COLLECTION_PRODUCTS.filter((p) => p.collection === 'inner-code')
export const getCollectionProduct = (slug: string) => COLLECTION_PRODUCTS.find((p) => p.slug === slug)
