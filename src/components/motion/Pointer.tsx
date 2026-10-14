import { motion, useSpring } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useFinePointer } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import { spring } from '@/lib/easings'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Atrai levemente o elemento na direção do cursor (só com mouse). */
export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, spring.magnetic)
  const y = useSpring(0, spring.magnetic)

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}

interface SpotlightProps {
  children: ReactNode
  className?: string
  /** Cor da luz (qualquer cor CSS). */
  color?: string
  size?: number
}

/**
 * Luz suave que acompanha o cursor por cima do card.
 * Ajusta só variáveis CSS — nenhum re-render a cada movimento.
 */
export function Spotlight({ children, className, color = 'rgba(250,61,12,0.16)', size = 420 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element || event.pointerType !== 'mouse') return
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={cn('group/spot relative isolate', className)}>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 65%)`,
        }}
      />
    </div>
  )
}
