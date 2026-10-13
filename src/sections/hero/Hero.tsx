import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SplitLetters } from '@/components/motion/SplitLetters'
import { Container } from '@/components/ui/Container'
import { CtaButton } from '@/components/ui/CtaButton'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { hero } from '@/content/hero'
import { sectionIds } from '@/content/site'
import { ease } from '@/lib/easings'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroPortrait } from './HeroPortrait'

const enter = (ready: boolean, delay: number) => ({
  initial: { opacity: 0, y: 26, filter: 'blur(8px)' },
  animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 1.2, delay, ease: ease.expo },
})

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id={sectionIds.hero}
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-900 text-paper"
    >
      <HeroBackdrop ready={ready} progress={scrollYProgress} />

      <HeroPortrait
        ready={ready}
        progress={scrollYProgress}
        className="absolute inset-x-0 top-[calc(var(--header-h)-4px)] h-[50svh] sm:h-[60svh] lg:inset-x-auto lg:bottom-0 lg:right-[3%] lg:top-auto lg:h-[min(92svh,980px)] lg:w-[46%] xl:right-[6%]"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-[42svh] sm:pb-16 sm:pt-[56svh] lg:justify-center lg:pb-24 lg:pt-[calc(var(--header-h)+3rem)]">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-[46rem]">
          <Eyebrow tone="paper" play={ready} className="tracking-[0.14em] sm:tracking-eyebrow">
            <motion.span className="inline-block" {...enter(ready, 0.2)}>
              {hero.eyebrow}
            </motion.span>
          </Eyebrow>

          <h1
            aria-label={hero.title}
            className="display mt-5 text-[clamp(2.9rem,13.4vw,6.5rem)] leading-[0.84] tracking-[-0.02em] drop-shadow-[0_10px_40px_rgba(4,11,26,0.65)] sm:mt-7 lg:text-[clamp(5rem,8.4vw,9.75rem)]"
            style={{ fontStretch: '88%' }}
          >
            <span className="block">
              <SplitLetters text={hero.titleLines[0]} play={ready} delay={0.3} />
            </span>{' '}
            <span className="block text-flame">
              <SplitLetters text={hero.titleLines[1]} play={ready} delay={0.5} />
            </span>
          </h1>

          <motion.p
            className="text-pretty mt-6 max-w-[34rem] text-[1.2rem] font-medium leading-snug tracking-[-0.012em] text-paper sm:mt-8 sm:text-2xl"
            {...enter(ready, 0.95)}
          >
            {hero.subtitle}
          </motion.p>

          <motion.p className="text-pretty mt-4 max-w-[31rem] text-base leading-relaxed text-paper/65 sm:text-lg" {...enter(ready, 1.08)}>
            {hero.support}
          </motion.p>

          <motion.div className="mt-8 sm:mt-10" {...enter(ready, 1.2)}>
            <CtaButton label={hero.cta} placement="hero" size="lg" />
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute bottom-0 left-5 hidden h-16 w-px overflow-hidden bg-white/15 sm:left-8 lg:left-12 lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-flame"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: ease.inOut }}
          />
        </motion.div>
      </Container>
    </section>
  )
}
