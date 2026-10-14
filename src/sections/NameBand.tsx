import { VelocityMarquee } from '@/components/motion/VelocityMarquee'
import { site } from '@/content/site'

/** Faixa laranja dupla: nome do e-book e da autora correndo em sentidos opostos, acelerando com o scroll. */
export function NameBand() {
  return (
    <div className="relative z-0 overflow-hidden bg-flame pb-14 pt-6 text-navy-950 sm:pb-20 sm:pt-8">
      <VelocityMarquee baseVelocity={-2.4}>
        <span
          className="display flex items-center gap-[0.5em] pr-[0.5em] text-[clamp(2.4rem,7vw,5.5rem)] leading-none"
          style={{ fontStretch: '86%' }}
        >
          <span>{site.name}</span>
          <Star />
          <span className="text-outline text-navy-950">{site.author}</span>
          <Star />
        </span>
      </VelocityMarquee>
      <VelocityMarquee baseVelocity={1.6} className="mt-2 opacity-90 sm:mt-3">
        <span
          className="display flex items-center gap-[0.6em] pr-[0.6em] text-[clamp(1.2rem,3vw,2.3rem)] leading-none text-paper"
          style={{ fontStretch: '110%' }}
        >
          <span>{site.author}</span>
          <Star />
          <span className="text-outline text-paper">{site.name}</span>
          <Star />
        </span>
      </VelocityMarquee>
    </div>
  )
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.5em] shrink-0 fill-current" aria-hidden>
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  )
}
