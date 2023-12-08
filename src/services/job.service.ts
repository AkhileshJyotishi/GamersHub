import httpStatus from 'http-status'
import prisma from '../client'
import ApiError from '../utils/api-error'
import { Job, JobApplication } from '@prisma/client'

/**
 * Get All Jobs of a user
 * @param {ObjectId} userId
 * @returns {Promise<Job[]>}
 */

const getUserJobs = async (userId: number): Promise<Job[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      jobs: {
        include: {
          jobApplications: {
            select: {
              id: true,
              userId: true
            }
          },
          jobSoftwares: {
            select: {
              software: true
            }
          },
          savedUsers: {
            select: {
              id: true
            }
          },
          user: {
            select: {
              username: true,
              profileImage: true
            }
          }
        }
      }
    }
  })
  // if need to return empty job remove this
  // if (!user || !user.jobs.length) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User Jobs not found')
  // }
  return user?.jobs || []
}

interface jobBody {
  title: string
  remote: boolean
  paymentType: 'FIXED' | 'HOURLY' | 'NEGOTIABLE'
  jobType: 'FREELANCE' | 'FULL_TIME' | 'COLLAB'
  banner?: string | null
  publishDate?: string | null
  jobDetails?: object
  aboutRecruiter?: object
  country?: string
  description?: string
  city?: string
  paymentValue?: number
  expertise?: 'ENTRY' | 'INTERMEDIATE' | 'EXPERT'
  jobSoftwares: string[]
  gameGallery: string[]
}

/**
 * Create user job
 * @param {ObjectId} userId
 * @param {jobBody} jobBody
 * @returns {Promise<Job>}
 */

const createUserJob = async (userId: number, jobBody: jobBody): Promise<Job> => {
  const { jobSoftwares, ...newCreateBody } = jobBody

  const job = await prisma.job.create({
    data: {
      ...newCreateBody,
      userId
    }
  })

  //   handle softwares
  if (jobSoftwares && jobSoftwares.length > 0) {
    const softwarePromises = jobSoftwares.map((key) => {
      return prisma.software.upsert({
        where: {
          software: key
        },
        create: {
          software: key,
          job: {
            connect: {
              id: job.id
            }
          }
        },
        update: {
          job: {
            connect: {
              id: job.id
            }
          }
        }
      })
    })

    await Promise.all(softwarePromises)
  }

  return job
}

/**
 * delete user jobs
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserJobs = async (userId: number): Promise<void> => {
  if (!(await prisma.job.findMany({ where: { userId } })).length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Jobs not found')
  }
  await prisma.job.deleteMany({
    where: {
      userId
    }
  })
}

/**
 * Get All Jobs
 * @returns {Promise<Job[]>}
 */

const getAllJobs = async (): Promise<Job[]> => {
  const jobs = await prisma.job.findMany({
    include: {
      jobApplications: {
        select: {
          id: true,
          userId: true
        }
      },
      jobSoftwares: {
        select: {
          software: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      }
    }
  })
  return jobs
}

/**
 * Get a particular Job
 * @param {ObjectId} id
 * @param {ObjectId} userId
 * @returns {Promise<Job>}
 */

const getJobById = async (id: number): Promise<Job | object> => {
  const job = await prisma.job.findUnique({
    where: {
      id
    },
    include: {
      jobSoftwares: {
        select: {
          software: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true
        }
      },
      jobApplications: {
        select: {
          id: true,
          userId: true
        }
      }
    }
  })
  return job || {}
}

/**
 * Update user job
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {jobBody} updateJobBody
 * @returns {Promise<Job>}
 */

const updateJobById = async (userId: number, id: number, updateJobBody: jobBody): Promise<Job> => {
  if (!(await prisma.job.findUnique({ where: { id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User job not found')
  }

  const { jobSoftwares, ...newUpdateBody } = updateJobBody

  // handle softwares
  if (jobSoftwares) {
    const existingjobSoftware = await prisma.job.findUnique({
      where: {
        id,
        userId
      },
      select: {
        jobSoftwares: {
          select: {
            software: true
          }
        }
      }
    })
    let itemsToAdd = jobSoftwares

    if (existingjobSoftware) {
      const jobSoftware = existingjobSoftware.jobSoftwares.map((k: Allow) => k.software)
      const itemsToRemove = jobSoftware.filter((item: Allow) => !jobSoftwares.includes(item))
      itemsToAdd = jobSoftwares.filter((item) => !jobSoftware.includes(item))
      const removePromises = itemsToRemove.map((key: Allow) => {
        return prisma.software.update({
          where: {
            software: key
          },
          data: {
            job: {
              disconnect: {
                id
              }
            }
          }
        })
      })

      await Promise.all(removePromises)
    }

    const addPromises = itemsToAdd.map((key) => {
      return prisma.software.upsert({
        where: {
          software: key
        },
        update: {
          job: {
            connect: {
              id
            }
          }
        },
        create: {
          software: key,
          job: {
            connect: {
              id
            }
          }
        }
      })
    })

    await Promise.all(addPromises)
  }

  const job = await prisma.job.update({
    where: {
      id,
      userId
    },
    data: {
      ...newUpdateBody
    },
    include: {
      jobSoftwares: {
        select: {
          software: true
        }
      }
    }
  })
  return job
}

/**
 * Delete user job
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const deleteJobById = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.job.findUnique({ where: { id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Job not found')
  }
  await prisma.job.delete({
    where: {
      id,
      userId
    }
  })
}

// Applications
/**
 * Get All Job Applications of a user
 * @param {ObjectId} userId
 * @returns {Promise<JobApplication[]>}
 */

const getUserApplications = async (userId: number): Promise<JobApplication[] | []> => {
  const userApplications = await prisma.jobApplication.findMany({
    where: {
      userId
    },
    include: {
      job: {
        select: {
          title: true,
          id: true,
          jobType: true,
          paymentValue: true,
          paymentType: true,
          remote: true
        }
      }
    }
  })
  return userApplications || []
}

interface ApplicationBody {
  jobId: number
  resume?: string | null
  motivationToApply: string
}

/**
 * Create user Job Application
 * @param {ObjectId} userId
 * @param {ApplicationBody} jobApplicationBody
 * @returns {Promise<JobApplication>}
 */

const createUserJobApplication = async (
  userId: number,
  jobApplicationBody: ApplicationBody
): Promise<JobApplication> => {
  const jobApplication = await prisma.jobApplication.create({
    data: {
      userId,
      ...jobApplicationBody
    }
  })

  return jobApplication
}

/**
 * delete user Job applications
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserApplications = async (userId: number): Promise<void> => {
  if (!(await prisma.jobApplication.findMany({ where: { userId } })).length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Job Applications not found')
  }
  await prisma.jobApplication.deleteMany({
    where: {
      userId
    }
  })
}

/**
 * Get a particular Job Application details
 * @param {ObjectId} id
 * @param {ObjectId} userId
 * @returns {Promise<JobApplication>}
 */

const getJobApplicationById = async (
  id: number,
  userId: number
): Promise<JobApplication | object> => {
  const jobApplication = await prisma.jobApplication.findUnique({
    where: {
      id,
      userId
    },
    include: {
      job: {
        select: {
          title: true,
          id: true,
          jobType: true,
          paymentValue: true,
          paymentType: true,
          remote: true,
          jobSoftwares: {
            select: {
              software: true
            }
          },
          jobDetails: true,
          country: true,
          city: true,
          expertise: true
        }
      }
    }
  })
  return jobApplication || {}
}

/**
 * Update user jobApplication
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @param {ApplicationBody} updateJobApplicationBody
 * @returns {Promise<JobApplication>}
 */

const updateJobApplicationById = async (
  userId: number,
  id: number,
  updateJobApplicationBody: ApplicationBody
): Promise<JobApplication> => {
  if (!(await prisma.jobApplication.findUnique({ where: { id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User job Application not found')
  }

  const jobApplication = await prisma.jobApplication.update({
    where: {
      id,
      userId
    },
    data: {
      ...updateJobApplicationBody
    },
    include: {
      job: {
        select: {
          title: true,
          id: true,
          jobType: true,
          paymentValue: true,
          paymentType: true,
          remote: true
        }
      }
    }
  })
  return jobApplication
}

/**
 * Delete user job Application
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const deleteJobApplicationById = async (userId: number, id: number): Promise<void> => {
  if (!(await prisma.jobApplication.findUnique({ where: { id, userId } }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Job Application not found')
  }
  await prisma.jobApplication.delete({
    where: {
      id,
      userId
    }
  })
}

/**
 * Get Saved Jobs
 * @param {ObjectId} userId
 * @returns {Promise<Job[]>}
 */

const getSavedJobs = async (userId: number): Promise<Job[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      savedJobs: {
        include: {
          jobSoftwares: {
            select: {
              software: true
            }
          },
          savedUsers: {
            select: {
              id: true
            }
          },
          user: {
            select: {
              id: true,
              username: true,
              profileImage: true
            }
          },
          jobApplications: {
            select: {
              id: true,
              userId: true
            }
          }
        }
      }
    }
  })
  return user?.savedJobs || []
}

/**
 * Toggle save job
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<void>}
 */

const toggleSaveJob = async (userId: number, id: number): Promise<string> => {
  const job = await prisma.job.findUnique({
    where: {
      id
    },
    include: {
      savedUsers: {
        where: {
          id: userId
        }
      }
    }
  })

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found')
  }
  if (job.savedUsers.length > 0) {
    await prisma.job.update({
      where: { id },
      data: {
        savedUsers: {
          disconnect: { id: userId }
        }
      }
    })
    return 'Job unsaved Successfully'
  } else {
    await prisma.job.update({
      where: { id },
      data: {
        savedUsers: {
          connect: { id: userId }
        }
      }
    })
    return 'Job saved Successfully'
  }
}

/**
 * Get Other users Jobs
 * @param {ObjectId} userId
 * @returns {Promise<Job[]>}
 */

const getAllJobsExceptCurrentUser = async (userId: number): Promise<Job[]> => {
  const jobs = await prisma.job.findMany({
    where: {
      NOT: {
        userId
      }
    },
    include: {
      jobSoftwares: {
        select: {
          software: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      },
      jobApplications: {
        select: {
          id: true,
          userId: true
        }
      }
    }
  })
  return jobs
}

export default {
  getUserJobs,
  createUserJob,
  deleteUserJobs,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
  getUserApplications,
  createUserJobApplication,
  deleteUserApplications,
  getJobApplicationById,
  updateJobApplicationById,
  deleteJobApplicationById,
  getSavedJobs,
  toggleSaveJob,
  getAllJobsExceptCurrentUser
}
