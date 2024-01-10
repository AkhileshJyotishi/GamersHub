import { StaticImageData } from "next/image"

interface GamesFilterProps {
  tags: string[]
  platforms: string[]
  genre: string[]
  developerType: string[]
  gameMode: string[]
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
  userId: number
  tags: Tag[]
  distributionPlatforms: DistributionPlatform[]
  platforms: Platform[]
  genre: Genre[]
}
interface GameInfo {
  title: string
  description: object | null
  banner: File | null | string
  platforms: readonly string[]
  genre: readonly string[]
  gameMode: string
  developerName: string
  developerType: string
  // developerId?: number | null
  distributionPlatforms: readonly string[]
  tags: readonly string[] | null
  // publisherName: string;
  releaseDate: string
  gameAssets: File[] | null | string[]
}
