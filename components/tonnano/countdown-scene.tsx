'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

type CountdownValue = { label: string; value: string }

function CountdownTile({ item, index }: { item: CountdownValue; index: number }) {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35 + index) * 0.045
    group.current.position.y = Math.sin(clock.elapsedTime * 0.45 + index) * 0.035
  })

  return (
    <group ref={group} position={[(index - 1.5) * 1.7, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.35, 1.35, 0.22]} />
        <meshStandardMaterial color="#11100d" metalness={0.78} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[1.16, 1.16, 0.025]} />
        <meshStandardMaterial color="#1b1915" metalness={0.55} roughness={0.42} />
      </mesh>
      <Html center position={[0, 0.08, 0.17]} transform distanceFactor={2.4}>
        <div className="pointer-events-none w-24 text-center text-[#ede6d8]">
          <div className="font-sans text-[2.25rem] font-light leading-none tabular-nums tracking-tight">{item.value}</div>
          <div className="mt-2 text-[0.45rem] tracking-[0.22em] text-[#b6a47e]">{item.label}</div>
        </div>
      </Html>
    </group>
  )
}

function Scene({ items }: { items: CountdownValue[] }) {
  const group = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.14) * 0.06
  })
  return (
    <group ref={group} rotation-x={-0.04}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3, 4, 5]} intensity={1.2} color="#f1e4c8" />
      <pointLight position={[3, 1, 3]} intensity={1.5} distance={8} color="#9b835b" />
      {items.map((item, index) => <CountdownTile key={item.label} item={item} index={index} />)}
    </group>
  )
}

export function CountdownScene({ items }: { items: CountdownValue[] }) {
  return (
    <div className="h-[180px] w-full sm:h-[250px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.1, 7.4], fov: 28 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        fallback={<div className="h-full w-full" />}
      >
        <Scene items={items} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
