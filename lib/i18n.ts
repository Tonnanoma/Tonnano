import en from '@/messages/en.json'
import fr from '@/messages/fr.json'
import ar from '@/messages/ar.json'
import es from '@/messages/es.json'
import de from '@/messages/de.json'
import it from '@/messages/it.json'
import pt from '@/messages/pt.json'
import nl from '@/messages/nl.json'
import tr from '@/messages/tr.json'
import zh from '@/messages/zh.json'
import ja from '@/messages/ja.json'
import ru from '@/messages/ru.json'

export const locales = ['en','fr','ar','es','de','it','pt','nl','tr','zh','ja','ru'] as const
export type Locale = (typeof locales)[number]
export const localeNames: Record<Locale, string> = { en:'English', fr:'Français', ar:'العربية', es:'Español', de:'Deutsch', it:'Italiano', pt:'Português', nl:'Nederlands', tr:'Türkçe', zh:'中文', ja:'日本語', ru:'Русский' }
export const rtlLocales: Locale[] = ['ar']
export const messages = { en, fr, ar, es, de, it, pt, nl, tr, zh, ja, ru } as const
export type Messages = typeof en
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale) }
export function getMessages(locale: Locale) { return { ...en, ...messages[locale], bilzerian: messages[locale].bilzerian ?? en.bilzerian } }
