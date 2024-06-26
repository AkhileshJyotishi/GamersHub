import httpStatus from 'http-status'
import prisma from '../client'
import ApiError from '../utils/api-error'
import { DeveloperType, Game, GameMode } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
/**
 * Get All Games of a user
 * @param {ObjectId} userId
 * @param {QueryGames} filter
 * @returns {Promise<Game[]>}
 */

const getUserGames = async (userId: number, filter: QueryGames): Promise<Game[] | []> => {
  const { developerType, gameMode, genre, platforms, tags } = filter
  const user = await prisma.user.findUnique({
    where: {
      games: {
        some: {
          AND: [
            developerType
              ? {
                  developer: {
                    developerType: {
                      in: developerType
                    }
                  }
                }
              : {},
            gameMode
              ? {
                  gameMode: {
                    in: gameMode
                  }
                }
              : {},
            genre
              ? {
                  genre: {
                    some: {
                      name: {
                        in: genre,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              : {},
            platforms
              ? {
                  platforms: {
                    some: {
                      name: {
                        in: platforms,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              : {},
            tags
              ? {
                  tags: {
                    some: {
                      keyword: {
                        in: tags,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              : {}
          ]
        }
      },
      id: userId,
      validUser: true
    },
    select: {
      games: {
        include: {
          user: {
            select: {
              username: true,
              profileImage: true
            }
          },
          platforms: {
            select: {
              name: true
            }
          },
          tags: {
            select: {
              keyword: true
            }
          },
          developer: {
            select: {
              developerName: true,
              developerType: true
            }
          },
          genre: {
            select: {
              name: true
            }
          },
          distributionPlatforms: {
            select: {
              name: true
            }
          },
          savedUsers: {
            select: {
              id: true
            }
          }
        }
      }
    }
  })
  // if need to return empty game remove this
  // if (!user || !user.games.length) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User Games not found')
  // }
  return user?.games || []
}

interface GameBody {
  title: string
  description?: object
  banner?: string | null
  gameMode?: 'singlePlayer' | 'multiPlayer' | null
  releaseDate?: string | null
  developerName?: string | null
  developerType?: 'indie' | 'studio' | 'collaboration' | null
  genre?: string[]
  distributionPlatforms?: string[]
  platforms?: string[]
  tags?: string[]
}

/**
 * Create user job
 * @param {ObjectId} userId
 * @param {GameBody} gameBody
 * @returns {Promise<Game>}
 */

const createUserGame = async (userId: number, gameBody: GameBody): Promise<Game> => {
  const {
    developerName,
    developerType,
    platforms,
    tags,
    distributionPlatforms,
    genre,
    ...newCreateBody
  } = gameBody
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      validUser: true
    }
  })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const game = await prisma.game.create({
    data: {
      userId,
      ...newCreateBody
    }
  })

  // handle developername and developertype
  if (developerName || developerType) {
    await prisma.gameDeveloper.create({
      data: {
        developerName,
        developerType,
        game: {
          connect: {
            id: game.id
          }
        }
      }
    })
  }

  // handle platforms
  if (platforms && platforms.length > 0) {
    const platformPromises = platforms?.map((key) => {
      return prisma.platform.upsert({
        where: {
          name: key
        },
        create: {
          name: key,
          gamePlatforms: {
            connect: {
              id: game.id
            }
          }
        },
        update: {
          gamePlatforms: {
            connect: {
              id: game.id
            }
          }
        }
      })
    })

    await Promise.all(platformPromises)
  }

  // handle tags
  if (tags && tags.length > 0) {
    const keywordPromises = tags?.map((key) => {
      return prisma.keyword.upsert({
        where: {
          keyword: key
        },
        create: {
          keyword: key,
          games: {
            connect: {
              id: game.id
            }
          }
        },
        update: {
          games: {
            connect: {
              id: game.id
            }
          }
        }
      })
    })

    await Promise.all(keywordPromises)
  }

  // handle genre
  if (genre && genre.length > 0) {
    const genrePromises = genre?.map((key) => {
      return prisma.genre.upsert({
        where: {
          name: key
        },
        create: {
          name: key,
          games: {
            connect: {
              id: game.id
            }
          }
        },
        update: {
          games: {
            connect: {
              id: game.id
            }
          }
        }
      })
    })

    await Promise.all(genrePromises)
  }

  // handle distribution platforms
  if (distributionPlatforms && distributionPlatforms.length > 0) {
    const distributionPlatformPromises = distributionPlatforms?.map((key) => {
      return prisma.platform.upsert({
        where: {
          name: key
        },
        create: {
          name: key,
          distributionPlatforms: {
            connect: {
              id: game.id
            }
          }
        },
        update: {
          distributionPlatforms: {
            connect: {
              id: game.id
            }
          }
        }
      })
    })

    await Promise.all(distributionPlatformPromises)
  }

  return game
}

/**
 * delete user games
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserGames = async (userId: number): Promise<void> => {
  if (
    !(
      await prisma.game.findMany({
        where: {
          userId,
          user: {
            validUser: true
          }
        }
      })
    ).length
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Games not found')
  }
  await prisma.game.deleteMany({
    where: {
      userId
    }
  })
}

interface QueryGames {
  developerType?: DeveloperType[]
  gameMode?: GameMode[]
  genre?: string[]
  tags?: string[]
  platforms?: string[]
}

/**
 * Get All Games
 * @returns {Promise<Game[]>}
 */

const getAllGames = async (filter: QueryGames): Promise<Game[]> => {
  const { developerType, gameMode, genre, platforms, tags } = filter
  const games = await prisma.game.findMany({
    where: {
      AND: [
        developerType
          ? {
              developer: {
                developerType: {
                  in: developerType
                }
              }
            }
          : {},
        gameMode
          ? {
              gameMode: {
                in: gameMode
              }
            }
          : {},
        genre
          ? {
              genre: {
                some: {
                  name: {
                    in: genre,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {},
        platforms
          ? {
              platforms: {
                some: {
                  name: {
                    in: platforms,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {},
        tags
          ? {
              tags: {
                some: {
                  keyword: {
                    in: tags,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {}
      ],
      user: {
        validUser: true
      }
    },
    include: {
      platforms: {
        select: {
          name: true
        }
      },
      tags: {
        select: {
          keyword: true
        }
      },
      developer: {
        select: {
          developerName: true,
          developerType: true
        }
      },
      genre: {
        select: {
          name: true
        }
      },
      distributionPlatforms: {
        select: {
          name: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true
        }
      }
    }
  })
  return games
}

/**
 * Get a particular Game
 * @param {ObjectId} id
 * @returns {Promise<Game>}
 */

const getGameById = async (id: number): Promise<Game | object> => {
  const game = await prisma.game.findUnique({
    where: {
      id,
      user: {
        validUser: true
      }
    },
    include: {
      user: {
        select: {
          profileImage: true,
          username: true
        }
      },
      platforms: {
        select: {
          name: true
        }
      },
      tags: {
        select: {
          keyword: true
        }
      },
      developer: {
        select: {
          developerName: true,
          developerType: true
        }
      },
      genre: {
        select: {
          name: true
        }
      },
      distributionPlatforms: {
        select: {
          name: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      }
    }
  })
  return game || {}
}

/**
 * Update user job
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {GameBody} updateGameBody
 * @returns {Promise<Game>}
 */

const updateGameById = async (
  userId: number,
  id: number,
  updateGameBody: GameBody
): Promise<Game> => {
  if (
    !(await prisma.game.findUnique({
      where: {
        id,
        userId,
        user: {
          validUser: true
        }
      }
    }))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User game not found')
  }
  const {
    developerName,
    developerType,
    platforms,
    tags,
    distributionPlatforms,
    genre,
    ...newUpdateBody
  } = updateGameBody

  // handle developername and developertype
  if (developerName || developerType) {
    await prisma.game.update({
      where: {
        id
      },
      data: {
        developer: {
          upsert: {
            create: {
              developerName,
              developerType
            },
            update: {
              developerName,
              developerType
            }
          }
        }
      }
    })
  }

  // handle platforms
  if (platforms) {
    const existingGamePlatforms = await prisma.game.findUnique({
      where: {
        id
      },
      select: {
        platforms: {
          select: {
            name: true
          }
        }
      }
    })
    let itemsToAdd = platforms

    if (existingGamePlatforms) {
      const gamePlatforms = existingGamePlatforms.platforms?.map((k: Allow) => k.name)
      const itemsToRemove = gamePlatforms.filter((item: Allow) => !platforms.includes(item))
      itemsToAdd = platforms.filter((item) => !gamePlatforms.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.platform.update({
          where: {
            name: key
          },
          data: {
            gamePlatforms: {
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
      return prisma.platform.upsert({
        where: {
          name: key
        },
        update: {
          gamePlatforms: {
            connect: {
              id: id
            }
          }
        },
        create: {
          name: key,
          gamePlatforms: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  // handle tags
  if (tags) {
    const existingGameTags = await prisma.game.findUnique({
      where: {
        id
      },
      select: {
        tags: {
          select: {
            keyword: true
          }
        }
      }
    })
    let itemsToAdd = tags

    if (existingGameTags) {
      const gameTags = existingGameTags.tags?.map((k: Allow) => k.keyword)
      const itemsToRemove = gameTags.filter((item: Allow) => !tags.includes(item))
      itemsToAdd = tags.filter((item) => !gameTags.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.keyword.update({
          where: {
            keyword: key
          },
          data: {
            games: {
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
          games: {
            connect: {
              id: id
            }
          }
        },
        create: {
          keyword: key,
          games: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  // handle genre
  if (genre) {
    const existingGameGenre = await prisma.game.findUnique({
      where: {
        id
      },
      select: {
        genre: {
          select: {
            name: true
          }
        }
      }
    })
    let itemsToAdd = genre

    if (existingGameGenre) {
      const gameTags = existingGameGenre.genre?.map((k: Allow) => k.name)
      const itemsToRemove = gameTags.filter((item: Allow) => !genre.includes(item))
      itemsToAdd = genre.filter((item) => !gameTags.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.genre.update({
          where: {
            name: key
          },
          data: {
            games: {
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
      return prisma.genre.upsert({
        where: {
          name: key
        },
        update: {
          games: {
            connect: {
              id: id
            }
          }
        },
        create: {
          name: key,
          games: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  // handle distribution platforms
  if (distributionPlatforms) {
    const existingGameDistributionPlatforms = await prisma.game.findUnique({
      where: {
        id
      },
      select: {
        distributionPlatforms: {
          select: {
            name: true
          }
        }
      }
    })
    let itemsToAdd = distributionPlatforms

    if (existingGameDistributionPlatforms) {
      const gameDistributionPlatforms =
        existingGameDistributionPlatforms.distributionPlatforms?.map((k: Allow) => k.name)
      const itemsToRemove = gameDistributionPlatforms.filter(
        (item: Allow) => !distributionPlatforms.includes(item)
      )
      itemsToAdd = distributionPlatforms.filter((item) => !gameDistributionPlatforms.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.platform.update({
          where: {
            name: key
          },
          data: {
            distributionPlatforms: {
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
      return prisma.platform.upsert({
        where: {
          name: key
        },
        update: {
          distributionPlatforms: {
            connect: {
              id: id
            }
          }
        },
        create: {
          name: key,
          distributionPlatforms: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  const game = await prisma.game.update({
    where: {
      id,
      userId
    },
    data: {
      ...newUpdateBody
    },
    include: {
      platforms: {
        select: {
          name: true
        }
      },
      tags: {
        select: {
          keyword: true
        }
      },
      developer: {
        select: {
          developerName: true,
          developerType: true
        }
      },
      genre: {
        select: {
          name: true
        }
      },
      distributionPlatforms: {
        select: {
          name: true
        }
      }
    }
  })
  return game
}

/**
 * Delete user game
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const deleteGameById = async (userId: number, id: number): Promise<void> => {
  if (
    !(await prisma.game.findUnique({
      where: {
        id,
        userId,
        user: {
          validUser: true
        }
      }
    }))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Game not found')
  }
  await prisma.game.delete({
    where: {
      id,
      userId
    }
  })
}

/**
 * Get Saved Games
 * @param {ObjectId} userId
 * @returns {Promise<Game[]>}
 */

const getSavedGames = async (userId: number): Promise<Game[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      validUser: true
    },
    select: {
      savedGames: {
        include: {
          platforms: {
            select: {
              name: true
            }
          },
          tags: {
            select: {
              keyword: true
            }
          },
          developer: {
            select: {
              developerName: true,
              developerType: true
            }
          },
          genre: {
            select: {
              name: true
            }
          },
          distributionPlatforms: {
            select: {
              name: true
            }
          },
          user: {
            select: {
              username: true,
              profileImage: true
            }
          },
          savedUsers: {
            select: {
              id: true
            }
          }
        }
      }
    }
  })
  return user?.savedGames || []
}

/**
 * Toggle save game
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const toggleSaveGame = async (userId: number, id: number): Promise<string> => {
  const game = await prisma.game.findUnique({
    where: {
      id,
      user: {
        validUser: true
      }
    },
    include: {
      savedUsers: {
        where: {
          id: userId
        }
      }
    }
  })

  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found')
  }
  if (game.savedUsers.length > 0) {
    await prisma.game.update({
      where: { id },
      data: {
        savedUsers: {
          disconnect: { id: userId }
        }
      }
    })
    return 'Game unsaved Successfully'
  } else {
    await prisma.game.update({
      where: { id },
      data: {
        savedUsers: {
          connect: { id: userId }
        }
      }
    })
    return 'Game saved Successfully'
  }
}

/**
 * Get other users Games
 * @param {ObjectId} userId
 * @returns {Promise<Game[]>}
 */

const getAllGamesExceptCurrentUser = async (
  userId: number,
  filter: QueryGames
): Promise<Game[]> => {
  const { developerType, gameMode, genre, platforms, tags } = filter
  const games = await prisma.game.findMany({
    where: {
      AND: [
        developerType
          ? {
              developer: {
                developerType: {
                  in: developerType
                }
              }
            }
          : {},
        gameMode
          ? {
              gameMode: {
                in: gameMode
              }
            }
          : {},
        genre
          ? {
              genre: {
                some: {
                  name: {
                    in: genre,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {},
        platforms
          ? {
              platforms: {
                some: {
                  name: {
                    in: platforms,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {},
        tags
          ? {
              tags: {
                some: {
                  keyword: {
                    in: tags,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {}
      ],
      NOT: {
        userId
      },
      user: {
        validUser: true
      }
    },
    include: {
      platforms: {
        select: {
          name: true
        }
      },
      tags: {
        select: {
          keyword: true
        }
      },
      developer: {
        select: {
          developerName: true,
          developerType: true
        }
      },
      genre: {
        select: {
          name: true
        }
      },
      distributionPlatforms: {
        select: {
          name: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      }
    }
  })
  return games
}

export default {
  getUserGames,
  createUserGame,
  deleteUserGames,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById,
  getSavedGames,
  toggleSaveGame,
  getAllGamesExceptCurrentUser
}
