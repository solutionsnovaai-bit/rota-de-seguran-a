import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/cn'

interface CountUpProps {
  value: number
  decimals?: number
  suffix?: string
  className?: string
  suffixClassName?: string
  duration?: number
}

export function CountUp({ value, decimals = 0, suffix = '', className, suffixClassName, duration = 2.4 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const text = useCountUp({ to: value, decimals, duration, start: inView })

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {text}
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  )
}
