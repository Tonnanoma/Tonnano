'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'
import Link from 'next/link'

const socials = [
  ['Instagram', 'https://www.instagram.com/tonnano.official/'],
  ['Facebook', 'https://web.facebook.com/tonnanomorocco'],
  ['LinkedIn', 'https://www.linkedin.com/company/tonnanomorocco'],
]

function LogoMark() {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12
  })
  return <group ref={ref}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.05, 0.045, 16, 64]} /><meshStandardMaterial color="#b08968" metalness={0.8} roughness={0.22} /></mesh><mesh position={[0, 0, 0.03]}><boxGeometry args={[0.13, 1.4, 0.08]} /><meshStandardMaterial color="#f2efe8" metalness={0.4} roughness={0.3} /></mesh></group>
}

function Shirt() {
  const { scene } = useGLTF('/models/tshirt-tonnano.glb')
  const cloned = useMemo(() => scene.clone(), [scene])
  return <primitive object={cloned} scale={2.1} position={[0, -1.35, 0]} />
}

function HeroScene() {
  return <Canvas camera={{ position: [0, 0.3, 6], fov: 35 }} dpr={[1, 1.5]}><ambientLight intensity={0.28} /><spotLight position={[4, 5, 4]} intensity={7} color="#d6b18f" angle={0.45} penumbra={1} /><pointLight position={[-4, 1, 2]} intensity={2} color="#7e4a32" /><Suspense fallback={null}><Shirt /></Suspense><Environment preset="warehouse" /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} /></Canvas>
}

function Intro() {
  const [done, setDone] = useState(false)
  if (done) return null
  return <div className="intro-layer"><video autoPlay muted playsInline poster="/videos/tonnano-poster.jpg" onEnded={() => setDone(true)}><source src="/videos/tonnano-intro.mp4" type="video/mp4" /></video><div className="intro-shade" /><div className="intro-copy"><p>A SIGNAL HAS BEEN SENT</p><h1>YOU DO NOT VISIT TONNANO.<br /><em>YOU DECODE IT.</em></h1><button onClick={() => setDone(true)}>BEGIN DECODING</button></div><button className="skip" onClick={() => setDone(true)}>SKIP INTRO</button></div>
}

export default function TonnanoExperience() {
  const [gate, setGate] = useState('TIME')
  return <main className={`site-shell gate-${gate.toLowerCase()}`}><Intro /><header className="topbar"><Link href="/" className="wordmark">TONNANO<span>®</span></Link><nav><Link href="/archive">ARCHIVE</Link><Link href="/collections">COLLECTIONS</Link><Link href="/inner-code">INNER CODE</Link><Link href="/journal">JOURNAL</Link></nav><Link className="access-link" href="/whitelist">REQUEST ACCESS <span>↗</span></Link></header><section className="hero"><div className="hero-copy"><p className="eyebrow">EST. 2026 — MADE IN MOROCCO</p><h1>TIME<br /><i>BUILDS</i><br />LEGENDS.</h1><p className="lede">The first chapter begins before the first drop. Enter the archive of a new Moroccan house.</p><Link className="button button-bronze" href="/archive">ENTER THE ARCHIVE <span>↗</span></Link></div><div className="hero-orb"><HeroScene /><div className="orb-label">01 / THE FIRST SIGNAL</div></div></section><section className="gate-section"><div><p className="eyebrow">02 / THE GATE</p><h2>CHOOSE<br /><i>YOUR GATE.</i></h2><p className="muted">Every path reveals a different frequency.</p></div><div className="gate-list">{['TIME', 'CODE', 'LEGEND'].map((item, index) => <button key={item} className={gate === item ? 'active' : ''} onClick={() => setGate(item)}><span>0{index + 1}</span>{item}<b>↗</b></button>)}</div></section><section className="signal-section"><p className="eyebrow">03 / THE NEXT CHAPTER</p><div className="signal">{['TOMORROW', 'DEMAIN', 'SOON', '12/11/2026', 'DROP 01', 'CODE UNLOCKED'][new Date().getSeconds() % 6]}</div><p className="signal-meta">DROP 01 — WHITELIST ONLY</p><Link className="text-link" href="/whitelist">JOIN THE WHITELIST ↗</Link></section><footer><span>TONNANO — TIME BUILDS LEGENDS</span><div>{socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div><span>© 2026 TONNANO</span></footer></main>
}
useGLTF.preload('/models/tshirt-tonnano.glb')
