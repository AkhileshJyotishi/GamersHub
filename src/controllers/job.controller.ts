import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { jobService } from '../services'
import { sendResponse } from '../utils/response'

const getUserJobs = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userJobs = await jobService.getUserJobs(userId)
  sendResponse(res, httpStatus.OK, null, { jobs: userJobs }, 'User Jobs fetched Successfully')
})

const createUserJob = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const jobBody = req.body
  const userJob = await jobService.createUserJob(userId, jobBody)
  sendResponse(res, httpStatus.CREATED, null, { job: userJob }, 'User Job Created Successfully')
})

const deleteUserJobs = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await jobService.deleteUserJobs(userId)
  sendResponse(res, httpStatus.OK, null, null, 'User Jobs deleted Successfully')
})

const getAllJobs = catchAsync(async (req, res) => {
  const Jobs = await jobService.getAllJobs()
  sendResponse(res, httpStatus.OK, null, { jobs: Jobs }, 'Jobs fetched Successfully')
})

const getJobById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const job = await jobService.getJobById(id, userId)
  sendResponse(res, httpStatus.OK, null, { job }, 'User Job fetched Successfully')
})

const updateJobById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const updateJobBody = req.body
  const userJob = await jobService.updateJobById(userId, id, updateJobBody)
  sendResponse(res, httpStatus.CREATED, null, { job: userJob }, 'User Job updated Successfully')
})

const deleteJobById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await jobService.deleteJobById(userId, id)
  sendResponse(res, httpStatus.OK, null, null, 'User Job deleted Successfully')
})

// application
const getUserApplication = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const userJobsApplications = await jobService.getUserApplications(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { applications: userJobsApplications },
    'User Applications fetched Successfully'
  )
})

const createApplication = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const applicationBody = req.body
  const userJobApplicatio = await jobService.createUserJobApplication(userId, applicationBody)
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { jobApplication: userJobApplicatio },
    'User Job Application Created Successfully'
  )
})

const deleteApplication = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  await jobService.deleteUserApplications(userId)
  sendResponse(res, httpStatus.OK, null, null, 'User JobApplications deleted Successfully')
})

const getApplicationById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const application = await jobService.getJobApplicationById(id, userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { application },
    'User JobApplication fetched Successfully'
  )
})

const updateApplicationById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const updateJobApplicationBody = req.body
  const userJobApplication = await jobService.updateJobApplicationById(
    userId,
    id,
    updateJobApplicationBody
  )
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { application: userJobApplication },
    'User JobApplication updated Successfully'
  )
})

const deleteApplicationById = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  await jobService.deleteJobApplicationById(userId, id)
  sendResponse(res, httpStatus.OK, null, null, 'User JobApplication deleted Successfully')
})

const getSavedJobs = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const jobs = await jobService.getSavedJobs(userId)
  sendResponse(res, httpStatus.OK, null, { jobs }, 'User saved Jobs fetched Successfully')
})

const toggleSaveJob = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const id = parseInt(req.params.id)
  const message = await jobService.toggleSaveJob(userId, id)
  sendResponse(res, httpStatus.OK, null, null, message)
})

const getAllJobsExceptCurrentUser = catchAsync(async (req, res) => {
  const userId = res.locals.user.id
  const jobs = await jobService.getAllJobsExceptCurrentUser(userId)
  sendResponse(res, httpStatus.OK, null, { jobs }, 'Others Jobs fetched Successfully')
})

export default {
  getUserJobs,
  createUserJob,
  deleteUserJobs,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
  getUserApplication,
  createApplication,
  deleteApplication,
  getApplicationById,
  updateApplicationById,
  deleteApplicationById,
  getSavedJobs,
  toggleSaveJob,
  getAllJobsExceptCurrentUser
}
