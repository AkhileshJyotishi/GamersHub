import prisma from '../client'
import { User } from '@prisma/client'

/**
 * Delete user
 * @param {User} user
 */

const blacklistUser = async (user: User) => {
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      tokens: {
        updateMany: {
          where: {
            blacklisted: false
          },
          data: {
            blacklisted: true
          }
        }
      }
    },
    include: {
      tokens: true
    }
  })
}

export default {
  blacklistUser
}
