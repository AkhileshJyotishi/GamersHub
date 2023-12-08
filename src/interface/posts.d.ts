interface IPostbackend {
  id: number
  userId: number
  slug: string
  title: string
  description: string | null
  banner: string | null
  matureContent: boolean
  content: object
  albumId: number
  Album: {
    id: number
    title: string
  }
  postKeywords: {
    keyword: string
  }[]

  comments: {
    comment: string
    userId: number
    id: number
  }[]
  postLikes: {
    likedUsers: {
      id: number
    }
  }[]

  postSkills: {
    skill: string
  }[]
  savedUsers: {
    id: number
  }[]
  user: {
    username: string
    profileImage: string
  }
}
