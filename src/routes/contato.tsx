import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contato')({
  component: ContatoPage,
})

function ContatoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Contato</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Informações de contato...</p>
        </div>
      </div>
    </div>
  )
}
