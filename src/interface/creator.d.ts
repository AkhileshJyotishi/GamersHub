interface CreatorsFilterProps {
  userSkills: readonly string[]
  userSoftwares: readonly string[]
  country?: string
}

interface Creator {
  id: number
  username: string
  // occupation?: string
  profileImage?: string
  bannerImage?: string
  userDetails: {
    userBio?: string
    userSkills?: {
      skill?: string
    }[]
    userSoftwares?: {
      software?: string
    }[]
    city?: string
    country?: string
  }
}
interface ICustomCreatorsTags {
  skill: string[]
  software: string[]
}
