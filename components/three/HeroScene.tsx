'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
function Monolith(){const ref=useRef<THREE.Mesh>(null);useFrame((_,d)=>{if(ref.current)ref.current.rotation.y+=d*.12});return <Float speed={.8} floatIntensity={.2}><mesh ref={ref} castShadow rotation={[0,.4,0]}><icosahedronGeometry args={[1.7,2]}/><meshStandardMaterial color="#6f4b3b" metalness={.72} roughness={.3}/></mesh></Float>}
export default function HeroScene(){return <div className="hero-scene"><Canvas camera={{position:[0,0,6],fov:45}}><color attach="background" args={['#0b0a09']}/><ambientLight intensity={.35}/><spotLight position={[4,5,5]} intensity={50} color="#d4a27a"/><pointLight position={[-4,-1,2]} intensity={18} color="#54352b"/><Monolith/><Environment preset="studio"/><OrbitControls enableZoom={false} enablePan={false}/></Canvas></div>}
