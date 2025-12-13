import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { usePublicAvailability } from '@/hooks/use-availability'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'

interface AvailabilityCalendarProps {
  professionalId: string
  serviceId: string
  onSelect: (dateTime: string) => void
  onBack: () => void
}

export function AvailabilityCalendar({
  professionalId,
  serviceId: _serviceId,
  onSelect,
  onBack,
}: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const { data: timeSlots } = usePublicAvailability(
    professionalId,
    selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''
  )

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      const dateTime = `${format(selectedDate, 'yyyy-MM-dd')}T${time}:00`
      onSelect(dateTime)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <CardTitle>Escolha Data e Horário</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={ptBR}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
        />

        {selectedDate && timeSlots && (
          <div>
            <h4 className="font-medium mb-2">
              Horários disponíveis para {format(selectedDate, 'dd/MM/yyyy')}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots
                .filter(slot => slot.available)
                .map(slot => (
                  <Button
                    key={slot.time}
                    variant="outline"
                    onClick={() => handleTimeSelect(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
            </div>
            {timeSlots.filter(slot => slot.available).length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Nenhum horário disponível para esta data
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
