import { useEffect, useState } from 'react'

interface SplitTextProps {
  text: string
  delay?: number
  duration?: number
  className?: string
}

export function SplitText({ text, delay = 50, duration = 600, className = '' }: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity ${duration}ms ease-out ${index * delay}ms, transform ${duration}ms ease-out ${index * delay}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
