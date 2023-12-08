import { Response } from 'express'

export const sendResponse = (
  res: Response,
  statusCode: number = 200,
  error: Allow | null = null,
  data: Allow | null = null,
  message: string = ''
): void => {
  const response = {
    error,
    data,
    message
  }

  res.status(statusCode).json(response)
}
