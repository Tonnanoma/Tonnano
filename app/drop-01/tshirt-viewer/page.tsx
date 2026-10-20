'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import Link from 'next/link'
function Model(){const {scene}=useGLTF('/models/tshirt-tonnano.glb');return <primitive object={scene} scale={2.4} position={[0,-1.45,0]}/>}export default function Viewer(){return <main className="viewer-page"><header className="topbar"><Link href="/" className="wordmark">TONNANO<span>®</span></Link><Link href="/collections/first-signal" className="access-link">FIRST SIGNAL ↗</Link></header><div className="viewer-copy"><p className="eyebrow">001 / HEAVYWEIGHT TEE</p><h1>THE FIRST<br /><i>SIGNAL.</i></h1><p className="muted">Drag to rotate. Scroll to zoom.</p><Link className="button button-bronze" href="/whitelist">JOIN THE WHITELIST ↗</Link></div><div className="viewer-canvas"><Canvas camera={{position:[0,.2,5],fov:35}}><ambientLight intensity={.35}/><spotLight position={[4,4,4]} intensity={8} color="#d6b18f"/><Environment preset="warehouse"/><Model/><OrbitControls enablePan={false}/></Canvas></div></main>}
useGLTF.preload('/models/tshirt-tonnano.glb')
