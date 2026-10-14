'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Shield,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { IMAGES } from '@/lib/site'

const locales = ['en', 'fr', 'ar', 'es', 'hi', 'zh', 'nl', 'ru'] as const

type Locale = (typeof locales)[number]

type Product = {
  id: string
  name: string
  code: string
  status: string
  price: string
  description: string
  colors: string[]
  material: string
  build: string
  quantity: string
  image: string
}

const productList: Product[] = [
  {
    id: 'cold-blood',
    name: 'COLD BLOOD',
    code: 'TN-WC-001',
    status: 'LOCKED — INNER CODE ACCESS',
    price: '€420',
    description: 'Oversized heavyweight hoodie built for frost, discipline and late-night execution.',
    colors: ['Black', 'Stone Grey', 'Bone White'],
    material: 'Heavyweight brushed fleece',
    build: 'Tonal embroidery, hidden inside label: BUILT IN COLD',
    quantity: 'Limited to 240 pieces',
    image: IMAGES.snakeFlat,
  },
  {
    id: 'night-protocol',
    name: 'NIGHT PROTOCOL',
    code: 'TN-WC-002',
    status: 'COMING SOON',
    price: '€580',
    description: 'Technical luxury zip jacket with matte black finish, silver hardware and coded interior details.',
    colors: ['Matte Black', 'Silver Hardware'],
    material: 'Technical shell with brushed lining',
    build: 'Chest patch, engraved zipper pull and coded interior pattern',
    quantity: 'Limited to 180 pieces',
    image: IMAGES.blackDuoOutdoor,
  },
  {
    id: 'marble-ash',
    name: 'MARBLE ASH',
    code: 'TN-WC-003',
    status: 'COMING SOON',
    price: '€390',
    description: 'Premium knit sweater with mineral softness and quiet authority for colder nights.',
    colors: ['Ash Grey', 'Bone', 'Deep Charcoal'],
    material: 'Premium heavy knit wool blend',
    build: 'Minimal tonal embroidery and stone-inspired finish',
    quantity: 'Limited to 210 pieces',
    image: IMAGES.taupeFlat,
  },
  {
    id: 'zero-degree',
    name: 'ZERO DEGREE',
    code: 'TN-WC-004',
    status: 'LOCKED — INNER CODE ACCESS',
    price: '€690',
    description: 'Sculptural oversized puffer engineered to protect the body while keeping the silhouette sharp.',
    colors: ['Matte Black', 'Off White'],
    material: 'High-fill insulated shell',
    build: 'Geometric quilting, hidden hood and reflective micro-logo',
    quantity: 'Limited to 120 pieces',
    image: IMAGES.whiteFlat,
  },
  {
    id: 'stone-route',
    name: 'STONE ROUTE',
    code: 'TN-WC-005',
    status: 'COMING SOON',
    price: '€470',
    description: 'Wide-leg cargo trousers shaped for movement, utility and silence in cold weather.',
    colors: ['Charcoal', 'Black', 'Sand Stone'],
    material: 'Premium cotton twill with utility reinforcement',
    build: 'Utility pockets, reinforced stitching and woven label',
    quantity: 'Limited to 260 pieces',
    image: IMAGES.rustFlat,
  },
  {
    id: 'ghost-unit',
    name: 'GHOST UNIT',
    code: 'TN-WC-006',
    status: 'COMING SOON',
    price: '€180',
    description: 'Premium beanie and balaclava duo made to disappear into motion and winter air.',
    colors: ['Black', 'Grey', 'Bone'],
    material: 'Premium ribbed knit',
    build: 'Small embroidered monogram with optional balaclava layering',
    quantity: 'Limited to 310 pieces',
    image: IMAGES.purpleFlat,
  },
  {
    id: 'before-the-drop',
    name: 'BEFORE THE DROP',
    code: 'TN-WC-007',
    status: 'LOCKED — INNER CODE ACCESS',
    price: '€260',
    description: 'Heavyweight long sleeve built for the silent hours before a signal becomes history.',
    colors: ['Black', 'Stone', 'Bone'],
    material: 'Heavyweight cotton jersey',
    build: 'Minimal branding and encrypted back graphic',
    quantity: 'Limited to 340 pieces',
    image: IMAGES.blackFlat,
  },
  {
    id: 'legacy-box',
    name: 'LEGACY BOX',
    code: 'TN-WC-008',
    status: 'LOCKED — INNER CODE ACCESS',
    price: '€920',
    description: 'Premium boxed set including a selected Winter Code piece, numbered card and institutional packaging.',
    colors: ['Black', 'Stone', 'Bone'],
    material: 'Premium presentation set with archival packaging',
    build: 'Certificate, numbered card, branded packaging and selected piece',
    quantity: 'Only 80 boxes available',
    image: IMAGES.whiteDuoStudio,
  },
]

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'AR',
  es: 'ES',
  hi: 'HI',
  zh: 'ZH',
  nl: 'NL',
  ru: 'RU',
}

const translations = {
  en: {
    intro: 'EST. 2026 — MADE IN MOROCCO',
    heroEyebrow: 'TONNANO — WINTER CODE',
    heroTitle: 'TIME BUILDS LEGENDS',
    heroSubtitle: 'A new chapter is forming in the cold. Access is not public.',
    ctaPrimary: 'JOIN THE INNER CODE',
    ctaSecondary: 'DISCOVER THE WINTER CODE',
    tagline: 'THE WINTER CODE IS COMING',
    nav: ['HOME', 'THE CODE', 'WINTER COLLECTION', '3D EXPERIENCE', 'CRAFT', 'INNER CODE', 'THE UNLOCK', 'CONTACT'],
    manifesto: {
      kicker: 'THE PHILOSOPHY',
      text1: 'TONNANO is not made for everyone.',
      text2: 'It is made for those who move in silence,',
      text3: 'build in the dark,',
      text4: 'and let time reveal their legacy.',
      text5: 'Every TONNANO piece is designed as part of a story:',
      text6: 'premium materials, precise construction,',
      text7: 'and details created to last beyond seasons.',
    },
    collection: {
      kicker: 'THE WINTER ARCHIVE',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'Winter is not a season. Winter is a test.',
    },
  },
  fr: {
    intro: 'EST. 2026 — FABRIQUÉ AU MAROC',
    heroEyebrow: 'TONNANO — CODE HIVERNAL',
    heroTitle: 'LE TEMPS FORGE LES LÉGENDES',
    heroSubtitle: 'Un nouveau chapitre se forme dans le froid. L’accès n’est pas public.',
    ctaPrimary: 'REJOINDRE LE CODE INTÉRIEUR',
    ctaSecondary: 'DÉCOUVRIR LE CODE HIVERNAL',
    tagline: 'LE CODE HIVERNAL ARRIVE',
    nav: ['ACCUEIL', 'LE CODE', 'COLLECTION HIVER', '3D', 'CRAFT', 'CODE INTÉRIEUR', 'LE DÉVERROUILLAGE', 'CONTACT'],
    manifesto: {
      kicker: 'LA PHILOSOPHIE',
      text1: 'TONNANO n’est pas fait pour tout le monde.',
      text2: 'Il est fait pour ceux qui avancent en silence,',
      text3: 'construisent dans l’ombre,',
      text4: 'et laissent le temps révéler leur légende.',
      text5: 'Chaque pièce TONNANO est conçue comme une histoire :',
      text6: 'matières premium, construction précise,',
      text7: 'et détails conçus pour durer au-delà des saisons.',
    },
    collection: {
      kicker: 'L’ARCHIVE HIVERNALE',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'L’hiver n’est pas une saison. L’hiver est un test.',
    },
  },
  ar: {
    intro: 'EST. 2026 — مصنوع في المغرب',
    heroEyebrow: 'توننانو — الرمز الشتوي',
    heroTitle: 'الوقت يبني الأساطير',
    heroSubtitle: 'فصل جديد يتشكل في البرودة. الوصول ليس عامًا.',
    ctaPrimary: 'انضم إلى الكود الداخلي',
    ctaSecondary: 'اكتشف الرمز الشتوي',
    tagline: 'الرمز الشتوي قادم',
    nav: ['الرئيسية', 'الكود', 'مجموعة الشتاء', 'تجربة 3D', 'الحرف', 'الكود الداخلي', 'الفك', 'تواصل'],
    manifesto: {
      kicker: 'الفلسفة',
      text1: 'TONNANO ليس مصنوعًا للجميع.',
      text2: 'بل هو مصمم لأولئك الذين يتحركون بصمت,',
      text3: 'ويبنون في الظلام,',
      text4: 'ويتركون الوقت يكشف عن تراثهم.',
      text5: 'كل قطعة TONNANO مصممة كجزء من قصة:',
      text6: 'مواد فاخرة، بناء دقيق,',
      text7: 'وتفاصيل مصممة لتحمل أكثر من مواسم.',
    },
    collection: {
      kicker: 'أرشيف الشتاء',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'الشتاء ليس موسمًا. الشتاء اختبار.',
    },
  },
  es: {
    intro: 'EST. 2026 — HECHO EN MARRUECOS',
    heroEyebrow: 'TONNANO — CÓDIGO INVERNAL',
    heroTitle: 'EL TIEMPO FORJA LEYENDAS',
    heroSubtitle: 'Un nuevo capítulo se forma en el frío. El acceso no es público.',
    ctaPrimary: 'ÚNETE AL CÓDIGO INTERNO',
    ctaSecondary: 'DESCUBRE EL CÓDIGO INVERNAL',
    tagline: 'EL CÓDIGO INVERNAL LLEGA',
    nav: ['INICIO', 'CÓDIGO', 'COLECCIÓN', '3D', 'ARTESANÍA', 'CÓDIGO INTERNO', 'DESBLOQUEO', 'CONTACTO'],
    manifesto: {
      kicker: 'LA FILOSOFÍA',
      text1: 'TONNANO no está hecho para todos.',
      text2: 'Está hecho para quienes se mueven en silencio,',
      text3: 'construyen en la oscuridad,',
      text4: 'y dejan que el tiempo revele su legado.',
      text5: 'Cada pieza de TONNANO está diseñada como parte de una historia:',
      text6: 'materiales premium, construcción precisa,',
      text7: 'y detalles creados para durar más allá de las temporadas.',
    },
    collection: {
      kicker: 'ARCHIVO INVERNAL',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'El invierno no es una temporada. El invierno es una prueba.',
    },
  },
  hi: {
    intro: 'EST. 2026 — मोरक्को में निर्मित',
    heroEyebrow: 'टॉननानो — विंटर कोड',
    heroTitle: 'समय लिगेन्ड्स बनाता है',
    heroSubtitle: 'ठंड में एक नया अध्याय बन रहा है। एक्सेस सार्वजनिक नहीं है।',
    ctaPrimary: 'इंद्र कोड में शामिल हों',
    ctaSecondary: 'विंटर कोड देखें',
    tagline: 'विंटर कोड आ रहा है',
    nav: ['होम', 'कोड', 'विंटर कलेक्शन', '3D', 'क्राफ्ट', 'इंर कोड', 'अनलॉक', 'संपर्क'],
    manifesto: {
      kicker: 'दर्शन',
      text1: 'टननानो सबके लिए नहीं बनाया गया।',
      text2: 'यह उन लोगों के लिए है जो मौन में चलते हैं,',
      text3: 'अंधेरे में बनाते हैं,',
      text4: 'और समय उनके विरासत को उजागर करता है।',
      text5: 'हर TONNANO हिस्सा एक कहानी का हिस्सा है:',
      text6: 'प्रीमियम सामग्री, सटीक निर्माण,',
      text7: 'और ऐसे विवरण जो मौसमों के पार टिकें।',
    },
    collection: {
      kicker: 'विंटर आर्काइव',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'सर्दी एक मौसम नहीं है. सर्दी एक परीक्षण है.',
    },
  },
  zh: {
    intro: 'EST. 2026 — 摩洛哥制造',
    heroEyebrow: 'TONNANO — 冬季代码',
    heroTitle: '时间铸就传奇',
    heroSubtitle: '新的篇章在寒冷中成形。访问权限并非公开。',
    ctaPrimary: '加入 INNER CODE',
    ctaSecondary: '探索冬季代码',
    tagline: '冬季代码正在到来',
    nav: ['首页', '代码', '冬季系列', '3D', '工艺', 'INNER CODE', '解锁', '联系'],
    manifesto: {
      kicker: '哲学',
      text1: 'TONNANO 不是为所有人而造。',
      text2: '它是为那些在沉默中前行、',
      text3: '在黑暗中建造、',
      text4: '并让时间揭示其传奇的人而造。',
      text5: '每一件 TONNANO 都像故事中的一页：',
      text6: '顶级材质、精确工艺、',
      text7: '以及跨越季节的细节设计。',
    },
    collection: {
      kicker: '冬季档案',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: '冬天不是季节，它是一场考验。',
    },
  },
  nl: {
    intro: 'EST. 2026 — Gemaakt in Marokko',
    heroEyebrow: 'TONNANO — WINTER CODE',
    heroTitle: 'TIJD BOUWT LEGENDEN',
    heroSubtitle: 'Een nieuw hoofdstuk ontstaat in de kou. Toegang is niet openbaar.',
    ctaPrimary: 'WORD LID VAN DE INNER CODE',
    ctaSecondary: 'ONTDEK DE WINTER CODE',
    tagline: 'DE WINTER CODE KOMT',
    nav: ['HOME', 'CODE', 'WINTERCOLLECTIE', '3D', 'CRAFT', 'INNER CODE', 'ONTGREND', 'CONTACT'],
    manifesto: {
      kicker: 'FILOSOFIE',
      text1: 'TONNANO is niet voor iedereen gemaakt.',
      text2: 'Het is gemaakt voor degenen die in stilte bewegen,',
      text3: 'in het donker bouwen,',
      text4: 'en de tijd hun nalatenschap laten onthullen.',
      text5: 'Elk TONNANO-stuk is ontworpen als onderdeel van een verhaal:',
      text6: 'premiummaterialen, precieze constructie,',
      text7: 'en details die verder reiken dan seizoenen.',
    },
    collection: {
      kicker: 'WINTERARCHIEF',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'De winter is geen seizoen. De winter is een test.',
    },
  },
  ru: {
    intro: 'EST. 2026 — Сделано в Марокко',
    heroEyebrow: 'TONNANO — ЗИМНИЙ КОД',
    heroTitle: 'ВРЕМЯ ВЫЛЕПЛИВАЕТ ЛЕГЕНДЫ',
    heroSubtitle: 'Новая глава формируется в холоде. Доступ не публичен.',
    ctaPrimary: 'ПРИСОЕДИНИТЬСЯ К INNER CODE',
    ctaSecondary: 'ПОСМОТРЕТЬ ЗИМНИЙ КОД',
    tagline: 'ЗИМНИЙ КОД СКОРО',
    nav: ['ГЛАВНАЯ', 'КОД', 'ЗИМНЯЯ КОЛЛЕКЦИЯ', '3D', 'КРАФТ', 'INNER CODE', 'РАЗБЛОКИРОВКА', 'КОНТАКТ'],
    manifesto: {
      kicker: 'ФИЛОСОФИЯ',
      text1: 'TONNANO создан не для всех.',
      text2: 'Он создан для тех, кто движется в тишине,',
      text3: 'строит во тьме,',
      text4: 'и позволяет времени раскрыть свою легенду.',
      text5: 'Каждая вещь TONNANO — часть истории:',
      text6: 'премиальные материалы, точная сборка,',
      text7: 'и детали, созданные чтобы жить дольше сезонов.',
    },
    collection: {
      kicker: 'ЗИМНИЙ АРХИВ',
      title: 'COLD BLOOD / BUILT IN COLD',
      subtitle: 'Зима — не сезон. Зима — испытание.',
    },
  },
} as const

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/tonnano.official/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://ma.linkedin.com/company/tonnanomorocco', icon: Linkedin },
  { label: 'Facebook', href: 'https://web.facebook.com/people/Tonnano/61592861136110/?sk=reels_tab', icon: Facebook },
]

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Page() {
  const [locale, setLocale] = useState<Locale>('en')
  const [introOpen, setIntroOpen] = useState(true)
  const [muted, setMuted] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState(getRemaining(new Date('2026-12-18T18:00:00Z').getTime()))
  const [memberCount, setMemberCount] = useState(482)

  const text = useMemo(() => translations[locale], [locale])

  useEffect(() => {
    const storedLocale = window.localStorage.getItem('tonnano-locale') as Locale | null
    if (storedLocale && locales.includes(storedLocale)) setLocale(storedLocale)

    const seenIntro = window.localStorage.getItem('tonnano-intro-seen')
    if (seenIntro === '1') setIntroOpen(false)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('tonnano-locale', locale)
  }, [locale])

  useEffect(() => {
    const onMove = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const target = new Date('2026-12-18T18:00:00Z').getTime()
    const tick = () => setTime(getRemaining(target))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!introOpen) window.localStorage.setItem('tonnano-intro-seen', '1')
  }, [introOpen])

  const unlockMode = 'COUNTDOWN'
  const modeLabel =
    unlockMode === 'COUNTDOWN'
      ? 'DAYS : HOURS : MINUTES : SECONDS'
      : unlockMode === 'MYSTERY MODE'
        ? 'SIGNAL DETECTED'
        : 'HOLDING SIGNAL'

  const progressPercent = (memberCount / 1000) * 100

  return (
    <div className="tonnano-shell">
      <div className="custom-cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} aria-hidden />
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden />

      <AnimatePresence>
        {introOpen && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="intro-scan" aria-hidden />
            <div className="intro-particles" aria-hidden>
              {Array.from({ length: 26 }).map((_, i) => (
                <span key={i} style={{ left: `${(i * 7) % 100}%`, animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>

            <div className="intro-inner">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                className="intro-kicker"
              >
                {text.intro}
              </motion.p>

              <div className="intro-logo-wrap">
                {Array.from('TONNANO').map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.08 }}
                    className="intro-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="intro-tag"
              >
                TIME BUILDS LEGENDS
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4 }}
                className="intro-subtag"
              >
                THE WINTER CODE IS COMING
              </motion.p>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.8 }}
                className="intro-cta"
                onClick={() => setIntroOpen(false)}
              >
                ENTER THE CODE
              </motion.button>
            </div>

            <div className="intro-actions">
              <button type="button" className="glass-button" onClick={() => setIntroOpen(false)}>
                SKIP INTRO
              </button>
              <button type="button" className="glass-button" onClick={() => setMuted((value) => !value)}>
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="top-header">
        <div className="nav-bar shell">
          <div className="brand-lockup">TONNANO</div>

          <nav className="desktop-nav" aria-label="Main navigation">
            {text.nav.map((item, index) => (
              <a key={`${item}-${index}`} href={index === 0 ? '#top' : '#'} className="nav-link">
                {item}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-switcher" aria-label="Language switcher">
              {locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={locale === item ? 'lang-pill active' : 'lang-pill'}
                  onClick={() => setLocale(item)}
                >
                  {localeLabels[item]}
                </button>
              ))}
            </div>
            <button type="button" className="primary-button small">
              JOIN
            </button>
            <button type="button" className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-head">
              <div className="brand-lockup small">TONNANO</div>
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="mobile-links">
              {text.nav.map((item, index) => (
                <a key={`${item}-${index}`} href={index === 0 ? '#top' : '#'} onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
            <div className="lang-switcher large">
              {locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={locale === item ? 'lang-pill active' : 'lang-pill'}
                  onClick={() => setLocale(item)}
                >
                  {localeLabels[item]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top" className="page-shell">
        <section className="hero-section shell">
          <div className="hero-visual" aria-hidden>
            <div className="hero-glow" />
            <div className="hero-object">
              <div className="hero-object-core" />
              <div className="hero-object-ring ring-a" />
              <div className="hero-object-ring ring-b" />
            </div>
            <div className="hero-particles">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} style={{ left: `${(i * 11) % 100}%`, animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">{text.heroEyebrow}</p>
            <h1>{text.heroTitle}</h1>
            <p className="hero-subtitle">{text.heroSubtitle}</p>

            <div className="cta-row">
              <button type="button" className="primary-button">
                {text.ctaPrimary}
              </button>
              <button type="button" className="secondary-button">
                {text.ctaSecondary}
              </button>
            </div>
          </div>

          <div className="scroll-cue">
            <span>SCROLL</span>
            <ArrowDown size={14} />
          </div>
        </section>

        <section className="manifesto shell section-block">
          <div className="section-kicker">{text.manifesto.kicker}</div>
          <div className="manifesto-copy">
            <p>{text.manifesto.text1}</p>
            <p>{text.manifesto.text2}</p>
            <p>{text.manifesto.text3}</p>
            <p>{text.manifesto.text4}</p>
            <p>{text.manifesto.text5}</p>
            <p>{text.manifesto.text6}</p>
            <p>{text.manifesto.text7}</p>
          </div>
        </section>

        <section className="collection section-block">
          <div className="shell">
            <div className="section-headline">
              <div>
                <p className="section-kicker">{text.collection.kicker}</p>
                <h2>{text.collection.title}</h2>
              </div>
              <p className="section-intro">{text.collection.subtitle}</p>
            </div>

            <div className="product-grid">
              {productList.map((product) => (
                <article key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-meta">
                    <div>
                      <p className="product-name">{product.name}</p>
                      <p className="product-code">{product.code}</p>
                    </div>
                    <span className="product-state">{product.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience section-block shell">
          <div className="section-kicker">3D EXPERIENCE</div>
          <div className="experience-grid">
            <div className="experience-visual">
              <div className="studio-cube" />
              <div className="hotspot hotspot-one" onClick={() => setSelectedProduct(productList[0])}>Embroidery</div>
              <div className="hotspot hotspot-two" onClick={() => setSelectedProduct(productList[0])}>Fabric</div>
              <div className="hotspot hotspot-three" onClick={() => setSelectedProduct(productList[0])}>Padding</div>
            </div>
            <div className="experience-copy">
              <h3>COLD BLOOD HOODIE</h3>
              <p>
                A sculptural inner-layer silhouette with tonal embroidery, hidden messaging and weather-ready structure.
              </p>
              <div className="spec-list">
                <div><span>Material</span><strong>Heavyweight brushed fleece</strong></div>
                <div><span>Construction</span><strong>Oversized fit / hidden interior label</strong></div>
                <div><span>Code</span><strong>TN-WC-001</strong></div>
              </div>
              <button type="button" className="primary-button">
                VIEW IN 3D
              </button>
            </div>
          </div>
        </section>

        <section className="craft section-block shell">
          <div className="section-kicker">CRAFTED IN MOROCCO</div>
          <h2>Built with intention. Made with patience.</h2>
          <div className="craft-grid">
            <div className="craft-panel tall">
              <img src={IMAGES.snakeDuoMarble} alt="Marble stone texture and garment detail" />
            </div>
            <div className="craft-panel">
              <img src={IMAGES.blackDuoLight} alt="Tone-on-tone garment closeup" />
            </div>
            <div className="craft-panel">
              <img src={IMAGES.whiteSetStanding} alt="Editorial product detail" />
            </div>
            <div className="craft-panel wide">
              <img src={IMAGES.trioLounge} alt="Editorial campaign composition" />
            </div>
          </div>
          <p className="craft-note">No restocks. No repetition.</p>
        </section>

        <section className="unlock section-block">
          <div className="shell unlock-inner">
            <div className="section-kicker">THE UNLOCK</div>
            <h2>{unlockMode === 'COUNTDOWN' ? 'ACCESS LEVEL RISING' : 'THE CODE IS CLOSE'}</h2>
            <div className="unlock-grid">
              {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((unit) => (
                <div key={unit} className="time-box">
                  <span className="time-value">
                    {unit === 'DAYS' ? String(time.days).padStart(2, '0') : unit === 'HOURS' ? String(time.hours).padStart(2, '0') : unit === 'MINUTES' ? String(time.minutes).padStart(2, '0') : String(time.seconds).padStart(2, '0')}
                  </span>
                  <span className="time-label">{unit}</span>
                </div>
              ))}
            </div>
            <div className="member-bar-wrap">
              <div className="member-bar-head">
                <span>ACCESS LEVEL</span>
                <span>{memberCount} / 1000</span>
              </div>
              <div className="member-bar">
                <div style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <div className="unlock-footer">
              <span>CODED MEMBERS: {String(memberCount).padStart(3, '0')} / 1,000</span>
              <button type="button" className="primary-button">
                CLAIM YOUR CODE
              </button>
            </div>
          </div>
        </section>

        <section className="whitelist section-block shell">
          <div className="whitelist-panel">
            <div className="section-kicker">JOIN THE INNER CODE</div>
            <h2>Limited to the first 1,000 founding members.</h2>
            <div className="whitelist-form">
              <div className="field-grid">
                <label>
                  <span>Full name</span>
                  <input type="text" placeholder="Your name" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" placeholder="name@email.com" />
                </label>
                <label>
                  <span>Instagram username</span>
                  <input type="text" placeholder="@tonnano.official" />
                </label>
                <label>
                  <span>Country</span>
                  <input type="text" placeholder="Morocco" />
                </label>
                <label className="full-width">
                  <span>Preferred size</span>
                  <input type="text" placeholder="M / L / XL" />
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="primary-button">CLAIM YOUR CODE</button>
                <span className="privacy-note">Privacy note: only used for member access and early-drop communication.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="social section-block shell">
          <div className="section-kicker">FOLLOW THE STORY</div>
          <h2>Be the first to witness each chapter unfold.</h2>
          <div className="social-grid">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="social-card">
                <Icon size={22} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <div className="brand-lockup">TONNANO</div>
            <p className="footer-tag">TIME BUILDS LEGENDS</p>
            <p className="footer-note">EST. 2026 — MADE IN MOROCCO</p>
          </div>

          <div className="footer-links">
            <a href="#top">HOME</a>
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS & CONDITIONS</a>
            <a href="#">SHIPPING & RETURNS</a>
          </div>

          <div className="footer-actions">
            <button type="button" className="footer-button" onClick={() => setIntroOpen(true)}>
              REPLAY INTRO
            </button>
            <div className="lang-switcher footer-lang">
              {locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={locale === item ? 'lang-pill active' : 'lang-pill'}
                  onClick={() => setLocale(item)}
                >
                  {localeLabels[item]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close">
                <X size={20} />
              </button>
              <div className="modal-visual">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-copy">
                <p className="section-kicker">{selectedProduct.code}</p>
                <h3>{selectedProduct.name}</h3>
                <p className="modal-price">{selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
                <ul>
                  <li><strong>Colorways:</strong> {selectedProduct.colors.join(', ')}</li>
                  <li><strong>Material:</strong> {selectedProduct.material}</li>
                  <li><strong>Construction:</strong> {selectedProduct.build}</li>
                  <li><strong>Limited:</strong> {selectedProduct.quantity}</li>
                </ul>
                <div className="modal-actions">
                  <button type="button" className="primary-button">NOTIFY ME</button>
                  <button type="button" className="secondary-button">JOIN WAITLIST</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}































































































































































































































































































































n




