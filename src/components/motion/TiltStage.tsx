import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePointerTilt } from '@/hooks/usePointerTilt'
import { cn } from '@/lib/cn'

interface TiltStageProps {
  children: ReactNode
  max?: number
  className?: string
}

/** Palco com perspectiva: o conteúdo inclina acompanhando o cursor. */
export function TiltStage({ children, max = 8, className }: TiltStageProps) {
  const { rotateX, rotateY, handlers, enabled } = usePointerTilt(max)

  return (
    <div className={cn('[perspective:1400px]', className)} {...handlers}>
      <motion.div className="preserve-3d relative" style={enabled ? { rotateX, rotateY } : undefined}>
        {children}
      </motion.div>
    </div>
  )
}
