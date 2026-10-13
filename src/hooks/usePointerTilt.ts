import { useMotionTemplate, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useCallback, type PointerEvent } from 'react'
import { useFinePointer } from './useMediaQuery'

interface PointerTilt {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  glare: MotionValue<string>
  handlers: {
    onPointerMove: (event: PointerEvent<HTMLElement>) => void
    onPointerLeave: () => void
  }
  enabled: boolean
}

/** Inclinação 3D seguindo o cursor, com mola e reflexo de luz. Desligada em toque. */
export function usePointerTilt(max = 10): PointerTilt {
  const enabled = useFinePointer()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 140, damping: 18, mass: 0.5 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springConfig)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springConfig)

  const gx = useTransform(px, [0, 1], [0, 100])
  const gy = useTransform(py, [0, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!enabled) return
      const rect = event.currentTarget.getBoundingClientRect()
      px.set((event.clientX - rect.left) / rect.width)
      py.set((event.clientY - rect.top) / rect.height)
    },
    [enabled, px, py],
  )

  const onPointerLeave = useCallback(() => {
    px.set(0.5)
    py.set(0.5)
  }, [px, py])

  return { rotateX, rotateY, glare, handlers: { onPointerMove, onPointerLeave }, enabled }
}
