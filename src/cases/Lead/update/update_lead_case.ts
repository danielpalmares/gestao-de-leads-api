import { Lead } from '@entities/Lead.ts'
import type { UpdateLeadDTO } from './dto.ts'
import { updateLeadSchema } from './validation_schema.ts'
import { ValidationError } from '@utils/errors/ValidationError.ts'
import { DefaultError } from '@utils/errors/DefaultError.ts'
import { formatZodErrors } from '@utils/zod/mapper.ts'
import type { ILeadRepository } from '@repositories/interfaces/lead_repository.ts'

export class UpdateLeadCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(dto: UpdateLeadDTO): Promise<Lead> {
    const parsedData = updateLeadSchema.safeParse(dto)
    if (!parsedData.success) {
      const errors = formatZodErrors(parsedData.error)
      throw new ValidationError(errors)
    }

    const existingLead = await this.leadRepository.findById(parsedData.data.id)
    if (!existingLead) {
      throw new DefaultError('Lead não encontrado', 404)
    }

    const { id, ...updateData } = parsedData.data
    const filteredData = Object.fromEntries(
      Object.entries(updateData).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
    )

    return this.leadRepository.update(id, filteredData)
  }
}
