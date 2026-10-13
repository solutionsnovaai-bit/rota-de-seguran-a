import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

/** Verdadeiro depois que a página rolou além de `threshold` pixels. */
export function useScrollThreshold(threshold: number): boolean {
  const { scrollY } = useScroll()
  const [passed, setPassed] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > threshold
    setPassed((current) => (current === next ? current : next))
  })

  return passed
}
