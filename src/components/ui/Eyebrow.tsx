import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

interface EyebrowProps {
  children: ReactNode
  tone?: 'flame' | 'paper' | 'navy' | 'mist'
  className?: string
  /** Quando definido, a entrada acompanha a abertura em vez do scroll. */
  play?: boolean
}

const tones = {
  flame: 'text-flame',
  paper: 'text-paper/80',
  navy: 'text-navy-900/70',
  mist: 'text-mist',
}

/** "Olho" acima dos títulos, com o fio laranja da capa do livro. */
export function Eyebrow({ children, tone = 'flame', className, play }: EyebrowProps) {
  const trigger =
    play === undefined
      ? { whileInView: { scaleX: 1 }, viewport: { once: true, amount: 0.8 } }
      : { animate: { scaleX: play ? 1 : 0 } }

  return (
    <p className={cn('eyebrow', tones[tone], className)}>
      <motion.span
        aria-hidden
        className="h-[2px] w-9 shrink-0 origin-left bg-flame"
        initial={{ scaleX: 0 }}
        transition={{ duration: 1.1, ease: ease.expo, delay: 0.1 }}
        {...trigger}
      />
      <span>{children}</span>
    </p>
  )
}
