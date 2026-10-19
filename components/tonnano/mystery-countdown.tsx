'use client'
import { useEffect, useState } from 'react'
const signals=['TOMORROW','NEXT MONTH','SOON','NOW','DROP 01','CHAPTER 01','INNER CODE ACCESS','WHITELIST ONLY','12/11/2026','23:59:59']
export function MysteryCountdown(){const [index,setIndex]=useState(0);useEffect(()=>{const id=window.setInterval(()=>setIndex(i=>(i+1)%signals.length),4200);return()=>window.clearInterval(id)},[]);return <div className="mystery-countdown"><p className="eyebrow">THE SIGNAL CHANGES</p><strong key={signals[index]}>{signals[index]}</strong><span>JOIN THE WHITELIST TO RECEIVE THE NEXT FREQUENCY</span></div>}
