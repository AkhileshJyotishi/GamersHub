import { Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
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
