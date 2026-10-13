import { animate, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from '@/lib/easings'

interface CountUpOptions {
  to: number
  from?: number
  decimals?: number
  duration?: number
  delay?: number
  start: boolean
}

const formatters = new Map<number, Intl.NumberFormat>()

function format(value: number, decimals: number): string {
  let formatter = formatters.get(decimals)
  if (!formatter) {
    formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    formatters.set(decimals, formatter)
  }
  return formatter.format(value)
}

/** Anima um número até o valor final e devolve o texto já no formato brasileiro (8,5). */
export function useCountUp({ to, from = 0, decimals = 0, duration = 2, delay = 0, start }: CountUpOptions): string {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(() => format(from, decimals))

  useEffect(() => {
    if (!start) return
    if (reduce) {
      setValue(format(to, decimals))
      return
    }
    const controls = animate(from, to, {
      duration,
      delay,
      ease: ease.expo,
      onUpdate: (latest) => setValue(format(latest, decimals)),
      onComplete: () => setValue(format(to, decimals)),
    })
    return () => controls.stop()
  }, [start, reduce, from, to, decimals, duration, delay])

  return value
}
