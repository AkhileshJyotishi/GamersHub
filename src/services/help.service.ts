import prisma from '../client'
import { HelpCategory, HelpQuestion } from '@prisma/client'

interface addCategoryProps {
  title: string
  position: number
  order: number[]
}
interface addQuestionProps {
  solution: string
  question: string
  categoryId: number
}
interface updateQuestionProps {
  solution: string
  question: string
}
/**
 * Add help category
 * @param {addCategoryProps} data
 */
const addCategory = async (data: addCategoryProps): Promise<HelpCategory> => {
  const category = await prisma.helpCategory.create({
    data: {
      ...data
    }
  })
  return category
}
/**
 * Add help questions
 * @param {addCategoryProps} data
 */
const addHelpQuestion = async (data: addQuestionProps): Promise<HelpQuestion> => {
  const { categoryId, ...restData } = data
  const question = await prisma.helpQuestion.create({
    data: {
      helpCategoryId: categoryId,
      ...restData
    }
  })
  return question
}
/**
 * Add help category
 * @param {number} id
 * @param {addCategoryProps} data
 */
const updateCategoryById = async (id: number, data: addCategoryProps): Promise<HelpCategory> => {
  const category = await prisma.helpCategory.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })
  return category
}
/**
 * Add help category
 * @param {number} id
 * @param {addCategoryProps} data
 */
const updateHelpQuestion = async (id: number, data: updateQuestionProps): Promise<HelpQuestion> => {
  const category = await prisma.helpQuestion.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })
  return category
}

/**
 * Get all Categories
 */
const getAllCategory = async (): Promise<HelpCategory[]> => {
  const categories = await prisma.helpCategory.findMany({
    select: {
      id: true,
      order: true,
      position: true,
      title: true,
      helpQuestions: {
        select: {
          question: true,
          id: true,
          solution: true
        }
      }
    }
  })
  return categories
}
/**
 * Get all Help Questions
 */
const getAllQuestions = async (): Promise<Pick<HelpQuestion, 'id' | 'question' | 'solution'>[]> => {
  const helpQuestions = await prisma.helpQuestion.findMany({
    select: {
      id: true,
      question: true,
      solution: true,
      helpCategory: {
        select: {
          id: true,
          title: true,
          order: true,
          position: true
        }
      }
    }
  })
  return helpQuestions
}
/**
 * Get Help Question by id
 * @param {number} id
 */
const getHelpQuestionById = async (
  id: number
): Promise<Pick<HelpQuestion, 'id' | 'question' | 'solution'> | object> => {
  const helpQuestion = await prisma.helpQuestion.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      question: true,
      solution: true,
      helpCategory: {
        select: {
          id: true,
          title: true,
          order: true,
          position: true
        }
      }
    }
  })
  return helpQuestion ?? {}
}

/**
 * Get  Category by id
 */
const getCategoryById = async (id: number): Promise<HelpCategory | object> => {
  const category = await prisma.helpCategory.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      order: true,
      position: true,
      title: true,
      helpQuestions: {
        select: {
          question: true,
          id: true,
          solution: true
        }
      }
    }
  })
  return category ?? {}
}
/**
 * Delete Category by id
 */
const deleteCategoryById = async (id: number): Promise<void> => {
  await prisma.helpCategory.delete({
    where: {
      id
    }
  })
}
/**
 * Delete Help Question by id
 */
const deleteHelpQuestion = async (id: number): Promise<void> => {
  await prisma.helpQuestion.delete({
    where: {
      id
    }
  })
}

export default {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllQuestions,
  addHelpQuestion,
  getHelpQuestionById,
  updateHelpQuestion,
  deleteHelpQuestion
}
