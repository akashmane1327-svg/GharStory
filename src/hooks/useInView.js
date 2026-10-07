import { useEffect, useRef, useState } from 'react'

// Tracks whether an element has scrolled into the viewport, once.
// Used to drive scroll-reveal / fade-up animations. Respects
// prefers-reduced-motion by marking elements visible immediately.
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setIsInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}
