import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface VelocityMarqueeProps {
  children: ReactNode
  /** Porcentagem por segundo; negativo corre para a esquerda. */
  baseVelocity?: number
  className?: string
  itemClassName?: string
  skew?: boolean
}

const COPIES = 4

function wrap(min: number, max: number, value: number): number {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/** Faixa infinita que acelera e inverte o sentido de acordo com o scroll. */
export function VelocityMarquee({ children, baseVelocity = -3, className, itemClassName, skew = true }: VelocityMarqueeProps) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smoothVelocity, [-2400, 0, 2400], skew ? [7, 0, -7] : [0, 0, 0])
  const x = useTransform(baseX, (value) => `${wrap(-100 / COPIES, 0, value)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div aria-hidden className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="flex shrink-0 whitespace-nowrap will-change-transform" style={{ x, skewX }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <span key={index} className={cn('block shrink-0', itemClassName)}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
