import { ZodMessages } from 'src/utils/zod/messages.ts'
import { requiredString } from 'src/utils/zod/required.ts'
import { z } from 'zod'

export const createLeadSchema = z.object({
  name: requiredString().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z
    .email(ZodMessages.INVALID_FIELD)
    .nonempty(ZodMessages.REQUIRED_FIELD),
  phone_number: requiredString().regex(
    /^\d{10,11}$/,
    'Número de telefone inválido'
  ),
  role: requiredString().min(2, 'Cargo deve ter no mínimo 2 caracteres'),
  birth_date: z.coerce
    .date(ZodMessages.INVALID_FIELD)
    .min(new Date(1900, 0, 1), 'Data de nascimento inválida')
    .max(new Date(), 'Data de nascimento não pode ser no futuro'),
  message: requiredString()
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(500, 'Mensagem deve ter no máximo 500 caracteres')
})

export type CreateLeadDTO = z.infer<typeof createLeadSchema>
