import { Container } from '@/components/ui/Container'
import { RouteMark } from '@/components/ui/RouteMark'
import { footer } from '@/content/footer'
import { sectionIds } from '@/content/site'

export function Footer() {
  return (
    <footer id={sectionIds.footer} className="relative border-t border-white/[0.06] bg-navy-950 text-paper">
      <Container className="flex flex-col items-center gap-6 pb-32 pt-14 text-center sm:pt-16 lg:pb-14">
        <RouteMark className="size-9 opacity-80" />
        <p className="max-w-2xl text-sm leading-relaxed text-paper/55">
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
