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
  title: string
  desc: string
  date: string
  salary: string
  type: string
  location: string
  href: string
  chips?: string[]
}
interface IjobsDetails {}

interface BackendJob {
  id: number
  slug: string
  role: string
  title: string
  // backgroundImage;
  banner: string | null
  description: string
  publishDate: string | null
  jobDetails: object | null
  requirements: {
    skills: string[]
    experience: string
  }

  // about: {
  //     company: string;
  //     culture: string;
  // };
  remote: boolean
  country: string
  city: string
  expertise: string
  paymentType: string
  paymentValue: number
  jobType: string
  userId: number
  jobSoftwares: {
    software: string
  }[]
  user: {
    username: string
    profileImage: string
  }
  // website: string;
  // logoSrc: string;
}

interface JobInfo {
  jobType: string

  remote: boolean
  country?: string
  city?: string

  paymentType: string
  paymentValue: number

  banner: File | null | string
  expertise: string
  jobSoftwares: string[]
  title: string
  publishDate: string | null
  jobDetails: object | null
}
