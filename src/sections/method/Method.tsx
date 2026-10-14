import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { Gem, HeartHandshake, KeyRound, Megaphone, Route, Sunrise, type LucideIcon } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { RoutePath } from '@/components/motion/RoutePath'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { method } from '@/content/method'
import { sectionIds } from '@/content/site'
import { RouteStop } from './RouteStop'

/** Valor, voz, independência, rede de apoio e recomeço. */
const ICONS: LucideIcon[] = [Gem, Megaphone, KeyRound, HeartHandshake, Sunrise]

const MAP_PATH = 'M 40 380 C 40 300 150 330 170 260 S 90 170 170 130 S 330 140 330 60'

export function Method() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <Section id={sectionIds.method} tone="paper" overlap>
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{method.eyebrow}</Eyebrow>
            <Reveal>
              <Heading text={method.title} accent={method.titleAccent} className="mt-6 text-navy-900" />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-pretty mt-7 max-w-md text-lg leading-relaxed text-navy-900/70 sm:text-xl">{method.intro}</p>
            </Reveal>
            <RouteMap progress={progress} stops={method.items.length} />
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div aria-hidden className="absolute bottom-8 left-[27px] top-8 w-[2px] sm:left-[31px]">
            <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,rgba(11,31,66,0.18)_0_6px,transparent_6px_14px)]" />
            <motion.div className="absolute inset-0 origin-top bg-flame" style={{ scaleY: progress }} />
          </div>

          <ol ref={listRef} className="relative space-y-6 sm:space-y-8">
            {method.items.map((item, index) => (
              <RouteStop key={item.title} item={item} icon={ICONS[index] ?? Route} />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

/** Mapa decorativo: a rota se desenha e as paradas acendem conforme a leitura. */
function RouteMap({ progress, stops }: { progress: MotionValue<number>; stops: number }) {
  const measureRef = useRef<SVGPathElement>(null)
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([])

  useLayoutEffect(() => {
    const path = measureRef.current
    if (!path) return
    const total = path.getTotalLength()
    setPoints(
      Array.from({ length: stops }, (_, index) => {
        const point = path.getPointAtLength((total * index) / (stops - 1))
        return { x: point.x, y: point.y }
      }),
    )
  }, [stops])

  return (
    <div aria-hidden className="mt-14 hidden max-w-[20rem] lg:block">
      <svg viewBox="0 0 370 420" className="w-full overflow-visible">
        <path ref={measureRef} d={MAP_PATH} fill="none" stroke="none" />
        <RoutePath d={MAP_PATH} stroke="rgba(11,31,66,0.16)" strokeWidth={2} dash="4 10" duration={0.01} />
        <RoutePath d={MAP_PATH} progress={progress} stroke="#FA3D0C" strokeWidth={3} dash="10 8" />
        {points.map((point, index) => (
          <MapStop
            key={index}
            cx={point.x}
            cy={point.y}
            progress={progress}
            at={index / (stops - 1)}
            last={index === stops - 1}
          />
        ))}
      </svg>
    </div>
  )
}

interface MapStopProps {
  cx: number
  cy: number
  at: number
  last: boolean
  progress: MotionValue<number>
}

function MapStop({ cx, cy, at, last, progress }: MapStopProps) {
  const lit = useTransform(progress, [Math.max(0, at - 0.05), Math.max(0.001, at)], [0, 1])
  const fill = useTransform(lit, [0, 1], ['#F3F6FC', '#FA3D0C'])
  const halo = useTransform(lit, [0, 1], [0, 0.18])

  return (
    <g>
      <motion.circle cx={cx} cy={cy} r={last ? 22 : 16} fill="#FA3D0C" style={{ opacity: halo }} />
      <motion.circle cx={cx} cy={cy} r={last ? 11 : 8} stroke="#0B1F42" strokeOpacity={0.25} strokeWidth={2} style={{ fill }} />
      {last ? <circle cx={cx} cy={cy} r={4} fill="#F3F6FC" /> : null}
    </g>
  )
}
