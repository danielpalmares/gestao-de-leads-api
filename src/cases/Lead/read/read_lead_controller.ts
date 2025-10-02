import { executeProcess } from '@utils/process/trycatch.ts'
import type { ReadLeadCase } from './read_lead_case.ts'
import type { Request, Response } from 'express'
import type { Lead } from '@entities/Lead.ts'

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

  async handleAll(_: Request, response: Response): Promise<Response> {
    const process = async () => {
      const leads = await this.readLeadCase.findAll()
      return { result: leads, status: 200 }
    }

    const result = await executeProcess<Lead[]>(response, process)
    return result
  }
}
