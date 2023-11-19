import { StaticImageData } from "next/image"

interface Games {
  id: number
  cover?: string | StaticImageData
  likes?: number
  banner?: string | StaticImageData
  username?: string
  title?: string
  album_slug?: string
  // slug: string;
  // className?: string;
  // authUser?: any;
  // isSavedPost?: boolean;
}

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
  description: string
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
  GameAssets: string[]
}
