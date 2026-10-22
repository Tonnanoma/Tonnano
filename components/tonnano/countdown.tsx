'use client'

import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { CountdownScene } from './countdown-scene'
import { useLocale } from './locale-provider'

const SIGNAL_VALUES = [
  '﷽', 'LYOUM 9BEL GHEDA', 'Morocco', 'مُبَاشَرَةً مِنْ مَدِينَةِ الْمُحَمَّدِيَّة', '12/11/2026',
  'ZARIRY', "Le Serpent d'Airain", 'BIENTÔT', 'Palestine', '12/12/2026', 'FIFA2030', 'Casablanca',
  'DROP 01', 'INNER CODE ACCESS', 'WHITELIST ONLY', 'SIGNAL DETECTED', 'CODE UNLOCKED', 'ACCESS PENDING',
  'THE FIRST CHAPTER', 'NO RESTOCK', 'MEMBERS ONLY', 'TIME IS CLOSE', 'THE CODE KNOWS',
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
  const { locale } = useLocale()
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
    <section className="relative overflow-hidden border-y border-border bg-[#080807] py-24 text-[#eee7d9] sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(194,166,111,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(194,166,111,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-sans text-[0.65rem] tracking-luxury text-[#c2a66f]">DROP 01</span>
          <h2 className="mt-5 font-serif text-3xl text-[#eee7d9] sm:text-5xl">THE FIRST CHAPTER</h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-[#a88d5d]/25 bg-black/20 shadow-[0_0_80px_rgba(139,48,38,0.12)]">
            <CountdownScene value={value} index={valueIndex} isArabic={isArabic} />
          </div>
          <div className="mt-7 flex flex-col items-center gap-3 font-sans text-[0.58rem] tracking-[0.32em] text-[#c2a66f] sm:flex-row sm:justify-center sm:gap-8">
            <span>{statuses[statusIndex]}</span>
            <span className="hidden h-px w-8 bg-[#a88d5d]/50 sm:block" />
            <span>{locale === 'ar' ? 'الوصول إلى الرمز الداخلي' : locale === 'fr' ? 'ACCÈS AU CODE INTERNE' : 'INNER CODE ACCESS'}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
