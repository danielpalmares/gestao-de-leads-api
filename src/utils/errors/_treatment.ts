import { DefaultError } from './DefaultError.ts'
import { ValidationError } from './ValidationError.ts'
import { type Response } from 'express'

export const treatErrors = (error: unknown, response: Response) => {
  switch (true) {
    case error instanceof DefaultError:
      return response.status(error.statusCode).json({ error: error.message })
    case error instanceof ValidationError:
      return response.status(error.statusCode).json({ errors: error.issues })
    default:
      return response.status(500).json({ error: 'Internal Server Error' })
  }
}
