import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import {getMessages, isLocale, localeCodes, rtlLocales} from '@/i18n'

export function generateStaticParams() { return localeCodes.map((locale) => ({locale})) }

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  const messages = await getMessages(locale)
  return { title: messages.meta.title, description: messages.meta.description, alternates: { canonical: `https://tonnano.com/${locale}`, languages: Object.fromEntries(localeCodes.map((item) => [item, `https://tonnano.com/${item}`])) } }
}

export default async function LocaleLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
  const {locale} = await params
  if (!isLocale(locale)) notFound()
  const messages = await getMessages(locale)
  const direction = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  return <NextIntlClientProvider locale={locale} messages={messages}><div lang={locale} dir={direction} className={direction === 'rtl' ? 'font-sans' : undefined}>{children}</div></NextIntlClientProvider>
}
