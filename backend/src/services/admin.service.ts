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
      validUser: false
    }
  })
}

/**
 * Include user
 * @param {User} user
 */

const unblacklistUser = async (user: User) => {
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      validUser: true
    }
  })
}
/**
 * Get all Blacklisted User
 */

const getAllBlacklistedUsers = async (): Promise<
  Pick<
    User,
    | 'bannerImage'
    | 'createdAt'
    | 'email'
    | 'id'
    | 'isEmailVerified'
    | 'matureContent'
    | 'profileImage'
    | 'username'
    | 'validUser'
  >[]
> => {
  const users = await prisma.user.findMany({
    where: {
      validUser: false
    },
    select: {
      id: true,
      username: true,
      isEmailVerified: true,
      profileImage: true,
      bannerImage: true,
      email: true,
      createdAt: true,
      matureContent: true,
      validUser: true,
      role: {
        select: {
          role: true
        }
      }
    }
  })
  return users
}

/**
 * Get all Unblacklisted User
 */

const getAllUnblacklistedUsers = async (): Promise<
  Pick<
    User,
    | 'bannerImage'
    | 'createdAt'
    | 'email'
    | 'id'
    | 'isEmailVerified'
    | 'matureContent'
    | 'profileImage'
    | 'username'
    | 'validUser'
  >[]
> => {
  const users = await prisma.user.findMany({
    where: {
      validUser: true
    },
    select: {
      id: true,
      username: true,
      isEmailVerified: true,
      profileImage: true,
      bannerImage: true,
      email: true,
      createdAt: true,
      matureContent: true,
      validUser: true,
      role: {
        select: {
          role: true
        }
      }
    }
  })
  return users
}

export default {
  blacklistUser,
  unblacklistUser,
  getAllBlacklistedUsers,
  getAllUnblacklistedUsers
}
