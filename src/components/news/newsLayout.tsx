import React, { useEffect } from "react"

// import { useRouter } from "next/router"
// import { useSession } from "next-auth/react"
// import { toast } from "react-toastify"
// import { FilterDetail } from "@/interface/filter"
import { INewsCategory } from "@/interface/news"

// import { fetchData, generateQueryParams } from "@/utils/functions"
// import PlusIcon from "@/components/icons/plus"
import TabButtons from "@/components/tabbuttons"
// import Button from "@/components/ui/button"
import Select from "@/components/ui/select"

import { BannerComponent } from "../filter"
// import NewsCategory from "./NewsCategory"
interface LayoutProps {
  children: React.ReactNode
  AllCategory?: INewsCategory[]
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  setAllCategory: React.Dispatch<React.SetStateAction<INewsCategory[] | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading?: boolean
  // jobSoftwareSuggestions?: JobSoftwareSuggestions
}

const Layout: React.FC<LayoutProps> = ({
  children,
  setActiveTab,
  activeTab,
  //ya   setNews,
  // loading,
  setLoading,
  AllCategory,
  // jobSoftwareSuggestions,
}) => {
  //   const router = useRouter()
  //   const { data: session } = useSession()
  // const initFilters = {
  //   expertise: [],
  //   remote: undefined,
  //   jobType: [],
  //   jobSoftwares: [],
  // }
  // const [newsFilters, setNewsFilters] = useState<JobFilterProps>(initFilters)
  // const [popup, setPopup] = useState<boolean>(false)
  // const [country] = useState<{ label?: string; value?: string }[]>([{}])
  // const [city, setCity] = useState<string[]>([])
  let sortBy: "payment-high-to-low" | "payment-low-to-high" | "" = ""

  // const FilterArray: FilterDetail[] = [
  //   // {
  //   //   inputType: "text",
  //   //   title: "Add Roles",
  //   //   placeholder: "Eg : 3D, Voice over artist",
  //   //   value: newsFilters?.rolesNeeded,
  //   //   onChange: (value) => setJobsFilters({ ...newsFilters, rolesNeeded: value as string }),
  //   //   className: "mt-2 bg-transparent rounded-md",
  //   // },
  //   {
  //     inputType: "checkbox",
  //     title: "Level of Expertise",
  //     selectOptions: [
  //       { label: "Entry Level", value: "ENTRY" },
  //       { label: "Intermediate", value: "INTERMEDIATE" },
  //       { label: "Expert", value: "EXPERT" },
  //     ],
  //     value: newsFilters?.expertise,
  //     onChange: (value) => setNewsFilters({ ...newsFilters, expertise: value as string[] }),
  //   },
  //   {
  //     inputType: "radio",
  //     title: "Location",
  //     selectOptions: [
  //       { label: "Remote", value: true },
  //       { label: "On Site", value: false },
  //     ],
  //     value: newsFilters?.remote,
  //     onChange: (value) => setNewsFilters({ ...newsFilters, remote: value as boolean }),
  //   },
  //   {
  //     inputType: "checkbox",
  //     title: "Job Type",
  //     selectOptions: [
  //       { label: "Full Time", value: "FULL_TIME" },
  //       { label: "Freelance", value: "FREELANCE" },
  //       { label: "Collab Job", value: "COLLAB" },
  //     ],
  //     value: newsFilters?.jobType,
  //     onChange: (value) => setNewsFilters({ ...newsFilters, jobType: value as string[] }),
  //   },
  //   {
  //     inputType: "tags",
  //     title: "Add Software",
  //     placeholder: "Eg : Blender , Illustrator",
  //     value: newsFilters?.jobSoftwares,
  //     onTagsChange: (value) => setNewsFilters({ ...newsFilters, jobSoftwares: value as string[] }),
  //     // className: "mt-2 bg-transparent rounded-md",
  //     // selectOptions: [
  //     //     ...(jobSoftwareSuggestions.software ?? []).map((s) => ({
  //     //         label: s,
  //     //         value: s,
  //     //     })),
  //     // ],
  //     // initialtags:
  //   },
  // ]

  // const searchWithFilters = async () => {
  //     const jobsFilterParams = generateQueryParams(newsFilters)
  //     setLoading(true)
  //     const x = await fetchData(`/v1/job?${jobsFilterParams}`, session?.user?.name as string, "GET")
  //     setLoading(false)
  //     toast.dismiss()
  //     if (x?.error) {
  //         toast.error(x.message)
  //     } else {
  //         const filt = x?.data.jobs.map((mp: BackendJob) => FrontendCompatibleObject(mp))
  //         setjobs(filt)
  //     }
  // }
  // const clearFilters = async () => {
  //     setNewsFilters(initFilters)
  //     setjobs(jobs ?? [])
  //     // setActiveTab()
  // }

  useEffect(() => {
    setLoading(false)
    // setNewsFilters(initFilters)
  }, [activeTab])

  return (
    <>
      <BannerComponent
        className={"w-[100%] py-[52px] text-center bg-user_interface_3 mx-auto"}
        bannerText={<>Find News : Game, creators and platform news</>}
        bannerTitle={
          <>
            {/* TODO */}
            News
            {/* Find the <span className="text-secondary"> best jobs</span> in the industry */}
          </>
        }
      />
      {/* // const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black" */}
      {/* <div className="mt-[45px] sm:px-[60px] w-[100vw] mx-auto items-center "> */}
      <div className="mt-[45px]  w-[90vw] mx-auto flex  items-center bg-user_interface_3 rounded-xl">
        <TabButtons
          tabNames={["All", ...(AllCategory?.map((n) => n.title) ?? [])]}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          className="flex-nowrap relative overflow-x-scroll no-scrollbar"
          seperator={false}
        />
        {/* {session && (
                        <Button
                            onClick={() => {
                                router.push(`/user/profile/portfolio/CreateJob`)
                            }}
                            className="flex flex-row items-center justify-center w-[80%] mt-5 md:w-fit h-fit sm:mt-0 bg-secondary py-[10px] px-[25px] rounded-xl"
                        >
                            <span className="text-sm">Post job </span>
                            <PlusIcon className="w-6 h-4 sm:h-6" />
                        </Button>
                    )} */}
      </div>
      {/* </div> */}
      <div className="mt-[45px] sm:px-[60px] w-[80%] sm:w-full mx-auto flex items-center flex-wrap gap-5">
        <div className="flex flex-col items-start md:flex-row md:items-center md:gap-6">
          <span className="hidden font-medium md:block">Sort by </span>
          <div className=" md:mt-0">
            <Select
              className="w-full md:max-w-none max-w-fit"
              name="sort-by"
              options={[
                {
                  label: "Sort by",
                  value: "",
                },
                {
                  label: "Payment: High to low",
                  value: "payment-high-to-low",
                },
                {
                  label: "Payment: Low-to-High",
                  value: "payment-low-to-high",
                },
              ]}
              value={sortBy}
              onChange={(e) => {
                sortBy = e.target.value as "" | "payment-high-to-low" | "payment-low-to-high"
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 p-2 sm:p-4 md:p-6 mt-3 w-[100%] mx-auto 3xl:p-48 ">{children}</div>
    </>
  )
}

export default Layout
