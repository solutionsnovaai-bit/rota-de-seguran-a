import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type PointerEvent } from 'react'
import cover from '@/assets/cover.webp'
import { SplitLetters } from '@/components/motion/SplitLetters'
import { useFinePointer } from '@/hooks/useMediaQuery'
import { Container } from '@/components/ui/Container'
import { CtaButton } from '@/components/ui/CtaButton'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { hero } from '@/content/hero'
import { sectionIds, site } from '@/content/site'
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
  const fine = useFinePointer()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // Cursor de -1 a 1 sobre o hero, com mola — move retrato e livro em sentidos opostos.
  const pointerX = useSpring(0, { stiffness: 60, damping: 18 })
  const pointerY = useSpring(0, { stiffness: 60, damping: 18 })
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!fine) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <section
      ref={ref}
      id={sectionIds.hero}
      onPointerMove={onPointerMove}
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-900 text-paper"
    >
      <HeroBackdrop ready={ready} progress={scrollYProgress} />

      <HeroPortrait
        ready={ready}
        progress={scrollYProgress}
        pointerX={pointerX}
        className="absolute inset-x-0 top-[calc(var(--header-h)-4px)] h-[50svh] sm:h-[60svh] lg:inset-x-auto lg:bottom-0 lg:right-[3%] lg:top-auto lg:h-[min(92svh,980px)] lg:w-[46%] xl:right-[6%]"
      />

      <HeroBook ready={ready} pointerX={pointerX} pointerY={pointerY} progress={scrollYProgress} />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-[42svh] sm:pb-16 sm:pt-[56svh] lg:justify-center lg:pb-24 lg:pt-[calc(var(--header-h)+3rem)]">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-[46rem]">
          <Eyebrow tone="paper" play={ready} className="tracking-[0.14em] sm:tracking-eyebrow">
            <motion.span className="inline-block" {...enter(ready, 0.2)}>
              {hero.eyebrow}
            </motion.span>
          </Eyebrow>

          <h1
            aria-label={hero.title}
            className="mt-5 font-display text-[clamp(2.5rem,11.4vw,5.6rem)] font-semibold uppercase leading-[0.94] tracking-[-0.03em] drop-shadow-[0_10px_40px_rgba(4,11,26,0.65)] sm:mt-7 lg:text-[clamp(4rem,6.3vw,7.6rem)]"
            style={{ fontStretch: '104%' }}
          >
            <span className="block">
              <SplitLetters text={hero.titleLines[0]} play={ready} delay={0.3} />
            </span>{' '}
            <span className="block">
              <SplitLetters text={hero.titleLines[1]} accentWord={hero.titleAccent} play={ready} delay={0.5} />
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

          <motion.p
            className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] font-medium text-paper/55 sm:mt-6 sm:text-sm"
            {...enter(ready, 1.32)}
          >
            {hero.fineLine.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2">
                {index > 0 ? <span className="text-flame">·</span> : null}
                <span>{item}</span>
              </span>
            ))}
          </motion.p>
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

interface HeroBookProps {
  ready: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  progress: MotionValue<number>
}

/** Capa do e-book flutuando ao lado da autora (só no desktop). */
function HeroBook({ ready, pointerX, pointerY, progress }: HeroBookProps) {
  const x = useTransform(() => pointerX.get() * 22)
  const scrollY = useTransform(progress, [0, 1], [0, -120])
  const y = useTransform(() => pointerY.get() * 16 + scrollY.get())
  const rotateY = useTransform(() => pointerX.get() * 14 + 18)
  const rotateX = useTransform(() => pointerY.get() * -10)

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bottom-[9%] right-[40%] z-[5] hidden w-[10.5rem] [perspective:900px] lg:block xl:right-[41%] xl:w-[12rem]"
      style={{ x, y }}
    >
      <motion.div
        initial={{ opacity: 0, y: 120, rotate: 6 }}
        animate={ready ? { opacity: 1, y: 0, rotate: -7 } : undefined}
        transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 1.35 }}
      >
        <div className="animate-drift">
          <motion.img
            src={cover}
            alt={site.name}
            width={560}
            height={816}
            decoding="async"
            className="w-full rounded-l-[3px] rounded-r-[6px] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]"
            style={{ rotateY, rotateX }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
