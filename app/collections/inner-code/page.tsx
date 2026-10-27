import { CollectionPage } from '@/components/collection-page'
import { INNER_CODE_PRODUCTS } from '@/data/collections'

export const metadata = { title: 'Inner Code Collection | TONNANO', description: 'The first TONNANO collection.' }

export default function Page() {
  return <CollectionPage products={INNER_CODE_PRODUCTS} title="INNER CODE" intro="The first TONNANO collection. Six considered silhouettes, made in Morocco and designed to become part of your daily code." />
}
