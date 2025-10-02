import type { Lead } from '@entities/Lead.ts'
import type { Collection } from './pagination.ts'

export interface LeadFilters {
  name?: string | undefined
  email?: string | undefined
  page?: number | undefined
  limit?: number | undefined
}

export interface ILeadRepository {
  create(lead: Lead): Promise<Lead>
  findById(id: string): Promise<Lead | null>
  findAll(filters?: LeadFilters): Promise<Collection<Lead>>
  update(id: string, lead: Partial<Lead>): Promise<Lead>
  delete(id: string): Promise<void>
}
