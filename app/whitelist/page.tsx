import { permanentRedirect } from 'next/navigation'

export default function WhitelistPage() {
  permanentRedirect('/membership#join')
}
