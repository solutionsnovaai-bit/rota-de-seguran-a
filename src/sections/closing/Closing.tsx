import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollWords } from '@/components/motion/ScrollWords'
import { VelocityMarquee } from '@/components/motion/VelocityMarquee'
import { Container } from '@/components/ui/Container'
import { CtaButton } from '@/components/ui/CtaButton'
import { Heading } from '@/components/ui/Heading'
import { RouteMark } from '@/components/ui/RouteMark'
import { Section } from '@/components/ui/Section'
import { closing } from '@/content/closing'
import { sectionIds, site } from '@/content/site'
import { ease } from '@/lib/easings'

export function Closing() {
  return (
    <Section id={sectionIds.closing} tone="deep" overlap className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.16),transparent_62%)]" />
        <div className="absolute inset-x-0 top-10 opacity-[0.14] sm:top-14">
          <VelocityMarquee baseVelocity={-1.4} itemClassName="pr-[0.4em]">
            <span className="display text-outline-thin text-[clamp(5rem,14vw,13rem)] leading-none text-paper" style={{ fontStretch: '82%' }}>
              {site.name} ✦
            </span>
          </VelocityMarquee>
        </div>
        <div className="absolute inset-x-0 bottom-10 opacity-[0.14] sm:bottom-14">
          <VelocityMarquee baseVelocity={1.4} itemClassName="pr-[0.4em]">
            <span className="display text-outline-thin text-[clamp(5rem,14vw,13rem)] leading-none text-paper" style={{ fontStretch: '82%' }}>
              {site.author} ✦
            </span>
          </VelocityMarquee>
        </div>
      </div>

      <Container className="relative py-10 text-center sm:py-16">
        <motion.div
          className="mx-auto w-fit"
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: ease.expo }}
        >
          <RouteMark className="size-14 sm:size-16" />
        </motion.div>

        <Reveal className="mx-auto mt-10 max-w-5xl sm:mt-12">
          <Heading text={closing.title} accent={closing.titleAccent} className="text-paper" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-pretty mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-paper/75 sm:text-xl">{closing.text}</p>
        </Reveal>

        <blockquote className="mx-auto mt-14 max-w-4xl sm:mt-20">
          <p className="text-balance font-serif text-[clamp(2rem,4.8vw,4.2rem)] italic leading-[1.04] tracking-[-0.012em] text-paper">
            <ScrollWords text={closing.quote} dim={0.12} offset={['start 0.9', 'end 0.6']} />
          </p>
          <Reveal className="mt-8 sm:mt-10">
            <cite className="eyebrow justify-center not-italic text-paper/80">{closing.author}</cite>
          </Reveal>
        </blockquote>

        <Reveal delay={0.1} className="mt-12 flex justify-center sm:mt-16">
          <CtaButton label={closing.cta} placement="closing" size="xl" />
        </Reveal>
      </Container>
    </Section>
  )
}
