interface IFAQCategory {
  id: number
  title: string
  order: number[]
  helpQuestions: IFAQQuestion[]
  position: number
}

interface IFAQQuestion {
  id: number
  solution?: string | null
  question: string
  helpCategory: IFAQCategory
  helpCategoryId: number
}
