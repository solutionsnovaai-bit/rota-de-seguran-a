import { Container } from '@/components/ui/Container'
import { RouteMark } from '@/components/ui/RouteMark'
import { footer } from '@/content/footer'
import { sectionIds } from '@/content/site'

export function Footer() {
  return (
    <footer id={sectionIds.footer} className="relative border-t border-white/[0.06] bg-navy-950 text-paper">
      <Container className="flex flex-col gap-10 pb-32 pt-16 sm:pt-20 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
        <p className="flex items-center gap-4">
          <RouteMark className="size-11" />
          <span className="text-base">
            <strong className="font-display font-black uppercase tracking-[0.12em]" style={{ fontStretch: '115%' }}>
              {footer.brand}
            </strong>
            <span className="text-paper/60">{footer.byline}</span>
          </span>
        </p>

        <p className="max-w-xl text-sm leading-relaxed text-paper/60 lg:text-right">
          {footer.disclaimer.map((segment, index) =>
            segment.type === 'tel' ? (
              <a
                key={index}
                href={`tel:${segment.value}`}
                className="font-bold text-flame underline decoration-flame/40 underline-offset-4 transition-colors hover:text-flame-400"
              >
                {segment.value}
              </a>
            ) : (
              <span key={index}>{segment.value}</span>
            ),
          )}
        </p>
      </Container>
    </footer>
  )
}
