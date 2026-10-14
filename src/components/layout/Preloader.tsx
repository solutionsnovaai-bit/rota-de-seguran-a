import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SplitLetters } from '@/components/motion/SplitLetters'
import { RoutePath } from '@/components/motion/RoutePath'
import { hero } from '@/content/hero'
import { site } from '@/content/site'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { ease } from '@/lib/easings'
import { safeSession } from '@/lib/safe-storage'

const SESSION_KEY = 'vsvm:intro'
const HOLD_MS = 2600
const ROUTE = 'M24 92 C 120 92 150 34 262 38 S 430 104 576 40'

interface PreloaderProps {
  /** Chamado quando a cortina começa a subir — a abertura do hero entra junto. */
  onReveal: () => void
}

/** Abertura: a rota se desenha, o nome da autora e o título entram, a cortina sobe. */
export function Preloader({ onReveal }: PreloaderProps) {
  const reduce = useReducedMotion()
  const lenis = useLenis()
  const [visible, setVisible] = useState(() => !reduce && safeSession.get(SESSION_KEY) !== '1')
  const revealed = useRef(false)

  const reveal = () => {
    if (revealed.current) return
    revealed.current = true
    onReveal()
  }

  useEffect(() => {
    if (!visible) {
      reveal()
      return
    }
    window.scrollTo(0, 0)
    document.body.classList.add('is-locked')
    const hold = window.setTimeout(() => setVisible(false), HOLD_MS)
    return () => window.clearTimeout(hold)
  }, [visible])

  useEffect(() => {
    if (!lenis) return
    if (visible) lenis.stop()
    else lenis.start()
  }, [lenis, visible])

  const finish = () => {
    document.body.classList.remove('is-locked')
    safeSession.set(SESSION_KEY, '1')
    reveal()
  }

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible ? (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-950 text-paper"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.15, ease: ease.quint }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.22),transparent_60%)]" />

          <motion.div
            className="relative flex w-full max-w-3xl flex-col items-center px-6 text-center"
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.9, ease: ease.quint }}
          >
            <svg viewBox="0 0 600 130" className="w-[min(520px,82vw)] text-flame">
              <RoutePath d={ROUTE} stroke="rgba(243,246,252,0.14)" strokeWidth={2} dash="2 10" duration={0.01} />
              <RoutePath d={ROUTE} stroke="#FA3D0C" strokeWidth={3} dash="10 9" duration={1.7} delay={0.15} />
              <motion.circle
                cx="24"
                cy="92"
                r="7"
                fill="#F3F6FC"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: ease.expo }}
              />
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: ease.expo, delay: 1.6 }}
                style={{ originX: '576px', originY: '40px' }}
              >
                <circle cx="576" cy="40" r="22" fill="#FA3D0C" opacity="0.18" />
                <circle cx="576" cy="40" r="11" fill="#FA3D0C" />
                <circle cx="576" cy="40" r="4" fill="#F3F6FC" />
              </motion.g>
            </svg>

            <p className="eyebrow mt-8 text-paper/70">
              <SplitLetters text={site.author} play delay={0.4} stagger={0.028} />
            </p>

            <p
              className="mt-4 font-display text-[clamp(2.2rem,8.4vw,6rem)] font-semibold uppercase leading-[0.94] tracking-[-0.025em]"
              style={{ fontStretch: '104%' }}
            >
              <span className="block">
                <SplitLetters text={hero.titleLines[0]} play delay={0.75} />
              </span>
              <span className="block">
                <SplitLetters text={hero.titleLines[1]} accentWord={hero.titleAccent} play delay={0.95} />
              </span>
            </p>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-flame"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOLD_MS / 1000, ease: ease.inOut }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
