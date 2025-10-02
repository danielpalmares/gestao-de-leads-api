import { Lead } from '@entities/Lead.ts'
import type { ReadLeadDTO, ReadAllLeadsDTO } from './dto.ts'
import { readLeadSchema, readAllLeadsSchema } from './validation_schema.ts'
import { ValidationError } from '@utils/errors/ValidationError.ts'
import { DefaultError } from '@utils/errors/DefaultError.ts'
import { formatZodErrors } from '@utils/zod/mapper.ts'
import type { ILeadRepository } from '@repositories/interfaces/lead_repository.ts'
import type { Collection } from '@repositories/interfaces/pagination.ts'

export class ReadLeadCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async findById(dto: ReadLeadDTO): Promise<Lead> {
    const parsedData = readLeadSchema.safeParse(dto)
    if (!parsedData.success) {
      const errors = formatZodErrors(parsedData.error)
      throw new ValidationError(errors)
    }

    const lead = await this.leadRepository.findById(parsedData.data.id)
    if (!lead) {
      throw new DefaultError('Lead não encontrado', 404)
    }

    return lead
  }

  async findAll(dto: ReadAllLeadsDTO): Promise<Collection<Lead>> {
    const parsedData = readAllLeadsSchema.safeParse(dto)
    if (!parsedData.success) {
      const errors = formatZodErrors(parsedData.error)
      throw new ValidationError(errors)
    }

    return this.leadRepository.findAll(parsedData.data)
  }
}
