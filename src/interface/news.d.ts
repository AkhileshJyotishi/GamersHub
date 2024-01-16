import { StaticImageData } from "next/image"

interface INewsCategory {
  id: number
  title: string
  description?: string
  News?: INews[]
}

interface INews {
  id: number
  bannerImage?: string
  content?: object
  publishedAt: string
  isSaved?: boolean
  isPublished?: boolean
  title: string
  subtitle?: string
  userId?: number
  publisher: Partial<Iuser>
  category: Omit<INewsCategory, "News">
}

export interface ArticleProps {
  id: number
  imgSrc: string | StaticImageData
  subtitle?: string
  category?: Omit<INewsCategory, "News">
  imgAlt: string
  title: string
  link: string
}

interface BackendNews {
  id: number
  bannerImage?: string
  content?: object
  publishedAt: string
  isSaved?: boolean
  isPublished?: boolean
  title: string
  subtitle?: string
  userId?: number
  publisher: {
    username: string
    profileImage?: string
  }
  category: {
    id: number
    title: string
    description?: string
  }
}
