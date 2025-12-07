import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-emerald-500/10 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo width={130} height={34} />
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              to="/termos"
              className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Termos
            </Link>
            <Link
              to="/privacidade"
              className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Privacidade
            </Link>
            <Link
              to="/contato"
              className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} MarcaZap. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
