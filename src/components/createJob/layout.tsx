import React, { useState } from "react"
import clsx from "clsx"
import { City, Country } from "country-state-city"

import { Errors, FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"

interface LayoutProps {
  children: React.ReactNode
  jobInfo: Omit<JobInfo, "userId">
  setJobInfo: React.Dispatch<React.SetStateAction<Omit<JobInfo, "userId">>>
  uploadJob: () => Promise<void>
}

const Layout: React.FC<LayoutProps> = ({ children, setJobInfo, jobInfo, uploadJob }) => {
  const country = Country.getAllCountries()

  const countryList = country?.map((country) => {
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
      initialcitylist = initcity?.map((city1) => {
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
  const handleInputChange = <K extends keyof JobInfo>(field: K, value: JobInfo[K]) => {
    // Validation logic based on the field
    switch (field) {
      case "title":
        if (typeof value === "string") {
          if (value === "") {
            setErrors((prev) => ({ ...prev, title: "*required" }))
          } else if (value.length > 11) {
            setErrors((prev) => ({ ...prev, title: "*title too long" }))
          } else {
            setErrors((prev) => ({ ...prev, title: null }))
          }
          setJobInfo((prevState) => ({ ...prevState, title: value as string }))
        }
        break

      case "jobType":
        if (typeof value === "string") {
          if (value.length === 0) {
            setErrors((prev) => ({ ...prev, jobType: "*required" }))
          } else {
            setErrors((prev) => ({ ...prev, jobType: "" }))
          }
          setJobInfo((prevState) => ({ ...prevState, jobType: value as string }))
        }
        break

      case "remote":
        setJobInfo({
          ...jobInfo,
          remote: value as boolean,
        })
        break

      case "country":
        if (typeof value === "string") {
          handleCityOptions(codemapping[value as string])
          setJobInfo({
            ...jobInfo,
            country: value as string,
          })
        }
        break

      case "city":
        if (typeof value === "string") {
          setJobInfo({
            ...jobInfo,
            city: value as string,
          })
        }
        break

      case "paymentType":
        if (typeof value === "string") {
          if (value.length === 0) {
            setErrors((prev) => ({ ...prev, paymentType: "*required" }))
          } else {
            setErrors((prev) => ({ ...prev, paymentType: "" }))
          }
          setJobInfo({
            ...jobInfo,
            paymentType: value as string,
          })
        }
        break

      case "paymentValue":
        {
          const val = typeof value === "number" ? value : Number(value)
          if (val < 0) {
            setErrors((prev) => ({ ...prev, paymentValue: "cant be negative" }))
          } else {
            setErrors((prev) => ({ ...prev, paymentValue: "" }))
          }
          setJobInfo((prevState) => ({
            ...prevState,
            paymentValue: val as number,
          }))
        }
        break

      case "expertise":
        if (typeof value === "string") {
          if (value.length === 0) {
            setErrors((prev) => ({ ...prev, expertise: "*required" }))
          } else {
            setErrors((prev) => ({ ...prev, expertise: "" }))
          }
          setJobInfo((prevState) => ({ ...prevState, expertise: value as string }))
        }
        break

      case "jobSoftwares":
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          if (value.length == 0) {
            setErrors((prev) => ({ ...prev, jobSoftwares: "*required" }))
          } else if (value.length >= 11) {
            setErrors((prev) => ({ ...prev, jobSoftwares: "*too many chosen" }))
          } else {
            setErrors((prev) => ({ ...prev, jobSoftwares: "" }))
          }

          setJobInfo((prevState) => ({ ...prevState, jobSoftwares: value as string[] }))
        }
        break

      default:
        break
    }
  }

  const [errors, setErrors] = useState<Errors<Partial<JobInfo>>>({
    title: "",
    jobType: "",
    remote: "",
    country: "",
    city: "",
    paymentType: "",
    paymentValue: "",
    banner: "",
    expertise: "",
    aboutRecruiter: "",
    description: "",
    jobDetails: "",
    jobSoftwares: "",
    publishDate: "",
    // userId:""
  })

  const initialDetailsArray: FilterDetail[] = [
    {
      title: "Title",
      inputType: "text",
      placeholder: "title...",
      value: jobInfo.title,
      onChange: (value) => handleInputChange("title", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: errors.title,
    },
    {
      title: "Job Type",
      inputType: "select",
      placeholder: "Select Job Type",
      value: jobInfo.jobType,
      onChange: (value) => handleInputChange("jobType", value as string),

      selectOptions: [
        {
          label: "Select Job Type",
          value: "",
        },
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
      ],
      className: "bg-transparent rounded-md",
      errorMessage: errors.jobType,

      // errorMessage:"errors.title"
    },
    {
      title: "Job Location *",
      inputType: "radio",
      value: jobInfo.remote,
      onChange: (value) => handleInputChange("remote", value as boolean),
      // (value) =>
      //   setJobInfo({
      //     ...jobInfo,
      //     remote: value as boolean,
      //   }),
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
      errorMessage: errors.remote,
    },
    {
      title: "Country",
      inputType: "select",
      onChange: (value) => handleInputChange("country", value as string),
      //  (value) => {
      //   handleCityOptions(codemapping[value as string])

      //   setJobInfo({
      //     ...jobInfo,
      //     country: value as string,
      //   })
      // },
      selectOptions: [{ label: "--Select a Country--", value: "" }, ...countryList],
      value: jobInfo.country || "",
      hidden: jobInfo.remote,
      errorMessage: errors.country,
    },

    {
      title: "City",
      inputType: "select",
      value: jobInfo.city as string,

      onChange: (value) => handleInputChange("city", value as string),
      //  (value) => {
      //   setJobInfo({
      //     ...jobInfo,
      //     city: value as string,
      //   })
      // },
      selectOptions: [{ label: "--Select a City--", value: "" }, ...city],
      hidden: jobInfo.remote,
      errorMessage: errors.city,
    },
    {
      title: "Expected payment",
      inputType: "select",

      onChange: (value) => handleInputChange("paymentType", value as string),
      //  (value) =>
      //   setJobInfo({
      //     ...jobInfo,
      //     paymentType: value as string,
      //     // payment: { ...jobInfo.payment, type: value as string },
      //   }),
      selectOptions: [
        {
          label: "Payment type",
          value: "",
        },
        {
          label: "Fixed price",
          value: "FIXED",
        },
        {
          label: "Hourly price",
          value: "HOURLY",
        },
        {
          label: "Negotiable",
          value: "NEGOTIABLE",
        },
      ],
      value: jobInfo.paymentType,
      errorMessage: errors.paymentType,
    },
    {
      title: "Payment Amount",
      inputType: "number",
      // type:""
      value: Number(jobInfo.paymentValue),
      onChange: (value) => {
        handleInputChange("paymentValue", value as number)
      },
      //  (value) => {
      //   const val = Number(value)

      //   setJobInfo((prevState) => ({
      //     ...prevState,
      //     paymentValue: val as number,
      //   }))
      // },
      className: "bg-transparent rounded-md",
      errorMessage: errors.paymentValue,
    },
    {
      inputType: "file",
      title: "Job Cover",
      accept: "image/*",
      multiple: false,
      value: null,
      onChange: (value) => setJobInfo((prevState) => ({ ...prevState, banner: value as File })),
      className: "",
      // errorMessage:errors.country
    },
    // {
    //   title: "Roles Needed*",
    //   inputType: "tags",
    //   onTagsChange: (tags) => setJobInfo((prevState) => ({ ...prevState, rolesNeeded: tags })),
    //   placeholder: "roles needed",
    //   // onChange: (value) =>setJobInfo({ ...jobInfo, rolesNeeded: jobInfo.rolesNeeded }),
    //   // value: roleNeedInput,
    // },
    {
      title: "Level of Expertise",
      inputType: "select",
      value: jobInfo.expertise || "",
      onChange: (value) => handleInputChange("expertise", value as string),
      // setJobInfo((prevState) => ({ ...prevState, expertise: value as string })),
      selectOptions: [
        {
          label: "Select Expertise",
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
      errorMessage: errors.expertise,
    },

    {
      title: "Software expertise needed *",
      inputType: "tags",
      onTagsChange: (value) => handleInputChange("jobSoftwares", value as string[]),
      // (tags) => {
      //   setJobInfo((prevState) => ({ ...prevState, jobSoftwares: tags }))
      // },
      placeholder: "softwares",
      errorMessage: errors.jobSoftwares,
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
          <div className="flex flex-col w-full gap-4 p-2">
            <div className="flex w-full  bg-user_interface_2 border-user_interface_3 rounded-[15px] px-[6px] py-[15px] border-[1px]">
              <Button
                className="justify-center p-2 mx-auto rounded-md bg-secondary"
                style={{ zIndex: 19 }}
                onClick={() => uploadJob()}
              >
                Upload Job
              </Button>
            </div>
            <div className="h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px]    flex">
              {initialDetailsArray?.map((filter, index) => {
                let hide = false
                ;(filter.title == "City" || filter.title == "Country") &&
                  jobInfo.remote &&
                  (hide = true)
                filter.title == "Payment Amount" &&
                  jobInfo.paymentType == "NEGOTIABLE" &&
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
                    Variant={clsx(
                      "flex flex-col items-start gap-[10px] text-[14px]",
                      hide ? "hidden" : ""
                    )}
                    errorMessage={filter.errorMessage}
                    // hidden={filter.hidden}
                  />
                )
              })}

              <>{/* {JSON.stringify(jobInfo)} */}</>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
