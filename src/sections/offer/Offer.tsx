import { BookHeart, MapPinned, MessageCircleHeart, RefreshCw, Wallet, type LucideIcon } from 'lucide-react'
import coverRota from '@/assets/cover-rota.webp'
import kit from '@/assets/kit.webp'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup } from '@/components/motion/Stagger'
import { TiltStage } from '@/components/motion/TiltStage'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { offer } from '@/content/offer'
import { sectionIds, site } from '@/content/site'
import type { OfferExtra } from '@/types/content'
import { BonusItem } from './BonusItem'

const ICONS: Record<OfferExtra['kind'], LucideIcon> = {
  guide: BookHeart,
  finance: Wallet,
  phrases: MessageCircleHeart,
  map: MapPinned,
  updates: RefreshCw,
}

export function Offer() {
  return (
    <Section id={sectionIds.offer} tone="navy" overlap className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(134,186,236,0.14),transparent_70%)]"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{offer.eyebrow}</Eyebrow>
          <Reveal>
            <Heading text={offer.title} accent={offer.titleAccent} className="mt-6 text-paper" />
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:sticky lg:top-28 lg:col-span-5">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.32),transparent_62%)]"
            />
            <Parallax distance={30}>
              <TiltStage max={7} className="mx-auto w-[min(82vw,26rem)] lg:w-full lg:max-w-[30rem]">
                <img
                  src={kit}
                  alt={`${site.name} — ${site.author}`}
                  width={827}
                  height={1189}
                  loading="lazy"
                  decoding="async"
                  className="relative w-full drop-shadow-[0_50px_60px_rgba(4,11,26,0.7)]"
                />
              </TiltStage>
            </Parallax>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <article className="relative isolate overflow-hidden rounded-[2rem] border border-flame/40 bg-gradient-to-br from-navy-800 via-navy-850 to-navy-900 p-7 shadow-card sm:p-9">
                <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.3),transparent_65%)]" />
                <h3 className="font-display text-[1.65rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl" style={{ fontStretch: '96%' }}>
                  <span className="mr-1">{offer.product.icon}</span> {offer.product.title}
                </h3>
                <p className="text-pretty mt-4 text-lg leading-relaxed text-paper/75">{offer.product.text}</p>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="text-pretty mt-10 font-serif text-[1.65rem] italic leading-tight text-paper/85 sm:text-[1.95rem]">
                {offer.extrasLabel}
              </p>
            </Reveal>

            <StaggerGroup as="ul" stagger={0.1} amount={0.1} className="mt-6 grid gap-4 sm:grid-cols-2">
              {offer.extras.map((extra) => (
                <BonusItem
                  key={extra.title}
                  item={extra}
                  icon={ICONS[extra.kind]}
                  highlight={extra.kind === 'guide' || extra.kind === 'updates'}
                  image={extra.kind === 'guide' ? { src: coverRota, alt: extra.title } : undefined}
                  className={extra.kind === 'guide' ? 'sm:col-span-2' : undefined}
                />
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </Section>
  )
}
