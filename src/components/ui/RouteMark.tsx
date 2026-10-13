import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

interface RouteMarkProps {
  className?: string
  /** Desenha a rota ao montar. */
  animated?: boolean
  tone?: 'flame' | 'paper'
}

const ROUTE = 'M19 47c0-9 7-12 13-14s13-5 13-14'

/** Símbolo da marca: ponto de partida, rota e destino. */
export function RouteMark({ className, animated = false, tone = 'flame' }: RouteMarkProps) {
  const color = tone === 'flame' ? '#FA3D0C' : '#F3F6FC'

  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn('shrink-0', className)}>
      <motion.path
        d={ROUTE}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: ease.inOut, delay: 0.2 }}
      />
      <circle cx="19" cy="47" r="4.5" fill={tone === 'flame' ? '#F3F6FC' : '#FA3D0C'} />
      <motion.g
        initial={animated ? { scale: 0, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: ease.expo, delay: animated ? 1.3 : 0 }}
        style={{ originX: '45px', originY: '18px' }}
      >
        <circle cx="45" cy="18" r="8" fill={color} />
        <circle cx="45" cy="18" r="3" fill={tone === 'flame' ? '#F3F6FC' : '#0B1F42'} />
      </motion.g>
    </svg>
  )
}
