import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type SectionTone = 'deep' | 'navy' | 'paper' | 'paper-soft'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone: SectionTone
  /** Sobe por cima da seção anterior com cantos arredondados (efeito de pilha). */
  overlap?: boolean
  spacing?: 'default' | 'tight' | 'none'
}

const tones: Record<SectionTone, string> = {
  deep: 'bg-navy-950 text-paper',
  navy: 'bg-navy-900 text-paper',
  paper: 'bg-paper text-navy-900',
  'paper-soft': 'bg-paper-100 text-navy-900',
}

const spacings = {
  default: 'py-24 sm:py-32 lg:py-40',
  tight: 'py-16 sm:py-24',
  none: '',
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { tone, overlap = false, spacing = 'default', className, children, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(
        'relative',
        tones[tone],
        spacings[spacing],
        overlap && 'z-[1] -mt-10 rounded-t-[2.25rem] sm:-mt-14 sm:rounded-t-[3.5rem]',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
})
