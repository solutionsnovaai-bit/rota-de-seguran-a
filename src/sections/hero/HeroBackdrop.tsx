import { motion, useTransform, type MotionValue } from 'framer-motion'
import { RoutePath } from '@/components/motion/RoutePath'
import { VelocityMarquee } from '@/components/motion/VelocityMarquee'
import { site } from '@/content/site'
import { ease } from '@/lib/easings'

interface HeroBackdropProps {
  ready: boolean
  progress: MotionValue<number>
}

const ROUTE = 'M -40 772 C 260 772 520 720 760 580 S 1090 250 1500 190'

/** Fundo do hero: luz, rota tracejada, nome da autora correndo em contorno e fios de grade. */
export function HeroBackdrop({ ready, progress }: HeroBackdropProps) {
  const nameY = useTransform(progress, [0, 1], [0, -140])
  const glowScale = useTransform(progress, [0, 1], [1, 1.35])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,#1A3A73_0%,transparent_55%),linear-gradient(180deg,#0B1F42_0%,#081733_70%,#040B1A_100%)]" />

      <motion.div
        className="absolute right-[-20%] top-[8%] size-[90vmax] rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.26)_0%,rgba(250,61,12,0.08)_35%,transparent_62%)] lg:right-[-12%] lg:top-[-6%] lg:size-[70vmax]"
        style={{ scale: glowScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 2.2, ease: ease.out }}
      />

      <div className="absolute inset-0 hidden lg:block">
        {[16.66, 33.33, 50, 66.66, 83.33].map((left) => (
          <motion.span
            key={left}
            className="absolute top-0 h-full w-px origin-top bg-white/[0.045]"
            style={{ left: `${left}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: ready ? 1 : 0 }}
            transition={{ duration: 1.8, ease: ease.expo, delay: 0.1 + left / 400 }}
          />
        ))}
      </div>

      <motion.div className="absolute inset-x-0 top-[24%] lg:top-[30%]" style={{ y: nameY }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 2, ease: ease.out, delay: 0.6 }}
        >
          <VelocityMarquee baseVelocity={-1.2} itemClassName="pr-[0.35em]" skew={false}>
            <span
              className="display text-outline-thin text-[clamp(6rem,19vw,19rem)] leading-none text-paper/[0.12]"
              style={{ fontStretch: '80%' }}
            >
              {site.author} ✦ {site.name} ✦
            </span>
          </VelocityMarquee>
        </motion.div>
      </motion.div>

      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 hidden h-full w-full lg:block"
      >
        <RoutePath d={ROUTE} stroke="#FA3D0C" strokeWidth={2.5} dash="9 11" play={ready} duration={2.6} delay={0.5} />
        <motion.circle
          cx="1500"
          cy="190"
          r="9"
          fill="#FA3D0C"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
    </div>
  )
}
