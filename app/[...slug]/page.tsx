import Link from 'next/link'

const catalog = {
  archive: { title: 'The Archive', intro: 'Four rooms. One signal.', links: [['Origin', '/archive/origin'], ['Drop 01', '/archive/drop-01'], ['Inner Code', '/archive/inner-code']] },
  collections: { title: 'Collections', intro: 'Original capsules, limited by design.', links: [['First Signal', '/collections/first-signal'], ['Atlas Edition', '/collections/atlas-edition'], ['Inner Code Objects', '/collections/inner-code-objects'], ['Showroom', '/collections/showroom']] },
  journal: { title: 'Journal', intro: 'Field notes from the house.', links: [['The first chapter', '/journal/the-first-chapter'], ['Made in Morocco', '/journal/made-in-morocco']] },
  whitelist: { title: 'Access is earned.', intro: 'The first release is reserved for the Inner Code.', links: [['Request access', '/inner-code']] },
  'inner-code': { title: 'Inner Code', intro: 'A private room for those who decoded the signal.', links: [['Request access', '/whitelist']] },
  about: { title: 'Origin', intro: 'TONNANO is a Moroccan house built around time, restraint and the people who recognize both.', links: [['Enter the archive', '/archive']] },
  contact: { title: 'Contact', intro: 'For private enquiries, collaborations and press: hello@tonnano.com', links: [] },
}

export default async function HubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const key = slug[0] as keyof typeof catalog
  const data = catalog[key] ?? { title: slug.map((part) => part.replaceAll('-', ' ')).join(' / '), intro: 'The signal continues.', links: [['Return home', '/']] }
  return <main className="subpage"><header className="topbar"><Link href="/" className="wordmark">TONNANO<span>®</span></Link><Link className="access-link" href="/whitelist">REQUEST ACCESS ↗</Link></header><section className="subpage-hero"><p className="eyebrow">TONNANO CODE / {slug.join(' / ').toUpperCase()}</p><h1>{data.title}</h1><p className="subpage-intro">{data.intro}</p><div className="route-grid">{data.links.map(([label, href]) => <Link href={href} key={href}><span>{label}</span><b>↗</b></Link>)}</div></section><footer><span>TONNANO — TIME BUILDS LEGENDS</span><Link href="/">RETURN TO SIGNAL ↗</Link></footer></main>
}
