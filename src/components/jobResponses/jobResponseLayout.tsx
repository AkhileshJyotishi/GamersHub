// import { BannerComponent } from '@/components/filter/filterbanner'
import React, { useEffect, useState } from "react"
import { Country } from "country-state-city"
import _ from "lodash"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { FilterDetail } from "@/interface/filter"
import { fetchData, generateQueryParams } from "@/utils/functions"

import Button from "@/components/ui/button"

import { DesktopFilter, FilterMobileDialog } from "../filter"
import TabButtons from "../NewtabButtons"

interface creatorLayoutProps {
  children: React.ReactNode
  jobTitle: string
  jobResponses: jobApplications[]
  jobApplicants: jobApplications[]
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  setJobResponses: React.Dispatch<React.SetStateAction<jobApplications[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading?: boolean
  customJobResponseTags: ICustomJobResponseTags
}
const Layout: React.FC<creatorLayoutProps> = ({
  children,
  setActiveTab,
  activeTab,
  jobTitle,
  jobApplicants,
  setJobResponses,
  setLoading,
  loading,
  customJobResponseTags,
}) => {
  const [popup, setPopup] = useState<boolean>(false)
  const session = useSession()
  const router = useRouter()
  const [country, setCountry] = useState<{ label?: string; value?: string }[]>([{}])
  // const [city, setCity] = useState<string[]>([])
  const initFilters = {
    userSkills: [],
    userSoftwares: [],
    country: "",
    rolesApplied: [],
  }
  const [jobResponseFilters, setjobResponseFilters] = useState<JObResponseFilterProps>(initFilters)

  const filterArray2: FilterDetail[] = [
    {
      inputType: "tags",
      title: "Skills of professionals",
      placeholder: "3D, sfx city ,Voice Over",
      value: jobResponseFilters?.userSkills,
      onTagsChange: (value) =>
        setjobResponseFilters({ ...jobResponseFilters, userSkills: value as string[] }),
      className: "mt-2 bg-transparent rounded-md",
      selectOptions: [
        ...(customJobResponseTags.skill ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },
    {
      inputType: "tags",
      title: "Software",
      placeholder: "Blender, audacity etc ",
      value: jobResponseFilters?.userSoftwares,
      onTagsChange: (value) =>
        setjobResponseFilters({ ...jobResponseFilters, userSoftwares: value as string[] }),
      className: "mt-2 bg-transparent rounded-md",
      selectOptions: [
        ...(customJobResponseTags.software ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },

    {
      inputType: "select",
      title: "Location of Professional",
      placeholder: "Select a Country",
      value: jobResponseFilters?.country,
      onChange: (value) =>
        setjobResponseFilters({
          ...jobResponseFilters,
          country: value as string,
        }),
      className: "",
      selectOptions: country,
    },
    {
      inputType: "tags",
      title: "Roles Applied",
      placeholder: "Eg. Designer etc ",
      value: jobResponseFilters?.rolesApplied,
      onTagsChange: (value) =>
        setjobResponseFilters({ ...jobResponseFilters, rolesApplied: value as string[] }),
      className: "mt-2 bg-transparent rounded-md",
      selectOptions: [
        ...(customJobResponseTags.rolesApplied ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },
  ]
  const searchWithFilters = async () => {
    if (_.isEqual(initFilters, jobResponseFilters)) {
      toast.dismiss()
      toast.info("Same search Or empty Search")
      return
    }
    const JobResponseFilterParams = generateQueryParams(jobResponseFilters)
    setLoading(true)
    let x
    if (session) {
      x = await fetchData(
        `/v1/job/jobApplications/${router.query.slug}?${JobResponseFilterParams}`,
        session.data?.user?.name as string,
        "GET"
      )
    }
    setLoading(false)
    toast.dismiss()
    if (x?.error) {
      toast.error(x.message)
    } else {
      // const filt = x?.data.creators.map((mp: Creator) => FrontendCompatibleObject(mp))
      console.log("creators ", x?.data.applications)
      setJobResponses(x?.data.applications)
    }
  }
  const clearFilters = () => {
    setjobResponseFilters(initFilters)
    setJobResponses(jobApplicants)
  }

  useEffect(() => {
    const country = Country.getAllCountries()

    const countryList = country?.map((country) => {
      return {
        label: country?.name,
        value: country?.name,
      }
    })
    setCountry(countryList)
  }, [])
  useEffect(() => {
    clearFilters()
  }, [activeTab])
  return (
    <>
      <div className={"p-4 w-[100%] py-[52px] bg-user_interface_3 mx-auto"}>
        <div className=" text-[18px] px-4 text-user_interface_6 ">Job Responses</div>
        <div className=" text-[34px] font-[700] px-4 text-text ">{jobTitle}</div>
      </div>
      <div className="mt-[45px] sm:px-[60px] w-[100%] mx-auto items-center ">
        <div className="flex flex-col items-center justify-between sm:flex-row ">
          <TabButtons
            seperator={false}
            tabNames={["Applied Manually", "Applied through GCH"]}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>

      <div className="mt-[45px] sm:px-[60px] w-[80%] sm:w-full mx-auto flex items-center flex-wrap gap-5">
        <Button
          onClick={() => {
            setPopup(!popup)
          }}
          className="flex gap-2 px-3 mx-auto border-2 border-green-900 text-secondary rounded-3xl md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 117.824"
            fill="none"
            stroke="green"
            className="w-4 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
              d="M122.774,16.459L122.774,16.459c0,5.393-4.412,9.805-9.805,9.805H92.202 c1.457-2.919,2.278-6.212,2.278-9.697c0-3.571-0.861-6.941-2.387-9.913h20.876C118.362,6.654,122.774,11.066,122.774,16.459 L122.774,16.459z M89.306,101.257c0,9.15-7.418,16.567-16.568,16.567s-16.567-7.417-16.567-16.567 c0-9.149,7.417-16.567,16.567-16.567S89.306,92.107,89.306,101.257L89.306,101.257z M122.869,101.148L122.869,101.148 c0,5.393-4.413,9.805-9.806,9.805H92.202c1.457-2.919,2.278-6.212,2.278-9.696c0-3.571-0.861-6.941-2.387-9.913h20.97 C118.457,91.344,122.869,95.756,122.869,101.148L122.869,101.148z M53.272,110.953H9.816c-5.393,0-9.805-4.412-9.805-9.805l0,0 c0-5.393,4.412-9.805,9.805-9.805h43.565c-1.525,2.972-2.387,6.342-2.387,9.913C50.994,104.741,51.815,108.034,53.272,110.953 L53.272,110.953z M28.326,58.717c0,9.149,7.418,16.567,16.568,16.567c9.149,0,16.567-7.418,16.567-16.567 c0-9.15-7.418-16.568-16.567-16.568C35.744,42.148,28.326,49.566,28.326,58.717L28.326,58.717z M0,58.608L0,58.608 c0,5.393,4.414,9.805,9.805,9.805h15.675c-1.457-2.92-2.278-6.169-2.278-9.696c0-3.528,0.861-6.941,2.387-9.914H9.805 C4.412,48.803,0,53.215,0,58.608L0,58.608z M64.409,68.413h48.666c5.392,0,9.805-4.412,9.805-9.805l0,0 c0-5.394-4.412-9.806-9.805-9.806H64.301c1.525,2.973,2.387,6.386,2.387,9.914C66.688,62.244,65.866,65.493,64.409,68.413 L64.409,68.413z M89.306,16.567c0,9.15-7.418,16.567-16.568,16.567S56.17,25.718,56.17,16.567C56.17,7.417,63.587,0,72.737,0 S89.306,7.417,89.306,16.567L89.306,16.567z M53.272,26.264H9.853c-5.393,0-9.805-4.413-9.805-9.805l0,0 c0-5.393,4.412-9.805,9.805-9.805h43.528c-1.525,2.972-2.387,6.342-2.387,9.913C50.994,20.052,51.815,23.345,53.272,26.264 L53.272,26.264z"
            />
          </svg>
          <div className="mt-[10px] ">Filters</div>
        </Button>
      </div>
      <div className="flex md:gap-4 sm:p-4 md:p-6 mt-3 w-[100%] mx-auto ">
        <DesktopFilter
          className={"hidden md:flex"}
          key={1}
          clearFilters={clearFilters}
          Filters={jobResponseFilters}
          searchWithFilters={searchWithFilters}
          setFilters={setjobResponseFilters}
          FilterArray={filterArray2}
          country={country}
          setCountry={setCountry}
          loading={loading}
        />
        <FilterMobileDialog
          clearFilters={clearFilters}
          Filters={jobResponseFilters}
          searchWithFilters={searchWithFilters}
          setFilters={setjobResponseFilters}
          popup={popup}
          setPopup={setPopup}
          FilterArray={filterArray2}
          country={country}
          setCountry={setCountry}
          loading={loading}
        />
        {children}
      </div>
    </>
  )
}

export default Layout
