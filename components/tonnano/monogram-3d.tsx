'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, Text } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Mesh } from 'three'

function Sculpture() {
  const group = useRef<Mesh>(null)
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.22 })
  return (
    <group ref={group} rotation={[0.08, -0.4, 0]}>
      <mesh castShadow position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.75, 0.16, 128, 24, 2, 3]} />
        <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} />
      </mesh>
      <Text position={[0, -1.2, 0]} fontSize={0.16} letterSpacing={0.2} color="#f36b21" anchorX="center" anchorY="middle">TONNANO</Text>
    </group>
  )
}

export function Monogram3D() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden border-y border-white/10 bg-[#050505] sm:h-[460px]" aria-label="Interactive TONNANO monogram. Drag to rotate and scroll to zoom.">
      <div className="pointer-events-none absolute left-5 top-5 z-10 font-sans text-[0.6rem] tracking-wide-lux text-white/45">VIEW IN 3D / DRAG TO ROTATE</div>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 38 }} dpr={[1, 1.5]} shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <spotLight position={[3, 4, 4]} intensity={28} angle={0.35} penumbra={1} castShadow />
          <pointLight position={[-3, 1, 1]} intensity={10} color="#f36b21" />
          <Sculpture />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={5} blur={2.5} />
          <Environment preset="city" />
          <OrbitControls enablePan={false} minDistance={2.4} maxDistance={4.5} enableDamping dampingFactor={0.08} />
        </Suspense>
      </Canvas>
    </div>
  )
}
