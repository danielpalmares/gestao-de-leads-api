import { executeProcess } from '@utils/process/trycatch.ts'
import type { DeleteLeadCase } from './delete_lead_case.ts'
import type { Request, Response } from 'express'

export class DeleteLeadController {
  constructor(private readonly deleteLeadCase: DeleteLeadCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const process = async () => {
      await this.deleteLeadCase.execute({ id })
      return { result: { message: 'Lead deletado com sucesso' }, status: 200 }
    }

    const result = await executeProcess<{ message: string }>(response, process)
    return result
  }
}
