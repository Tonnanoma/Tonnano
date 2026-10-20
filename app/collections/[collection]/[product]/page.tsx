import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allProducts, collections, findProduct } from '@/lib/catalog'
import TShirtViewer from '@/components/three/TShirtViewer'
export function generateStaticParams(){return allProducts.map(({collection,slug})=>({collection,product:slug}))}
export default async function ProductPage({params}:{params:Promise<{collection:string;product:string}>}){const {product}=await params;const item=findProduct(product);if(!item)notFound();return <main className="subpage"><header className="topbar"><Link href="/" className="wordmark">TONNANO<span>®</span></Link><Link className="access-link" href={`/collections/${item.collection}`}>BACK TO COLLECTION ↗</Link></header><section className="product-detail"><div className="product-detail-copy"><p className="eyebrow">{item.eyebrow}</p><h1>{item.name}</h1><p className="subpage-intro">{item.description}</p><div className="detail-meta"><span>NO PRICE / PRE-DROP</span><span>{item.color}</span><span>MADE IN MOROCCO</span></div><Link className="button button-bronze" href="/whitelist">JOIN THE WHITELIST ↗</Link></div><TShirtViewer/></section></main>}
