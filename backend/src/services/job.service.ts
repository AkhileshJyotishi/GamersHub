import httpStatus from 'http-status'
import prisma from '../client'
import ApiError from '../utils/api-error'
import {
  ApplicantInfo,
  ApplicationMethod,
  Expertise,
  Job,
  JobApplication,
  JobType
} from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
/**
 * Get All Jobs of a user
 * @param {ObjectId} userId
 * @returns {Promise<Job[]>}
 */

const getUserJobs = async (userId: number, filter: QueryJobs): Promise<Job[]> => {
  const { expertise, jobType, remote, jobSoftwares, rolesNeeded } = filter
  const user = await prisma.user.findUnique({
    where: {
      jobs: {
        some: {
          AND: [
            expertise
              ? {
                  expertise: {
                    in: expertise
                  }
                }
              : {},
            jobType
              ? {
                  jobType: {
                    in: jobType
                  }
                }
              : {},
            remote
              ? {
                  remote: {
                    equals: remote
                  }
                }
              : {},
            jobSoftwares
              ? {
                  jobSoftwares: {
                    some: {
                      software: {
                        in: jobSoftwares,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              : {},
            rolesNeeded
              ? {
                  rolesNeeded: {
                    some: {
                      role: {
                        in: rolesNeeded,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              : {}
          ]
        }
      },
      id: userId,
      validUser: true
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
              profileImage: true,
              bannerImage: true
            }
          },
          rolesNeeded: {
            select: {
              role: true
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
  publishDate?: string | null
  jobDetails?: object
  aboutRecruiter?: object
  country?: string
  description?: string
  jobApplyUrl?: string
  city?: string
  paymentValue?: number
  expertise?: 'ENTRY' | 'INTERMEDIATE' | 'EXPERT'
  jobSoftwares: string[]
  rolesNeeded: string[]
  gameGallery: string[]
}

/**
 * Create user job
 * @param {ObjectId} userId
 * @param {jobBody} jobBody
 * @returns {Promise<Job>}
 */

const createUserJob = async (userId: number, jobBody: jobBody): Promise<Job> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      validUser: true
    }
  })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const { jobSoftwares, rolesNeeded, ...newCreateBody } = jobBody
  const job = await prisma.job.create({
    data: {
      ...newCreateBody,
      userId
    }
  })

  //   handle softwares
  if (jobSoftwares && jobSoftwares.length > 0) {
    const softwarePromises = jobSoftwares?.map((key) => {
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
  if (rolesNeeded && rolesNeeded.length > 0) {
    const rolesPromises = rolesNeeded?.map((key) => {
      return prisma.rolesNeeded.upsert({
        where: {
          role: key
        },
        create: {
          role: key,
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

    await Promise.all(rolesPromises)
  }

  return job
}

/**
 * delete user jobs
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserJobs = async (userId: number): Promise<void> => {
  if (
    !(
      await prisma.job.findMany({
        where: {
          userId,
          user: {
            validUser: true
          }
        }
      })
    ).length
  ) {
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

const getAllJobs = async (filter: QueryJobs): Promise<Job[]> => {
  const { expertise, jobType, remote, jobSoftwares, rolesNeeded } = filter
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        expertise
          ? {
              expertise: {
                in: expertise
              }
            }
          : {},
        jobType
          ? {
              jobType: {
                in: jobType
              }
            }
          : {},
        remote
          ? {
              remote: {
                equals: remote
              }
            }
          : {},
        jobSoftwares
          ? {
              jobSoftwares: {
                some: {
                  software: {
                    in: jobSoftwares,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {},
        rolesNeeded
          ? {
              rolesNeeded: {
                some: {
                  role: {
                    in: rolesNeeded,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {}
      ],
      isExpired: false,
      user: {
        validUser: true
      }
    },
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
          profileImage: true,
          bannerImage: true
        }
      },
      savedUsers: {
        select: {
          id: true
        }
      },
      rolesNeeded: {
        select: {
          role: true
        }
      }
    }
  })
  return jobs
}

const getLatestJobs = async (): Promise<Job[]> => {
  const jobs = await prisma.job.findMany({
    where: {
      isExpired: false,
      user: {
        validUser: true
      }
    },
    orderBy: {
      publishDate: 'desc'
    },
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
      },
      rolesNeeded: {
        select: {
          role: true
        }
      }
    },
    take: 4
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
      id,
      user: {
        validUser: true
      }
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
      appliedUsers: {
        select: {
          id: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true,
          bannerImage: true,
          email: true
        }
      },
      rolesNeeded: {
        select: {
          role: true
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
  if (
    !(await prisma.job.findUnique({
      where: {
        id,
        userId,
        user: {
          validUser: true
        }
      }
    }))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User job not found')
  }

  const { jobSoftwares, rolesNeeded, ...newUpdateBody } = updateJobBody

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
      const jobSoftware = existingjobSoftware.jobSoftwares?.map((k: Allow) => k.software)
      const itemsToRemove = jobSoftware.filter((item: Allow) => !jobSoftwares.includes(item))
      itemsToAdd = jobSoftwares.filter((item) => !jobSoftware.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
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

    const addPromises = itemsToAdd?.map((key) => {
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
  // handle roles
  if (rolesNeeded) {
    const existingRoles = await prisma.job.findUnique({
      where: {
        id,
        userId
      },
      select: {
        rolesNeeded: {
          select: {
            role: true
          }
        }
      }
    })
    let itemsToAdd = rolesNeeded

    if (existingRoles) {
      const jobRoles = existingRoles.rolesNeeded?.map((k: Allow) => k.role)
      const itemsToRemove = jobRoles.filter((item: Allow) => !rolesNeeded.includes(item))
      itemsToAdd = rolesNeeded.filter((item) => !jobRoles.includes(item))
      const removePromises = itemsToRemove?.map((key: Allow) => {
        return prisma.rolesNeeded.update({
          where: {
            role: key
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

    const addPromises = itemsToAdd?.map((key) => {
      return prisma.rolesNeeded.upsert({
        where: {
          role: key
        },
        update: {
          job: {
            connect: {
              id
            }
          }
        },
        create: {
          role: key,
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
  if (
    !(await prisma.job.findUnique({
      where: {
        id,
        userId,
        user: {
          validUser: true
        }
      }
    }))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Job not found')
  }
  await prisma.job.update({
    where: {
      id,
      userId
    },
    data: {
      isExpired: true
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
      userId,
      user: {
        validUser: true
      }
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

interface QueryJobResponse {
  country?: string
  userSkills?: string[]
  userSoftwares?: string[]
  rolesApplied?: string[]
}
/**
 * Get All Particular Job Applications
 * @param {ObjectId} jobId
 * @returns {Promise<JobApplication[]>}
 */

const getJobApplication = async (
  jobId: number,
  userId: number,
  filter: QueryJobResponse
): Promise<Partial<JobApplication>[] | []> => {
  const { country, rolesApplied, userSkills, userSoftwares } = filter
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    }
  })
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found')
  } else if (job.userId != userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access not granted')
  }
  const userApplications = await prisma.jobApplication.findMany({
    where: {
      AND: [
        country
          ? {
              user: {
                userDetails: {
                  country: {
                    equals: country
                  }
                }
              }
            }
          : {},
        rolesApplied
          ? {
              rolesApplied: {
                hasSome: rolesApplied
              }
            }
          : {},
        userSkills
          ? {
              user: {
                userDetails: {
                  userSkills: {
                    some: {
                      skill: {
                        in: userSkills,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              }
            }
          : {},
        userSoftwares
          ? {
              user: {
                userDetails: {
                  userSoftwares: {
                    some: {
                      software: {
                        in: userSoftwares,
                        mode: 'insensitive'
                      }
                    }
                  }
                }
              }
            }
          : {}
      ],
      jobId,
      user: {
        validUser: true
      }
    },
    select: {
      applyMethod: true,
      id: true,
      motivationToApply: true,
      rolesApplied: true,
      job: {
        select: {
          title: true
        }
      },
      user: {
        select: {
          username: true,
          profileImage: true,
          bannerImage: true,
          id: true,
          userDetails: {
            select: {
              country: true,
              city: true,
              userBio: true,
              userSkills: true
            }
          }
        }
      },
      ApplicantInfo: {
        select: {
          id: true,
          city: true,
          country: true,
          firstName: true,
          lastName: true,
          skills: true,
          bio: true
        }
      }
    }
  })
  return userApplications || []
}

/**
 * Get All Particular applicantInfo
 * @param {ObjectId} applicantInfoId
 * @returns {Promise<JobApplication[]>}
 */

const getapplicantInfo = async (applicantInfoId: number): Promise<Partial<ApplicantInfo>> => {
  const ApplicantInfo = await prisma.applicantInfo.findUnique({
    where: {
      id: applicantInfoId
    },
    select: {
      skills: true,
      bio: true,
      country: true,
      city: true,
      phone: true,
      email: true,
      id: true,
      portfolio: true,
      firstName: true,
      lastName: true,
      relatedJob: {
        select: {
          motivationToApply: true,
          resume: true,
          rolesApplied: true,
          user: {
            select: {
              profileImage: true
            }
          }
        }
      }
    }
  })
  if (!ApplicantInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Applicant not found')
  }
  return ApplicantInfo
}

interface ApplicationBody {
  jobId: number
  rolesApplied: string[]
  applyMethod: ApplicationMethod
  resume?: string | null
  motivationToApply: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  country?: string
  city?: string
  bio?: string
  portfolio?: string
  skills?: string[]
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
  const { rolesApplied, applyMethod, resume, motivationToApply, jobId, ...applicantBody } =
    jobApplicationBody
  const oldApplication = await prisma.jobApplication.findFirst({
    where: {
      jobId,
      userId
    }
  })
  if (oldApplication) {
    throw new ApiError(httpStatus.CONFLICT, 'Job already Applied')
  }
  const jobApplication = await prisma.jobApplication.create({
    data: {
      rolesApplied,
      applyMethod,
      userId,
      jobId,
      resume,
      motivationToApply
    }
  })

  await prisma.job.update({
    where: {
      id: jobId
    },
    data: {
      appliedUsers: {
        connect: {
          id: userId
        }
      }
    }
  })

  if (applyMethod == 'MANUAL') {
    await prisma.applicantInfo.create({
      data: {
        firstName: applicantBody.firstName as string,
        lastName: applicantBody.lastName,
        email: applicantBody.email as string,
        phone: applicantBody.phone as string,
        country: applicantBody.country,
        city: applicantBody.city,
        bio: applicantBody.bio,
        portfolio: applicantBody.portfolio,
        skills: applicantBody.skills,
        applicationId: jobApplication.id
      }
    })
  }

  // if (applyMethod == 'MANUAL' && applicantBody?.skills && applicantBody.skills?.length > 0) {
  //   const skillPromises = applicantBody.skills?.map((skill) => {
  //     return prisma.skill.upsert({
  //       where: {
  //         skill: skill
  //       },
  //       create: {
  //         skill: skill,
  //         userDetails: {
  //           connect: {
  //             id: userId
  //           }
  //         }
  //       },
  //       update: {
  //         userDetails: {
  //           connect: {
  //             id: userId
  //           }
  //         }
  //       }
  //     })
  //   })

  //   await Promise.all(skillPromises)
  // }

  return jobApplication
}

/**
 * delete user Job applications
 * @param {ObjectId} userId
 * @returns {Promise<void>}
 */

const deleteUserApplications = async (userId: number): Promise<void> => {
  if (
    !(
      await prisma.jobApplication.findMany({
        where: {
          userId,
          user: {
            validUser: true
          }
        }
      })
    ).length
  ) {
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
      userId,
      user: {
        validUser: true
      }
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
  if (
    !(await prisma.jobApplication.findUnique({
      where: {
        id,
        userId,
        user: {
          validUser: true
        }
      }
    }))
  ) {
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
      id: userId,
      validUser: true
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
              profileImage: true,
              bannerImage: true
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

interface QueryJobs {
  expertise?: Expertise[]
  jobType?: JobType[]
  remote?: boolean
  jobSoftwares?: string[]
  rolesNeeded?: string[]
}
const getAllJobsExceptCurrentUser = async (userId: number, filter: QueryJobs): Promise<Job[]> => {
  const { expertise, jobType, remote, jobSoftwares, rolesNeeded } = filter
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        expertise
          ? {
              expertise: {
                in: expertise
              }
            }
          : {},
        jobType
          ? {
              jobType: {
                in: jobType
              }
            }
          : {},
        remote
          ? {
              remote: {
                equals: remote
              }
            }
          : {},
        jobSoftwares
          ? {
              jobSoftwares: {
                some: {
                  software: {
                    in: jobSoftwares,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {},
        rolesNeeded
          ? {
              rolesNeeded: {
                some: {
                  role: {
                    in: rolesNeeded,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {}
      ],
      NOT: {
        userId
      },
      isExpired: false,
      user: {
        validUser: true
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
          profileImage: true,
          bannerImage: true
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
      },
      rolesNeeded: {
        select: {
          role: true
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
  getAllJobsExceptCurrentUser,
  getLatestJobs,
  getJobApplication,
  getapplicantInfo
}
