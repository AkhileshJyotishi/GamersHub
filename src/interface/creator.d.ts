interface CreatorsFilterProps {
  searchText: string
  skills: string
  softwares: string
  country?: string
  city?: string
}
interface Creator {
  username?: string
  occupation?: string
  user_bio?: {
    bio: string
  }
  skills_lists?: string[]
  softwares_lists?: string[]
  profile_image?: string
  banner?: string
}
