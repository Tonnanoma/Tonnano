'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  MeshReflectorMaterial,
  Sparkles,
} from '@react-three/drei'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type SignalSceneProps = { value: string; index: number; isArabic: boolean }

type CountdownSceneProps = SignalSceneProps & {
  progress?: number
  accentPulse?: number
  finished?: boolean
}

function buildNoiseTexture() {
  const size = 256
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < data.length; i += 4) {
    const n = 35 + Math.random() * 180
    data[i] = n
    data[i + 1] = n
    data[i + 2] = n
    data[i + 3] = 255
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.needsUpdate = true
  return tex
}

function buildMonogramTexture() {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#b79b6b'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '700 820px Georgia, serif'
  ctx.fillText('T', canvas.width / 2, canvas.height / 2 + 30)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function buildCrackTexture() {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = '#d6b26c'
  ctx.lineWidth = 12
  ctx.shadowColor = '#d6b26c'
  ctx.shadowBlur = 30

  for (let i = 0; i < 14; i += 1) {
    const x = 80 + Math.random() * 850
    const y = 50 + Math.random() * 850
    const len = 120 + Math.random() * 400
    const offset = 8 + Math.random() * 28
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + offset, y + len)
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function getDpr() {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, 2)
}

function useReducedMotionSafe() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Monolith({ progress, accentPulse, finished }: { progress: number; accentPulse: number; finished: boolean }) {
  const group = useRef<THREE.Group>(null)
  const monolith = useRef<THREE.Mesh>(null)
  const noiseTex = useMemo(() => buildNoiseTexture(), [])
  const monogramTex = useMemo(() => buildMonogramTexture(), [])
  const crackTex = useMemo(() => buildCrackTexture(), [])

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#070707',
        roughness: 0.42,
        metalness: 0.25,
        transmission: 0.09,
        thickness: 1.4,
        clearcoat: 1,
        clearcoatRoughness: 0.25,
        normalMap: noiseTex,
        normalScale: new THREE.Vector2(0.75, 0.75),
        envMapIntensity: 0.9,
      }),
    [noiseTex],
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#b79b6b',
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useEffect(() => {
    return () => {
      material.dispose()
      glowMaterial.dispose()
      noiseTex.dispose()
      if (monogramTex) monogramTex.dispose()
      if (crackTex) crackTex.dispose()
    }
  }, [crackTex, glowMaterial, material, monogramTex, noiseTex])

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.25) * 0.25 + pointer.x * 0.4
    group.current.rotation.x = Math.sin(t * 0.17) * 0.18 + pointer.y * 0.18
    group.current.position.y = Math.sin(t * 0.5) * 0.18

    if (monolith.current) {
      monolith.current.rotation.z = Math.sin(t * 0.36) * 0.04
      monolith.current.position.x = finished ? 0.15 : 0
    }
  })

  const crackAmount = THREE.MathUtils.clamp(progress, 0, 1)

  return (
    <group ref={group}>
      <mesh ref={monolith} material={material}>
        <boxGeometry args={[1.3, 3.2, 1.2, 30, 42, 16]} radius={0.28} />
      </mesh>

      <mesh position={[0, 0, 0.08]} material={glowMaterial}>
        <boxGeometry args={[1.5, 3.5, 0.12]} />
      </mesh>

      <mesh position={[0, 0, 0.8]}>
        <boxGeometry args={[1.28, 3.06, 0.12]} />
        <meshStandardMaterial
          color="#b79b6b"
          emissive="#b79b6b"
          emissiveIntensity={0.6 + crackAmount * 1.8 + accentPulse * 1.3}
        />
      </mesh>

      {monogramTex && (
        <mesh position={[0, 0, 0.86]}>
          <planeGeometry args={[0.72, 1.5]} />
          <meshStandardMaterial
            map={monogramTex}
            emissiveMap={monogramTex}
            emissive="#b79b6b"
            emissiveIntensity={0.6 + crackAmount * 1.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}

      {crackTex && (
        <mesh position={[0, 0, 0.82]}>
          <planeGeometry args={[1.35, 3.05]} />
          <meshStandardMaterial
            map={crackTex}
            emissiveMap={crackTex}
            emissive="#d7b572"
            emissiveIntensity={0.3 + crackAmount * 2}
            transparent
            opacity={0.6 + crackAmount * 0.35}
          />
        </mesh>
      )}
    </group>
  )
}

function SnakeWrap({ progress, accentPulse }: { progress: number; accentPulse: number }) {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = []
    const radius = 0.86
    const turns = 2.6
    for (let i = 0; i <= 260; i += 1) {
      const t = i / 260
      const angle = t * Math.PI * turns
      const y = -1.65 + t * 3.3
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b79b6b',
        emissive: '#b79b6b',
        emissiveIntensity: 1.3,
        roughness: 0.3,
        metalness: 0.7,
      }),
    [],
  )

  useEffect(() => () => material.dispose(), [material])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pulse = (Math.sin(t * 1.5) + 1) * 0.5
    material.emissiveIntensity = 0.7 + pulse * 1.4 + progress * 0.9 + accentPulse * 0.9
  })

  return (
    <mesh material={material}>
      <tubeGeometry args={[curve, 240, 0.045, 12, false]} />
    </mesh>
  )
}

function DustField({ progress, finished }: { progress: number; finished: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 600
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 6
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5.8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5.5
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.08
    ref.current.rotation.z = Math.sin(t * 0.16) * 0.4
    ref.current.position.y = Math.sin(t * 0.32) * 0.3
    const scale = 1 + progress * 1.5 + (finished ? 1.4 : 0)
    ref.current.scale.setScalar(scale)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#b79b6b"
        size={0.022}
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ progress, accentPulse, finished }: CountdownSceneProps) {
  const reduced = useReducedMotionSafe()
  const { camera, pointer } = useThree()
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.position.y = Math.sin(t * 0.4) * 0.18

    if (reduced) {
      camera.position.lerp(new THREE.Vector3(0, 0, 4.2), 0.08)
      camera.lookAt(0, 0, 0)
      return
    }

    const x = pointer.x * 1.3
    const y = pointer.y * 0.7
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4.3 + Math.sin(t * 0.25) * 0.25, 0.06)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <fog attach="fog" args={['#0a0a0a', 4, 12]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 4.2, 3]} angle={0.42} penumbra={0.8} intensity={3.4} color="#b79b6b" />
      <directionalLight position={[-2.5, 1.5, 2]} intensity={0.9} color="#cfe3ff" />
      <Environment preset="city" intensity={0.25} />

      <Monolith progress={progress} accentPulse={accentPulse} finished={finished} />
      <SnakeWrap progress={progress} accentPulse={accentPulse} />
      <DustField progress={progress} finished={finished} />

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 40]} />
        <meshBasicMaterial color="#b79b6b" transparent opacity={0.1} />
      </mesh>

      <mesh position={[0, -1.95, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.7, 48]} />
        <meshBasicMaterial color="#b79b6b" transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

export function CountdownScene({ value, index, isArabic, progress = 0, accentPulse = 0, finished = false }: CountdownSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotionSafe()

  useEffect(() => {
    let cancelled = false
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        if (!cancelled) setFallback(true)
      } else if (!cancelled) {
        setReady(true)
      }
    } catch {
      if (!cancelled) setFallback(true)
    }
    return () => {
      cancelled = true
    }
  }, [])

  if (fallback) {
    return (
      <div
        aria-hidden="true"
        className="relative h-[210px] w-full overflow-hidden border border-[#b79b6b]/35 bg-[radial-gradient(circle_at_center,_rgba(183,155,107,0.12),_rgba(10,10,10,1)_58%)] sm:h-[290px]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_32%,transparent_68%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_0.5px,_transparent_0.5px)] [background-size:12px_12px]" />
      </div>
    )
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div
      ref={ref}
      className="relative h-[210px] w-full overflow-hidden border border-[#b79b6b]/25 bg-[#0a0a0a] sm:h-[290px]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(183,155,107,0.12),_transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,255,255,0.04))]" />

      {ready ? (
        <Canvas
          dpr={isMobile ? 1.5 : getDpr()}
          camera={{ position: [0, 0, 4.2], fov: 28 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          frameloop={reduced ? 'never' : 'always'}
        >
          <Scene progress={progress} accentPulse={accentPulse} finished={finished} />
          <EffectComposer multisampling={0} resolutionScale={isMobile ? 0.7 : 1}>
            <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.7} intensity={isMobile ? 0.7 : 1.1} mipmapBlur />
            <Noise opacity={0.06} />
            <Vignette eskil={false} offset={0.35} darkness={0.9} />
            <ChromaticAberration offset={isMobile ? [0, 0] : [0.0009, 0.0009]} />
          </EffectComposer>
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(183,155,107,0.14),_rgba(10,10,10,1)_58%)]" />
      )}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <div
          key={`${value}-${index}`}
          className="max-w-[min(76vw,34rem)] text-center text-[clamp(1.35rem,4.5vw,3.5rem)] font-light leading-tight tracking-[0.08em] text-[#eee7d9] drop-shadow-[0_0_18px_rgba(183,155,107,0.18)]"
          style={{ textShadow: '0 0 18px rgba(183,155,107,0.14)' }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
