import { AnimatePresence, motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Container } from '@/components/ui/Container'
import { CtaButton } from '@/components/ui/CtaButton'
import { Wordmark } from '@/components/ui/Wordmark'
import { hero } from '@/content/hero'
import { sectionIds, site } from '@/content/site'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { useScrollThreshold } from '@/hooks/useScrollThreshold'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

export function Header({ ready }: { ready: boolean }) {
  const lenis = useLenis()
  const scrolled = useScrollThreshold(24)
  const showCta = useScrollThreshold(760)

  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60]"
      initial={{ y: '-100%' }}
      animate={{ y: ready ? '0%' : '-100%' }}
      transition={{ duration: 1.1, ease: ease.expo, delay: ready ? 0.9 : 0 }}
    >
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-expo',
          scrolled ? 'border-white/[0.06] bg-navy-950/75 backdrop-blur-xl' : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href={`#${sectionIds.hero}`} onClick={toTop} aria-label={site.name} className="text-paper">
            <Wordmark />
          </a>

          <AnimatePresence>
            {showCta ? (
              <motion.div
                key="header-cta"
                className="hidden lg:block"
                initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, ease: ease.expo }}
              >
                <CtaButton label={hero.cta} placement="header" size="md" magnetic={false} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Container>
      </div>
    </motion.header>
  )
}
