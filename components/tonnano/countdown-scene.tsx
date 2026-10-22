'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useRef } from 'react'

type SignalSceneProps = { value: string; index: number; isArabic: boolean }

function SignalCore({ value, index, isArabic }: SignalSceneProps) {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.18) * 0.055
    group.current.rotation.x = Math.sin(t * 0.14) * 0.018
    group.current.position.y = Math.sin(t * 0.32) * 0.045
  })

  return (
    <group ref={group} key={`${value}-${index}`}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.72, 0.006, 8, 96]} />
        <meshBasicMaterial color="#9f8965" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.34, 0.004, 8, 96]} />
        <meshBasicMaterial color="#d7c29a" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <planeGeometry args={[4.8, 1.2]} />
        <meshBasicMaterial color="#0e0d0b" transparent opacity={0.72} />
      </mesh>
    </group>
  )
}

function Scene({ value, index, isArabic }: SignalSceneProps) {
  const group = useRef<Group>(null)
  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    group.current.rotation.y += (pointer.x * 0.045 - group.current.rotation.y) * 0.02
    group.current.rotation.x += (-pointer.y * 0.025 - group.current.rotation.x) * 0.02
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.008
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.28} />
      <pointLight position={[-3, 2, 4]} intensity={2.2} distance={8} color="#e4c995" />
      <pointLight position={[3, -1, 2]} intensity={1.1} distance={7} color="#8b3026" />
      <SignalCore value={value} index={index} isArabic={isArabic} />
      <Sparkles count={48} scale={[5.4, 2.5, 2]} size={0.7} speed={0.12} opacity={0.28} color="#cdb27a" />
    </group>
  )
}

export function CountdownScene({ value, index, isArabic }: SignalSceneProps) {
  return (
    <div className="relative h-[210px] w-full sm:h-[290px]" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 28 }} dpr={[1, 1.35]} gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }} fallback={<div className="h-full w-full" />}>
        <Scene value={value} index={index} isArabic={isArabic} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <div key={`${value}-${index}`} className={`max-w-[min(76vw,34rem)] text-center text-[clamp(1.35rem,4.5vw,3.5rem)] font-light leading-tight tracking-[0.08em] text-[#eee7d9] drop-shadow-[0_0_18px_rgba(220,197,150,0.18)] ${isArabic ? 'font-serif' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
          {value}
        </div>
      </div>
    </div>
  )
}
