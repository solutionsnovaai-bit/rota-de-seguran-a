import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '@/lib/easings'
import { SmoothScrollProvider } from './SmoothScrollProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: ease.expo }}>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  )
}
