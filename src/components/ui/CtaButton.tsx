import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { Magnetic } from '@/components/motion/Pointer'
import { buildCheckoutUrl } from '@/lib/checkout'
import { cn } from '@/lib/cn'
import { trackCheckoutIntent } from '@/lib/tracking'

type Variant = 'flame' | 'paper' | 'navy'
type Size = 'md' | 'lg' | 'xl'

interface CtaButtonProps {
  label: string
  /** Onde o botão está (vai junto no evento de clique). */
  placement: string
  variant?: Variant
  size?: Size
  full?: boolean
  magnetic?: boolean
  className?: string
}

const variants: Record<Variant, string> = {
  flame:
    'bg-flame text-paper shadow-flame hover:bg-flame-400 hover:shadow-[0_24px_60px_-10px_rgba(250,61,12,0.7)]',
  paper: 'bg-paper text-navy-900 shadow-card hover:bg-white',
  navy: 'bg-navy-900 text-paper shadow-soft hover:bg-navy-800',
}

const sizes: Record<Size, string> = {
  md: 'h-12 pl-6 pr-1.5 text-[0.95rem]',
  lg: 'h-14 pl-7 pr-2 text-base sm:h-16 sm:pl-8 sm:text-[1.05rem]',
  xl: 'h-16 gap-3 pl-6 pr-2 text-[0.95rem] sm:h-[4.5rem] sm:gap-5 sm:pl-10 sm:text-xl',
}

const iconSizes: Record<Size, string> = {
  md: 'size-9',
  lg: 'size-10 sm:size-12',
  xl: 'size-11 sm:size-14',
}

/** Botão de compra — leva ao checkout com os parâmetros da campanha. */
export function CtaButton({
  label,
  placement,
  variant = 'flame',
  size = 'lg',
  full = false,
  magnetic = true,
  className,
}: CtaButtonProps) {
  // Link do checkout com os parâmetros de campanha da visita atual.
  const href = useMemo(() => buildCheckoutUrl(), [])

  const button = (
    <a
      href={href}
      onClick={() => trackCheckoutIntent(placement)}
      className={cn(
        'group relative isolate inline-flex items-center justify-between gap-5 overflow-hidden rounded-full font-display font-bold tracking-[-0.01em] transition-[background-color,box-shadow,transform] duration-500 ease-expo active:scale-[0.98]',
        variants[variant],
        sizes[size],
        full && 'w-full',
        className,
      )}
      style={{ fontStretch: '108%' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <span className="relative whitespace-nowrap">{label}</span>
      <span
        aria-hidden
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-500',
          variant === 'flame' ? 'bg-navy-950/20 group-hover:bg-navy-950/30' : 'bg-flame text-paper',
          iconSizes[size],
        )}
      >
        <ArrowRight className="size-[45%] transition-transform duration-500 ease-expo group-hover:translate-x-[160%]" strokeWidth={2.4} />
        <ArrowRight
          className="absolute size-[45%] -translate-x-[160%] transition-transform duration-500 ease-expo group-hover:translate-x-0"
          strokeWidth={2.4}
        />
      </span>
    </a>
  )

  if (!magnetic) return button
  return <Magnetic className={full ? 'w-full' : undefined}>{button}</Magnetic>
}
