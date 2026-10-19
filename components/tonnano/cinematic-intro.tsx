'use client'
import { useState } from 'react'
export function CinematicIntro(){const [open,setOpen]=useState(true);if(!open)return null;return <div className="cinematic-intro"><video autoPlay muted playsInline poster="/intro.png" src="/videos/tonnano-intro.mp4"/><div className="cinematic-overlay"/><div className="cinematic-copy"><p>A SIGNAL HAS BEEN SENT</p><h2>YOU DO NOT VISIT TONNANO.<br/><em>YOU DECODE IT.</em></h2><button onClick={()=>setOpen(false)}>BEGIN DECODING</button></div><button className="skip-intro" onClick={()=>setOpen(false)}>SKIP INTRO</button></div>}
