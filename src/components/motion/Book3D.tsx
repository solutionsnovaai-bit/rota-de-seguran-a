import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { usePointerTilt } from '@/hooks/usePointerTilt'
import { cn } from '@/lib/cn'

interface Book3DProps {
  cover: string
  alt: string
  className?: string
}

/**
 * Livro em 3D real (capa, lombada, miolo e contracapa) que gira com o scroll
 * e responde ao cursor.
 */
export function Book3D({ cover, alt, className }: Book3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scrollTurn = useTransform(scrollYProgress, [0, 1], reduce ? [18, 18] : [42, -10])
  const turn = useSpring(scrollTurn, { stiffness: 70, damping: 18 })
  const { rotateX, rotateY, glare, handlers, enabled } = usePointerTilt(9)
  const combinedY = useTransform(() => turn.get() + (enabled ? rotateY.get() : 0))

  return (
    <div ref={ref} className={cn('[--d:22px] [perspective:1800px] sm:[--d:30px]', className)} {...handlers}>
      <div className="animate-drift">
        <motion.div
          className="preserve-3d relative mx-auto aspect-[560/816] w-full"
          style={{ rotateY: combinedY, rotateX: enabled ? rotateX : 0 }}
        >
          {/* capa */}
          <div
            className="backface-hidden absolute inset-0 overflow-hidden rounded-l-[3px] rounded-r-[8px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]"
            style={{ transform: 'translateZ(calc(var(--d) / 2))' }}
          >
            <img src={cover} alt={alt} width={560} height={816} className="h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/45 via-white/10 to-transparent" />
            <motion.div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
          </div>

          {/* contracapa */}
          <div
            aria-hidden
            className="backface-hidden absolute inset-0 rounded-l-[8px] rounded-r-[3px] bg-gradient-to-br from-navy-800 to-navy-950"
            style={{ transform: 'rotateY(180deg) translateZ(calc(var(--d) / 2))' }}
          />

          {/* lombada */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-900"
            style={{ width: 'var(--d)', transform: 'translateX(calc(var(--d) / -2)) rotateY(-90deg)' }}
          >
            <div className="absolute inset-x-[30%] top-[8%] h-[84%] rounded-full bg-flame/80" />
          </div>

          {/* miolo */}
          <div
            aria-hidden
            className="absolute right-0 top-[1.2%] h-[97.6%] bg-[repeating-linear-gradient(90deg,#f4efe6_0px,#f4efe6_2px,#ddd5c6_3px)]"
            style={{ width: 'var(--d)', transform: 'translateX(calc(var(--d) / 2)) rotateY(90deg)' }}
          />
        </motion.div>
      </div>
      <div aria-hidden className="mx-auto mt-6 h-6 w-3/4 rounded-[100%] bg-black/50 blur-xl" />
    </div>
  )
}
