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
