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
