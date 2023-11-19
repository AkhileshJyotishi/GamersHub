import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { albumService } from '../services'
import { sendResponse } from '../utils/response'

const getUserAlbums = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userAlbums = await albumService.getUserAlbums(userId)
  // res.status(httpStatus.OK).send({ albums: userAlbums })
  sendResponse(res, httpStatus.OK, null, { albums: userAlbums }, 'User Albums fetched Successfully')
})

const createUserAlbum = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const albumBody = req.body
  const userAlbum = await albumService.createUserAlbum(userId, albumBody)
  // res.status(httpStatus.CREATED).send({ album: userAlbum })
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { albums: userAlbum },
    'User Album created Successfully'
  )
})

const deleteUserAlbums = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await albumService.deleteUserAlbums(userId)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'User Albums deleted Successfully')
})

const getAllAlbums = catchAsync(async (req, res) => {
  const Albums = await albumService.getAllAlbums()
  // res.status(httpStatus.OK).send({ albums: Albums })
  sendResponse(res, httpStatus.OK, null, { albums: Albums }, 'Albums fetched Successfully')
})

const getAlbumById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const album = await albumService.getAlbumById(id)
  // res.status(httpStatus.OK).send({ album })
  sendResponse(res, httpStatus.OK, null, { album }, 'User Album fetched Successfully')
})

const updateAlbumById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const updateAlbumBody = req.body
  const userAlbum = await albumService.updateAlbumById(userId, id, updateAlbumBody)
  // res.status(httpStatus.CREATED).send({ album: userAlbum })
  sendResponse(res, httpStatus.OK, null, { albums: userAlbum }, 'User Album updated Successfully')
})

const deleteAlbumById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await albumService.deleteAlbumById(userId, id)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'User Album deleted Successfully')
})

export default {
  getUserAlbums,
  createUserAlbum,
  deleteUserAlbums,
  getAllAlbums,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById
}
