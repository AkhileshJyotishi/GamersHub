import httpStatus from 'http-status'
import prisma from '../client'
import ApiError from '../utils/api-error'
import { Album } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
/**
 * Get All Albums of a user
 * @param {ObjectId} userId
 * @returns {Promise<Album[]>}
 */

const getUserAlbums = async (userId: number): Promise<Album[] | []> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      albums: {
        include: {
          posts: {
            select: {
              title: true,
              id: true
            }
          },
          keyword: {
            select: {
              keyword: true
            }
          },
          user: {
            select: {
              profileImage: true,
              username: true
            }
          }
        }
      }
    }
  })
  // if need to return empty album remove this
  // if (!user || !user.albums.length) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User Albums not found')
  // }
  return user?.albums || []
}

interface albumBody {
  title: string
  banner?: string
  keywords?: string[]
}
/**
 * Create user album
 * @param {ObjectId} userId
 * @param {object} albumBody
 * @returns {Promise<Album>}
 */

const createUserAlbum = async (userId: number, albumBody: albumBody): Promise<Album> => {
  const { keywords, ...newCreateBody } = albumBody
  const album = await prisma.album.create({
    data: {
      ...newCreateBody,
      userId
    }
  })
  // handle keywords
  if (keywords && keywords.length > 0) {
    const upsertPromises = keywords?.map((key) => {
      return prisma.keyword.upsert({
        where: {
          keyword: key
        },
        create: {
          keyword: key,
          albums: {
            connect: {
              id: album.id
            }
          }
        },
        update: {
          albums: {
            connect: {
              id: album.id
            }
          }
        }
      })
    })

    await Promise.all(upsertPromises)
  }
  return album
}

/**
 * delete user albums
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserAlbums = async (userId: number): Promise<void> => {
  if (!(await prisma.album.findMany({ where: { userId } })).length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Albums not found')
  }
  await prisma.album.deleteMany({
    where: {
      userId
    }
  })
}

/**
 * Update user album
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {object} updateAlbumBody
 * @returns {Promise<Album>}
 */

const updateAlbumById = async (
  userId: number,
  id: number,
  updateAlbumBody: albumBody
): Promise<Album> => {
  if (!(await prisma.album.findUnique({ where: { id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Album not found')
  }

  const { keywords, ...newUpdateBody } = updateAlbumBody

  // handle keywords
  if (keywords) {
    const albumKeywords = await prisma.album.findUnique({
      where: {
        id
      },
      select: {
        keyword: {
          select: {
            keyword: true
          }
        }
      }
    })
    let itemsToAdd = keywords

    if (albumKeywords) {
      const albumKeyword = albumKeywords.keyword?.map((k: Allow) => k.keyword)
      const itemsToRemove = albumKeyword.filter((item: Allow) => !keywords.includes(item))
      itemsToAdd = keywords.filter((item) => !albumKeyword.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.keyword.update({
          where: {
            keyword: key
          },
          data: {
            albums: {
              disconnect: {
                id: id
              }
            }
          }
        })
      })

      await Promise.all(removePromises)
    }

    const addPromises = itemsToAdd?.map((key) => {
      return prisma.keyword.upsert({
        where: {
          keyword: key
        },
        update: {
          albums: {
            connect: {
              id: id
            }
          }
        },
        create: {
          keyword: key,
          albums: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }
  const album = await prisma.album.update({
    where: {
      id,
      userId
    },
    data: {
      ...newUpdateBody
    },
    include: {
      posts: true,
      keyword: true,
      _count: true
    }
  })
  return album
}

/**
 * Get All Albums
 * @returns {Promise<Album[]>}
 */

const getAllAlbums = async (): Promise<Album[]> => {
  const albums = await prisma.album.findMany({
    include: {
      posts: {
        select: {
          title: true,
          id: true
        }
      },
      keyword: {
        select: {
          keyword: true
        }
      },
      user: {
        select: {
          profileImage: true,
          username: true
        }
      }
    }
  })
  return albums
}

/**
 * delete user album
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const deleteAlbumById = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.album.findUnique({ where: { id } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Album not found')
  }
  await prisma.album.delete({
    where: {
      id,
      userId
    }
  })
}

/**
 * Get a particular Album
 * @param {ObjectId} id
 * @returns {Promise<Album>}
 */

const getAlbumById = async (id: number): Promise<Album> => {
  const album = await prisma.album.findUnique({
    where: {
      id
    },
    include: {
      posts: {
        select: {
          title: true,
          id: true
        }
      },
      keyword: {
        select: {
          keyword: true
        }
      },
      user: {
        select: {
          profileImage: true,
          username: true
        }
      }
    }
  })
  if (!album) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Album not found')
  }
  return album
}

export default {
  getUserAlbums,
  createUserAlbum,
  deleteUserAlbums,
  getAllAlbums,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById
}
