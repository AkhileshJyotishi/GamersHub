import React, { useState } from "react"
import clsx from "clsx"
import { City, Country } from "country-state-city"

import { FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"


interface LayoutProps {
  children: React.ReactNode
  jobInfo: JobInfo
  setJobInfo: React.Dispatch<React.SetStateAction<JobInfo>>
  uploadJob: () => Promise<void>
}

const Layout: React.FC<LayoutProps> = ({ children, setJobInfo, jobInfo, uploadJob }) => {
  const country = Country.getAllCountries()

  const countryList = country.map((country) => {
    return {
      label: country?.name,
      value: country?.name,
    }
  })
  const codemapping: { [key: string]: string } = {}
  country.forEach((ctry) => {
    const name = ctry.name
    const code = ctry.isoCode

    codemapping[name] = code
  })
  let initcity
  let initialcitylist = [{ label: "", value: "" }]
  if (jobInfo.country) {
    initcity = City.getCitiesOfCountry(codemapping[jobInfo.country])
    if (initcity)
      initialcitylist = initcity.map((city1) => {
        return {
          label: city1?.name,
          value: city1?.name,
        }
      })
  }
  const [city, setCity] = useState<{ label?: string; value?: string }[]>(initialcitylist || [{}])
  const handleCityOptions = (isoCode: string) => {
    const city = City.getCitiesOfCountry(isoCode)
    const cityList = city?.map((city1) => {
      return {
        label: city1?.name,
        value: city1?.name,
      }
    })
    setCity(cityList!)
    return cityList!
  }

  const initialDetailsArray: FilterDetail[] = [
    {
      title: "Job Type",
      inputType: "select",
      placeholder: "Select Job Type",
      value: jobInfo.jobType,
      onChange: (value) => setJobInfo((prevState) => ({ ...prevState, jobType: value as string })),
      selectOptions: [
        {
          label: "Freelance",
          value: "FREELANCE",
        },
        {
          label: "Full-time",
          value: "FULL_TIME",
        },
        {
          label: "Collab",
          value: "COLLAB",
        },
        {
          label: "Select Job Type",
          value: "",
        },
      ],
      className: "bg-transparent rounded-md",
    },
    {
      title: "title",
      inputType: "text",
      placeholder: "title...",
      value: jobInfo.title,
      onChange: (value) => setJobInfo((prevState) => ({ ...prevState, title: value as string })),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Job Location *",
      inputType: "radio",
      value: jobInfo.remote,
      onChange: (value) =>
        setJobInfo({
          ...jobInfo,
          remote: value as boolean,
        }),
      selectOptions: [
        {
          label: "Remote",
          value: true,
        },
        {
          label: "On site",
          value: false,
        },
      ],
    },
    {
      title: "Country",
      inputType: "select",
      onChange: (value) => {
        handleCityOptions(codemapping[value as string])

        setJobInfo({
          ...jobInfo,
          country: value as string,
        })
      },
      selectOptions: countryList,
      value: jobInfo.country || "",
      hidden: jobInfo.remote,
    },
    {
      title: "City",
      inputType: "select",
      value: jobInfo.city as string,

      onChange: (value) => {
        setJobInfo({
          ...jobInfo,
          city: value as string,
        })
      },
      selectOptions: [{ label: "--Select a City--", value: "" }, ...city],
      hidden: jobInfo.remote,
    },
    {
      title: "Expected payment",
      inputType: "select",
      onChange: (value) =>
        setJobInfo({
          ...jobInfo,
          paymentType: value as string,
          // payment: { ...jobInfo.payment, type: value as string },
        }),
      selectOptions: [
        {
          label: "Fixed price",
          value: "FIXED",
        },
        {
          label: "Hourly price",
          value: "HOURlY",
        },
        {
          label: "Negotiable",
          value: "NEGOTIABLE",
        },
        {
          label: "Payment type",
          value: "",
        },
      ],
      value: jobInfo.paymentType,
    },
    {
      title: "Payment Amount",
      inputType: "number",
      // type:""
      value: Number(jobInfo.paymentValue),
      onChange: (value) => {
        const val = Number(value)

        setJobInfo((prevState) => ({
          ...prevState,
          paymentValue: val as number,
        }))
      },
      className: "bg-transparent rounded-md",
    },
    {
      inputType: "file",
      title: "Game Cover",
      accept: "image/*",
      multiple: false,
      value: jobInfo.banner as string,
      onChange: (value) => setJobInfo((prevState) => ({ ...prevState, banner: value as File })),
      className: "",
    },
    // {
    //     title: "Roles Needed*",
    //     inputType: "tags",
    //     onTagsChange: (tags) => setJobInfo((prevState) => ({ ...prevState, rolesNeeded: tags })),
    //     placeholder: 'roles needed',
    //     // onChange: (value) =>setJobInfo({ ...jobInfo, rolesNeeded: jobInfo.rolesNeeded }),
    //     // value: roleNeedInput,
    // },
    {
      title: "Level of Expertise",
      inputType: "select",
      value: jobInfo.expertise || "",
      onChange: (value) =>
        setJobInfo((prevState) => ({ ...prevState, expertise: value as string })),
      selectOptions: [
        {
          label: "Expertise",
          value: "",
        },
        {
          label: "Entry Level",
          value: "ENTRY",
        },
        {
          label: "Intermediate",
          value: "INTERMEDIATE",
        },
        {
          label: "Expert",
          value: "EXPERT",
        },
      ],
    },
    {
      title: "Software expertise needed *",
      inputType: "tags",
      onTagsChange: (tags) => {
        setJobInfo((prevState) => ({ ...prevState, jobSoftwares: tags }))
      },
      placeholder: "softwares",
      initialtags: jobInfo.jobSoftwares,
    },
  ]

  return (
    <>
      <div className="flex gap-4 p-6 mt-3 w-[100%] mx-auto md:flex-row flex-col items-center md:items-start">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex md:flex-row justify-center min-w-[280px] md:sticky top-[61px] h-fit flex-col"
          )}
        >
          <div className="h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px]    flex">
            {initialDetailsArray?.map((filter, index) => {
              let hide = false
              ;(filter.title == "City" || filter.title == "Country") &&
                jobInfo.remote &&
                (hide = true)

              return (
                <Filter
                  key={index}
                  inputType={filter.inputType}
                  title={filter.title}
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={filter.onChange}
                  onTagsChange={filter.onTagsChange}
                  selectOptions={filter.selectOptions}
                  className={filter.className}
                  initialtags={filter.initialtags}
                  Variant={clsx(
                    "flex flex-col items-start gap-[10px] text-[14px]",
                    hide ? "hidden" : ""
                  )}

                  // hidden={filter.hidden}
                />
              )
            })}

            <Button className="p-2 bg-secondary" onClick={() => uploadJob()}>
              update Job
            </Button>
            <>{/* {JSON.stringify(jobInfo)} */}</>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
