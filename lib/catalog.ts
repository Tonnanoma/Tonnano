export const languages = ['en','fr','ar','es','de','it','pt','nl','tr','zh','ja','ru'] as const
export type Language = typeof languages[number]

export const products = [
  ['ivar','IVAR','Heavyweight Hoodie'],['harald','HARALD','Wool Overshirt'],['loki','LOKI','Technical Shell Jacket'],['bjorn','BJØRN','Quilted Liner Jacket'],['leif','LEIF','Ribbed Knit Sweater'],['ingrid','INGRID','Long Wool Coat'],['sigrid','SIGRID','Cable-Knit Cardigan'],['torsten','TORSTEN','Wide Cargo Trousers'],['cesar','CESAR','Tailored Winter Trouser'],['ragnar','RAGNAR','Winter Beanie'],
].map(([slug,name,kind], index) => ({ slug, name, kind, index, image: `https://images.unsplash.com/photo-${['1556821840-3a63f95609a7','1598808503746-f34c53b9323e','1551028719-00167b16eac5','1544966503-7cc5ac882d5f','1576566588028-4147f3842f27','1539109136881-3be0616acf4b','1578587018452-892bacefd3f2','1552902865-b72c031ac5ea','1594938298603-c8148c4dae35','1529958030586-3aae4ca485ff'][index]}?auto=format&fit=crop&w=1200&q=88` }))

export const copy: Record<Language, { eyebrow:string; title:string; intro:string; enter:string; archive:string; collection:string; whitelist:string; showroom:string }> = {
  en:{eyebrow:'MOROCCO / EST. 2026',title:'TIME BUILDS LEGENDS',intro:'A house for the ones who decode the unseen.',enter:'BEGIN DECODING',archive:'ARCHIVE',collection:'COLLECTIONS',whitelist:'JOIN THE WHITELIST',showroom:'ENTER SHOWROOM'},
  fr:{eyebrow:'MAROC / DEPUIS 2026',title:'LE TEMPS BÂTIT LES LÉGENDES',intro:'Une maison pour ceux qui décodent l’invisible.',enter:'COMMENCER À DÉCODER',archive:'ARCHIVE',collection:'COLLECTIONS',whitelist:'REJOINDRE LA LISTE',showroom:'ENTRER DANS LE SHOWROOM'},
  ar:{eyebrow:'المغرب / منذ ٢٠٢٦',title:'الزمن يصنع الأساطير',intro:'دار لمن يفككون ما لا يُرى.',enter:'ابدأ فك الشيفرة',archive:'الأرشيف',collection:'المجموعات',whitelist:'انضم إلى القائمة',showroom:'ادخل صالة العرض'},
  es:{eyebrow:'MARRUECOS / DESDE 2026',title:'EL TIEMPO CONSTRUYE LEYENDAS',intro:'Una casa para quienes descifran lo invisible.',enter:'EMPEZAR A DECODIFICAR',archive:'ARCHIVO',collection:'COLECCIONES',whitelist:'UNIRSE A LA LISTA',showroom:'ENTRAR AL SHOWROOM'},
  de:{eyebrow:'MAROKKO / SEIT 2026',title:'ZEIT BAUT LEGENDEN',intro:'Ein Haus für jene, die das Unsichtbare entschlüsseln.',enter:'BEGINNEN',archive:'ARCHIV',collection:'KOLLEKTIONEN',whitelist:'WARTELISTE',showroom:'SHOWROOM BETRETEN'},
  it:{eyebrow:'MAROCCO / DAL 2026',title:'IL TEMPO COSTRUISCE LEGGENDE',intro:'Una casa per chi decodifica l’invisibile.',enter:'INIZIA A DECODIFICARE',archive:'ARCHIVIO',collection:'COLLEZIONI',whitelist:'UNISCITI ALLA LISTA',showroom:'ENTRA NELLO SHOWROOM'},
  pt:{eyebrow:'MARROCOS / DESDE 2026',title:'O TEMPO CONSTRÓI LENDAS',intro:'Uma casa para quem decifra o invisível.',enter:'COMEÇAR A DECODIFICAR',archive:'ARQUIVO',collection:'COLEÇÕES',whitelist:'ENTRAR NA LISTA',showroom:'ENTRAR NO SHOWROOM'},
  nl:{eyebrow:'MAROKKO / SINDS 2026',title:'TIJD BOUWT LEGENDES',intro:'Een huis voor wie het onzichtbare ontcijfert.',enter:'BEGIN MET DECODEREN',archive:'ARCHIEF',collection:'COLLECTIES',whitelist:'OP DE LIJST',showroom:'SHOWROOM BETREDEN'},
  tr:{eyebrow:'FAS / 2026’DAN BERİ',title:'ZAMAN EFSANELERİ İNŞA EDER',intro:'Görünmeyeni çözenler için bir ev.',enter:'ÇÖZMEYE BAŞLA',archive:'ARŞİV',collection:'KOLEKSİYONLAR',whitelist:'LİSTEYE KATIL',showroom:'SHOWROOM’A GİR'},
  zh:{eyebrow:'摩洛哥 / 始于 2026',title:'时间铸就传奇',intro:'为解码无形之物的人而生。',enter:'开始解码',archive:'档案',collection:'系列',whitelist:'加入名单',showroom:'进入展厅'},
  ja:{eyebrow:'モロッコ / 2026年創立',title:'時が伝説をつくる',intro:'見えないものを解読する人のための家。',enter:'解読を始める',archive:'アーカイブ',collection:'コレクション',whitelist:'リストに参加',showroom:'ショールームへ'},
  ru:{eyebrow:'МАРОККО / С 2026',title:'ВРЕМЯ СОЗДАЁТ ЛЕГЕНДЫ',intro:'Дом для тех, кто расшифровывает невидимое.',enter:'НАЧАТЬ РАСШИФРОВКУ',archive:'АРХИВ',collection:'КОЛЛЕКЦИИ',whitelist:'В СПИСОК',showroom:'ВОЙТИ В ШОУРУМ'},
}
