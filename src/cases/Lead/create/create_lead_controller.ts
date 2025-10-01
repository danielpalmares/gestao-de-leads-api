import { executeProcess } from '@utils/process/trycatch.js'
import type { CreateLeadCase } from './create_lead_case.js'
import type { Request, Response } from 'express'
import type { Lead } from '@entities/Lead.js'

export class CreateLeadController {
  constructor(private readonly createLeadCase: CreateLeadCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const body = request.body
    const data = {
      name: body.name,
      email: body.email,
      phone_number: body.phone_number,
      role: body.role,
      birth_date: body.birth_date,
      message: body.message
    }

    const process = async () => {
      const lead = await this.createLeadCase.execute(data)
      return { result: lead, status: 201 }
    }

    const result = await executeProcess<Lead>(response, process)
    return result
  }
}
