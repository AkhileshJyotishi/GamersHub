import prisma from '../client'
import { NewsCategory, News } from '@prisma/client'

interface addNewsCategoryProps {
  title: string
  description?: string
}
interface updateNewsCategoryProps {
  title?: string
  description?: string
}

interface addNewsProps {
  categoryId: number
  bannerImage?: string
  title: string
  subtitle?: string
  publishedAt?: Date
  content?: object
  isPublished?: boolean
  isSaved?: boolean
}
interface updateNewsProps {
  title?: string
  subtitle?: string
  content?: object
  bannerImage?: string
  isSaved?: boolean
  isPublished?: boolean
  publishedAt?: Date
}

/**
 * @function addNewsCategory
 * @description
 * This function adds a new news category to the database.
 *
 * @param
 * - data: An object containing the category details.
 *   - title: The title of the category (string).
 *   - description: The description of the category (optional string).
 * @returns
 * A Promise that resolves to the created NewsCategory object.
 */
const addNewsCategory = async (data: addNewsCategoryProps): Promise<NewsCategory> =>
  await prisma.newsCategory.create({ data })
/**
 * @function addNews
 * @description
 * This function adds a new news article to the database.
 *
 * @param
 * - data: An object containing the news article details.
 *   - categoryId: The ID of the associated news category (number).
 *   - bannerImage: The banner image of the news article (string).
 *   - title: The title of the news article (string).
 *   - subtitle: The subtitle of the news article (optional string).
 *   - content: The content of the news article (optional object).
 *   - userId: The ID of the user who created the news article (number).
 *   - isPublished: Whether the news article is published (optional boolean).
 *   - isSaved: Whether the news article is saved (optional boolean).
 * @returns
 * A Promise that resolves to the created News object.
 */
const addNews = async (data: addNewsProps, userId: number): Promise<Partial<News>> => {
  return await prisma.news.create({
    data: {
      ...data,
      userId
    }
  })
}

/**
 * @function updateNewsCategoryById
 * @description
 * This function updates a news category by its ID.
 *
 * @param
 * - id: The ID of the news category to be updated (number).
 * - data: An object containing the updated category details.
 *   - title: The updated title of the category (string).
 *   - description: The updated description of the category (optional string).
 * @returns
 * A Promise that resolves to the updated NewsCategory object.
 */
const updateNewsCategoryById = async (
  id: number,
  data: updateNewsCategoryProps
): Promise<NewsCategory> => {
  return await prisma.newsCategory.update({
    where: {
      id
    },
    data
  })
}

/**
 * @function updateNewsById
 * @description
 * This function updates a news article by its ID.
 *
 * @param
 * - id: The ID of the news article to be updated (number).
 * - data: An object containing the updated news article details.
 *   - categoryId: The updated ID of the associated news category (number).
 *   - title: The updated title of the news article (string).
 *   - subtitle: The updated subtitle of the news article (optional string).
 *   - content: The updated content of the news article (optional object).
 *   - bannerImage: The updated banner image of the news article (optional object).
 *   - isSaved: The updated isSaved status of the news article (optional boolean).
 *   - isPublished: The updated isPublished status of the news article (optional boolean).
 *   - userId: The updated ID of the user who created the news article (number).
 * @returns
 * A Promise that resolves to the updated News object.
 */
const updateNewsById = async (id: number, data: updateNewsProps, userId: number): Promise<News> => {
  return await prisma.news.update({
    where: {
      id,
      userId
    },
    data
  })
}

/**
 * @function getAllNewsCategory
 * @description
 * Retrieves all news categories along with their associated news articles.
 *
 * @returns {Promise<NewsCategory[]>}
 * A Promise that resolves to an array of NewsCategory objects.
 */
const getAllNewsCategory = async (): Promise<NewsCategory[]> => {
  return await prisma.newsCategory.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      News: {
        select: {
          bannerImage: true,
          content: true,
          isSaved: true,
          id: true,
          isPublished: true,
          publishedAt: true,
          publisher: {
            select: {
              username: true,
              profileImage: true
            }
          },
          subtitle: true,
          title: true,
          userId: true
        }
      }
    }
  })
}

/**
 * Retrieves all news articles from the database.
 *
 * @returns {Promise<Pick<News, 'id'>[]>} A promise that resolves to an array of news articles, each containing only the 'id' property.
 */
const getUserNews = async (userId: number): Promise<Partial<News>[]> => {
  const AllNews = await prisma.news.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      category: {
        select: {
          id: true,
          description: true,
          title: true
        }
      },
      bannerImage: true,
      isPublished: true,
      userId: true,
      title: true,
      subtitle: true,
      publishedAt: true,
      isSaved: true,
      content: true,
      categoryId: true,
      publisher: {
        select: {
          username: true,
          profileImage: true
        }
      }
    }
  })
  return AllNews
}

/**
 * Retrieves all news articles from the database.
 *
 * @returns {Promise<Pick<News, 'id'>[]>} A promise that resolves to an array of news articles, each containing only the 'id' property.
 */
const getAllNewsExceptCurrentUser = async (userId: number): Promise<Partial<News>[]> => {
  const AllNews = await prisma.news.findMany({
    where: {
      NOT: {
        userId
      }
    },
    select: {
      id: true,
      category: {
        select: {
          id: true,
          description: true,
          title: true
        }
      },
      bannerImage: true,
      isPublished: true,
      userId: true,
      title: true,
      subtitle: true,
      publishedAt: true,
      isSaved: true,
      content: true,
      categoryId: true,
      publisher: {
        select: {
          username: true,
          profileImage: true
        }
      }
    }
  })
  return AllNews
}

/**
 * Retrieves all news articles from the database.
 *
 * @returns {Promise<Pick<News, 'id'>[]>} A promise that resolves to an array of news articles, each containing only the 'id' property.
 */
const getAllNews = async (): Promise<Partial<News>[]> => {
  const AllNews = await prisma.news.findMany({
    select: {
      id: true,
      category: {
        select: {
          id: true,
          description: true,
          title: true
        }
      },
      bannerImage: true,
      isPublished: true,
      userId: true,
      title: true,
      subtitle: true,
      publishedAt: true,
      isSaved: true,
      content: true,
      categoryId: true,
      publisher: {
        select: {
          username: true,
          profileImage: true
        }
      }
    }
  })
  return AllNews
}

/**
 * @function getNewsById
 * @description
 * Retrieves a specific news article by its ID.
 *
 * @param {number} id
 * The ID of the news article to be retrieved.
 *
 * @returns {Promise<Pick<News, 'id'> | object>}
 * A Promise that resolves to the retrieved news article or an empty object if not found.
 */
const getNewsById = async (id: number): Promise<Pick<News, 'id'> | object> => {
  const helpQuestion = await prisma.news.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      bannerImage: true,
      category: {
        select: {
          id: true
        }
      },

      content: true,
      isSaved: true,
      isPublished: true,
      publishedAt: true,
      publisher: {
        select: {
          username: true,
          profileImage: true
        }
      },
      subtitle: true,
      title: true,
      userId: true
    }
  })
  return helpQuestion ?? {}
}

const getNewsCategoryById = async (id: number): Promise<NewsCategory | object> => {
  const category = await prisma.newsCategory.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      description: true,
      News: {
        select: {
          bannerImage: true,
          content: true,
          isSaved: true,
          id: true,
          isPublished: true,
          publishedAt: true,
          publisher: {
            select: {
              username: true,
              profileImage: true
            }
          },
          subtitle: true,
          title: true,
          userId: true
        }
      }
    }
  })
  return category ?? {}
}

/**
 * Delete Category by id
 */
const deleteNewsCategoryById = async (id: number): Promise<void> => {
  await prisma.newsCategory.delete({
    where: {
      id
    }
  })
}

/**
 * Delete Help Question by id
 */
const deleteNews = async (id: number): Promise<void> => {
  await prisma.news.delete({
    where: {
      id
    }
  })
}

export default {
  addNewsCategory,
  getAllNewsCategory,
  getNewsCategoryById,
  updateNewsCategoryById,
  deleteNewsCategoryById,
  addNews,
  getAllNews,
  getNewsById,
  deleteNews,
  getAllNewsExceptCurrentUser,
  getUserNews,
  updateNewsById
}
