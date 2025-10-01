import { treatErrors } from '../errors/_treatment.ts'
import { type Response } from 'express'

export const executeProcess = async <T>(
  response: Response,
  callback: () => Promise<{ result: T; status: number }>
): Promise<Response<T>> => {
  try {
    const { result, status } = await callback()
    return response.status(status).json(result)
  } catch (error) {
    const handledError = treatErrors(error, response)
    return handledError
  }
}
