import { notFound } from 'next/navigation'
import { LocalizedLanding } from '@/components/tonnano/localized-landing'
import { getMessages, isLocale, locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() { return locales.map((locale) => ({ locale })) }

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <LocalizedLanding locale={locale as Locale} messages={await getMessages(locale as Locale)} />
}
