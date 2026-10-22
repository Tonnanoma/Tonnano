export type BilzerianProduct = {
  slug: string
  name: string
  type: string
  colorway: string
  fit: string
  fabric: string
  details: string[]
  quantity: number
  image: string
  description: string
}

export const BILZERIAN_PRODUCTS: BilzerianProduct[] = [
  { slug: 'ivar', name: 'IVAR', type: 'Heavyweight Winter Hoodie', colorway: 'Obsidian Black', fit: 'Oversized unisex fit', fabric: '480 GSM brushed heavyweight cotton', details: ['Embossed BILZERIAN monogram on chest', 'Tonal embroidered TONNANO marking on back', 'Ribbed cuffs and hem', 'Hidden inside-label detail', 'Double-layer hood'], quantity: 150, image: '/images/bilzerian-ivar.png', description: 'A dense, architectural hoodie cut for the cold. IVAR carries the weight of winter in brushed cotton and quiet, collector-grade detail.' },
  { slug: 'harald', name: 'HARALD', type: 'Wool-Blend Overshirt', colorway: 'Charcoal Grey', fit: 'Relaxed unisex fit', fabric: 'Premium wool-blend twill', details: ['Structured collar', 'Matte black metal buttons', 'Chest pocket with discreet BILZERIAN tab', 'Reinforced shoulders', 'Interior TONNANO signature label'], quantity: 120, image: '/images/bilzerian-harald.png', description: 'A tailored layer with the authority of stone. HARALD balances a relaxed silhouette with a precise, reinforced construction.' },
  { slug: 'loki', name: 'LOKI', type: 'Technical Winter Jacket', colorway: 'Midnight Navy', fit: 'Regular unisex fit', fabric: 'Water-resistant technical shell with insulated lining', details: ['High collar', 'Concealed zip closure', 'Adjustable cuffs', 'Reflective silver BILZERIAN detail', 'Interior media pocket'], quantity: 100, image: '/images/bilzerian-loki.png', description: 'Built for blue-hour weather. LOKI combines a protective shell, insulated lining and reflective restraint.' },
  { slug: 'bjorn', name: 'BJØRN', type: 'Heavy Knit Sweater', colorway: 'Deep Forest Green', fit: 'Relaxed unisex fit', fabric: 'Premium lambswool-blend knit', details: ['Mock neck', 'Tonal BILZERIAN embroidery', 'Ribbed hem and cuffs', 'Natural texture finish'], quantity: 130, image: '/images/bilzerian-bjorn.png', description: 'A soft, substantial knit with Nordic restraint. BJØRN is warm without excess, finished with a natural texture.' },
  { slug: 'leif', name: 'LEIF', type: 'Quilted Liner Jacket', colorway: 'Stone Beige', fit: 'Boxy unisex fit', fabric: 'Quilted nylon shell with lightweight insulation', details: ['Stand collar', 'Snap-button closure', 'Subtle BILZERIAN chest marking', 'Interior pocket', 'Matte hardware'], quantity: 110, image: '/images/bilzerian-leif.png', description: 'LEIF moves between desert stone and winter fog. A light, boxy layer designed for considered layering.' },
  { slug: 'ingrid', name: 'INGRID', type: 'Longline Wool Coat', colorway: 'Off-White', fit: 'Oversized unisex fit', fabric: 'Premium wool-blend coating', details: ['Hidden button placket', 'Structured shoulders', 'Side pockets', 'Tonal BILZERIAN embroidery', 'Fully lined interior'], quantity: 80, image: '/images/bilzerian-ingrid.png', description: 'A longline study in pale architecture. INGRID brings a quiet, oversized silhouette to the winter code.' },
  { slug: 'sigrid', name: 'SIGRID', type: 'Cable-Knit Cardigan', colorway: 'Burgundy', fit: 'Relaxed unisex fit', fabric: 'Premium wool-blend cable knit', details: ['Button-front closure', 'Ribbed cuffs and hem', 'Tonal embroidered BILZERIAN mark', 'Two front pockets'], quantity: 90, image: '/images/bilzerian-sigrid.png', description: 'SIGRID is the warmer register of the chapter: a cable-knit layer in deep burgundy, made for slow evenings.' },
  { slug: 'torsten', name: 'TORSTEN', type: 'Padded Winter Parka', colorway: 'Black', fit: 'Regular unisex fit', fabric: 'Matte technical shell with premium insulation', details: ['Fur-free removable hood', 'Storm cuffs', 'Two-way zipper', 'Reflective inner detailing', 'BILZERIAN back marking'], quantity: 100, image: '/images/bilzerian-torsten.png', description: 'TORSTEN is a shield against the elements. A clean parka with storm-ready protection and a strong rear mark.' },
  { slug: 'cesar', name: 'CESAR', type: 'Heavyweight Crewneck', colorway: 'Charcoal Black', fit: 'Oversized unisex fit', fabric: '450 GSM heavyweight cotton', details: ['Tonal embroidered BILZERIAN script', 'Ribbed collar, cuffs and hem', 'Reinforced shoulder seams', 'Woven inside label'], quantity: 160, image: '/images/bilzerian-cesar.png', description: 'The essential heavyweight. CESAR is deliberately spare, with dense cotton and a tonal signature.' },
  { slug: 'ragnar', name: 'RAGNAR', type: 'Signature Winter Bomber', colorway: 'Obsidian Black with Antique Gold detailing', fit: 'Boxy unisex fit', fabric: 'Premium matte nylon shell with insulated lining', details: ['Ribbed collar, cuffs and hem', 'Antique gold zipper pull', 'Embroidered BILZERIAN crest', 'Interior TONNANO signature', 'Limited collector edition'], quantity: 60, image: '/images/bilzerian-ragnar.png', description: 'The collector piece of the chapter. RAGNAR pairs an insulated bomber silhouette with antique gold restraint.' },
]

export function getBilzerianProduct(slug: string) {
  return BILZERIAN_PRODUCTS.find((product) => product.slug === slug)
}
