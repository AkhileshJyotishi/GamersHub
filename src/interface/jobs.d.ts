interface JobFilterProps {
  // searchText: string;
  rolesNeeded: string
  softwareSkills: string
  expertise: string
  remote: undefined | boolean
  country: string
  city: string
  type: string
  postedOn: string
  hasPrice: boolean
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
  banner:string |null
  savedUsers: {
    id: number
  }[]
  userId:number
}
interface IjobsDetails {}

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
  jobType: string

  remote: boolean
  country?: string
  city?: string
userId:number
  paymentType: string
  paymentValue: number

  banner: File | null | string
  expertise: string
  jobSoftwares: string[]
  title: string
  publishDate: string | null
  jobDetails: object | null
  userId:number
}
