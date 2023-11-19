import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { postService } from '../services'
import { sendResponse } from '../utils/response'

const getUserPosts = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userPosts = await postService.getUserPosts(userId)
  // res.status(httpStatus.OK).send({ posts: userPosts })
  sendResponse(res, httpStatus.OK, null, { posts: userPosts }, 'User Posts fetched Successfully')
})

const createUserPost = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const postBody = req.body
  const userPost = await postService.createUserPost(userId, postBody)
  // res.status(httpStatus.CREATED).send({ post: userPost })
  sendResponse(res, httpStatus.CREATED, null, { posts: userPost }, 'User Post Created Successfully')
})

const deleteUserPosts = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await postService.deleteUserPosts(userId)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'User Posts deleted Successfully')
})

const getAllPosts = catchAsync(async (req, res) => {
  const Posts = await postService.getAllPosts()
  // res.status(httpStatus.OK).send({ posts: Posts })
  sendResponse(res, httpStatus.OK, null, { posts: Posts }, 'Posts fetched Successfully')
})

const getLikedPosts = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const posts = await postService.getLikedPosts(userId)
  // res.status(httpStatus.OK).send({ post })
  sendResponse(res, httpStatus.OK, null, { posts }, 'User liked Post fetched Successfully')
})

const getPostById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const post = await postService.getPostById(id)
  // res.status(httpStatus.OK).send({ post })
  sendResponse(res, httpStatus.OK, null, { post }, 'User Post fetched Successfully')
})

const updatePostById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const updatePostBody = req.body
  const userPost = await postService.updatePostById(userId, id, updatePostBody)
  // res.status(httpStatus.CREATED).send({ post: userPost })
  sendResponse(res, httpStatus.CREATED, null, { posts: userPost }, 'User Post updated Successfully')
})

const deletePostById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await postService.deletePostById(userId, id)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'User Post deleted Successfully')
})

const likePost = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await postService.likePostById(userId, id)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'Post liked Successfully')
})

const dislikePost = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await postService.dislikePostById(userId, id)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'Post disliked Successfully')
})

const addComment = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const { comment } = req.body
  await postService.addPostComment(userId, id, comment)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'Comment added Successfully')
})

const deleteComment = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await postService.deletePostComment(userId, id)
  // res.status(httpStatus.OK).send()
  sendResponse(res, httpStatus.OK, null, null, 'Comment deleted Successfully')
})

const toggleSavePost = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const message = await postService.toggleSavePost(userId, id)
  sendResponse(res, httpStatus.OK, null, null, message)
})

const getSavedPosts = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const posts = await postService.getSavedPosts(userId)
  sendResponse(res, httpStatus.OK, null, { posts }, 'User saved Post fetched Successfully')
})

const getAllPostExceptCurrentUser = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const posts = await postService.getAllPostExceptCurrentUser(userId)
  sendResponse(res, httpStatus.OK, null, { posts }, 'Others Posts fetched Successfully')
})

export default {
  getUserPosts,
  createUserPost,
  deleteUserPosts,
  getAllPosts,
  getLikedPosts,
  getPostById,
  updatePostById,
  deletePostById,
  likePost,
  dislikePost,
  addComment,
  deleteComment,
  toggleSavePost,
  getSavedPosts,
  getAllPostExceptCurrentUser
}
