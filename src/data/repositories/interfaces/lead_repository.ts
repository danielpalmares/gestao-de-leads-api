import type { Lead } from '@entities/Lead.ts'

export interface ILeadRepository {
  create(lead: Lead): Promise<Lead>
}
