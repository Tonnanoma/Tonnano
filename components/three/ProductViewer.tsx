'use client'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

function Garment({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.18 })
  return <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}><group ref={ref}>
    <mesh castShadow position={[0,0.15,0]}><boxGeometry args={[1.65,2.1,0.52,8,8,8]} /><meshStandardMaterial color={color} roughness={0.72} metalness={0.05} /></mesh>
    <mesh castShadow position={[-1.03,0.42,0]} rotation={[0,0,-0.18]}><boxGeometry args={[0.62,1.3,0.48,6,6,6]} /><meshStandardMaterial color={color} roughness={0.75} /></mesh>
    <mesh castShadow position={[1.03,0.42,0]} rotation={[0,0,0.18]}><boxGeometry args={[0.62,1.3,0.48,6,6,6]} /><meshStandardMaterial color={color} roughness={0.75} /></mesh>
    <mesh position={[0,1.12,0.28]}><torusGeometry args={[0.28,0.08,16,32]} /><meshStandardMaterial color="#141414" roughness={0.9} /></mesh>
  </group></Float>
}
export function ProductViewer() {
  const [color, setColor] = useState('#292725')
  return <div className="viewer-shell"><Canvas shadows camera={{position:[3.2,1.7,4.2], fov:35}}><color attach="background" args={['#151311']} /><ambientLight intensity={0.45}/><spotLight position={[3,5,3]} intensity={45} angle={0.32} penumbra={1} castShadow/><pointLight position={[-3,1,-2]} intensity={12} color="#b37a50"/><Suspense fallback={null}><Garment color={color}/><ContactShadows position={[0,-1.2,0]} opacity={0.5} scale={5} blur={2.5}/><Environment preset="city"/></Suspense><OrbitControls enablePan={false} minDistance={2.6} maxDistance={6}/></Canvas><div className="viewer-controls">{[['#292725','OBSIDIAN'],['#9a8e7f','STONE'],['#8c4c35','RUST']].map(([value,label])=><button key={value} aria-label={`Select ${label}`} onClick={()=>setColor(value)} className={color===value?'active':''}><span style={{background:value}}/>{label}</button>)}</div></div>
}
export function BilzerianShowroom() { return <div className="showroom"><Canvas camera={{position:[7,4.5,8], fov:42}}><color attach="background" args={['#0e0d0c']}/><fog attach="fog" args={['#0e0d0c',4,18]}/><ambientLight intensity={0.3}/><spotLight position={[0,8,2]} intensity={60} angle={0.55} penumbra={1}/><mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.2,0]} receiveShadow><planeGeometry args={[30,30]}/><meshStandardMaterial color="#24211e" roughness={0.42} metalness={0.35}/></mesh>{Array.from({length:10}).map((_,i)=><group key={i} position={[(i%5-2)*2.35,0,(Math.floor(i/5)-.5)*3.2]}><mesh position={[0,-.8,0]} castShadow><cylinderGeometry args={[.72,.78,.45,32]}/><meshStandardMaterial color="#6e4c3b" roughness={.6}/></mesh><mesh position={[0,.15,0]} castShadow><boxGeometry args={[.9,1.8,.5,5,5,5]}/><meshStandardMaterial color={i%2?'#262321':'#8f8375'} roughness={.75}/></mesh><pointLight position={[0,2,0]} color="#bd8560" intensity={3}/></group>)}<OrbitControls enablePan={false} minDistance={4} maxDistance={14}/></Canvas><p className="showroom-label">BILZERIAN / WINTER CHAPTER — DRAG TO EXPLORE</p></div> }
