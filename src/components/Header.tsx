import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: '#recursos', label: 'Recursos' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#precos', label: 'Preços' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-emerald-500/20 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                MarcaZap
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                ) : (
                  <Moon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                )}
              </button>

              <Link to="/login">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Acessar
                </Button>
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                ) : (
                  <Moon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-2xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              MarcaZap
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>

          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Acessar
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
