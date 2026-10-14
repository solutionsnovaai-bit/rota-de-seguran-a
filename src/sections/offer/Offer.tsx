import kit from '@/assets/kit.webp'
import { Parallax } from '@/components/motion/Parallax'
import { Spotlight } from '@/components/motion/Pointer'
import { Reveal } from '@/components/motion/Reveal'
import { TiltStage } from '@/components/motion/TiltStage'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { offer } from '@/content/offer'
import { sectionIds, site } from '@/content/site'

/** O e-book principal. Os bônus vêm logo abaixo, na mesma faixa azul. */
export function Offer() {
  return (
    <Section id={sectionIds.offer} tone="navy" overlap className="overflow-hidden pb-10 sm:pb-14 lg:pb-16">
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

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-5">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.32),transparent_62%)]"
            />
            <Parallax distance={30}>
              <TiltStage max={7} className="mx-auto w-[min(78vw,24rem)] lg:w-full lg:max-w-[28rem]">
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
              <Spotlight className="rounded-[2.25rem]" color="rgba(250,61,12,0.16)" size={520}>
                <article className="relative isolate overflow-hidden rounded-[2.25rem] border border-flame/40 bg-gradient-to-br from-navy-800 via-navy-850 to-navy-900 p-8 shadow-card sm:p-12">
                  <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.32),transparent_65%)]" />
                  <h3
                    className="font-display text-[1.9rem] font-extrabold leading-[1.08] tracking-[-0.022em] sm:text-[2.6rem]"
                    style={{ fontStretch: '96%' }}
                  >
                    <span className="mr-1">{offer.product.icon}</span> {offer.product.title}
                  </h3>
                  <p className="text-pretty mt-5 text-lg leading-relaxed text-paper/75 sm:text-xl">{offer.product.text}</p>
                </article>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
