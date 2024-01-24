interface JobFilterProps {
  expertise: string[]
  remote: undefined | boolean
  jobType: string[]
  jobSoftwares: string[]
  rolesNeeded: string[]
}

interface Job {
  id: number
  title: string
  desc: string | null
  date: string | null
  salary: string
  type: string
  location: string
  href: string
  chips?: string[]
  banner: string | null
  savedUsers: {
    id: number
  }[]
  rolesNeeded?: string[]
  userId: number
  remote: boolean
  username: string
  profileImage: string
}
interface IjobsDetails {}
interface JobSoftwareSuggestions {
  software: string[]
}
type JobRolesSuggestions = string[]
interface BackendJob {
  id: number
  slug: string
  banner: string | null
  publishDate: string | null
  title: string
  description: string | null
  jobDetails: object | null
  aboutRecruiter: object | null
  // backgroundImage;
  // banner: string | null
  // skills: string[]

  remote: boolean
  country: string
  city: string
  rolesNeeded?: string[]
  jobApplyUrl?: string | null
  isExpired: boolean | null
  jobSoftwares: {
    software: string
  }[]
  expertise: string
  paymentType: string
  paymentValue: number
  jobType: string
  userId: number
  savedUsers: {
    id: number
  }[]
  user: {
    username: string
    profileImage: string
    bannerImage: string | null
  }
  jobApplications: {
    id: number
    userId: number
  }
  // website: string;
  // logoSrc: string;
}

interface JobInfo {
  id?: number
  jobType: string
  description: string | nullonChange
  remote: boolean
  country?: string
  city?: string
  userId?: number
  paymentType: string
  paymentValue: number
  jobApplyUrl?: string
  // banner: File | null | string
  expertise: string
  jobSoftwares: readonly string[]
  rolesNeeded: readonly string[]
  title: string
  publishDate: string | null
  jobDetails: object | null
  userId: number
  aboutRecruiter: object | null
}

interface jobApplications {
  applyMethod: "MANUAL" | "GCH"
  id?: number
  motivationToApply: string
  rolesApplied: string[]
  resume: string
  job: {
    title: string
  }
  user: {
    id: number
    username: string
    profileImage?: string
    bannerImage?: string
    userDetails: {
      country?: string
      city?: string
      userBio?: string
      userSkills:{
        skill:string
      }[]
    }
  }
  ApplicantInfo: {
    id?:number
    city: string
    country: string
    firstName: string
    lastName: string
    skills: string[]
    bio: string
  }
}

interface ApplicantInfo {
  id?: number
  city: string
  country: string
  firstName: string
  lastName: string
  skills: string[]
  bio: string
  phone: string
  portfolio: string
  email: string
  relatedJob: {
    motivationToApply: string
    rolesApplied: string[]
    resume: string
  }
}

interface ServerPlan {
  name: string
}
type Setjob = React.Dispatch<React.SetStateAction<boolean>>
interface IBasicInfo {
  jobId: number
  rolesApplied?: string[] | null
  applyMethod?: "MANUAL" | "GCH" | null
  resume?: string | null | File
  motivationToApply: string | null
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  phone?: string | null
  country?: string | null
  city?: string | null
  bio?: string | null
  portfolio?: string | null
  skills?: string[] | null
}
