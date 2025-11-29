import { useFrame } from '@darkroom.engineering/hamo'
import cn from 'clsx'
import Lenis from 'lenis'
import { useStore } from '../../lib/store'
import { useEffect, useState } from 'react'
import s from './layout.module.scss'

export function Layout({
  children,
  className,
}) {
  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis])

  useEffect(() => {
    window.scrollTo(0, 0)
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
    })
    window.lenis = lenis
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  const [hash, setHash] = useState()

  useEffect(() => {
    if (lenis && hash) {
      const target = document.querySelector(hash)
      lenis.scrollTo(target, { offset: 0 })
    }
  }, [lenis, hash])


  useEffect(() => {
    function onClick(e) {
      e.preventDefault()
      const node = e.currentTarget
      const hash = node.getAttribute('href').split('#').pop()
      setHash('#' + hash)
      setTimeout(() => {
        window.location.hash = hash
      }, 0)
    }

    const internalLinks = [...document.querySelectorAll('[href^="#"]')]

    internalLinks.forEach((node) => {
      node.addEventListener('click', onClick, false)
    })

    return () => {
      internalLinks.forEach((node) => {
        node.removeEventListener('click', onClick, false)
      })
    }
  }, [])

  useFrame((time) => {
    lenis?.raf(time)
  }, 0)

  return (
    <div className={cn(s.layout, className)}>
      <main className={s.main}>{children}</main>
    </div>
  )
}
