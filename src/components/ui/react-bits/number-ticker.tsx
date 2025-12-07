import { useEffect, useRef, useState } from 'react'

interface NumberTickerProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
}

export function NumberTicker({ value, duration = 2000, className = '', suffix = '' }: NumberTickerProps) {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endValue = value

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * endValue)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
