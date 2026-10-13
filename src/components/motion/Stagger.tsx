import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '@/lib/easings'

interface StaggerGroupProps {
  children: ReactNode
  as?: 'div' | 'ul' | 'ol'
  stagger?: number
  delay?: number
  amount?: number
  className?: string
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: ease.expo } },
}

export function StaggerGroup({ children, as = 'div', stagger = 0.09, delay = 0, amount = 0.2, className }: StaggerGroupProps) {
  const Component = as === 'ul' ? motion.ul : as === 'ol' ? motion.ol : motion.div
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={groupVariants(stagger, delay)}
    >
      {children}
    </Component>
  )
}

interface StaggerItemProps {
  children: ReactNode
  as?: 'div' | 'li'
  className?: string
}

export function StaggerItem({ children, as = 'div', className }: StaggerItemProps) {
  const Component = as === 'li' ? motion.li : motion.div
  return (
    <Component className={className} variants={staggerItem}>
      {children}
    </Component>
  )
}
