import type { Lead } from '@entities/Lead.ts'

export interface ILeadRepository {
  create(lead: Lead): Promise<Lead>
  findById(id: string): Promise<Lead | null>
  findAll(): Promise<Lead[]>
  update(id: string, lead: Partial<Lead>): Promise<Lead>
  delete(id: string): Promise<void>
}
