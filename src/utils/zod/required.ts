import { z } from 'zod'
import { ZodMessages } from './messages.ts'

export const requiredString = () =>
  z.string({
    error: issue =>
      issue.input === undefined || issue.input === null
        ? ZodMessages.REQUIRED_FIELD
        : ZodMessages.INVALID_FIELD
  })
