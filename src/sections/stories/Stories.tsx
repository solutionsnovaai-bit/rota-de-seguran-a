import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollWords } from '@/components/motion/ScrollWords'
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { sectionIds } from '@/content/site'
import { stories } from '@/content/stories'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import type { StoryItem } from '@/types/content'

/**
 * Cinco histórias reais. No desktop a seção prende na tela e os cartões
 * correm na horizontal conforme o scroll; no celular, empilham.
 */
export function Stories() {
  const isDesktop = useIsDesktop()
  const reduce = useReducedMotion()
  const pinned = isDesktop && !reduce

  return (
    <Section id={sectionIds.stories} tone="deep" overlap spacing="none" className="overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(60%_50%_at_20%_0%,rgba(26,58,115,0.65),transparent_70%)]"
      />
      {pinned ? <PinnedTrack /> : <StackedList />}

      <Container className="relative pb-24 pt-8 text-center sm:pb-32 lg:pb-40 lg:pt-4">
        <span aria-hidden className="mx-auto mb-10 block h-16 w-px bg-gradient-to-b from-transparent to-flame" />
        <p
          className="text-balance mx-auto max-w-4xl font-display text-[clamp(1.9rem,4.2vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper"
          style={{ fontStretch: '98%' }}
        >
          <ScrollWords text={stories.outro} dim={0.14} offset={['start 0.9', 'end 0.6']} />
        </p>
      </Container>
    </Section>
  )
}

function Intro({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Eyebrow>{stories.eyebrow}</Eyebrow>
      <Reveal>
        <Heading text={stories.title} accent={stories.titleAccent} className="mt-6 text-paper" />
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-pretty mt-7 max-w-md text-lg leading-relaxed text-paper/70 sm:text-xl">{stories.intro}</p>
      </Reveal>
    </div>
  )
}

function PinnedTrack() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const travel = useMotionValue(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - window.innerWidth)
      setDistance(next)
      travel.set(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [travel])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 })
  const x = useTransform(() => -smooth.get() * travel.get())

  return (
    <div ref={wrapRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} className="flex w-max items-stretch gap-6 pl-12 pr-[12vw] xl:pl-[max(3rem,calc((100vw-1320px)/2+3rem))]" style={{ x }}>
          <Intro className="flex w-[30rem] shrink-0 flex-col justify-center pr-10 xl:w-[34rem]" />
          {stories.items.map((item, index) => (
            <StoryCard key={item.name} item={item} index={index} className="h-[min(66vh,34rem)] w-[min(27rem,30vw)] shrink-0" />
          ))}
        </motion.div>

        <div aria-hidden className="mx-auto mt-12 h-px w-[min(28rem,40vw)] overflow-hidden bg-white/10">
          <motion.div className="h-full origin-left bg-flame" style={{ scaleX: smooth }} />
        </div>
      </div>
    </div>
  )
}

function StackedList() {
  return (
    <Container className="relative pt-24 sm:pt-32">
      <Intro />
      <StaggerGroup as="ol" stagger={0.1} amount={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {stories.items.map((item, index) => (
          <StaggerItem as="li" key={item.name}>
            <StoryCard item={item} index={index} className="min-h-[19rem]" />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  )
}

interface StoryCardProps {
  item: StoryItem
  index: number
  className?: string
}

function StoryCard({ item, index, className }: StoryCardProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      className={cn(
        'group relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 transition-colors duration-700 hover:border-flame/50 sm:p-9',
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -bottom-24 -right-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.28),transparent_65%)] opacity-50 transition-opacity duration-700 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="text-outline-thin font-display text-[5.5rem] font-black leading-none text-paper/55 transition-colors duration-700 group-hover:text-flame sm:text-[7rem]"
        style={{ fontStretch: '86%' }}
      >
        {number}
      </span>

      <p className="mt-10 text-pretty text-[1.05rem] leading-relaxed text-paper/70 sm:text-lg">
        <strong
          className="mb-3 block font-display text-[1.9rem] font-extrabold leading-[1.02] tracking-[-0.025em] text-paper sm:text-[2.2rem]"
          style={{ fontStretch: '96%' }}
        >
          {item.name}
        </strong>{' '}
        <span className="text-flame">—</span> {item.text}
      </p>
    </article>
  )
}
