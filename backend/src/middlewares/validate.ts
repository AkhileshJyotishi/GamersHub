import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import Joi from 'joi'

import ApiError from '../utils/api-error'
import pick from '../utils/pick'
/**
 * Validates the request against the provided schema.
 *
 * @param {object} schema - The schema to validate against.
 * @returns {Function} - Express middleware function.
 */
const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const obj = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj)
  if (error) {
    const errorMessage = error.details?.map((details) => details.message)[0]
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
  }
  Object.assign(req, value)
  return next()
}

export default validate