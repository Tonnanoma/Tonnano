import { Platform } from '@/components/tonnano/platform'
import { languages, type Language } from '@/lib/catalog'
import type { Metadata } from 'next'
export function generateStaticParams(){return languages.map(lang=>({lang,slug:[]}))}
export async function generateMetadata({params}:{params:Promise<{lang:string;slug?:string[]}>}):Promise<Metadata>{const {lang}=await params;return {title:`TONNANO — ${lang.toUpperCase()}`,description:'Time builds legends. A Moroccan fashion house decoding the unseen.',alternates:{languages:Object.fromEntries(languages.map(l=>[l,`/${l}`]))}}}
export default async function LocalizedPage({params}:{params:Promise<{lang:string;slug?:string[]}>}){const {lang,slug=[]}=await params;return <Platform lang={(languages.includes(lang as Language)?lang:'en') as Language} slug={slug}/>} 
