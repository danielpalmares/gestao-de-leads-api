import { Lead } from '@entities/Lead.ts'
import type { ReadLeadDTO } from './dto.ts'
import { DefaultError } from '@utils/errors/DefaultError.ts'
import type { ILeadRepository } from '@repositories/interfaces/lead_repository.ts'

export class ReadLeadCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async findById(dto: ReadLeadDTO): Promise<Lead> {
    if (!dto.id) {
      throw new DefaultError('ID não fornecido', 400)
    }

    const lead = await this.leadRepository.findById(dto.id)

    if (!lead) {
      throw new DefaultError('Lead não encontrado', 404)
    }

    return lead
  }

  async findAll(): Promise<Lead[]> {
    return this.leadRepository.findAll()
  }
}
