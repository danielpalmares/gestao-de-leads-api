import { executeProcess } from '@utils/process/trycatch.ts'
import type { UpdateLeadCase } from './update_lead_case.ts'
import type { Request, Response } from 'express'
import type { Lead } from '@entities/Lead.ts'

export class UpdateLeadController {
  constructor(private readonly updateLeadCase: UpdateLeadCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const body = request.body

    const data = {
      id,
      name: body.name,
      email: body.email,
      phone_number: body.phone_number,
      role: body.role,
      birth_date: body.birth_date,
      message: body.message
    }

    const process = async () => {
      const lead = await this.updateLeadCase.execute(data)
      return { result: lead, status: 200 }
    }

    const result = await executeProcess<Lead>(response, process)
    return result
  }
}
