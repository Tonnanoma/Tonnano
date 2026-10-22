import { notFound } from 'next/navigation'
import { BilzerianProductPage } from '@/components/bilzerian/product-page'
import { BILZERIAN_PRODUCTS, getBilzerianProduct } from '@/lib/bilzerian'

export function generateStaticParams() {
  return BILZERIAN_PRODUCTS.map(({ slug }) => ({ slug }))
}

export default async function BilzerianProductRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getBilzerianProduct(slug)
  if (!product) notFound()
  return <BilzerianProductPage product={product} />
}
