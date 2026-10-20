'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'

function Emblem(){const ref=useRef<any>(null);useFrame((_,delta)=>{if(ref.current)ref.current.rotation.y+=delta*.18});return <Float speed={1.2} rotationIntensity={.15} floatIntensity={.3}><mesh ref={ref}><torusKnotGeometry args={[1,.16,96,16]} /><meshStandardMaterial color="#b08968" metalness={.85} roughness={.24} /></mesh></Float>}
export default function ArchiveScene(){return <div className="archive-scene"><Canvas camera={{position:[0,0,5],fov:40}} dpr={[1,1.35]}><ambientLight intensity={.2}/><spotLight position={[3,4,3]} intensity={7} color="#d5b18d"/><pointLight position={[-3,-1,2]} intensity={2} color="#7e4a32"/><Suspense fallback={null}><Emblem/><Environment preset="warehouse"/></Suspense><OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={.25}/></Canvas></div>}
