declare interface Isocials {
  twitter?: string | null
  facebook?: string | null
  linkedin?: string | null
  youtube?: string | null
  github?: string | null
  portfolio?: string | null
  artstation?: string | null
}

declare interface IDetails {
  country?: string | null
  city?: string | null
  userBio?: string | null
  userEducation?: IuserEducation[]
  userExperience?: IuserExperience[]
  userSkills: IuserSkill[]
  userSoftwares?: IuserSoftware[]
}

declare interface IsettingsDetails {
  details: IDetails
  skill: IuserSkill[]
  software: IuserSoftware[]
  socials: Isocials
}

declare interface IuserEducation {
  id?: number
  university: string
  degree: string
  startingDate: Date | null // Assuming ISO date string
  endingDate?: Date | null // Assuming ISO date string or null
  description?: string | null
}
declare interface IuserExperience {
  id?: number
  company: string
  role: string
  presentWorking?: boolean
  startingDate: Date | null // Assuming ISO date string
  endingDate?: Date | null // Assuming ISO date string or null
  description?: string | null
}
declare interface IuserSkill {
  skill: string
}

declare interface IuserSoftware {
  software?: string
}
