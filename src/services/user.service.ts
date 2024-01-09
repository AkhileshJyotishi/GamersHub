import {
  User,
  Prisma,
  RoleType,
  UserSocials,
  UserEducation,
  UserDetails,
  UserExperience
} from '@prisma/client'
import httpStatus from 'http-status'
import prisma from '../client'
import ApiError from '../utils/api-error'
import { encryptPassword } from '../utils/encryption'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (
  email: string,
  password: string,
  username: string,
  role?: RoleType
): Promise<User> => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  if (await getUserByUsername(username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken')
  }
  const data: {
    email: string
    username: string
    password: string
    role?: { create: { role: RoleType } }
  } = {
    email,
    username,
    password: await encryptPassword(password)
  }
  if (role !== undefined) {
    data.role = { create: { role } }
  }
  return await prisma.user.create({
    data
  })
}

/**
 * Create a google user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createProviderUser = async (
  email: string,
  username: string,
  isEmailVerified?: boolean,
  profileImage?: string,
  role?: RoleType
): Promise<User> => {
  if (await getUserByUsername(username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken')
  }
  const data: {
    email: string
    username: string
    isEmailVerified?: boolean
    profileImage?: string
    role?: { create: { role: RoleType } }
  } = {
    email,
    username,
    isEmailVerified,
    profileImage
  }

  if (role !== undefined) {
    data.role = { create: { role } }
  }

  return await prisma.user.create({
    data
  })
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async <Key extends keyof User>(
  filter: object,
  options: {
    limit?: number
    page?: number
    sortBy?: string
    sortType?: 'asc' | 'desc'
  },
  keys: Key[] = [
    'id',
    'email',
    'username',
    'password',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1
  const limit = options.limit ?? 10
  const sortBy = options.sortBy
  const sortType = options.sortType ?? 'desc'
  const users = await prisma.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  })
  return users as Pick<User, Key>[]
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserById = async <Key extends keyof User>(
  id: number,
  keys: Key[] = [
    'id',
    'email',
    'username',
    'password',
    'isEmailVerified',
    'createdAt',
    'updatedAt',
    'profileImage'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>
}

/**
 * Get user
 * @param {ObjectId} id
 * @returns {User}
 */
const getUser = async (id: number): Promise<User> => {
  return prisma.user.findUnique({
    where: { id }
  }) as Promise<User>
}

/**
 * Get user by username
 * @param {string} username
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByUsername = async <Key extends keyof User>(
  username: string,
  keys: Key[] = [
    'id',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { username },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>
}

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = [
    'id',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async <Key extends keyof User>(
  userId: number,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ['profileImage', 'bannerImage', 'matureContent'] as Key[]
): Promise<Pick<User, Key> | null> => {
  const user = await getUserById(userId, ['id', 'email', 'username'])
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  })
  return updatedUser as Pick<User, Key> | null
}

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: number): Promise<User> => {
  const user = await getUserById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await prisma.user.delete({ where: { id: user.id } })
  return user
}

// User Socials

/**
 * Get userSocials by userId
 * @param {ObjectId} userId
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<UserSocials, Key> | null>}
 */
const getSocialsByUserId = async <Key extends keyof UserSocials>(
  userId: number,
  keys: Key[] = [
    'twitter',
    'facebook',
    'linkedin',
    'youtube',
    'github',
    'portfolio',
    'artstation'
  ] as Key[]
): Promise<Pick<UserSocials, Key> | null> => {
  const userSocials = (await prisma.userSocials.findUnique({
    where: { userId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  })) as Promise<Pick<UserSocials, Key> | null>
  return userSocials || {}
}

/**
 * Create userSocials
 * @param {ObjectId} userId
 * @param {object} socialsBody
 * @returns {Promise<UserSocials>}
 */
const createSocialsByUserId = async (userId: number, socialsBody: object): Promise<UserSocials> => {
  if (await prisma.userSocials.findUnique({ where: { userId } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Socials already exists.')
  }
  return await prisma.userSocials.create({
    data: {
      userId,
      ...socialsBody
    }
  })
}

/**
 * update userSocials
 * @param {ObjectId} userId
 * @param {object} socialsBody
 * @returns {Promise<UserSocials>}
 */
const updateSocialsByUserId = async (userId: number, socialsBody: object): Promise<UserSocials> => {
  return await prisma.userSocials.upsert({
    where: {
      userId
    },
    create: {
      userId,
      ...socialsBody
    },
    update: {
      ...socialsBody
    }
  })
}

/**
 * Delete userSocials
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */
const deleteSocialsByUserId = async (userId: number): Promise<void> => {
  if (!(await getSocialsByUserId(userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Socials not found.')
  }
  await prisma.userSocials.delete({
    where: {
      userId
    }
  })
}

// User Education

/**
 * Get userEducation by userId
 * @param {ObjectId} userId
 * @returns {Promise<Pick<UserEducation, Key> | null>}
 */
const getEducationByUserId = async (userId: number): Promise<UserEducation[]> => {
  const userDetails = await prisma.userDetails.findUnique({
    where: { userId },
    select: { userEducation: true }
  })

  if (!userDetails?.userEducation.length ?? true) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Education not found')
  }
  return userDetails.userEducation
}

/**
 * Get userEducation by userId
 * @param {ObjectId} id
 * @param {ObjectId} userId
 * @returns {Promise<Pick<UserEducation, Key> | null>}
 */
const getEducationById = async (id: number, userId: number): Promise<UserEducation> => {
  const userEducation = await prisma.userEducation.findUnique({
    where: {
      id,
      userDetails: {
        userId: userId
      }
    }
  })
  if (!userEducation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Education not found')
  }
  return userEducation
}

interface EducationData {
  university: string
  degree: string
  startingDate: string
  endingDate: string | null
  description: string | null
}
/**
 * Create userEducation
 * @param {ObjectId} userId
 * @param {object} educationBody
 * @returns {Promise<UserEducation>}
 */
const createEducationByUserId = async (
  userId: number,
  educationBody: EducationData
): Promise<UserEducation> => {
  const userEducation = await prisma.userEducation.create({
    data: {
      university: educationBody.university,
      degree: educationBody.degree,
      startingDate: educationBody.startingDate,
      userDetails: {
        connectOrCreate: {
          where: {
            userId
          },
          create: {
            userId
          }
        }
      },
      endingDate: educationBody.endingDate ?? null,
      description: educationBody.description ?? null
    }
  })
  return userEducation
}

/**
 * update userEducation
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {object} educationBody
 * @returns {Promise<UserSocials>}
 */
const updateEducationByUserId = async (
  userId: number,
  id: number,
  educationBody: object
): Promise<UserEducation> => {
  if (!(await getEducationById(id, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Education not found.')
  }
  return await prisma.userEducation.update({
    where: {
      id
    },
    data: educationBody
  })
}

/**
 * Delete userEducation
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */
const deleteEducationById = async (id: number, userId: number): Promise<UserEducation> => {
  if (!(await getEducationById(id, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Education not found.')
  }
  return await prisma.userEducation.delete({
    where: {
      id
    }
  })
}

// User Experience

/**
 * Get userExperience by userId
 * @param {ObjectId} userId
 * @returns {Promise<Pick<UserExperience, Key> | null>}
 */
const getExperienceByUserId = async (userId: number): Promise<UserExperience[]> => {
  const userDetails = await prisma.userDetails.findUnique({
    where: { userId },
    select: { userExperience: true }
  })

  if (!userDetails?.userExperience.length ?? true) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Experience not found')
  }
  return userDetails.userExperience
}

/**
 * Get userExperience by userId
 * @param {ObjectId} id
 * @param {ObjectId} userId
 * @returns {Promise<Pick<UserExperience, Key> | null>}
 */
const getExperienceById = async (id: number, userId: number): Promise<UserExperience> => {
  const userExperience = await prisma.userExperience.findUnique({
    where: {
      id,
      userDetails: {
        userId: userId
      }
    }
  })
  if (!userExperience) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Experience not found')
  }
  return userExperience
}

interface ExperienceData {
  role: string
  company: string
  startingDate: string
  endingDate: string | null
  description: string | null
  presentWorking: boolean
}
/**
 * Create userExperience
 * @param {ObjectId} userId
 * @param {object} experienceBody
 * @returns {Promise<UserExperience>}
 */
const createExperienceByUserId = async (
  userId: number,
  experienceBody: ExperienceData
): Promise<UserExperience> => {
  const userExperience = await prisma.userExperience.create({
    data: {
      role: experienceBody.role,
      company: experienceBody.company,
      startingDate: experienceBody.startingDate,
      presentWorking: experienceBody.presentWorking,
      userDetails: {
        connectOrCreate: {
          where: {
            userId
          },
          create: {
            userId
          }
        }
      },
      endingDate: experienceBody.endingDate ?? null,
      description: experienceBody.description ?? null
    }
  })
  return userExperience
}

/**
 * update userExperience
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {object} experienceBody
 * @returns {Promise<UserSocials>}
 */
const updateExperienceByUserId = async (
  userId: number,
  id: number,
  experienceBody: object
): Promise<UserExperience> => {
  if (!(await getExperienceById(id, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Experience not found.')
  }
  return await prisma.userExperience.update({
    where: {
      id
    },
    data: experienceBody
  })
}

/**
 * delete userExperience
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */
const deleteExperienceById = async (id: number, userId: number): Promise<UserExperience> => {
  if (!(await getExperienceById(id, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Experience not found.')
  }
  return await prisma.userExperience.delete({
    where: {
      id
    }
  })
}

// User Details

/**
 * Get userDetails by userId
 * @param {ObjectId} userId
 * @returns {Promise<UserDetails>}
 */
const getUserDetailsByUserId = async (userId: number): Promise<UserDetails | object> => {
  const userDetails = await prisma.userDetails.findUnique({
    where: { userId },
    include: {
      userEducation: {
        select: {
          degree: true,
          description: true,
          endingDate: true,
          startingDate: true,
          university: true,
          id: true
        }
      },
      userSkills: {
        select: {
          skill: true
        }
      },
      userExperience: {
        select: {
          company: true,
          description: true,
          endingDate: true,
          id: true,
          presentWorking: true,
          role: true,
          startingDate: true
        }
      },
      userSoftwares: {
        select: {
          software: true
        }
      },
      user: {
        select: {
          profileImage: true,
          bannerImage: true,
          matureContent: true
        }
      }
    }
  })
  // if (!userDetails) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User Details not found')
  // }
  return userDetails || {}
}

interface userDetailsBody {
  country?: string
  city?: string
  userBio?: string
  userSkills?: string[]
  userSoftwares?: string[]
  profileImage?: string
}

/**
 * Create userDetails
 * @param {ObjectId} userId
 * @param {object} userDetailsBody
 * @returns {Promise<UserDetails>}
 */
const createUserDetailsByUserId = async (
  userId: number,
  userDetailsBody: userDetailsBody
): Promise<UserDetails> => {
  if (await prisma.userDetails.findUnique({ where: { userId } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Details already exists.')
  }
  const { userSkills, userSoftwares, profileImage, ...newDetailsBody } = userDetailsBody
  const userDetails = await prisma.userDetails.create({
    data: {
      userId,
      ...newDetailsBody
    }
  })
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      profileImage
    }
  })

  // handle user skills
  if (userSkills && userSkills.length > 0) {
    const skillPromises = userSkills?.map((skill) => {
      return prisma.skill.upsert({
        where: {
          skill: skill
        },
        create: {
          skill: skill,
          userDetails: {
            connect: {
              id: userDetails.id
            }
          }
        },
        update: {
          userDetails: {
            connect: {
              id: userDetails.id
            }
          }
        }
      })
    })

    await Promise.all(skillPromises)
  }

  // handle user softwares
  if (userSoftwares && userSoftwares.length > 0) {
    const softwarePromises = userSoftwares?.map((key) => {
      return prisma.software.upsert({
        where: {
          software: key
        },
        create: {
          software: key,
          userDetails: {
            connect: {
              id: userDetails.id
            }
          }
        },
        update: {
          userDetails: {
            connect: {
              id: userDetails.id
            }
          }
        }
      })
    })

    await Promise.all(softwarePromises)
  }

  return userDetails
}

/**
 * update userDetails
 * @param {ObjectId} userId
 * @param {object} userDetailsBody
 * @returns {Promise<UserDetails>}
 */
const updateUserDetailsByUserId = async (
  userId: number,
  userDetailsBody: userDetailsBody
): Promise<UserDetails> => {
  if (!(await prisma.userDetails.findUnique({ where: { userId } }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Details not found.')
  }
  const { userSkills, userSoftwares, profileImage, ...newDetailsBody } = userDetailsBody

  // handle userSkills
  if (userSkills) {
    const existingUserDetailskills = await prisma.userDetails.findUnique({
      where: {
        userId
      },
      select: {
        userSkills: {
          select: {
            skill: true
          }
        }
      }
    })
    let itemsToAdd = userSkills

    if (existingUserDetailskills) {
      const userDetailSkill = existingUserDetailskills.userSkills?.map((k: Allow) => k.skill)
      const itemsToRemove = userDetailSkill.filter((item: Allow) => !userSkills.includes(item))
      itemsToAdd = userSkills.filter((item) => !userDetailSkill.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.skill.update({
          where: {
            skill: key
          },
          data: {
            userDetails: {
              disconnect: {
                userId
              }
            }
          }
        })
      })

      await Promise.all(removePromises)
    }

    const addPromises = itemsToAdd?.map((key) => {
      return prisma.skill.upsert({
        where: {
          skill: key
        },
        update: {
          userDetails: {
            connect: {
              userId
            }
          }
        },
        create: {
          skill: key,
          userDetails: {
            connect: {
              userId
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  // handle userSoftwares
  if (userSoftwares) {
    const existingUserDetailsSoftware = await prisma.userDetails.findUnique({
      where: {
        userId
      },
      select: {
        userSoftwares: {
          select: {
            software: true
          }
        }
      }
    })
    let itemsToAdd = userSoftwares

    if (existingUserDetailsSoftware) {
      const userDetailSoftware = existingUserDetailsSoftware.userSoftwares?.map(
        (k: Allow) => k.software
      )
      const itemsToRemove = userDetailSoftware.filter(
        (item: Allow) => !userSoftwares.includes(item)
      )
      itemsToAdd = userSoftwares.filter((item) => !userDetailSoftware.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.software.update({
          where: {
            software: key
          },
          data: {
            userDetails: {
              disconnect: {
                userId
              }
            }
          }
        })
      })

      await Promise.all(removePromises)
    }

    const addPromises = itemsToAdd?.map((key) => {
      return prisma.software.upsert({
        where: {
          software: key
        },
        update: {
          userDetails: {
            connect: {
              userId
            }
          }
        },
        create: {
          software: key,
          userDetails: {
            connect: {
              userId
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      profileImage
    }
  })

  return await prisma.userDetails.update({
    where: {
      userId
    },
    data: newDetailsBody,
    include: {
      userEducation: true,
      userSkills: true,
      userExperience: true,
      userSoftwares: true
    }
  })
}

/**
 * Delete userDetails
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */
const deleteUserDetailsByUserId = async (userId: number): Promise<void> => {
  if (!(await prisma.userDetails.findUnique({ where: { userId } }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Details not found.')
  }
  await prisma.userDetails.delete({
    where: {
      userId
    }
  })
}

/**
 * Get custom userDetails by userId
 * @param {ObjectId} userId
 * @returns {Promise<object>}
 */
const getCustomDetails = async (userId: number): Promise<object | null> => {
  const userDetails = prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      bannerImage: true,
      userDetails: {
        select: {
          city: true,
          country: true
        }
      },
      profileImage: true,
      socials: {
        select: {
          facebook: true,
          linkedin: true,
          twitter: true,
          artstation: true,
          github: true,
          youtube: true,
          portfolio: true
        }
      },
      _count: {
        select: {
          followers_users: true,
          following_users: true
        }
      }
    }
  })
  return userDetails
}
interface QueryUsers {
  country?: string
  userSkills?: string[]
  userSoftwares?: string[]
}
/**
 * Get Creators except user
 * @param {ObjectId} userId
 * @returns {Promise<object>}
 */
const getAllCreatorsExceptUser = async (
  userId: number,
  filter: QueryUsers
): Promise<object | null> => {
  const { country, userSkills, userSoftwares } = filter

  const userDetails = prisma.user.findMany({
    where: {
      AND: [
        country
          ? {
              userDetails: {
                country: {
                  equals: country,
                  mode: 'insensitive'
                }
              }
            }
          : {},
        userSkills
          ? {
              userDetails: {
                userSkills: {
                  some: {
                    skill: {
                      in: userSkills,
                      mode: 'insensitive'
                    }
                  }
                }
              }
            }
          : {},
        userSoftwares
          ? {
              userDetails: {
                userSoftwares: {
                  some: {
                    software: {
                      in: userSoftwares,
                      mode: 'insensitive'
                    }
                  }
                }
              }
            }
          : {}
      ],
      NOT: {
        id: userId
      }
    },
    select: {
      id: true,
      username: true,
      bannerImage: true,
      profileImage: true,
      userDetails: {
        select: {
          userBio: true,
          userSkills: {
            select: {
              skill: true
            }
          },
          userSoftwares: {
            select: {
              software: true
            }
          },
          city: true,
          country: true
        }
      }
    }
  })
  return userDetails
}
/**
 * Get Creators
 * @returns {Promise<object>}
 */
const getAllCreators = async (filter: QueryUsers): Promise<object | null> => {
  const { country, userSkills, userSoftwares } = filter

  const userDetails = prisma.user.findMany({
    where: {
      AND: [
        userSkills
          ? {
              userDetails: {
                userSkills: {
                  some: {
                    skill: {
                      in: userSkills,
                      mode: 'insensitive'
                    }
                  }
                }
              }
            }
          : {},
        country
          ? {
              userDetails: {
                country: {
                  equals: country,
                  mode: 'insensitive'
                }
              }
            }
          : {},
        userSoftwares
          ? {
              userDetails: {
                userSoftwares: {
                  some: {
                    software: {
                      in: userSoftwares,
                      mode: 'insensitive'
                    }
                  }
                }
              }
            }
          : {}
      ]
    },

    select: {
      id: true,
      username: true,
      bannerImage: true,
      profileImage: true,
      userDetails: {
        select: {
          userBio: true,
          userSkills: {
            select: {
              skill: true
            }
          },
          userSoftwares: {
            select: {
              software: true
            }
          },
          city: true,
          country: true
        }
      }
    }
  })
  return userDetails
}

export default {
  createUser,
  createProviderUser,
  getUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUserById,
  deleteUserById,
  getSocialsByUserId,
  createSocialsByUserId,
  updateSocialsByUserId,
  deleteSocialsByUserId,
  getEducationByUserId,
  createEducationByUserId,
  updateEducationByUserId,
  deleteEducationById,
  getExperienceByUserId,
  createExperienceByUserId,
  updateExperienceByUserId,
  deleteExperienceById,
  getUserDetailsByUserId,
  createUserDetailsByUserId,
  updateUserDetailsByUserId,
  deleteUserDetailsByUserId,
  getCustomDetails,
  getAllCreatorsExceptUser,
  getAllCreators
}
