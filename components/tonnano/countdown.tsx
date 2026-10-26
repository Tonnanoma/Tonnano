'use client'

import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { CountdownScene } from './countdown-scene'
import { useLocale } from './locale-provider'

const SIGNAL_VALUES = [
  'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
  'FEDALA',
  'LYOUM 9BEL GHEDA',
  'Morocco',
  'مُبَاشَرَةً مِنْ مَدِينَةِ الْمُحَمَّدِيَّة',
  'ZARIRY 🐉 🦁',
  'ٱللَّهُ أَكْبَرُ',
  'بسم الله الرحمن الرحيم',
  'PALESTINE فِلَسْطِين',
  '12/12/2026',
  'FIFA2030',
  'Casablanca',
  'DROP 01',
  'INNER CODE ACCESS',
  'Marrakech',
  'SIGNAL DETECTED',
  'CODE UNLOCKED',
  'ACCESS PENDING',
  'THE FIRST CHAPTER',
  'NO RESTOCK',
  'MEMBERS ONLY',
  'TIME IS CLOSE',
  'THE CODE KNOWS',
] as const

const STATUS_VALUES: Record<string, string[]> = {
  en: ['SIGNAL DETECTED', 'ACCESS PENDING', 'CODE UNLOCKED', 'WHITELIST ONLY', 'MEMBERS ONLY', 'TIME IS CLOSE'],
  fr: ['SIGNAL DÉTECTÉ', 'ACCÈS EN ATTENTE', 'CODE DÉVERROUILLÉ', 'LISTE BLANCHE UNIQUEMENT', 'MEMBRES UNIQUEMENT', 'LE MOMENT APPROCHE'],
  ar: ['تم رصد الإشارة', 'الوصول قيد الانتظار', 'تم فتح الرمز', 'للقائمة البيضاء فقط', 'للأعضاء فقط', 'الوقت يقترب'],
  es: ['SEÑAL DETECTADA', 'ACCESO PENDIENTE', 'CÓDIGO DESBLOQUEADO', 'SOLO LISTA BLANCA', 'SOLO MIEMBROS', 'EL MOMENTO SE ACERCA'],
  de: ['SIGNAL ERKANNT', 'ZUGANG AUSSTEHEND', 'CODE ENTSCHLÜSSELT', 'NUR WHITELIST', 'NUR MITGLIEDER', 'DIE ZEIT IST NAH'],
  it: ['SEGNALE RILEVATO', 'ACCESSO IN ATTESA', 'CODICE SBLOCCATO', 'SOLO WHITELIST', 'SOLO MEMBRI', 'IL MOMENTO SI AVVICINA'],
  pt: ['SINAL DETETADO', 'ACESSO PENDENTE', 'CÓDIGO DESBLOQUEADO', 'APENAS WHITELIST', 'APENAS MEMBROS', 'O MOMENTO SE APROXIMA'],
  nl: ['SIGNAAL GEDETECTEERD', 'TOEGANG IN AFWACHTING', 'CODE ONTGRENDELD', 'ALLEEN WHITELIST', 'ALLEEN LEDEN', 'DE TIJD NADERT'],
  tr: ['SİNYAL ALGILANDI', 'ERİŞİM BEKLİYOR', 'KOD AÇILDI', 'SADECE WHITELIST', 'SADECE ÜYELER', 'ZAMAN YAKIN'],
  zh: ['检测到信号', '访问待定', '代码已解锁', '仅限白名单', '仅限会员', '时间将近'],
  ja: ['シグナル検出', 'アクセス保留中', 'コード解除', 'ホワイトリスト限定', 'メンバー限定', '時が近づく'],
  ru: ['СИГНАЛ ОБНАРУЖЕН', 'ДОСТУП ОЖИДАЕТСЯ', 'КОД РАЗБЛОКИРОВАН', 'ТОЛЬКО WHITELIST', 'ТОЛЬКО УЧАСТНИКИ', 'ВРЕМЯ БЛИЗКО'],
}

function nextDelay() {
  return 2000 + Math.floor(Math.random() * 1501)
}

export function Countdown() {
  const { locale, messages: m } = useLocale()
  const [valueIndex, setValueIndex] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      timeout = setTimeout(() => {
        setValueIndex((current) => (current + 1) % SIGNAL_VALUES.length)
        schedule()
      }, nextDelay())
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setStatusIndex((current) => (current + 1) % 6), 3200)
    return () => clearInterval(id)
  }, [])

  const value = SIGNAL_VALUES[valueIndex]
  const statuses = STATUS_VALUES[locale] ?? STATUS_VALUES.en
  const isArabic = /[\u0600-\u06FF]/.test(value)

  return (
    <section className="countdown-vault relative overflow-hidden border-y border-[#b79b6b]/20 bg-[#0a0a0a] py-20 text-[#eee7d9] sm:py-32">
      <div className="countdown-vault__beam pointer-events-none absolute inset-y-0 left-1/2 w-1/3 -translate-x-1/2" />
      <div className="countdown-vault__grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-8">
        <div className="countdown-vault__frame pointer-events-none absolute inset-x-4 top-0 bottom-0 border border-[#b79b6b]/40 sm:inset-x-8" aria-hidden="true">
          <span className="absolute -left-px -top-px h-8 w-8 border-l border-t border-[#b79b6b]" />
          <span className="absolute -right-px -top-px h-8 w-8 border-r border-t border-[#b79b6b]" />
          <span className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-[#b79b6b]" />
          <span className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-[#b79b6b]" />
        </div>
        <Reveal>
          <span className="relative font-sans text-[0.6rem] tracking-luxury text-[#b79b6b]">{m.drop.eyebrow}</span>
          <h2 className="relative mt-5 font-serif text-3xl text-[#eee7d9] sm:text-5xl">{m.drop.eyebrow}</h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="countdown-vault__panel relative mx-auto mt-8 max-w-4xl border border-white/10 bg-white/[0.025] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="countdown-vault__hairline absolute left-1/2 top-0 h-full w-px bg-[#b79b6b]/40 sm:hidden" aria-hidden="true" />
            <CountdownScene value={value} index={valueIndex} isArabic={isArabic} />
          </div>
          <div className="relative mt-7 flex flex-col items-center gap-3 font-sans text-[0.58rem] tracking-[0.32em] text-[#b79b6b] sm:flex-row sm:justify-center sm:gap-8" aria-live="polite">
            <span>{statuses[statusIndex]}</span>
            <span className="hidden h-px w-8 bg-[#b79b6b]/50 sm:block" />
            <span>{m.nav.inner}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
