export type MysteryLabelKind = 'relative' | 'date' | 'time' | 'now'

export type MysteryLabel = {
  key: string
  kind: MysteryLabelKind
}

export const MYSTERY_LABELS: MysteryLabel[] = [
  { key: 'tomorrow', kind: 'relative' },
  { key: 'nextMonth', kind: 'relative' },
  { key: 'nextYear', kind: 'relative' },
  { key: 'now', kind: 'now' },
  { key: 'dateOne', kind: 'date' },
  { key: 'dateTwo', kind: 'date' },
  { key: 'time', kind: 'time' },
  { key: 'verySoon', kind: 'relative' },
  { key: 'comingBack', kind: 'relative' },
  { key: 'unknown', kind: 'relative' },
]

export const MYSTERY_LABEL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: { tomorrow: 'Tomorrow', nextMonth: 'Next month', nextYear: 'Next year', now: 'NOW', verySoon: 'Very soon', comingBack: 'Coming back', unknown: '???' },
  fr: { tomorrow: 'Demain', nextMonth: 'Le mois prochain', nextYear: "L'année prochaine", now: 'MAINTENANT', verySoon: 'Très bientôt', comingBack: 'De retour', unknown: '???' },
  es: { tomorrow: 'Mañana', nextMonth: 'El próximo mes', nextYear: 'El próximo año', now: 'AHORA', verySoon: 'Muy pronto', comingBack: 'Volvemos', unknown: '???' },
  de: { tomorrow: 'Morgen', nextMonth: 'Nächsten Monat', nextYear: 'Nächstes Jahr', now: 'JETZT', verySoon: 'Sehr bald', comingBack: 'Kommt zurück', unknown: '???' },
  it: { tomorrow: 'Domani', nextMonth: 'Il prossimo mese', nextYear: 'Il prossimo anno', now: 'ORA', verySoon: 'Molto presto', comingBack: 'Torna presto', unknown: '???' },
  pt: { tomorrow: 'Amanhã', nextMonth: 'Próximo mês', nextYear: 'Próximo ano', now: 'AGORA', verySoon: 'Muito em breve', comingBack: 'Voltamos', unknown: '???' },
  nl: { tomorrow: 'Morgen', nextMonth: 'Volgende maand', nextYear: 'Volgend jaar', now: 'NU', verySoon: 'Binnenkort', comingBack: 'Komt terug', unknown: '???' },
  tr: { tomorrow: 'Yarın', nextMonth: 'Gelecek ay', nextYear: 'Gelecek yıl', now: 'ŞİMDİ', verySoon: 'Çok yakında', comingBack: 'Geri dönüyor', unknown: '???' },
  ru: { tomorrow: 'Завтра', nextMonth: 'В следующем месяце', nextYear: 'В следующем году', now: 'СЕЙЧАС', verySoon: 'Очень скоро', comingBack: 'Возвращаемся', unknown: '???' },
  ar: { tomorrow: 'غدًا', nextMonth: 'الشهر القادم', nextYear: 'العام القادم', now: 'الآن', verySoon: 'قريبًا جدًا', comingBack: 'نعود قريبًا', unknown: '؟؟؟' },
  zh: { tomorrow: '明天', nextMonth: '下个月', nextYear: '明年', now: '现在', verySoon: '很快', comingBack: '即将回来', unknown: '???' },
  ja: { tomorrow: '明日', nextMonth: '来月', nextYear: '来年', now: '今', verySoon: 'まもなく', comingBack: '戻ってくる', unknown: '???' },
}
