import React, { useCallback, useState } from "react"
import clsx from "clsx"
import { City, Country } from "country-state-city"
import { toast } from "react-toastify"

import { Errors, FilterDetail } from "@/interface/filter"
import {
  validateBooleanField,
  // validateFileField,
  validateNumberField,
  validateStringArrayField,
  validateStringField,
  ValidationFunction,
  ValidationParams,
} from "@/utils/functions/validationUtils"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"

interface LayoutProps {
  children: React.ReactNode
  jobInfo: Omit<JobInfo, "userId">
  setJobInfo: React.Dispatch<React.SetStateAction<Omit<JobInfo, "userId">>>
  uploadJob: () => Promise<void>
  jobSoftwareSuggestions?: JobSoftwareSuggestions
}

const Layout: React.FC<LayoutProps> = ({
  children,
  setJobInfo,
  jobInfo,
  uploadJob,
  jobSoftwareSuggestions,
}) => {
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
  const [dimensions] = useState<{
    height: number | null
    width: number | null
  }>({
    height: null,
    width: null,
  })
  const handleInputChange = useCallback(
    async <K extends keyof JobInfo>(
      field: K,
      value: JobInfo[K],
      validationFn: ValidationFunction<JobInfo[K]>,
      validationParams?: ValidationParams
    ) => {
      // Validation logic based on the field
      setTouched(true)
      try {
        const validationError = value === null ? "" : await validationFn(value, validationParams)
        if (validationError) {
          setErrors((prev) => ({ ...prev, [field]: validationError }))
        } else {
          setErrors((prev) => ({ ...prev, [field]: null }))
        }
        if (field !== "banner") {
          if (field === "country") {
            handleCityOptions(codemapping[value as string])
          }
          setJobInfo((prevState) => ({ ...prevState, [field]: value as string[] }))
        } else {
          setJobInfo((prevState) => ({ ...prevState, [field]: value as File }))
        }
      } catch (error) {
        console.error("Async validation error:", error)
      }
    },
    [setJobInfo]
  )

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
  const [touched, setTouched] = useState<boolean>(false)

  const uploadJobHandler = async () => {
    let flg = true

    const validationPromises = Object.entries(jobInfo).map(async ([field, value]) => {
      let validationFunction: (x: Allow, y: Allow) => string | Promise<string>
      const validationParams = getValidationParamsForField(field)
      switch (field) {
        case "title":
        case "jobType":
        case "country":
        case "city":
        case "paymentType":
        case "expertise":
          validationFunction = validateStringField
          flg === true && validationFunction(value, validationParams) === ""
            ? (flg = true)
            : (flg = false)

          setErrors((prev) => ({
            ...prev,
            [field]: validationFunction(value as string, validationParams),
          }))
          break

        // case "banner": {
        //   validationFunction = validateFileField
        //   const y = await validationFunction(value, validationParams)
        //   flg === true && y === "" ? (flg = true) : (flg = false)
        //   setErrors((prev) => ({ ...prev, [field]: y }))
        //   break
        // }
        case "remote": {
          validationFunction = validateBooleanField
          const z = await validationFunction(value, validationParams)
          flg === true && z === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: z }))
          break
        }
        case "paymentValue": {
          validationFunction = validateNumberField
          const d = await validationFunction(value, validationParams)
          flg === true && d === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: d }))
          break
        }
        case "jobSoftwares": {
          validationFunction = validateStringArrayField
          const w = await validationFunction(value, validationParams)
          flg === true && w === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: w }))
          break
        }
        default:
          break
      }
    })
    await Promise.all(validationPromises)
    if (flg) {
      await uploadJob()
    } else {
      toast.dismiss()
      toast.info("Please fill the details Correctly")
    }
  }

  const initialDetailsArray: FilterDetail[] = [
    {
      title: "Title",
      inputType: "text",
      placeholder: "Enter a Title...",
      value: jobInfo.title,
      onChange: (value) =>
        handleInputChange("title", value as string, validateStringField, {
          maxLength: 60,
          required: true,
        }),
      className: "bg-transparent rounded-md",
      errorMessage: errors.title,
    },
    {
      title: "Job Type",
      inputType: "select",
      placeholder: "Select Job Type",
      value: jobInfo.jobType,
      onChange: (value) =>
        handleInputChange("jobType", value as string, validateStringField, { required: true }),

      selectOptions: [
        // {
        //   label: "Select Job Type",
        //   value: "",
        // },
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
    },
    {
      title: "Job Location *",
      inputType: "radio",
      value: jobInfo.remote,
      onChange: (value) => handleInputChange("remote", value as boolean, validateBooleanField),

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
      onChange: (value) => handleInputChange("country", value as string, validateStringField, {}),
      placeholder: "Enter a Country",
      selectOptions: [{ label: "--Select a Country--", value: "" }, ...countryList],
      value: jobInfo.country || "",
      hidden: jobInfo.remote,
      errorMessage: errors.country,
    },

    {
      title: "City",
      inputType: "select",
      value: jobInfo.city as string,
      placeholder: "Enter a City",
      onChange: (value) => handleInputChange("city", value as string, validateStringField, {}),

      selectOptions: city,
      hidden: jobInfo.remote,
      errorMessage: errors.city,
    },
    {
      title: "Expected payment",
      inputType: "select",

      onChange: (value) =>
        handleInputChange("paymentType", value as string, validateStringField, { required: true }),
      placeholder: "Expected Payment",

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
        handleInputChange("paymentValue", Number(value) as number, validateNumberField, {
          required: true,
          minValue: 0,
        })
      },
      placeholder: "Select Expertise",

      className: "bg-transparent rounded-md",
      errorMessage: errors.paymentValue,
    },
    // {
    //   inputType: "file",
    //   title: "Job Cover",
    //   accept: "image/*",
    //   multiple: false,
    //   value: null,
    //   onChange: (value) =>
    //     handleInputChange("banner", value as File, validateFileField, {
    //       required: true,
    //       fileMaxSize: 1024 * 1024,
    //     }),
    //   className: "",
    //   errorMessage: errors.banner,
    // },

    {
      title: "Level of Expertise",
      inputType: "select",
      value: jobInfo.expertise || "",
      onChange: (value) =>
        handleInputChange("expertise", value as string, validateStringField, { required: true }),
      // setJobInfo((prevState) => ({ ...prevState, expertise: value as string })),
      selectOptions: [
        // {
        //   label: "Select Expertise",
        //   value: "",
        // },
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
      placeholder: "Enter Expertise",

      errorMessage: errors.expertise,
    },

    {
      title: "Software expertise needed *",
      inputType: "tags",
      onTagsChange: (value) =>
        handleInputChange("jobSoftwares", value as string[], validateStringArrayField, {
          required: true,
          maxLength: 10,
        }),
      value: jobInfo.jobSoftwares || [],
      selectOptions: [
        ...((jobSoftwareSuggestions && jobSoftwareSuggestions.software) ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
      placeholder: "Blender, Unreal Engine etc. ",
      errorMessage: errors.jobSoftwares,
    },
  ]
  const getValidationParamsForField = (field: string): ValidationParams => {
    // Define validation parameters for each field
    const validationParams: Record<string, ValidationParams> = {
      title: { required: true, maxLength: 60 },
      jobType: { required: true },
      remote: {},
      country: {},
      city: {},
      paymentType: { required: true },
      paymentValue: { required: true, minValue: 0 },
      banner: { required: true, fileMaxSize: 1024 * 1024 },
      expertise: { required: true },
      jobSoftwares: { required: true, maxLength: 10 },
    }

    return validationParams[field] || {}
  }
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
                className="justify-center p-2 mx-auto rounded-md bg-secondary disabled:cursor-not-allowed"
                style={{ zIndex: 19 }}
                onClick={() => {
                  const hasErrors = Object.values(errors).some(
                    (error) => !(error === null || error == "")
                  )
                  if (hasErrors) {
                    toast.dismiss()
                    // If there are errors, do not proceed with the upload
                    toast.error("Cannot upload. Please fix errors first")
                    return
                  } else {
                    uploadJobHandler()
                  }
                }}
                disabled={touched ? false : true}
              >
                Post Job
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
                    dimensionsImage={dimensions}
                    errorMessage={filter.errorMessage}
                  />
                )
              })}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
