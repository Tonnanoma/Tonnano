'use client'

import { motion } from 'motion/react'

export function ModalOpenAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Radial pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#ff6a00]/30 to-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.5, 0], scale: [0.8, 1.5] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Corner accent lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 border border-[#ff6a00]"
          style={{
            top: i < 2 ? -1 : 'auto',
            bottom: i >= 2 ? -1 : 'auto',
            left: i % 2 === 0 ? -1 : 'auto',
            right: i % 2 === 1 ? -1 : 'auto',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [1, 0.3], scale: 1 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export function SuccessAnimation({ memberId }: { memberId: string }) {
  return (
    <div className="relative">
      {/* Concentric circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute inset-0 rounded-full border border-[#ff6a00]"
          style={{
            top: `${-15 * (i + 1)}%`,
            left: `${-15 * (i + 1)}%`,
            right: `${-15 * (i + 1)}%`,
            bottom: `${-15 * (i + 1)}%`,
          }}
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{
            duration: 1.2,
            delay: i * 0.15,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Success icon - animated checkmark */}
      <motion.div
        className="relative z-10 flex justify-center mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
      >
        <div className="w-20 h-20 rounded-full border-2 border-[#ff6a00] flex items-center justify-center">
          <motion.svg
            className="w-10 h-10 text-[#ff6a00]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: 'easeInOut',
            }}
          >
            <motion.polyline
              points="20 6 9 17 4 12"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </motion.div>

      {/* Text animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-4xl font-serif text-white text-center mb-4">
          Welcome To TONNANO
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <p className="text-sm text-[#8a8a8a] text-center mb-8">
          You are now part of the Inner Code.
          <br />
          Your founding member status is reserved ahead of Drop 01.
        </p>
      </motion.div>

      {/* Member ID card with animation */}
      <motion.div
        className="border-2 border-[#ff6a00] px-8 py-6 mt-8 mx-auto w-fit"
        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="text-[0.6rem] tracking-[0.2em] text-[#ff6a00]/60 uppercase">
          Your Member ID
        </p>
        <motion.p
          className="text-4xl font-mono font-bold text-[#ff6a00] mt-3 tracking-wider"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 2,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 100,
          }}
        >
          {memberId}
        </motion.p>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[#ff6a00] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )
}
