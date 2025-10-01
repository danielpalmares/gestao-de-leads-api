import type { ZodError } from 'zod'

export const formatZodErrors = (error: ZodError) => {
  return error.issues.map(issue => ({
    field: issue.path.join('.'),
    message: issue.message
  }))
}
