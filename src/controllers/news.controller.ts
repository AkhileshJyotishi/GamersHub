/**
 * @fileoverview
 * This module defines and exports controller functions for managing news categories and articles.
 *
 * @module NewsController
 */

import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { sendResponse } from '../utils/response'
import newsService from '../services/news.service'

/**
 * @function addNewsCategory
 * @async
 * @desc Adds a new news category to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to the created NewsCategory object.
 */
const addNewsCategory = catchAsync(async (req, res) => {
  const Categorydata = req.body
  const category = await newsService.addNewsCategory(Categorydata)
  sendResponse(res, httpStatus.OK, null, { category }, 'Category Added Successfully')
})

/**
 * @function getAllNewsCategory
 * @async
 * @desc Retrieves all news categories from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to an array of news categories.
 */
const getAllNewsCategory = catchAsync(async (req, res) => {
  const categories = await newsService.getAllNewsCategory()
  sendResponse(res, httpStatus.OK, null, { categories }, 'News Categories fetched Successfully')
})

/**
 * @function getCategoryById
 * @async
 * @desc Retrieves a specific news category by its ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to the requested news category.
 */
const getCategoryById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const category = await newsService.getNewsCategoryById(id)
  sendResponse(res, httpStatus.OK, null, { category }, 'News Category fetched Successfully')
})

const getNewsById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const helpQuestion = await newsService.getNewsById(id)
  sendResponse(res, httpStatus.OK, null, { helpQuestion }, 'News fetched Successfully')
})

/**
 * @function updateNewsCategoryById
 * @async
 * @desc Updates a news category by its ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to the updated news category.
 * @throws {HttpError} If an error occurs while processing the request.
 */
const updateNewsCategoryById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.body
  const updatedCategory = await newsService.updateNewsCategoryById(id, data)
  sendResponse(res, httpStatus.OK, null, { updatedCategory }, 'News Category updated Successfully')
})

/**
 * @function updateNewsById
 * @async
 * @desc Updates a news article by its ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to the updated news article.
 */
const updateNewsById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const userId = res.locals.user.id
  const data = req.body
  const updatedQuestion = await newsService.updateNewsById(id, data, userId)
  sendResponse(res, httpStatus.OK, null, { updatedQuestion }, 'News updated Successfully')
})

/**
 * @function deleteNewsCategoryById
 * @async
 * @desc Deletes a news category by its ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when the news category is deleted.
 */
const deleteNewsCategoryById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  await newsService.deleteNewsCategoryById(id)
  sendResponse(res, httpStatus.OK, null, null, 'News Category deleted Successfully')
})
/**
 * @function deleteNews
 * @async
 * @desc Deletes a news article by its ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when the news article is deleted.
 */
const deleteNews = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  await newsService.deleteNews(id)
  sendResponse(res, httpStatus.OK, null, null, 'News deleted Successfully')
})

/**
 * @function getAllNews
 * @async
 * @desc Retrieves all news articles from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to an array of news articles.
 */
const getAllNews = catchAsync(async (req, res) => {
  const AllNews = await newsService.getAllNews()
  sendResponse(res, httpStatus.OK, null, { AllNews }, 'News fetched Successfully')
})

const getAllNewsExceptCurrentUser = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const allNews = await newsService.getAllNewsExceptCurrentUser(userId)
  sendResponse(res, httpStatus.OK, null, { allNews }, 'News fetched Successfully')
})

const getUserNews = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const allNews = await newsService.getUserNews(userId)
  sendResponse(res, httpStatus.OK, null, { allNews }, 'News fetched Successfully')
})

/**
 * @function addNews
 * @async
 * @desc Adds a new news article to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to the created news article.
 */
const addNews = catchAsync(async (req, res) => {
  const data = req.body
  const userId = res.locals.user.id
  const question = await newsService.addNews(data, userId)
  sendResponse(res, httpStatus.OK, null, { question }, 'News added Successfully')
})

export default {
  addNewsCategory,
  addNews,
  getAllNews,
  deleteNews,
  deleteNewsCategoryById,
  updateNewsById,
  updateNewsCategoryById,
  getNewsById,
  getCategoryById,
  getAllNewsCategory,
  getAllNewsExceptCurrentUser,
  getUserNews
}
