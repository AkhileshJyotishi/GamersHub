import { StaticImageData } from "next/image"

interface INewsCategory {
  id: number
  title: string
  description?: string
  news?: INews[]
}

interface INews {
  id: number
  title: string
  subtitle?: string
  content?: object
  bannerImage?: string
  publishedAt: string
  isSaved?: boolean
  isPublished?: boolean
  userId?: number
  publisher: Partial<Iuser>
}

export interface ArticleProps {
  id: number
  imgSrc: string | StaticImageData
  imgAlt: string
  title: string
  link: string
}
