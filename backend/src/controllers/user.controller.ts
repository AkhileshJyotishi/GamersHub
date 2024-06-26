import httpStatus from 'http-status'
import pick from '../utils/pick'
import ApiError from '../utils/api-error'
import catchAsync from '../utils/catch-async'
import { userService } from '../services'
import { sendResponse } from '../utils/response'
import { validate } from 'deep-email-validator'
import prisma from '../client'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
const createUser = catchAsync(async (req, res) => {
  const { email, password, username, role } = req.body
  const emailValid = await validate(email)
  if (!emailValid.valid) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Email InActive')
  const user = await userService.createUser(email, password, username, role)
  sendResponse(res, httpStatus.CREATED, null, { user }, 'User Created successfully')
})

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'role'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await userService.queryUsers(filter, options)
  sendResponse(res, httpStatus.OK, null, { result }, 'Users fetched Successfully')
})

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  sendResponse(res, httpStatus.OK, null, { user }, 'User fetched Successfully')
})

const updateUser = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const user = await userService.updateUserById(userId, req.body)
  sendResponse(res, httpStatus.CREATED, null, { user }, 'User updated Successfully')
})

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId)
  sendResponse(res, httpStatus.OK, null, null, 'User deleted Successfully')
})

const getSocials = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userSocials = await userService.getSocialsByUserId(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { socials: userSocials },
    'User Socials fetched Successfully'
  )
})

const createSocials = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const socialsBody = req.body
  const userSocials = await userService.createSocialsByUserId(userId, socialsBody)
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { socials: userSocials },
    'User Socials created Successfully'
  )
})

const updateSocials = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const socialsBody = req.body
  const userSocials = await userService.updateSocialsByUserId(userId, socialsBody)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { socials: userSocials },
    'User Socials updated Successfully'
  )
})

const deleteSocials = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await userService.deleteSocialsByUserId(userId)
  sendResponse(res, httpStatus.OK, null, null, 'User Socials deleted Successfully')
})

const getEducation = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userEducation = await userService.getEducationByUserId(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { education: userEducation },
    'User Eduction fetched Successfully'
  )
})

const createEducation = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const educationBody = req.body
  const userEducation = await userService.createEducationByUserId(userId, educationBody)
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { education: userEducation },
    'User Eduction created Successfully'
  )
})

const updateEducation = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id as string)
  const educationUpdateBody = req.body
  const userEducation = await userService.updateEducationByUserId(userId, id, educationUpdateBody)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { education: userEducation },
    'User Eduction updated Successfully'
  )
})

const deleteEducation = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id as string)
  await userService.deleteEducationById(id, userId)
  sendResponse(res, httpStatus.OK, null, null, 'User Eduction deleted Successfully')
})

const getExperience = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userExperience = await userService.getExperienceByUserId(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { Experience: userExperience },
    'User Experience fetched Successfully'
  )
})

const createExperience = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const experienceBody = req.body
  const userExperience = await userService.createExperienceByUserId(userId, experienceBody)
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { Experience: userExperience },
    'User Experience created Successfully'
  )
})

const updateExperience = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id as string)
  const experienceUpdateBody = req.body
  const userExperience = await userService.updateExperienceByUserId(
    userId,
    id,
    experienceUpdateBody
  )
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { Experience: userExperience },
    'User Experience updated Successfully'
  )
})

const deleteExperience = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id as string)
  await userService.deleteExperienceById(id, userId)
  sendResponse(res, httpStatus.OK, null, null, 'User Experience deleted Successfully')
})

const getUserDetails = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userDetails = await userService.getUserDetailsByUserId(userId)
  sendResponse(res, httpStatus.OK, null, { userDetails }, 'User details fetched Successfully')
})

const createUserDetails = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userDetailsBody = req.body
  const userDetails = await userService.createUserDetailsByUserId(userId, userDetailsBody)
  sendResponse(res, httpStatus.CREATED, null, { userDetails }, 'User details created Successfully')
})

const updateUserDetails = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userDetailsUpdateBody = req.body
  const userDetails = await userService.updateUserDetailsByUserId(userId, userDetailsUpdateBody)
  sendResponse(res, httpStatus.CREATED, null, { userDetails }, 'User details updated Successfully')
})

const deleteUserDetails = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await userService.deleteUserDetailsByUserId(userId)
  sendResponse(res, httpStatus.OK, null, null, 'User details deleted Successfully')
})

const getKeywords = catchAsync(async (req, res) => {
  const keywords = await prisma.keyword.findMany({
    select: {
      keyword: true
    }
  })
  const Keyword = keywords?.map((k: Allow) => k.keyword)
  sendResponse(res, httpStatus.OK, null, { Keyword }, 'Keywords fetched Successfully')
})

const getJobRoles = catchAsync(async (req, res) => {
  const jobRoles = await prisma.rolesNeeded.findMany({
    select: {
      role: true
    }
  })
  const jobRole = (jobRoles ?? [])?.map((k: Allow) => k?.role)
  sendResponse(res, httpStatus.OK, null, { jobRole }, 'Roles fetched Successfully')
})

const getSkills = catchAsync(async (req, res) => {
  const Skills = await prisma.skill.findMany({
    select: {
      skill: true
    }
  })
  const skill = Skills?.map((k: Allow) => k.skill)
  sendResponse(res, httpStatus.OK, null, { skill }, 'Skills fetched Successfully')
})
const getSoftwares = catchAsync(async (req, res) => {
  const Softwares = await prisma.software.findMany({
    select: {
      software: true
    }
  })
  const software = Softwares?.map((k: Allow) => k.software)
  sendResponse(res, httpStatus.OK, null, { software }, 'Softwares fetched Successfully')
})
const getGenre = catchAsync(async (req, res) => {
  const Genres = await prisma.genre.findMany({
    select: {
      name: true
    }
  })
  const genre = Genres?.map((k: Allow) => k.name)
  sendResponse(res, httpStatus.OK, null, { genre }, 'Genres fetched Successfully')
})

const getPlatforms = catchAsync(async (req, res) => {
  const Platforms = await prisma.platform.findMany({
    select: {
      name: true
    }
  })
  const platform = Platforms?.map((k: Allow) => k.name)
  sendResponse(res, httpStatus.OK, null, { platform }, 'Platforms fetched Successfully')
})
const getCustomGameTags = catchAsync(async (req, res) => {
  const Platforms = await prisma.platform.findMany({
    select: {
      name: true
    }
  })
  const platform = Platforms?.map((k: Allow) => k.name)
  const Genres = await prisma.genre.findMany({
    select: {
      name: true
    }
  })
  const genre = Genres?.map((k: Allow) => k.name)
  const keywords = await prisma.keyword.findMany({
    select: {
      keyword: true
    }
  })
  const tags = keywords?.map((k: Allow) => k.keyword)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { platform, genre, tags },
    'Custom Game Tags fetched Successfully'
  )
})
const getCustomCreatorsTags = catchAsync(async (req, res) => {
  const Skills = await prisma.skill.findMany({
    select: {
      skill: true
    }
  })
  const skill = Skills?.map((k: Allow) => k.skill)
  const Softwares = await prisma.software.findMany({
    select: {
      software: true
    }
  })
  const software = Softwares?.map((k: Allow) => k.software)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { skill, software },
    'Custom Creators Tags fetched Successfully'
  )
})
const getCustomJobResponseTags = catchAsync(async (req, res) => {
  const Skills = await prisma.skill.findMany({
    select: {
      skill: true
    }
  })
  const skill = Skills?.map((k: Allow) => k.skill)
  const Softwares = await prisma.software.findMany({
    select: {
      software: true
    }
  })
  const software = Softwares?.map((k: Allow) => k.software)
  const roles = await prisma.rolesNeeded.findMany({
    select: {
      role: true
    }
  })
  const rolesApplied = roles?.map((k: Allow) => k.role)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { skill, software, rolesApplied },
    'Custom Job Response Tags fetched Successfully'
  )
})

const getAllDetails = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userSocials = await userService.getSocialsByUserId(userId)
  const Softwares = await prisma.software.findMany({
    select: {
      software: true
    }
  })
  const software = Softwares?.map((k: Allow) => k.software)
  const Skills = await prisma.skill.findMany({
    select: {
      skill: true
    }
  })
  const skill = Skills?.map((k: Allow) => k.skill)
  const userDetails = await userService.getUserDetailsByUserId(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { skill, software, socials: userSocials, details: userDetails },
    'Details fetched Successfully'
  )
})

const getCustomDetails = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id as string)
  const customDetails = await userService.getCustomDetails(id)
  if (!customDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const keywords = await prisma.keyword.findMany({
    select: {
      keyword: true
    }
  })
  const tags = keywords?.map((k: Allow) => k.keyword)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { user: customDetails, tags },
    'User Details fetched Successfully'
  )
})
const getAllCreatorsExceptUser = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const filter = req.query
  const creators = await userService.getAllCreatorsExceptUser(userId, filter)
  sendResponse(res, httpStatus.OK, null, { creators }, 'Creators Details fetched Successfully')
})
const getApplyDetails = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const applyDetails = await userService.getApplyDetails(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { applyDetails },
    'Applicant  Details fetched Successfully'
  )
})
const getAllCreators = catchAsync(async (req, res) => {
  const filter = req.query
  const creators = await userService.getAllCreators(filter)
  sendResponse(res, httpStatus.OK, null, { creators }, 'Creators fetched Successfully')
})
const getOtherDetails = catchAsync(async (req, res) => {
  const userId = parseInt(req.params.id as string)
  const userSocials = await userService.getSocialsByUserId(userId)
  const Softwares = await prisma.software.findMany({
    select: {
      software: true
    }
  })
  const software = Softwares?.map((k: Allow) => k.software)
  const Skills = await prisma.skill.findMany({
    select: {
      skill: true
    }
  })
  const skill = Skills?.map((k: Allow) => k.skill)
  const userDetails = await userService.getUserDetailsByUserId(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { skill, software, socials: userSocials, details: userDetails },
    'Other Details fetched Successfully'
  )
})
const getHomeDetailsController = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const homeDetails = await userService.getHomeDetails(userId)
  sendResponse(res, httpStatus.OK, null, homeDetails, 'Other Details fetched Successfully')
})
export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getSocials,
  createSocials,
  updateSocials,
  deleteSocials,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getUserDetails,
  createUserDetails,
  updateUserDetails,
  deleteUserDetails,
  getCustomDetails,
  getAllCreatorsExceptUser,
  getAllCreators,
  getKeywords,
  getSkills,
  getSoftwares,
  getGenre,
  getPlatforms,
  getCustomGameTags,
  getCustomCreatorsTags,
  getCustomJobResponseTags,
  getAllDetails,
  getOtherDetails,
  getHomeDetailsController,
  getJobRoles,
  getApplyDetails
}
