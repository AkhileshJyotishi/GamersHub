interface Iuser {
  id: number
  email: string
  username: string
  password: string | null
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
  profileImage: string | null
  bannerImage: string | null
  matureContent: boolean
}

interface User {
  id: number
  createdAt: string
  username: string
  bannerImage: string
  userDetails: {
    country: string
    resume: string
    city: string
  }
  _count: {
    followers_users: number
    following_users: number
  }
  add_on_web: Isocials
  profileImage: string
  socials: Isocials
}