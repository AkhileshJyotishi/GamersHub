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
    user: {
      username: string
      profileImage: string
    }
    createdAt: string
    id: number
  }[]
  postLikes: {
    likedUsers: {
      id: number
    }[]
  }

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

interface IHomePostResponse {
  id: nubmer
  userId: number
  slug: string
  title: string
  description: string | null
  banner: string
  matureContent: boolean
  content: object
  albumId: number
  postLikes: {
    likedUsers: {
      id: number
    }[]
  }
  savedUsers: {
    id: number
  }[]
  comments: string[]
  user: {
    username: string
    profileImage: string
  }
}
