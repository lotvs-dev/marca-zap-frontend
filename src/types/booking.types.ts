import type { Service } from './service.types'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Booking {
  id: string
  serviceId: string
  service?: Service
  professionalId: string
  clientName: string
  clientPhone: string
  dateTime: string // ISO 8601
  status: BookingStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateBookingData {
  serviceId: string
  clientName: string
  clientPhone: string
  dateTime: string
  notes?: string
}
