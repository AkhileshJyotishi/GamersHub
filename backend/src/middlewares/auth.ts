import passport from 'passport'
import httpStatus from 'http-status'
import ApiError from '../utils/api-error'
import { roleRights } from '../config/roles'
import { NextFunction, Request, Response } from 'express'
import { Role, User } from '@prisma/client'

const verifyCallback =
  (
    req: Request,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
    requiredRights: string[],
    res: Response
  ) =>
  async (err: unknown, user: (User & { role?: Role }) | false, info: unknown) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))
    }
    res.locals.user = user

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role?.role ?? 'USER') ?? []
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      )
      if (!hasRequiredRights) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'))
      }
    }
    resolve()
  }
/**
 * Authenticates the user based on the required rights.
 *
 * @param {...string} requiredRights - The required rights for the user.
 * @returns {Promise<void>} - A promise that resolves if the user is authenticated and has the required rights, or rejects with an error if authentication fails or the user does not have the required rights.
 */
const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights, res)
      )(req, res, next)
    })
      .then(() => next())
      .catch((err) => next(err))
  }

export default auth
