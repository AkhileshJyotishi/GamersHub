interface Keyword {
  id: number
  keyword: string
}

interface Count {
  posts: number
  keyword: number
}

interface Data {
  id: number
  title: string
  banner: string
  userId: number
  slug: string
  posts: any[] // You might want to replace 'any' with a more specific type for posts
  keyword: Keyword[]
  _count: Count
}
interface IAlbumBackend {
  id: number
  title: string
  banner: string
  userId: number
  slug: string
  posts: any[] // You might want to replace 'any' with a more specific type for posts
  keyword: Keyword[]
  _count: Count
}
