// import { BannerComponent } from '@/components/filter/filterbanner'
import React, { useEffect, useState } from "react"
import { Country } from "country-state-city"
import { useRouter } from "next/navigation"

import { FilterDetail } from "@/interface/filter"

import BannerComponent from "@/components/filter/filterbanner"
import PlusIcon from "@/components/icons/plus"
import TabButtons from "@/components/tabbuttons"
import Button from "@/components/ui/button"

import { DesktopFilter, FilterMobileDialog } from "../filter"

interface creatorLayoutProps {
  children: React.ReactNode
  creators: Creator[]
  setCreators: React.Dispatch<React.SetStateAction<Creator[]>>
}
const Layout: React.FC<creatorLayoutProps> = ({ children }) => {
  const router = useRouter()
  const [popup, setPopup] = useState<boolean>(false)

  const [country, setCountry] = useState<{ label?: string; value?: string }[]>([{}])
  const [city, setCity] = useState<string[]>([])
  const clearFilters = () => {
    setCreatorsFilter({
      searchText: "",
      skills: "",
      softwares: "",
      country: "",
      city: "",
    })
    // defaultJobs ||
    // setJobs([]);
    // setJobsMeta("defaultJobsMeta");
  }

  const [creatorsFilters, setCreatorsFilter] = useState<CreatorsFilterProps>({
    searchText: "",
    skills: "",
    softwares: "",
    country: "",
    city: "",
  })

  const filterArray2: FilterDetail[] = [
    {
      inputType: "text",
      title: "skills of professtionals",
      placeholder: "3D sfx voice over",
      value: creatorsFilters?.skills,
      onChange: (value) => setCreatorsFilter({ ...creatorsFilters, skills: value as string }),
      className: "mt-2 bg-transparent rounded-md",
    },
    {
      inputType: "text",
      title: "Software",
      placeholder: "Blender audacity etc ",
      value: creatorsFilters?.softwares,
      onChange: (value) => setCreatorsFilter({ ...creatorsFilters, softwares: value as string }),
      className: "mt-2 bg-transparent rounded-md",
    },

    {
      inputType: "select",
      title: "Location of professional",
      placeholder: "Select a Country",
      value: creatorsFilters?.country,
      onChange: (value) =>
        setCreatorsFilter({
          ...creatorsFilters,
          country: value as string,
        }),
      className: "",
      selectOptions: country,
    },
  ]
  // const searchWithFilters = async () => {
  //   try {
  //   } catch (error) {}
  // }

  useEffect(() => {
    const country = Country.getAllCountries()

    const countryList = country.map((country) => {
      return {
        label: country?.name,
        value: country?.name,
      }
    })
    setCountry(countryList)
  }, [])
  return (
    <>
      <BannerComponent
        className={"w-[100%] py-[52px] text-center bg-user_interface_3 mx-auto"}
        bannerText={
          <>
            Find the world’s best game creators here – the largest <br /> independent community
            gamecreators
          </>
        }
        bannerTitle={
          <>
            Find game creator’s <span className="text-secondary"> Portfolios</span>
          </>
        }
      />

      <div className="mt-[45px] sm:px-[60px] w-[100%] mx-auto items-center ">
        <div className="flex flex-col items-center justify-between sm:flex-row ">
          <TabButtons tabNames={["Trending", "Latest", "Saved"]} />
          {
            <Button
              onClick={() => {
                router.push(`/jobs/add-project`)
              }}
              // variant="primary"
              className="flex flex-row items-center justify-center w-[80%] mt-5 md:w-fit h-fit sm:mt-0 bg-secondary py-[10px] px-[25px] rounded-xl"
            >
              <span className="text-sm">Add Project</span>
              <PlusIcon className="w-6 h-4 sm:h-6" />
            </Button>
          }
        </div>
      </div>
      <div className="mt-[45px] sm:px-[60px] w-[80%] sm:w-full mx-auto flex items-center flex-wrap gap-5">
        <Button
          onClick={() => {
            setPopup(!popup)
          }}
          className="flex gap-2 px-3 border-2 border-green-900 text-secondary rounded-3xl md:hidden"
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
          <div className="mt-[10px]">Filters</div>
        </Button>
      </div>
      <div className="flex gap-4 p-6 mt-3 w-[100%] mx-auto">
        <DesktopFilter
          className={"hidden md:flex"}
          key={1}
          clearFilters={clearFilters}
          Filters={creatorsFilters}
          // searchWithFilters={searchWithFilters}
          setFilters={setCreatorsFilter}
          FilterArray={filterArray2}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
        />
        <FilterMobileDialog
          clearFilters={clearFilters}
          Filters={creatorsFilters}
          // searchWithFilters={searchWithFilters}
          setFilters={setCreatorsFilter}
          popup={popup}
          setPopup={setPopup}
          FilterArray={filterArray2}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
        />
        {children}
      </div>
    </>
  )
}

export default Layout
