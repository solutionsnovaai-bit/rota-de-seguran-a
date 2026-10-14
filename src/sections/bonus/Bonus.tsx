import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Eye,
  FolderLock,
  MapPinned,
  MessageCircleHeart,
  RefreshCw,
  Route,
  Siren,
  Sparkles,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
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
import { Section } from '@/components/ui/Section'
import { bonus } from '@/content/bonus'
import { sectionIds, site } from '@/content/site'
import { ease } from '@/lib/easings'
import type { BonusItem } from '@/types/content'

/** Ícones da lista "Nesse guia você aprenderá a:". */
const LEARN_ICONS: LucideIcon[] = [Eye, Siren, FolderLock, Route]

const ICONS: Record<BonusItem['kind'], LucideIcon> = {
  guide: Route,
  finance: Wallet,
  phrases: MessageCircleHeart,
  map: MapPinned,
  updates: RefreshCw,
}

const BACK_ROUTE = 'M -60 160 C 260 160 380 420 640 380 S 1000 120 1180 300 S 1380 660 1520 600'

/** Bônus que acompanham o e-book, todos de graça. O primeiro é o Rota de Segurança. */
export function Bonus() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const draw = useSpring(useTransform(scrollYProgress, [0.05, 0.45], [0, 1]), { stiffness: 80, damping: 22 })
  const [featured, ...others] = bonus.items

  return (
    <Section ref={sectionRef} id={sectionIds.bonus} tone="navy" className="overflow-hidden pt-6 sm:pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-40 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(26,58,115,0.8),transparent_65%)]" />
        <div className="absolute -right-40 top-[30%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.18),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(243,246,252,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,246,252,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_72%)]" />
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 hidden h-[48rem] w-full lg:block">
          <RoutePath d={BACK_ROUTE} progress={draw} stroke="rgba(250,61,12,0.5)" strokeWidth={2} dash="8 12" />
        </svg>
      </div>

      <Container className="relative">
        <span aria-hidden className="mx-auto mb-14 block h-20 w-px bg-gradient-to-b from-transparent to-flame sm:mb-16" />
        <BonusHeader />

        {featured ? <FeaturedBonus item={featured} /> : null}

        <StaggerGroup as="ul" stagger={0.1} amount={0.1} className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:gap-6">
          {others.map((item, index) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <BonusCard item={item} number={index + 2} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}

function BonusHeader() {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <SparkleBurst play={inView} />
        <h2
          ref={ref}
          aria-label={bonus.title}
          className="display text-[clamp(4.2rem,20vw,10rem)] leading-[0.82] tracking-[-0.02em] text-flame"
          style={{ fontStretch: '88%' }}
        >
          <SplitLetters text={bonus.title} play={inView} stagger={0.06} />
        </h2>
        <SparkleBurst play={inView} mirrored />
      </div>
      <Reveal delay={0.25}>
        <p className="text-balance mx-auto mt-8 max-w-2xl text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-paper sm:text-[1.75rem]">
          {bonus.intro}
        </p>
      </Reveal>
    </div>
  )
}

function SparkleBurst({ play, mirrored = false }: { play: boolean; mirrored?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center rounded-full bg-flame/15 text-flame sm:size-14"
      initial={{ scale: 0, rotate: mirrored ? 90 : -90 }}
      animate={play ? { scale: 1, rotate: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.5 }}
    >
      <Sparkles className="size-5 sm:size-6" strokeWidth={2} />
    </motion.span>
  )
}

function FeaturedBonus({ item }: { item: BonusItem }) {
  return (
    <Reveal className="mt-16 sm:mt-20" amount={0.15}>
      <Spotlight className="rounded-[2.5rem]" color="rgba(250,61,12,0.14)" size={620}>
        <article className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-flame/40 bg-gradient-to-br from-navy-800 via-navy-850 to-navy-950 p-7 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.28),transparent_65%)]" />

          <div className="relative lg:col-span-5">
            <BonusVisual alt={item.title} />
          </div>

          <div className="lg:col-span-7">
            <NumberBadge number={1} />
            <p className="text-pretty mt-6 text-lg leading-relaxed text-paper/75 sm:text-xl">
              <strong
                className="mb-2 block font-display text-[2.2rem] font-black uppercase leading-[0.95] tracking-[-0.02em] text-paper sm:text-[3rem]"
                style={{ fontStretch: '90%' }}
              >
                {item.title}
              </strong>{' '}
              <span className="text-flame">{bonus.dash}</span> {item.text}
            </p>

            <PriceTag from={item.from} className="mt-6" />

            {item.learn ? (
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="font-serif text-[1.6rem] italic leading-tight text-paper/90 sm:text-[1.85rem]">{item.learn.intro}</p>
                <StaggerGroup as="ul" stagger={0.09} amount={0.2} className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.learn.items.map((learnItem, index) => {
                    const Icon = LEARN_ICONS[index] ?? Route
                    return (
                      <StaggerItem
                        as="li"
                        key={learnItem.title}
                        className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors duration-500 hover:border-flame/40"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-flame/15 text-flame transition-all duration-500 ease-expo group-hover:bg-flame group-hover:text-paper">
                          <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                        </span>
                        <span className="text-pretty text-[0.95rem] leading-relaxed text-paper/70">
                          <strong className="font-display font-extrabold text-paper" style={{ fontStretch: '98%' }}>
                            {learnItem.title}
                          </strong>{' '}
                          {bonus.dash} {learnItem.text}
                        </span>
                      </StaggerItem>
                    )
                  })}
                </StaggerGroup>
              </div>
            ) : null}
          </div>
        </article>
      </Spotlight>
    </Reveal>
  )
}

function BonusCard({ item, number }: { item: BonusItem; number: number }) {
  const Icon = ICONS[item.kind]

  return (
    <Spotlight className="h-full rounded-[2rem]">
      <article className="group relative isolate flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:border-flame/40 sm:p-9">
        <span
          aria-hidden
          className="absolute -right-16 -top-16 -z-10 size-48 rounded-full bg-flame/0 blur-2xl transition-colors duration-700 group-hover:bg-flame/25"
        />
        <div>
          <div className="flex items-center justify-between gap-4">
            <NumberBadge number={number} />
            <span className="grid size-12 place-items-center rounded-2xl bg-flame/15 text-flame transition-transform duration-700 ease-expo group-hover:-rotate-6 group-hover:scale-110">
              <Icon aria-hidden className="size-6" strokeWidth={1.8} />
            </span>
          </div>
          <p className="text-pretty mt-7 leading-relaxed text-paper/70 sm:text-lg">
            <strong
              className="mb-2 block font-display text-[1.55rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-paper sm:text-[1.8rem]"
              style={{ fontStretch: '96%' }}
            >
              {item.title}
            </strong>{' '}
            <span className="text-flame">{bonus.dash}</span> {item.text}
          </p>
        </div>
        <PriceTag from={item.from} />
      </article>
    </Spotlight>
  )
}

function NumberBadge({ number }: { number: number }) {
  return (
    <span
      aria-hidden
      className="grid size-12 place-items-center rounded-full border border-flame/50 font-display text-xl font-black text-flame sm:size-14 sm:text-2xl"
    >
      {number}
    </span>
  )
}

/** "De R$ 29,00 por GRÁTIS": o valor é riscado e o selo GRÁTIS entra pulando. */
function PriceTag({ from, className }: { from: string; className?: string }) {
  const { priceLabels } = bonus

  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-2 text-base sm:text-lg ${className ?? ''}`}>
      <span className="text-paper/55">{priceLabels.from} </span>
      <span className="relative text-paper/55">
        {from}
        <motion.span
          aria-hidden
          className="absolute left-[-4%] top-1/2 h-[2px] w-[108%] origin-left -rotate-6 bg-flame"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: ease.expo, delay: 0.25 }}
        />
      </span>
      <span className="text-paper/55"> {priceLabels.to} </span>
      <motion.span
        className="relative overflow-hidden rounded-full bg-flame px-4 py-1.5 font-display text-sm font-black tracking-[0.2em] text-paper shadow-flame sm:text-base"
        style={{ fontStretch: '112%' }}
        initial={{ scale: 0.4, rotate: -14, opacity: 0 }}
        whileInView={{ scale: 1, rotate: -3, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.55 }}
      >
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <span className="relative">{priceLabels.free}</span>
      </motion.span>
    </p>
  )
}

function BonusVisual({ alt }: { alt: string }) {
  return (
    <div className="relative mx-auto w-[min(72vw,22rem)] lg:w-full lg:max-w-[26rem]">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.3),transparent_62%)]"
      />
      <BadgeRing />
      <Parallax distance={26}>
        <TiltStage max={8}>
          <motion.img
            src={bonusKit}
            alt={`${alt} — ${site.author}`}
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

/** Selo circular girando com "GRÁTIS". */
function BadgeRing() {
  const text = `${bonus.priceLabels.free} ✦ `.repeat(3)
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
            {text}
          </textPath>
        </text>
      </svg>
    </motion.div>
  )
}
