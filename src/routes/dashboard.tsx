import { createFileRoute } from '@tanstack/react-router'

import { DashboardLayout } from '@/components/layout/DashboardLayout'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao painel de controle</p>
      </div>
    </DashboardLayout>
  )
}
