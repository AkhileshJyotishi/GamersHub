interface JobFilterProps {
  expertise: string[]
  remote: undefined | boolean
  jobType: string[]
  jobSoftwares: string[]
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
  userId: number
  remote: boolean

  profileImage: string
}
interface IjobsDetails {}
interface JobSoftwareSuggestions {
  software: string[]
}
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

  banner: File | null | string
  expertise: string
  jobSoftwares: readonly string[]
  title: string
  publishDate: string | null
  jobDetails: object | null
  userId: number
  aboutRecruiter: object | null
}
