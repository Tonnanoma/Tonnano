'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const signals = ['TOMORROW','DEMAIN','NEXT MONTH','SOON','BIENTÔT','NOW','12/11/2026','DROP 01','CHAPTER 01','INNER CODE ACCESS','WHITELIST ONLY','SIGNAL DETECTED','CODE UNLOCKED','ACCESS PENDING','THE FIRST CHAPTER','NO RESTOCK','MEMBERS ONLY','TIME IS CLOSE','THE CODE KNOWS']
const fragments = ['T-N-0-1 // SIGNAL','CODE: TIME','ACCESS: PENDING','CHAPTER: UNLOCKING']
export default function MysteryCountdown(){
 const [index,setIndex]=useState(0); const [fragment,setFragment]=useState(false)
 useEffect(()=>{ const id=window.setInterval(()=>{setIndex(Math.floor(Math.random()*signals.length));setFragment(Math.random()>.68)},4200); return()=>window.clearInterval(id)},[])
 return <section className="mystery-countdown" aria-label="The next chapter">
  <p className="eyebrow">THE NEXT CHAPTER</p><div className="mystery-display" aria-live="polite">{signals[index]}</div>
  <p className="mystery-fragment">{fragment ? fragments[index%fragments.length] : 'DROP 01 — WHITELIST ONLY'}</p>
  <Link className="button button-bronze" href="/whitelist">JOIN THE WHITELIST ↗</Link>
 </section>
}
