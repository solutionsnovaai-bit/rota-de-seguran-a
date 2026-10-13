import type { Transition, Variants } from 'framer-motion'

/** Curvas usadas em todo o site — saídas longas, sem rebote. */
export const ease = {
  expo: [0.16, 1, 0.3, 1],
  quint: [0.83, 0, 0.17, 1],
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

export const spring = {
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 },
  snappy: { type: 'spring', stiffness: 260, damping: 26 },
  magnetic: { type: 'spring', stiffness: 180, damping: 14, mass: 0.4 },
} as const satisfies Record<string, Transition>

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: ease.expo },
  },
}

export const viewportOnce = { once: true, amount: 0.3 } as const
