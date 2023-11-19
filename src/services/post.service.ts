import httpStatus from 'http-status'
import prisma from '../client'
import ApiError from '../utils/api-error'
import { Post } from '@prisma/client'

/**
 * Get All Posts of a user
 * @param {ObjectId} userId
 * @returns {Promise<Post[]>}
 */

const getUserPosts = async (userId: number): Promise<Post[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      posts: {
        include: {
          Album: {
            select: {
              id: true,
              title: true
            }
          },
          postKeywords: {
            select: {
              keyword: true
            }
          },
          comments: {
            select: {
              comment: true,
              userId: true,
              id: true
            }
          },
          postLikes: {
            select: {
              likedUsers: {
                select: {
                  id: true
                }
              }
            }
          },
          postSkills: {
            select: {
              skill: true
            }
          },
          savedUsers: {
            select: {
              id: true
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
  // if need to return empty post remove this
  if (!user || !user.posts.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Posts not found')
  }
  return user.posts
}

interface postBody {
  title: string
  description?: string
  banner?: string
  matureContent?: boolean
  content: object
  postKeywords?: string[]
  postSkills?: string[]
  albumId?: number
}

/**
 * Create user post
 * @param {ObjectId} userId
 * @param {object} postBody
 * @returns {Promise<Post>}
 */

const createUserPost = async (userId: number, postBody: postBody): Promise<Post> => {
  const { albumId, postKeywords, postSkills, ...newCreateBody } = postBody

  if (albumId) {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId
      }
    })
    if (!album) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Album doesn't exist")
    }
  }
  const post = await prisma.post.create({
    data: {
      ...newCreateBody,
      userId,
      albumId
    }
  })

  //   handle keywords
  if (postKeywords && postKeywords.length > 0) {
    const keywordPromises = postKeywords.map((key) => {
      return prisma.keyword.upsert({
        where: {
          keyword: key
        },
        create: {
          keyword: key,
          posts: {
            connect: {
              id: post.id
            }
          }
        },
        update: {
          posts: {
            connect: {
              id: post.id
            }
          }
        }
      })
    })

    await Promise.all(keywordPromises)
  }

  //   handle skills
  if (postSkills && postSkills.length > 0) {
    const skillPromises = postSkills.map((skill) => {
      return prisma.skill.upsert({
        where: {
          skill: skill
        },
        create: {
          skill: skill,
          posts: {
            connect: {
              id: post.id
            }
          }
        },
        update: {
          posts: {
            connect: {
              id: post.id
            }
          }
        }
      })
    })

    await Promise.all(skillPromises)
  }

  return post
}

/**
 * delete user posts
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserPosts = async (userId: number): Promise<void> => {
  if (!(await prisma.post.findMany({ where: { userId } })).length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Posts not found')
  }
  await prisma.post.deleteMany({
    where: {
      userId
    }
  })
}

/**
 * Get Liked Posts
 * @param {ObjectId} userId
 * @returns {Promise<Post[]>}
 */

const getLikedPosts = async (userId: number): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: {
      postLikes: {
        likedUsers: {
          some: {
            id: userId
          }
        }
      }
    },
    include: {
      Album: {
        select: {
          id: true,
          title: true
        }
      },
      postKeywords: {
        select: {
          keyword: true
        }
      },
      comments: {
        select: {
          comment: true,
          userId: true,
          id: true
        }
      },
      postLikes: {
        select: {
          likedUsers: {
            select: {
              id: true
            }
          }
        }
      },
      postSkills: {
        select: {
          skill: true
        }
      },
      savedUsers: {
        select: {
          id: true
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
  return posts
}

/**
 * Get All Posts
 * @returns {Promise<Post[]>}
 */

const getAllPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    include: {
      Album: {
        select: {
          id: true,
          title: true
        }
      },
      postKeywords: {
        select: {
          keyword: true
        }
      },
      comments: {
        select: {
          comment: true,
          userId: true,
          id: true
        }
      },
      postLikes: {
        select: {
          likedUsers: {
            select: {
              id: true
            }
          }
        }
      },
      postSkills: {
        select: {
          skill: true
        }
      },
      savedUsers: {
        select: {
          id: true
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
  return posts
}

/**
 * Get a particular Post
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */

const getPostById = async (id: number): Promise<Post | object> => {
  const post = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      Album: {
        select: {
          id: true,
          title: true
        }
      },
      postKeywords: {
        select: {
          keyword: true
        }
      },
      comments: {
        select: {
          comment: true,
          userId: true,
          id: true
        }
      },
      postLikes: {
        select: {
          likedUsers: {
            select: {
              id: true
            }
          }
        }
      },
      postSkills: {
        select: {
          skill: true
        }
      },
      savedUsers: {
        select: {
          id: true
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
  return post || {}
}

/**
 * Update user post
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {object} updatePostBody
 * @returns {Promise<Post>}
 */

const updatePostById = async (
  userId: number,
  id: number,
  updatePostBody: postBody
): Promise<Post> => {
  if (!(await prisma.post.findUnique({ where: { id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Post not found')
  }

  const { albumId, postKeywords, postSkills, ...newUpdateBody } = updatePostBody

  // handle keywords
  if (postKeywords) {
    const existingPostKeywords = await prisma.post.findUnique({
      where: {
        id
      },
      select: {
        postKeywords: {
          select: {
            keyword: true
          }
        }
      }
    })
    let itemsToAdd = postKeywords

    if (existingPostKeywords) {
      const postKeyword = existingPostKeywords.postKeywords.map((k) => k.keyword)
      const itemsToRemove = postKeyword.filter((item) => !postKeywords.includes(item))
      itemsToAdd = postKeywords.filter((item) => !postKeyword.includes(item))
      const removePromises = itemsToRemove.map((key) => {
        return prisma.keyword.update({
          where: {
            keyword: key
          },
          data: {
            posts: {
              disconnect: {
                id: id
              }
            }
          }
        })
      })

      await Promise.all(removePromises)
    }

    const addPromises = itemsToAdd.map((key) => {
      return prisma.keyword.upsert({
        where: {
          keyword: key
        },
        update: {
          posts: {
            connect: {
              id: id
            }
          }
        },
        create: {
          keyword: key,
          posts: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  // handle skills
  if (postSkills) {
    const existingPostskills = await prisma.post.findUnique({
      where: {
        id
      },
      select: {
        postSkills: {
          select: {
            skill: true
          }
        }
      }
    })
    let itemsToAdd = postSkills

    if (existingPostskills) {
      const postskill = existingPostskills.postSkills.map((k) => k.skill)
      const itemsToRemove = postskill.filter((item) => !postSkills.includes(item))
      itemsToAdd = postSkills.filter((item) => !postskill.includes(item))
      const removePromises = itemsToRemove.map((key) => {
        return prisma.skill.update({
          where: {
            skill: key
          },
          data: {
            posts: {
              disconnect: {
                id: id
              }
            }
          }
        })
      })

      await Promise.all(removePromises)
    }

    const addPromises = itemsToAdd.map((key) => {
      return prisma.skill.upsert({
        where: {
          skill: key
        },
        update: {
          posts: {
            connect: {
              id: id
            }
          }
        },
        create: {
          skill: key,
          posts: {
            connect: {
              id: id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  //   handle albumId
  if (albumId) {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId
      }
    })
    if (!album) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Album doesn't exist")
    }
    await prisma.post.update({
      where: {
        id
      },
      data: {
        Album: {
          connect: {
            id: albumId
          }
        }
      }
    })
  }

  //   const {albumId as a,...snew} = updatePostBody
  const post = await prisma.post.update({
    where: {
      id,
      userId
    },
    data: {
      ...newUpdateBody
    },
    include: {
      Album: true,
      postKeywords: true,
      comments: true,
      postLikes: {
        include: {
          likedUsers: {
            select: {
              id: true
            }
          }
        }
      },
      postSkills: true,
      _count: true
    }
  })
  return post
}

/**
 * Delete user post
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const deletePostById = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.post.findUnique({ where: { id } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Post not found')
  }
  await prisma.post.delete({
    where: {
      id,
      userId
    }
  })
}

/**
 * Like a post
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const likePostById = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.post.findUnique({ where: { id } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Post not found')
  }
  await prisma.postLikes.upsert({
    where: {
      postId: id
    },
    update: {
      likedUsers: {
        connect: {
          id: userId
        }
      }
    },
    create: {
      postId: id,
      likedUsers: {
        connect: {
          id: userId
        }
      }
    }
  })
}

/**
 * Dislike a post
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const dislikePostById = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.post.findUnique({ where: { id } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Post not found')
  }
  if (!(await prisma.postLikes.findUnique({ where: { postId: id } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post is not liked')
  }
  await prisma.postLikes.update({
    where: {
      postId: id
    },
    data: {
      likedUsers: {
        disconnect: {
          id: userId
        }
      }
    }
  })
}
/**
 * Add post comment
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {string} comment
 * @returns {Promise<void>}
 */

const addPostComment = async (userId: number, id: number, comment: string): Promise<void> => {
  if (!(await prisma.post.findUnique({ where: { id } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Post not found')
  }
  await prisma.postComment.create({
    data: {
      comment,
      postId: id,
      userId
    }
  })
}

/**
 * Delete post comment
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const deletePostComment = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.postComment.findUnique({ where: { id: id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
  }
  await prisma.postComment.delete({
    where: {
      id
    }
  })
}

/**
 * Toggle save post
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const toggleSavePost = async (userId: number, id: number): Promise<string> => {
  const post = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      savedUsers: {
        where: {
          id: userId
        }
      }
    }
  })

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  if (post.savedUsers.length > 0) {
    await prisma.post.update({
      where: { id },
      data: {
        savedUsers: {
          disconnect: { id: userId }
        }
      }
    })
    return 'Post unsaved Successfully'
  } else {
    await prisma.post.update({
      where: { id },
      data: {
        savedUsers: {
          connect: { id: userId }
        }
      }
    })
    return 'Post saved Successfully'
  }
}

/**
 * Get Saved Posts
 * @param {ObjectId} userId
 * @returns {Promise<Post[]>}
 */

const getSavedPosts = async (userId: number): Promise<Post[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      savedPosts: {
        include: {
          Album: {
            select: {
              id: true,
              title: true
            }
          },
          postKeywords: {
            select: {
              keyword: true
            }
          },
          comments: {
            select: {
              comment: true,
              userId: true,
              id: true
            }
          },
          postLikes: {
            select: {
              likedUsers: {
                select: {
                  id: true
                }
              }
            }
          },
          postSkills: {
            select: {
              skill: true
            }
          },
          savedUsers: {
            select: {
              id: true
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
  return user?.savedPosts || []
}

/**
 * Get a particular Post
 * @param {ObjectId} userId
 * @returns {Promise<Post>}
 */

const getAllPostExceptCurrentUser = async (userId: number): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: {
      NOT: {
        userId
      }
    },
    include: {
      Album: {
        select: {
          id: true,
          title: true
        }
      },
      postKeywords: {
        select: {
          keyword: true
        }
      },
      comments: {
        select: {
          comment: true,
          userId: true,
          id: true
        }
      },
      postLikes: {
        select: {
          likedUsers: {
            select: {
              id: true
            }
          }
        }
      },
      postSkills: {
        select: {
          skill: true
        }
      },
      savedUsers: {
        select: {
          id: true
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
  return posts
}

export default {
  getUserPosts,
  createUserPost,
  deleteUserPosts,
  getAllPosts,
  getLikedPosts,
  getPostById,
  updatePostById,
  deletePostById,
  likePostById,
  dislikePostById,
  addPostComment,
  deletePostComment,
  toggleSavePost,
  getSavedPosts,
  getAllPostExceptCurrentUser
}
