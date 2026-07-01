'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 8500) // 8.5 secondes

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#ff6a00]/20 via-transparent to-[#ff6a00]/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
        >
          <div className="text-7xl font-serif font-medium tracking-widest">
            TONNANO<span className="text-[#ff6a00]">.</span>
          </div>
        </motion.div>

        {/* Subtitle with letter animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="text-xs tracking-[0.3em] text-[#ff6a00] uppercase font-light">
            True Luxury Is In The Details
          </div>
        </motion.div>

        {/* Animated lines */}
        <div className="flex justify-center gap-4 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-12 bg-gradient-to-b from-[#ff6a00] to-transparent"
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{
                duration: 0.8,
                delay: 1.8 + i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="text-xs text-[#8a8a8a] tracking-wider max-w-[300px] mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 2.4,
          }}
        >
          EST. 2024 — MADE IN MOROCCO
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="mt-12 h-1 bg-[#2a2a2a] w-48 mx-auto rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-[#ff6a00] to-transparent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 5.5,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
        </motion.div>
      </div>

      {/* Signature at the bottom */}
      <motion.div
        className="absolute bottom-8 right-8 text-xs text-[#666] tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        By <span className="text-[#ff6a00]">Zariry</span>
      </motion.div>
    </motion.div>
  )
}
