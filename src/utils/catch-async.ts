import { RequestHandler } from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
export interface CustomParamsDictionary {
  [key: string]: Allow
}

const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, Allow, Allow, qs.ParsedQs, Record<string, Allow>>) =>
  (
    req: Request<CustomParamsDictionary, Allow, Allow, Allow, Record<string, Allow>>,
    res: Response<Allow, Record<string, Allow>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }

export default catchAsync
