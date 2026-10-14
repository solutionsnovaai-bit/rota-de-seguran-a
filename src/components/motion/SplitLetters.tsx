import { motion, type Variants } from 'framer-motion'
import { Fragment } from 'react'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

interface SplitLettersProps {
  text: string
  play: boolean
  delay?: number
  stagger?: number
  className?: string
  letterClassName?: string
  /** Palavra exibida em laranja (como "MUITO" na capa). */
  accentWord?: string
}

const letter: Variants = {
  hidden: { y: '118%', rotate: 7 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.15, ease: ease.expo } },
}

/**
 * Revela o texto letra a letra, cada palavra dentro de uma máscara.
 * A leitura acessível fica no elemento pai (aria-label).
 */
export function SplitLetters({
  text,
  play,
  delay = 0,
  stagger = 0.032,
  className,
  letterClassName,
  accentWord,
}: SplitLettersProps) {
  const words = text.split(' ')

  return (
    <motion.span
      aria-hidden
      className={cn('inline', className)}
      initial="hidden"
      animate={play ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span
            className={cn(
              '-mb-[0.18em] -mt-[0.08em] inline-block overflow-hidden whitespace-nowrap pb-[0.18em] pt-[0.08em] align-bottom',
              accentWord && word === accentWord && 'text-flame',
            )}
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`${char}-${charIndex}`}
                variants={letter}
                className={cn('inline-block origin-bottom-left will-change-transform', letterClassName)}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  )
}
