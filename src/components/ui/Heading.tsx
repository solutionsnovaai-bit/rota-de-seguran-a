import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Fragment } from 'react'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

interface HeadingProps {
  text: string
  /** Trecho do título destacado em laranja (precisa existir no texto). */
  accent?: string
  as?: 'h1' | 'h2' | 'h3'
  size?: 'lg' | 'md'
  className?: string
}

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 }

const word: Variants = {
  hidden: { y: '115%', rotate: 5 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.05, ease: ease.expo } },
}

/** Marca, palavra a palavra, se ela faz parte do trecho em destaque. */
function splitWords(text: string, accent?: string) {
  const start = accent ? text.indexOf(accent) : -1
  const end = start >= 0 && accent ? start + accent.length : -1
  let cursor = 0
  return text.split(' ').map((value) => {
    const at = cursor
    cursor += value.length + 1
    return { value, accent: start >= 0 && at >= start && at < end }
  })
}

/**
 * Título de seção na tipografia da capa (Archivo pesada).
 * As palavras sobem de dentro de uma máscara quando o título entra na tela.
 */
export function Heading({ text, accent, as = 'h2', size = 'lg', className }: HeadingProps) {
  const reduce = useReducedMotion()
  const Tag = tags[as]
  const words = splitWords(text, accent)

  return (
    <Tag
      className={cn(
        'text-balance font-display font-extrabold',
        size === 'lg' ? 'text-display-lg' : 'text-display-md',
        className,
      )}
      style={{ fontStretch: '96%' }}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } } }}
    >
      {words.map((item, index) => (
        <Fragment key={`${item.value}-${index}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              variants={word}
              className={cn('inline-block origin-bottom-left will-change-transform', item.accent && 'text-flame')}
            >
              {item.value}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
