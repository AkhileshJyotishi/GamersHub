import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { helpService } from '../services'
import { sendResponse } from '../utils/response'

const addCategory = catchAsync(async (req, res) => {
  const { title, position, order } = req.body
  const category = await helpService.addCategory({ title, position, order })
  sendResponse(res, httpStatus.OK, null, { category }, 'Category Added Successfully')
})

const getAllCategory = catchAsync(async (req, res) => {
  const categories = await helpService.getAllCategory()
  sendResponse(res, httpStatus.OK, null, { categories }, 'Help Categories fetched Successfully')
})

const getCategoryById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const category = await helpService.getCategoryById(id)
  sendResponse(res, httpStatus.OK, null, { category }, 'Category fetched Successfully')
})

const getHelpQuestionById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const helpQuestion = await helpService.getHelpQuestionById(id)
  sendResponse(res, httpStatus.OK, null, { helpQuestion }, 'Help Question fetched Successfully')
})

const updateCategoryById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.body
  const updatedCategory = await helpService.updateCategoryById(id, data)
  sendResponse(res, httpStatus.OK, null, { updatedCategory }, 'Category updated Successfully')
})
const updateHelpQuestion = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.body
  const updatedQuestion = await helpService.updateHelpQuestion(id, data)
  sendResponse(res, httpStatus.OK, null, { updatedQuestion }, 'Help Question updated Successfully')
})

const deleteCategoryById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  await helpService.deleteCategoryById(id)
  sendResponse(res, httpStatus.OK, null, null, 'Category deleted Successfully')
})
const deleteHelpQuestion = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  await helpService.deleteHelpQuestion(id)
  sendResponse(res, httpStatus.OK, null, null, 'Help Question deleted Successfully')
})
const getAllQuestions = catchAsync(async (req, res) => {
  const helpQuestions = await helpService.getAllQuestions()
  sendResponse(res, httpStatus.OK, null, { helpQuestions }, 'Help Questions fetched Successfully')
})

const addHelpQuestion = catchAsync(async (req, res) => {
  const data = req.body
  const question = await helpService.addHelpQuestion(data)
  sendResponse(res, httpStatus.OK, null, { question }, 'Help Question added Successfully')
})

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
