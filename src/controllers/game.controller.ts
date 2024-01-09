import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { gameService } from '../services'
import { sendResponse } from '../utils/response'

const getUserGames = catchAsync(async (req, res) => {
  const userId = parseInt(req.params.id)
  const userGames = await gameService.getUserGames(userId)
  sendResponse(res, httpStatus.OK, null, { games: userGames }, 'User Games fetched Successfully')
})

const createUserGame = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const gameBody = req.body
  const userGame = await gameService.createUserGame(userId, gameBody)
  sendResponse(res, httpStatus.CREATED, null, { game: userGame }, 'User Game Created Successfully')
})

const deleteUserGames = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await gameService.deleteUserGames(userId)
  sendResponse(res, httpStatus.OK, null, null, 'User Games deleted Successfully')
})

const getAllGames = catchAsync(async (req, res) => {
  const filter = req.query
  const Games = await gameService.getAllGames(filter)
  sendResponse(res, httpStatus.OK, null, { games: Games }, 'Games fetched Successfully')
})

const getGameById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const game = await gameService.getGameById(id)
  sendResponse(res, httpStatus.OK, null, { game }, 'User Game fetched Successfully')
})

const updateGameById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const updateGameBody = req.body
  const userGame = await gameService.updateGameById(userId, id, updateGameBody)
  sendResponse(res, httpStatus.CREATED, null, { game: userGame }, 'User Game updated Successfully')
})

const deleteGameById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await gameService.deleteGameById(userId, id)
  sendResponse(res, httpStatus.OK, null, null, 'User Game deleted Successfully')
})

const getSavedGames = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const games = await gameService.getSavedGames(userId)
  sendResponse(res, httpStatus.OK, null, { games }, 'User saved Games fetched Successfully')
})

const toggleSaveGame = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const message = await gameService.toggleSaveGame(userId, id)
  sendResponse(res, httpStatus.OK, null, null, message)
})

const getAllGameExceptCurrentUser = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const filter = req.query
  const games = await gameService.getAllGamesExceptCurrentUser(userId, filter)
  sendResponse(res, httpStatus.OK, null, { games }, 'Others Games fetched Successfully')
})

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
  getAllGameExceptCurrentUser
}
