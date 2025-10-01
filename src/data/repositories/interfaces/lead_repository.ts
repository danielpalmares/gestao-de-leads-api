import type { Lead } from '@entities/Lead.js'

export interface ILeadRepository {
  create(lead: Lead): Promise<Lead>
}
