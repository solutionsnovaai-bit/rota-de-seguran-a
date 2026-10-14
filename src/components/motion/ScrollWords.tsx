import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { cn } from '@/lib/cn'

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset']

interface ScrollWordsProps {
  text: string
  className?: string
  /** Opacidade das palavras ainda não lidas. */
  dim?: number
  offset?: ScrollOffset
  /** Quantas palavras iniciais ficam em destaque (laranja). */
  accentWords?: number
}

/** Acende o texto palavra por palavra conforme a leitura avança no scroll. */
export function ScrollWords({
  text,
  className,
  dim = 0.16,
  offset = ['start 0.88', 'end 0.55'],
  accentWords = 0,
}: ScrollWordsProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const words = text.split(' ')

  if (reduce) {
    if (!accentWords) return <span className={cn('block', className)}>{text}</span>
    return (
      <span className={cn('block', className)}>
        <span className="text-flame">{words.slice(0, accentWords).join(' ')}</span> {words.slice(accentWords).join(' ')}
      </span>
    )
  }

  return (
    <span ref={ref} className={cn('relative block', className)}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = start + 1 / words.length
        return (
          <Fragment key={`${word}-${index}`}>
            <Word progress={scrollYProgress} range={[start, end]} dim={dim} accent={index < accentWords}>
              {word}
            </Word>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </span>
  )
}

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  dim: number
  accent: boolean
}

function Word({ children, progress, range, dim, accent }: WordProps) {
  const opacity = useTransform(progress, range, [dim, 1])
  return (
    <motion.span className={accent ? 'text-flame' : undefined} style={{ opacity }}>
      {children}
    </motion.span>
  )
}
