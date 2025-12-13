import type { Service } from './service.types'
import type { Availability } from './availability.types'

export interface Professional {
  id: string
  name: string
  email: string
  phone: string
  slug: string
  avatar?: string
  whatsappNumber?: string
  services: Service[]
  availability: Availability[]
  createdAt: string
  updatedAt: string
}

export interface ProfessionalPublic {
  id: string
  name: string
  slug: string
  avatar?: string
  services: Service[]
}
