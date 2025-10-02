import type { DeleteLeadDTO } from './dto.ts'
import { DefaultError } from '@utils/errors/DefaultError.ts'
import type { ILeadRepository } from '@repositories/interfaces/lead_repository.ts'

export class DeleteLeadCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(dto: DeleteLeadDTO): Promise<void> {
    if (!dto.id) {
      throw new DefaultError('ID não fornecido', 400)
    }

    const existingLead = await this.leadRepository.findById(dto.id)
    if (!existingLead) {
      throw new DefaultError('Lead não encontrado', 404)
    }

    await this.leadRepository.delete(dto.id)
  }
}
