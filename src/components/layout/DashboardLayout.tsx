import { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Calendar, Settings, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Logo width={130} height={34} />
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              <NavLink to="/dashboard" icon={LayoutDashboard}>
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/agendamentos" icon={Calendar}>
                Agendamentos
              </NavLink>
              <NavLink to="/dashboard/config" icon={Settings}>
                Configurações
              </NavLink>
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <Button
                  variant="link"
                  onClick={logout}
                  className="flex items-center gap-1 p-0 text-xs text-gray-500"
                >
                  <LogOut size={14} />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function NavLink({
  to,
  icon: Icon,
  children,
}: {
  to: string
  icon: any
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      activeProps={{
        className:
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900',
      }}
    >
      <Icon className="mr-3 h-5 w-5" />
      {children}
    </Link>
  )
}
