import { motion, useTransform, type MotionValue } from 'framer-motion'
import sonia from '@/assets/sonia.webp'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

interface HeroPortraitProps {
  ready: boolean
  progress: MotionValue<number>
  className?: string
}

/** Retrato da autora recortado, subindo de baixo e afastando em parallax no scroll. */
export function HeroPortrait({ ready, progress, className }: HeroPortraitProps) {
  const y = useTransform(progress, [0, 1], [0, 180])
  const scale = useTransform(progress, [0, 1], [1, 1.08])
  const brightness = useTransform(progress, [0, 0.9], [1, 0.55])
  const filter = useTransform(brightness, (value) => `brightness(${value})`)

  return (
    <motion.div className={cn('pointer-events-none origin-bottom', className)} style={{ y, scale, filter }}>
      <MaskReveal play={ready} delay={0.05} className="h-full w-full">
        <img
          src={sonia}
          alt={site.author}
          width={795}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="mask-fade-b h-full w-full object-cover object-[50%_0%] lg:object-contain lg:object-[100%_100%] lg:[mask-image:linear-gradient(to_bottom,#000_80%,transparent_100%)]"
        />
      </MaskReveal>
    </motion.div>
  )
}
