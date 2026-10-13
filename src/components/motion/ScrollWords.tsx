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
}

/** Acende o texto palavra por palavra conforme a leitura avança no scroll. */
export function ScrollWords({ text, className, dim = 0.16, offset = ['start 0.88', 'end 0.55'] }: ScrollWordsProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const words = text.split(' ')

  if (reduce) {
    return <span className={cn('block', className)}>{text}</span>
  }

  return (
    <span ref={ref} className={cn('relative block', className)}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = start + 1 / words.length
        return (
          <Fragment key={`${word}-${index}`}>
            <Word progress={scrollYProgress} range={[start, end]} dim={dim}>
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
}

function Word({ children, progress, range, dim }: WordProps) {
  const opacity = useTransform(progress, range, [dim, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}
