import { GamesFilterProps } from "./games"

interface Props {
  jwt?: string
  auth_user?: Allow
  seo?: Allow
  jobs?: Allow[]
  jobsMeta?: Allow
  defaultAndFilter?: Allow
  defaultPageSize?: number
  className: string
}

// auth_user,

// jobs: defaultJobs,
// jobsMeta: defaultJobsMeta,

// className:string

// seo,
// defaultAndFilter,
// defaultPageSize,
interface filterprops {
  // Function to clear the applied filters
  clearFilters?: () => void
  Filters?: JobFilterProps | GamesFilterProps | CreatorsFilterProps | FiltersState
  searchWithFilters?: () => void
  setFilters?:
    | React.Dispatch<React.SetStateAction<JobFilterProps>>
    | React.Dispatch<React.SetStateAction<CreatorsFilterProps>>
    | React.Dispatch<React.SetStateAction<GamesFilterProps>>
  // CreatorsFilterProps
  FilterArray?: FilterDetail[]
  country?: { label?: string; value?: string }[]

  setCountry?: React.Dispatch<React.SetStateAction<{ label?: string; value?: string }[]>>
  city?: string[]
  setCity?: React.Dispatch<React.SetStateAction<string[]>>
}

interface FilterDetail<SO = { label: string; value: string | boolean | number }> {
  title: string
  inputType: "text" | "checkbox" | "radio" | "select" | "date" | "tags" | "file" | "number"
  onTagsChange?: (tags: string[]) => void
  placeholder?: string
  value?: string | boolean | Date | number | null
  selectOptions?: { label?: SO["label"]; value?: SO["value"] }[]
  onChange?: (value: string | boolean | Date | number | File) => void
  className?: string
  Variant?: string
  accept?: string
  multiple?: boolean
  initialtags?: string[]
  hidden?: boolean
  preview?: boolean
  errorMessage?: string | null
  // this should be optimised and generalised later  , i have passed dimension from file creatportfolio just for sake of easeness
  dimensionsImage?: {
    height: number | null
    width: number | null
  }
  fullScreen?: boolean
}
type Errors<T> = {
  [K in keyof T]: string | null
}
