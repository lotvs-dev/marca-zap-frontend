import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useBookings } from '@/hooks/use-bookings'
import { ArrowLeft } from 'lucide-react'

const clientSchema = z.object({
  clientName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  clientPhone: z.string().min(10, 'Telefone inválido'),
  notes: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

interface ClientFormProps {
  professionalId: string
  serviceId: string
  dateTime: string
  onSuccess: (bookingId: string) => void
  onBack: () => void
}

export function ClientForm({
  professionalId: _professionalId,
  serviceId,
  dateTime,
  onSuccess,
  onBack,
}: ClientFormProps) {
  const { createBooking } = useBookings()
  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  })

  const onSubmit = (data: ClientFormData) => {
    createBooking(
      {
        serviceId,
        ...data,
        dateTime,
      },
      {
        onSuccess: (booking) => {
          onSuccess(booking.id)
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <CardTitle>Seus Dados</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="clientName">Nome Completo</Label>
            <Input id="clientName" {...register('clientName')} />
            {errors.clientName && (
              <p className="text-sm text-red-500 mt-1">{errors.clientName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="clientPhone">WhatsApp</Label>
            <Input
              id="clientPhone"
              placeholder="(11) 99999-9999"
              {...register('clientPhone')}
            />
            {errors.clientPhone && (
              <p className="text-sm text-red-500 mt-1">{errors.clientPhone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea id="notes" {...register('notes')} />
          </div>
          <Button type="submit" className="w-full">
            Confirmar Agendamento
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
