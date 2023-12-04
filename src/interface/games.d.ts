import { StaticImageData } from "next/image"

interface GamesFilterProps {
  searchText: string
  tags: string
  platform: string
  genre: string
  developerType: string
  gameMode: string
}

interface Platform {
  name: string
}

interface Tag {
  keyword: string
}

interface Developer {
  developerName: string
  developerType: string
}

interface Genre {
  name: string
}

interface DistributionPlatform {
  name: string
}

declare interface BackendGame {
  id: number
  title: string
  description: object | null
  banner: string
  developerId: number
  gameMode: string
  releaseDate: string
  userId: number
  slug: string
  platforms: Platform[]
  tags: Tag[]
  developer: Developer
  genre: Genre[]
  distributionPlatforms: DistributionPlatform[]
  gameAssets: string[]
  savedUsers: {
    id: number
  }[]
  user: {
    username: string
    profileImage: string
  }
}
interface Games {
  id: number
  cover?: string | StaticImageData
  banner?: string | StaticImageData
  username: string
  title: string
  savedUsers: {
    id: number
  }[]
  userId:number
}
