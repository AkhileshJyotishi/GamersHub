interface IPostbackend {
  id: number
  userId: number
  slug: string
  title: string
  description: string | null // This is optional, so it can be null
  banner: string
  matureContent: boolean
  content: {
    [key: string]: string
  }
  albumId: number
  Album: {
    id: number
    title: string
    banner: string
    userId: number
    slug: string
  }
  postKeywords: {
    id: number
    keyword: string
  }[]
  comments: any[] // You might want to replace 'any' with a specific comment type
  postLikes: null | any // Replace 'any' with the type for post likes
  postSkills: any[] // Replace 'any' with the type for post skills
  _count: {
    postKeywords: number
    postSkills: number
    comments: number
    savedUsers: number
  }
}
