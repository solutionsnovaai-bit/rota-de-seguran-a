import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { Eye, FolderLock, HeartHandshake, Route, Siren, Sparkles, Sunrise, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import bonusKit from '@/assets/bonus-kit.webp'
import { Parallax } from '@/components/motion/Parallax'
import { Spotlight } from '@/components/motion/Pointer'
import { Reveal } from '@/components/motion/Reveal'
import { RoutePath } from '@/components/motion/RoutePath'
import { SplitLetters } from '@/components/motion/SplitLetters'
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger'
import { TiltStage } from '@/components/motion/TiltStage'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { bonus } from '@/content/bonus'
import { sectionIds, site } from '@/content/site'
import { ease } from '@/lib/easings'

const ICONS: LucideIcon[] = [Eye, Siren, FolderLock, Route, HeartHandshake, Sunrise]

const BACK_ROUTE = 'M -60 120 C 260 120 380 360 640 330 S 1000 80 1180 260 S 1380 620 1520 560'

/** O guia Rota de Segurança apresentado como bônus do e-book principal. */
export function Bonus() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.6 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const draw = useSpring(useTransform(scrollYProgress, [0.05, 0.6], [0, 1]), { stiffness: 80, damping: 22 })

  return (
    <Section ref={sectionRef} id={sectionIds.bonus} tone="deep" overlap className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(26,58,115,0.75),transparent_65%)]" />
        <div className="absolute -right-40 top-1/3 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.2),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(243,246,252,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,246,252,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_72%)]" />
        <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 hidden h-[44rem] w-full lg:block">
          <RoutePath d={BACK_ROUTE} progress={draw} stroke="rgba(250,61,12,0.55)" strokeWidth={2} dash="8 12" />
        </svg>
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="relative order-2 lg:order-1 lg:col-span-5">
            <BonusVisual />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <BonusBadge label={bonus.badge} />

            <h2
              ref={titleRef}
              aria-label={bonus.title}
              className="display mt-7 text-[clamp(3rem,13.5vw,6.6rem)] leading-[0.86] tracking-[-0.02em] lg:text-[clamp(4.4rem,6.4vw,7.2rem)]"
              style={{ fontStretch: '88%' }}
            >
              <span className="block">
                <SplitLetters text={bonus.titleLines[0]} play={titleInView} />
              </span>{' '}
              <span className="block text-flame">
                <SplitLetters text={bonus.titleLines[1]} play={titleInView} delay={0.15} />
              </span>
            </h2>

            <Reveal delay={0.2}>
              <p className="text-pretty mt-8 max-w-xl text-[1.25rem] font-medium leading-snug tracking-[-0.012em] text-paper sm:text-2xl">
                {bonus.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="text-pretty mt-4 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg">{bonus.support}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 sm:mt-32">
          <div className="max-w-3xl">
            <Eyebrow>{bonus.contentsEyebrow}</Eyebrow>
            <Heading text={bonus.contentsTitle} accent="proteção real" size="md" as="h3" className="mt-6 text-paper" />
          </div>

          <StaggerGroup as="ol" stagger={0.08} amount={0.1} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {bonus.items.map((item, index) => {
              const Icon = ICONS[index] ?? Route
              return (
                <StaggerItem as="li" key={item.title} className="h-full">
                  <Spotlight className="h-full rounded-[1.6rem]">
                    <article className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 transition-colors duration-500 hover:border-flame/40 sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="grid size-12 place-items-center rounded-2xl bg-flame/15 text-flame transition-all duration-700 ease-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-flame group-hover:text-paper">
                          <Icon aria-hidden className="size-6" strokeWidth={1.8} />
                        </span>
                        <span aria-hidden className="font-display text-sm font-bold tracking-[0.2em] text-paper/35">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-pretty leading-relaxed text-paper/70">
                        <strong className="font-display text-lg font-extrabold text-paper" style={{ fontStretch: '98%' }}>
                          {item.title}
                        </strong>{' '}
                        <span className="text-flame">—</span> {item.text}
                      </p>
                    </article>
                  </Spotlight>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  )
}

function BonusBadge({ label }: { label: string }) {
  return (
    <motion.p
      className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-flame px-5 py-2.5 font-display text-sm font-black uppercase tracking-[0.28em] text-paper shadow-flame"
      style={{ fontStretch: '112%' }}
      initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <Sparkles aria-hidden className="relative size-4" strokeWidth={2.2} />
      <span className="relative">{label}</span>
    </motion.p>
  )
}

function BonusVisual() {
  return (
    <div className="relative mx-auto w-[min(80vw,25rem)] lg:w-full lg:max-w-[29rem]">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.3),transparent_62%)]"
      />
      <BadgeRing />
      <Parallax distance={36}>
        <TiltStage max={8}>
          <motion.img
            src={bonusKit}
            alt={`${bonus.title} — ${site.author}`}
            width={833}
            height={1193}
            loading="lazy"
            decoding="async"
            className="relative w-full drop-shadow-[0_50px_60px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 60, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: ease.expo }}
          />
        </TiltStage>
      </Parallax>
    </div>
  )
}

/** Selo circular girando com a palavra "Bônus". */
function BadgeRing() {
  const text = `${bonus.badge} ✦ `.repeat(3)
  return (
    <motion.div
      aria-hidden
      className="absolute -right-2 -top-4 z-10 size-28 sm:-right-6 sm:size-32"
      initial={{ scale: 0, rotate: -90 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.4 }}
    >
      <div className="absolute inset-[18%] grid place-items-center rounded-full bg-flame text-paper shadow-flame">
        <Sparkles className="size-7" strokeWidth={2} />
      </div>
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="bonus-ring" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-paper font-display text-[21px] font-black uppercase tracking-[0.12em]">
          <textPath href="#bonus-ring" textLength={486} lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </motion.div>
  )
}
