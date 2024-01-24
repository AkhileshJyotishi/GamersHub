import React, { useCallback, useState } from "react"
import { City, Country } from "country-state-city"

import { Errors, FilterDetail } from "@/interface/filter"
import {
  validateFileField,
  validatePhoneField,
  validateStringField,
  ValidationFunction,
  ValidationParams,
} from "@/utils/functions/validationUtils"

import Filter from "../filter/mainfilter/filter"

const StepThree = ({
  BasicInfo,
  setBasicInfo,
}: {
  BasicInfo: IBasicInfo
  setBasicInfo: React.Dispatch<React.SetStateAction<IBasicInfo>>
}) => {
  const country = Country.getAllCountries()

  const countryList = country?.map((country) => {
    return {
      label: country?.name,
      value: country?.name,
    }
  })
  const initialcitylist = [{ label: "", value: "" }]

  const [city, setCity] = useState<{ label?: string; value?: string }[]>(initialcitylist || [{}])
  const codemapping: { [key: string]: string } = {}
  country.forEach((ctry) => {
    const name = ctry.name
    const code = ctry.isoCode

    codemapping[name] = code
  })
  const [errors, setErrors] = useState<Errors<Partial<IBasicInfo>>>({
    applyMethod: null,
    bio: null,
    city: null,
    country: null,
    email: null,
    firstName: null,
    jobId: null,
    lastName: null,
    motivationToApply: null,
    phone: null,
    portfolio: null,
    resume: null,
    rolesApplied: null,
    skills: null,
  })
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
  const handleInputChange = useCallback(
    async <K extends keyof IBasicInfo>(
      field: K,
      value: IBasicInfo[K],
      validationFn: ValidationFunction<IBasicInfo[K]>,
      validationParams?: ValidationParams
    ) => {
      try {
        const validationError = value === null ? "" : await validationFn(value, validationParams)
        if (validationError) {
          setErrors((prev) => ({ ...prev, [field]: validationError }))
        } else {
          setErrors((prev) => ({ ...prev, [field]: null }))
        }
        if (field !== "resume") {
          if (field === "country") {
            handleCityOptions(codemapping[value as string])
          }
          console.log(field, " ", value)
          setBasicInfo((prevState) => ({ ...prevState, [field]: value as string[] }))
        } else {
          setBasicInfo((prevState) => ({ ...prevState, [field]: value as File }))
        }
      } catch (error) {
        console.error("Async validation error:", error)
      }
    },
    [setBasicInfo]
  )

  const BasicInfoArray: FilterDetail[] = [
    {
      title: `First Name `,
      inputType: "text",
      placeholder: "Eg: John",
      value: BasicInfo.firstName || "",
      onChange: (value) =>
        handleInputChange("firstName", value as string, validateStringField, {
          maxValue: 60,
          required: true,
        }),
      className: "bg-transparent rounded-md",
      errorMessage: errors.firstName,
    },
    {
      title: "Last Name",
      inputType: "text",
      placeholder: "Eg: Doe",
      value: BasicInfo.lastName || "",
      onChange: (value) =>
        handleInputChange("lastName", value as string, validateStringField, {
          maxValue: 60,
          required: true,
        }),
      className: "bg-transparent rounded-md",
      errorMessage: errors.lastName,
    },
    {
      title: "Email",
      inputType: "text",
      placeholder: "Eg: rockstar@gmail.com",
      value: BasicInfo.email || null,
      onChange: (value) =>
        handleInputChange("email", value as string, validateStringField, {
          maxValue: 60,
          required: true,
        }),
      className: "bg-transparent rounded-md ",
      errorMessage: errors.email,
    },
    {
      // edu.endingDate || ''
      title: "Phone Number",
      inputType: "phone",
      placeholder: "Eg: 9399376748",
      value: BasicInfo.phone,
      onChange: (value) =>
        handleInputChange("phone", value as string, validatePhoneField, { required: true }),
      className: "bg-transparent rounded-md ",
      errorMessage: errors.phone,
    },
    {
      title: "Country",
      inputType: "select",
      onChange: (value) => handleInputChange("country", value as string, validateStringField, {}),

      selectOptions: countryList,
      value: BasicInfo.country || "",
      errorMessage: errors.country,
    },

    {
      title: "City",
      inputType: "select",
      value: BasicInfo.city as string,

      onChange: (value) => handleInputChange("city", value as string, validateStringField, {}),

      selectOptions: city,
      errorMessage: errors.city,
    },
  ]

  return (
    <>
      <div className="flex p-3 gap-y-2 w-full  mx-auto flex-wrap justify-evenly mt-4">
        {BasicInfoArray?.map((field, index) => (
          <div key={index} className={`flex items-center p-2 md:gap-8 w-full sm:w-[50%] mt-[8px]`}>
            <Filter
              key={index}
              inputType={field.inputType}
              title={field.title}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              selectOptions={field.selectOptions}
              className={field.className || ""}
              element={field.element}
              Variant="flex-col w-full flex"
              errorMessage={field.errorMessage}
            />
          </div>
        ))}
        <div className="flex items-center p-2 md:gap-2 w-full mt-[8px] flex-col">
          <Filter
            title="Bio"
            inputType="text"
            value={BasicInfo.bio as string}
            onChange={(value) =>
              handleInputChange("bio", value as string, validateStringField, {
                maxValue: 200,
                required: true,
              })
            }
            className="bg-transparent rounded-md"
            Variant="flex-col w-full flex"
            element="textarea"
            errorMessage={errors.bio}
          />
        </div>
        <div className="flex items-center p-2 md:gap-2 w-full mt-[8px] flex-col">
          <Filter
            title="Motivation To Apply"
            inputType="text"
            value={BasicInfo.motivationToApply as string}
            onChange={(value) =>
              handleInputChange("motivationToApply", value as string, validateStringField, {
                maxValue: 200,
                required: true,
              })
            }
            className="bg-transparent rounded-md"
            Variant="flex-col w-full flex"
            element="textarea"
            errorMessage={errors.motivationToApply}
          />
        </div>
        <div className="flex items-center p-2 md:gap-2 w-full mt-[8px] flex-col">
          <Filter
            title="Portfolio"
            inputType="text"
            value={BasicInfo.portfolio as string}
            onChange={(value) =>
              handleInputChange("portfolio", value as string, validateStringField, {
                maxValue: 200,
                required: true,
              })
            }
            className="bg-transparent rounded-md"
            Variant="flex-col w-full flex"
            errorMessage={errors.portfolio}
          />
          <div className="text-dull text-[12px] self-start">
            *Do you have a Website/ Online portfolio that we can look at? (Copy and paste link)
          </div>
        </div>
        <div className="flex items-center p-2 md:gap-8 w-full mt-[8px] flex-col">
          <Filter
            title="Resume Upload (PDF format)"
            inputType="file"
            accept=".pdf"
            value={BasicInfo.portfolio as string}
            onChange={(value) =>
              handleInputChange("resume", value as File, validateFileField, {
                required: true,
                fileMaxSize: 1024 * 1024,
              })
            }
            Variant="flex-col w-full flex"
            className="bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center"
            errorMessage={errors.portfolio}
          />
        </div>
      </div>
    </>
  )
}

export default StepThree
