import Tempus from '@darkroom.engineering/tempus'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll } from './hooks/use-scroll'
import { useStore } from './lib/store'
import { useEffect } from 'react'
import { Layout } from './layouts/default'
import { WebGL } from './components/webgl'
import './styles/global.scss'

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({ markers: false })

// Merge RAFs
gsap.ticker.lagSmoothing(0)
gsap.ticker.remove(gsap.updateRoot)
Tempus.add((time) => {
  gsap.updateRoot(time / 1000)
}, 0)

function App() {
  const lenis = useStore(({ lenis }) => lenis)

  useScroll(ScrollTrigger.update)

  useEffect(() => {
    if (lenis) {
      ScrollTrigger.refresh()
      lenis?.start()
    }
  }, [lenis])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <Layout>
        <WebGL />
        
        {/* Dummy Content Sections */}
        <div style={{ position: 'relative', zIndex: 1 }}>
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>Section 1</h1>
            </section>
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>Section 2</h1>
            </section>
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>Section 3</h1>
            </section>
             <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>Section 4</h1>
            </section>
             <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>Section 5</h1>
            </section>
        </div>
    </Layout>
  )
}

export default App
