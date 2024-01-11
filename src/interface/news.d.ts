import { StaticImageData } from "next/image"

interface INewsCategory {
  id: number
  title: string
  description: string
  news: INews | null
}

interface INews {
  id: number
  category: INewsCategory
  categoryId: number
  title: string
  subtitle: string
  content: object
  bannerImage: string
  publishedAt: string
  publisher: Partial<Iuser>
  userId: number
}
export interface ArticleProps {
  id: number
  imgSrc: string | StaticImageData
  imgAlt: string
  category: string
  title: string
  link: string
}
