import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ParallaxProps {
  children: ReactNode
  /** Deslocamento em pixels ao longo da passagem pela tela. */
  distance?: number
  className?: string
}

export function Parallax({ children, distance = 80, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div className="h-full w-full will-change-transform" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
