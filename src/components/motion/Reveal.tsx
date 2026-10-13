import { motion, type HTMLMotionProps } from 'framer-motion'
import { ease } from '@/lib/easings'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
  amount?: number
  blur?: boolean
}

/** Entrada padrão: sobe, ganha opacidade e foco quando entra na tela. */
export function Reveal({ children, delay = 0, y = 32, amount = 0.3, blur = true, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, delay, ease: ease.expo }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
