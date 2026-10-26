import { notFound } from 'next/navigation'
import { CollectionProductPage } from '@/components/collection-product-page'
import { INNER_CODE_PRODUCTS, getCollectionProduct } from '@/data/collections'
export function generateStaticParams() { return INNER_CODE_PRODUCTS.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const product = getCollectionProduct((await params).slug); return { title: product?.name ?? 'Product', description: product?.description } }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const product = getCollectionProduct((await params).slug); if (!product || product.collection !== 'inner-code') notFound(); return <CollectionProductPage product={product} /> }
