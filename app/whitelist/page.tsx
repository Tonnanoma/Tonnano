import { Whitelist } from '@/components/tonnano/whitelist'
import { LocaleProvider } from '@/components/tonnano/locale-provider'

export const metadata = { title: 'Join the Whitelist', description: 'Join the TONNANO Inner Code.' }

export default function Page() {
  return <LocaleProvider><main className="min-h-screen bg-background pt-20"><Whitelist /></main></LocaleProvider>
}
