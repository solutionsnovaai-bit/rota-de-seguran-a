import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CtaButton } from '@/components/ui/CtaButton'
import { hero } from '@/content/hero'
import { pricing } from '@/content/pricing'
import { sectionIds } from '@/content/site'
import { useScrollThreshold } from '@/hooks/useScrollThreshold'
import { ease } from '@/lib/easings'

/** Barra de compra no celular — some quando o preço ou o fechamento já estão na tela. */
export function StickyCta() {
  const pastHero = useScrollThreshold(typeof window !== 'undefined' ? window.innerHeight * 0.75 : 600)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const targets = [sectionIds.pricing, sectionIds.closing]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
    const footer = document.getElementById(sectionIds.footer)
    if (footer) targets.push(footer)

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setBlocked(visible.size > 0)
      },
      { threshold: 0.15 },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const show = pastHero && !blocked
  const prefix = pricing.from.slice(0, pricing.from.indexOf('R$'))
  const struck = pricing.from.slice(prefix.length)

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="sticky-cta"
          className="safe-bottom fixed inset-x-0 bottom-0 z-[60] px-3 lg:hidden"
          initial={{ y: '130%' }}
          animate={{ y: '0%' }}
          exit={{ y: '130%' }}
          transition={{ duration: 0.7, ease: ease.expo }}
        >
          <div className="flex items-center gap-3 rounded-[1.6rem] border border-white/10 bg-navy-950/85 p-2 pl-4 shadow-card backdrop-blur-xl">
            <div className="shrink-0 leading-none text-paper">
              <span className="block text-[0.7rem] text-paper/55">
                {prefix}
                <s className="decoration-flame decoration-2">{struck}</s>
              </span>
              <span className="mt-1 block font-display text-xl font-black">{pricing.price}</span>
            </div>
            <CtaButton
              label={hero.cta}
              placement="sticky-mobile"
              size="md"
              magnetic={false}
              className="h-12 flex-1 pl-5 text-[0.88rem]"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
