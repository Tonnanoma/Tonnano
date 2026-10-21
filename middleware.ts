import createMiddleware from 'next-intl/middleware'
import { defaultLocale, localeCodes } from './i18n'

export default createMiddleware({
  locales: [...localeCodes],
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
