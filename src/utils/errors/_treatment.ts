import { DefaultError } from './DefaultError.js'
import { ValidationError } from './ValidationError.js'
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
