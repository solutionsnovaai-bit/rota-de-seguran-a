import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import cover from '@/assets/cover.webp'
import { Book3D } from '@/components/motion/Book3D'
import { Reveal } from '@/components/motion/Reveal'
import { RollingPrice } from '@/components/motion/RollingPrice'
import { Container } from '@/components/ui/Container'
import { CtaButton } from '@/components/ui/CtaButton'
import { Section } from '@/components/ui/Section'
import { pricing } from '@/content/pricing'
import { sectionIds, site } from '@/content/site'
import { ease } from '@/lib/easings'

export function Pricing() {
  const prefix = pricing.from.slice(0, pricing.from.indexOf('R$'))
  const struck = pricing.from.slice(prefix.length)

  return (
    <Section id={sectionIds.pricing} tone="deep" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.2),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(243,246,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(243,246,252,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto w-[min(62vw,19rem)] sm:w-[min(50vw,22rem)] lg:w-[min(30vw,25rem)]">
          <Book3D cover={cover} alt={`${site.name} · por ${site.author}`} />
        </div>

        <Reveal>
          <div className="relative mx-auto max-w-xl rounded-[2.25rem] border border-white/10 bg-navy-900/70 p-6 shadow-card backdrop-blur-xl xs:p-8 sm:p-12">
            <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-flame to-transparent" />

            <p className="text-lg text-paper/55 sm:text-xl">
              {prefix}
              <span className="relative inline-block">
                {struck}
                <motion.span
                  aria-hidden
                  className="absolute left-[-4%] top-1/2 h-[2px] w-[108%] origin-left -rotate-6 bg-flame"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 0.7, ease: ease.expo, delay: 0.3 }}
                />
              </span>
            </p>

            <p className="mt-1 font-display font-black leading-[0.85] tracking-[-0.045em] text-paper" style={{ fontStretch: '92%' }}>
              <RollingPrice
                from={pricing.fromValue}
                to={pricing.priceValue}
                className="text-[clamp(5.6rem,22vw,9.5rem)]"
                currencyClassName="mr-[0.08em] mt-[0.16em] text-[0.3em] tracking-normal text-flame"
              />
            </p>

            <p className="mt-6 font-display text-[0.78rem] font-bold uppercase tracking-[0.18em] text-mist" style={{ fontStretch: '110%' }}>
              {pricing.note}
            </p>

            <div className="mt-9">
              <CtaButton label={pricing.cta} placement="pricing" size="xl" full />
            </div>

            <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-paper/60">
              <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-flame" strokeWidth={2.2} />
              <span>{pricing.secure}</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
