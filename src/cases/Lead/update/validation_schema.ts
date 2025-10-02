import { requiredString } from '@utils/zod/required.ts'
import { ZodMessages } from 'src/utils/zod/messages.ts'
import { z } from 'zod'

export const updateLeadSchema = z
  .object({
    id: requiredString(),
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
    email: z.email(ZodMessages.INVALID_FIELD).optional(),
    phone_number: z
      .string()
      .regex(/^\d{10,11}$/, 'Número de telefone inválido')
      .optional(),
    role: z.string().min(2, 'Cargo deve ter no mínimo 2 caracteres').optional(),
    birth_date: z.coerce
      .date(ZodMessages.INVALID_FIELD)
      .min(new Date(1900, 0, 1), 'Data de nascimento inválida')
      .max(new Date(), 'Data de nascimento não pode ser no futuro')
      .optional(),
    message: z
      .string()
      .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
      .max(500, 'Mensagem deve ter no máximo 500 caracteres')
      .optional()
  })
  .refine(
    data => {
      const { id, ...rest } = data
      return Object.values(rest).some(value => value !== undefined)
    },
    {
      message: 'Pelo menos um campo deve ser fornecido para atualização'
    }
  )

export type UpdateLeadDTO = z.infer<typeof updateLeadSchema>
