import type { Service } from '@/types'
import { Clock, DollarSign } from 'lucide-react'

import { useServices } from '@/hooks/use-services'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { deleteService } = useServices()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{service.name}</CardTitle>
          <Badge variant={service.active ? 'default' : 'secondary'}>
            {service.active ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {service.description && (
          <p className="text-sm text-gray-600">{service.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-gray-500" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={16} className="text-gray-500" />
            <span>R$ {service.price.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm">
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteService(service.id)}
          >
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
