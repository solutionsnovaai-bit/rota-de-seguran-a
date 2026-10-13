import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

interface MaskRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Quando definido, controla a entrada manualmente (ex.: depois da abertura). */
  play?: boolean
}

/** Cortina de baixo para cima com leve recuo de zoom — entrada de imagem. */
export function MaskReveal({ children, className, delay = 0, play }: MaskRevealProps) {
  const frame: Variants = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.5, delay, ease: ease.quint } },
  }
  const inner: Variants = {
    hidden: { scale: 1.16 },
    show: { scale: 1, transition: { duration: 2, delay, ease: ease.expo } },
  }

  // O gatilho fica num invólucro sem recorte: o Chrome considera o clip-path
  // do próprio alvo no IntersectionObserver e a cortina nunca abriria.
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, amount: 0.25 } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <motion.div initial="hidden" {...trigger} className={cn('relative', className)}>
      <motion.div variants={frame} className="absolute inset-0 overflow-hidden [border-radius:inherit]">
        <motion.div variants={inner} className="h-full w-full origin-bottom">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
