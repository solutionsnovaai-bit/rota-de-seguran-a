import { useCallback, useEffect, useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Preloader } from '@/components/layout/Preloader'
import { StickyCta } from '@/components/layout/StickyCta'
import { Grain } from '@/components/ui/Grain'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { initTracking } from '@/lib/tracking'
import { AppProviders } from '@/providers/AppProviders'
import { Author } from '@/sections/author/Author'
import { Bonus } from '@/sections/bonus/Bonus'
import { Closing } from '@/sections/closing/Closing'
import { Faq } from '@/sections/faq/Faq'
import { Guarantee } from '@/sections/guarantee/Guarantee'
import { Hero } from '@/sections/hero/Hero'
import { Method } from '@/sections/method/Method'
import { NameBand } from '@/sections/NameBand'
import { Offer } from '@/sections/offer/Offer'
import { Practice } from '@/sections/practice/Practice'
import { Pricing } from '@/sections/pricing/Pricing'
import { Recognition } from '@/sections/recognition/Recognition'
import { Stories } from '@/sections/stories/Stories'

export default function App() {
  const [ready, setReady] = useState(false)
  const reveal = useCallback(() => setReady(true), [])

  useEffect(() => {
    initTracking()
  }, [])

  return (
    <AppProviders>
      <Preloader onReveal={reveal} />
      <ScrollProgress />
      <Header ready={ready} />

      <main>
        <Hero ready={ready} />
        <NameBand />
        <Recognition />
        <Author />
        <Method />
        <Stories />
        <Practice />
        <Bonus />
        <Offer />
        <Pricing />
        <Guarantee />
        <Faq />
        <Closing />
      </main>

      <Footer />
      <StickyCta />
      <Grain />
    </AppProviders>
  )
}
