import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import logoLight from '@/assets/png/marcazap-logo-light.png'
import logoBlack from '@/assets/png/marcazap-logo-black.png'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = '', width = 150, height = 40 }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className} style={{ width, height }} />
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme
  const logo = currentTheme === 'dark' ? logoLight : logoBlack

  return (
    <img
      src={logo}
      alt="MarcaZap"
      className={className}
      width={width}
      height={height}
    />
  )
}
