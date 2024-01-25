import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { jobService } from '../services'
import { sendResponse } from '../utils/response'
import prisma from '../client'

const getUserJobs = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const filter = req.query
  const userJobs = await jobService.getUserJobs(id, filter)
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
  const filter = req.query
  const Jobs = await jobService.getAllJobs(filter)
  sendResponse(res, httpStatus.OK, null, { jobs: Jobs }, 'Jobs fetched Successfully')
})

const getLatestJobs = catchAsync(async (req, res) => {
  const Jobs = await jobService.getLatestJobs()
  sendResponse(res, httpStatus.OK, null, { Latestjobs: Jobs }, 'Jobs fetched Successfully')
})

const getJobById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id)
  const job = await jobService.getJobById(id)
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
  const userId = parseInt(req.params.id)
  const userJobsApplications = await jobService.getUserApplications(userId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { applications: userJobsApplications },
    'User Applications fetched Successfully'
  )
})
const getJobApplication = catchAsync(async (req, res) => {
  const filter = req.query
  const jobId = parseInt(req.params.id)
  const JobsApplications = await jobService.getJobApplication(jobId, filter)
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    }
  })
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { applications: JobsApplications, title: job?.title ?? '' },
    'Job Applications fetched Successfully'
  )
})

const getApplicantInfo = catchAsync(async (req, res) => {
  const applicantInfoId = parseInt(req.params.id)
  const ApplicantInfo = await jobService.getapplicantInfo(applicantInfoId)
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { applicantInfo: ApplicantInfo },
    'ApplicantInfo fetched Successfully'
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
    'Job Applied Successfully'
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
  const filter = req.query
  const userId = res.locals.user.id
  const jobs = await jobService.getAllJobsExceptCurrentUser(userId, filter)
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
  getJobApplication,
  getAllJobsExceptCurrentUser,
  getLatestJobs,
  getApplicantInfo
}
