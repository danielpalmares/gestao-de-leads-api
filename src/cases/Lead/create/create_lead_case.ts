import { Lead } from '@entities/Lead.ts'
import type { CreateLeadDTO } from './dto.ts'
import { createLeadSchema } from './validation_schema.ts'
import { ValidationError } from '@utils/errors/ValidationError.ts'
import { formatZodErrors } from '@utils/zod/mapper.ts'
import type { ILeadRepository } from '@repositories/interfaces/lead_repository.ts'

export class CreateLeadCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  execute(dto: CreateLeadDTO): Promise<Lead> {
    const parsedData = createLeadSchema.safeParse(dto)

    if (!parsedData.success) {
      const errors = formatZodErrors(parsedData.error)
      throw new ValidationError(errors)
    }

    const lead = new Lead({
      name: parsedData.data.name,
      email: parsedData.data.email,
      phone_number: parsedData.data.phone_number,
      role: parsedData.data.role,
      birth_date: parsedData.data.birth_date,
      message: parsedData.data.message
    })

    return this.leadRepository.create(lead)
  }
}
