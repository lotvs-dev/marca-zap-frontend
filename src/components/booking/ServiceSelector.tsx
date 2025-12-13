import type { Service } from '@/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, DollarSign } from 'lucide-react'

interface ServiceSelectorProps {
  services: Service[]
  onSelect: (serviceId: string) => void
}

export function ServiceSelector({ services, onSelect }: ServiceSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Escolha o Serviço</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {services
          .filter(s => s.active)
          .map(service => (
            <div
              key={service.id}
              className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition"
              onClick={() => onSelect(service.id)}
            >
              <h3 className="font-medium">{service.name}</h3>
              {service.description && (
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={14} />
                  <span>R$ {service.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}
