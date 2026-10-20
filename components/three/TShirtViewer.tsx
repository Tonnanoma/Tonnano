'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
function Shirt(){const {scene}=useGLTF('/models/tshirt-tonnano.glb');return <primitive object={scene} scale={2.35} position={[0,-1.45,0]}/>} 
export default function TShirtViewer(){return <div className="viewer-stage"><Canvas camera={{position:[0,.2,5],fov:35}} dpr={[1,1.5]}><ambientLight intensity={.35}/><spotLight position={[4,4,4]} intensity={8} color="#d6b18f"/><Environment preset="warehouse"/><Suspense fallback={null}><Shirt/></Suspense><OrbitControls enablePan={false} minDistance={3.2} maxDistance={7}/></Canvas><span className="viewer-hint">DRAG TO ROTATE / SCROLL TO ZOOM</span></div>}
useGLTF.preload('/models/tshirt-tonnano.glb')
