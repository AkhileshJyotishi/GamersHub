interface IPostbackend {
  id: number
  userId: number
  slug: string
  title: string
  description: string | null
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
  comments: { [key: string]: unknown }[]
  postLikes: null | number
  postSkills: { [key: string]: unknown }[]
  _count: {
    postKeywords: number
    postSkills: number
    comments: number
    savedUsers: number
  }
}
