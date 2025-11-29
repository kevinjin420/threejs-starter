import { useStore } from '../lib/store'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WebGL } from './webgl/index'

export function SceneManager() {
  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis])

  useEffect(() => {
    // GSAP Init
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.defaults({ markers: false })
    
    // Lenis Init
    window.scrollTo(0, 0)
    const newLenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })
    window.lenis = newLenis
    setLenis(newLenis)

    // Proxy Lenis to ScrollTrigger
    newLenis.on('scroll', ScrollTrigger.update)
    
    // Add Lenis to GSAP Ticker
    const update = (time) => {
      newLenis.raf(time * 1000)
    }
    
    gsap.ticker.add(update)
    // Turn off lag smoothing to ensure sync
    gsap.ticker.lagSmoothing(0)

    return () => {
      newLenis.destroy()
      setLenis(null)
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <>
      <WebGL />
    </>
  )
}
