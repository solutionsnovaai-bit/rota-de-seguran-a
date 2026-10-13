import { motion, type MotionValue } from 'framer-motion'
import { useId } from 'react'
import { ease } from '@/lib/easings'

interface RoutePathProps {
  d: string
  /** Progresso controlado pelo scroll (0 → 1). */
  progress?: MotionValue<number>
  /** Ou desenho automático, disparado por este sinal. */
  play?: boolean
  duration?: number
  delay?: number
  stroke?: string
  strokeWidth?: number
  /** Tracejado da rota; o desenho é feito por máscara para manter os traços. */
  dash?: string
  className?: string
}

/**
 * Traço de rota que se desenha — pelo scroll ou por animação.
 * Deve ser usado dentro de um <svg>.
 */
export function RoutePath({
  d,
  progress,
  play = true,
  duration = 1.8,
  delay = 0,
  stroke = 'currentColor',
  strokeWidth = 2,
  dash,
  className,
}: RoutePathProps) {
  const maskId = `route-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  const drawing = progress
    ? { style: { pathLength: progress } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: play ? 1 : 0 },
        transition: { duration, delay, ease: ease.inOut },
      }

  if (!dash) {
    return (
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={className}
        {...drawing}
      />
    )
  }

  return (
    <g className={className}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <motion.path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            {...drawing}
          />
        </mask>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dash}
        mask={`url(#${maskId})`}
      />
    </g>
  )
}
