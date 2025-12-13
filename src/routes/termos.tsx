import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/termos')({
  component: TermosPage,
})

function TermosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Conteúdo dos termos de uso...</p>
        </div>
      </div>
    </div>
  )
}
