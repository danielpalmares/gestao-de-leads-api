import { z } from 'zod'

export const readLeadSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido').nonempty('ID é obrigatório')
})

export const readAllLeadsSchema = z.object({
  name: z.string().min(1, 'Nome deve ter pelo menos 1 caractere').optional(),
  email: z.email('Email inválido').optional(),
  page: z.coerce
    .number()
    .int()
    .min(1, 'Página deve ser maior que 0')
    .default(1)
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1, 'Limite deve ser maior que 0')
    .max(100, 'Limite máximo é 100')
    .default(10)
    .optional()
})

export type ReadLeadDTO = z.infer<typeof readLeadSchema>
export type ReadAllLeadsDTO = z.infer<typeof readAllLeadsSchema>
