import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface HeadingProps {
  text: string
  /** Trecho do título destacado em laranja (precisa existir no texto). */
  accent?: string
  as?: 'h1' | 'h2' | 'h3'
  size?: 'lg' | 'md'
  className?: string
}

function splitAccent(text: string, accent?: string): ReactNode {
  if (!accent) return text
  const index = text.indexOf(accent)
  if (index === -1) return text
  return (
    <>
      {text.slice(0, index)}
      <span data-accent className="text-flame">
        {accent}
      </span>
      {text.slice(index + accent.length)}
    </>
  )
}

/** Título de seção na tipografia da capa (Archivo pesada). */
export function Heading({ text, accent, as: Tag = 'h2', size = 'lg', className }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'text-balance font-display font-extrabold',
        size === 'lg' ? 'text-display-lg' : 'text-display-md',
        className,
      )}
      style={{ fontStretch: '96%' }}
    >
      {splitAccent(text, accent)}
    </Tag>
  )
}
