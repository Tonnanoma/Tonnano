import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMessages, isLocale, locales, rtlLocales, type Locale } from '@/lib/i18n'

export function generateStaticParams() { return locales.map((locale) => ({ locale })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const messages = await getMessages(locale)
  const languages = Object.fromEntries(locales.map((item) => [item, `/${item}`]))
  return { title: messages.meta.title, description: messages.meta.description, alternates: { canonical: `/${locale}`, languages }, openGraph: { title: messages.meta.title, description: messages.meta.description, locale }, twitter: { card: 'summary_large_image', title: messages.meta.title, description: messages.meta.description } }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <div lang={locale} dir={rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr'}>{children}</div>
}
