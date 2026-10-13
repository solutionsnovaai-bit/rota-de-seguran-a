import { motion, useScroll, useSpring } from 'framer-motion'

/** A rota percorrida: fio laranja no topo que avança com a leitura. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-flame"
      style={{ scaleX }}
    />
  )
}
