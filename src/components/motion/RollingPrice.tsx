import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/cn'

interface RollingPriceProps {
  from: number
  to: number
  className?: string
  currencyClassName?: string
}

/** O preço cai do valor cheio para o valor de lançamento quando aparece. */
export function RollingPrice({ from, to, className, currencyClassName }: RollingPriceProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const value = useCountUp({ from, to, start: inView, duration: 1.6, delay: 0.45 })

  return (
    <span ref={ref} className={cn('tabular inline-flex items-start', className)}>
      <span className={currencyClassName}>R$ </span>
      <span>{value}</span>
    </span>
  )
}
