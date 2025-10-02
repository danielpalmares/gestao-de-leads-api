import { executeProcess } from '@utils/process/trycatch.ts'
import type { ReadLeadCase } from './read_lead_case.ts'
import type { Request, Response } from 'express'
import type { Lead } from '@entities/Lead.ts'
import type { Collection } from '@repositories/interfaces/pagination.ts'

export class ReadLeadController {
  constructor(private readonly readLeadCase: ReadLeadCase) {}

  async handleById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const process = async () => {
      const lead = await this.readLeadCase.findById({ id })
      return { result: lead, status: 200 }
    }

    const result = await executeProcess<Lead>(response, process)
    return result
  }

  async handleAll(request: Request, response: Response): Promise<Response> {
    const { name, email, page, limit } = request.query

    const data = {
      name: typeof name === 'string' ? name : undefined,
      email: typeof email === 'string' ? email : undefined,
      page: typeof page === 'string' ? parseInt(page) : undefined,
      limit: typeof limit === 'string' ? parseInt(limit) : undefined
    }

    const process = async () => {
      const result = await this.readLeadCase.findAll(data)
      return { result, status: 200 }
    }

    const result = await executeProcess<Collection<Lead>>(response, process)
    return result
  }
}
