import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import {getMessages, isLocale, locales, rtlLocales} from '@/i18n'

export function generateStaticParams() { return locales.map((locale) => ({locale})) }

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  const messages = await getMessages(locale)
  return { title: messages.meta.title, description: messages.meta.description, alternates: { canonical: `https://tonnano.com/${locale}`, languages: Object.fromEntries(locales.map((item) => [item, `https://tonnano.com/${item}`])) } }
}

export default async function LocaleLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
  const {locale} = await params
  if (!isLocale(locale)) notFound()
  const messages = await getMessages(locale)
  return <NextIntlClientProvider locale={locale} messages={messages}><div lang={locale} dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}>{children}</div></NextIntlClientProvider>
}
