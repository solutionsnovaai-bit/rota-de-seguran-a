import { motion } from 'framer-motion'
import sonia from '@/assets/sonia.webp'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { author } from '@/content/author'
import { sectionIds, site } from '@/content/site'
import { ease } from '@/lib/easings'

export function Author() {
  return (
    <Section id={sectionIds.author} tone="deep" overlap className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(26,58,115,0.7),transparent_65%)]"
      />

      <Container className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem]">
            <div className="absolute inset-0 overflow-hidden rounded-b-[2rem] rounded-t-[999px] bg-gradient-to-b from-navy-700 via-navy-800 to-navy-900">
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(250,61,12,0.45),transparent_70%)]" />
            </div>

            <MaskReveal className="absolute inset-0 rounded-b-[2rem] rounded-t-[999px]">
              <Parallax distance={26} className="h-full">
                <img
                  src={sonia}
                  alt={site.author}
                  width={795}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="h-[122%] w-full object-cover object-[50%_4%]"
                />
              </Parallax>
            </MaskReveal>

            <svg aria-hidden viewBox="0 0 400 500" className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]">
              <motion.path
                d="M 8 492 L 8 200 A 192 192 0 0 1 392 200 L 392 492"
                fill="none"
                stroke="#FA3D0C"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 2.4, ease: ease.inOut, delay: 0.4 }}
              />
            </svg>

            <span
              aria-hidden
              className="absolute -right-3 top-1/2 hidden origin-center translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-display text-[0.7rem] font-bold uppercase tracking-[0.5em] text-paper/40 xl:block"
            >
              {site.author}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Eyebrow>{author.eyebrow}</Eyebrow>
          <Reveal>
            <Heading text={author.title} accent={author.titleAccent} className="mt-6 text-paper" />
          </Reveal>

          <div className="relative mt-10 pl-6 sm:pl-8">
            <motion.span
              aria-hidden
              className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-flame via-flame/60 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: ease.expo, delay: 0.2 }}
            />
            <div className="space-y-6">
              {author.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 * index}>
                  <p className="text-pretty font-serif text-[1.4rem] leading-[1.34] text-paper/90 sm:text-[1.65rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
