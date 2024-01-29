import React, { useCallback, useEffect, useMemo, useState } from "react"
import { City, Country } from "country-state-city"
import { toast } from "react-toastify"

import { Errors, FilterDetail } from "@/interface/filter"
import {
  validateEmailField,
  // validateFileField,
  validatePdfField,
  validatePhoneField,
  validateStringArrayField,
  validateStringField,
  validateURLField,
  ValidationFunction,
  ValidationParams,
} from "@/utils/functions/validationUtils"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"

const StepThree = ({
  BasicInfo,
  setBasicInfo,
  onSubmit,
}: {
  BasicInfo: IBasicInfo
  setBasicInfo: React.Dispatch<React.SetStateAction<IBasicInfo>>
  onSubmit: () => Promise<void>
}) => {
  const country = useMemo(() => Country.getAllCountries(), [])
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false)
  const countryList = useMemo(
    () =>
      country?.map((country) => {
        return {
          label: country?.name,
          value: country?.name,
        }
      }),
    []
  )
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
    const cityList = city
      ?.filter((city, idx) => idx <= 2000)
      .map((city1) => {
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
          maxLength: 60,
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
          maxLength: 60,
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
        handleInputChange("email", value as string, validateEmailField, {
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
      placeholder: "Select a Country",
      selectOptions: countryList,
      value: BasicInfo.country || "",
      errorMessage: errors.country,
    },

    {
      title: "City",
      inputType: "select",
      value: BasicInfo.city || "",
      placeholder: "Select a City",

      onChange: (value) => handleInputChange("city", value as string, validateStringField, {}),

      selectOptions: city,
      errorMessage: errors.city,
    },
  ]
  const applyJobHandler = async () => {
    setIsSubmitDisabled(true)
    let flg = true

    const validationPromises = Object.entries(BasicInfo).map(async ([field, value]) => {
      let validationFunction: (x: Allow, y: Allow) => string | Promise<string>
      const validationParams = getValidationParamsForField(field)
      switch (field) {
        case "firstName":
        case "lastName":
        case "country":
        case "city":
        case "bio":
        case "motivationToApply": {
          validationFunction = validateStringField
          flg === true && validationFunction(value, validationParams) === ""
            ? (flg = true)
            : (flg = false)

          setErrors((prev) => ({
            ...prev,
            [field]: validationFunction(value as string, validationParams),
          }))
          break
        }
        case "email": {
          validationFunction = validateEmailField
          const z = await validationFunction(value, validationParams)
          flg === true && z === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: z }))
          break
        }

        case "portfolio": {
          validationFunction = validateURLField
          const p = await validationFunction(value, validationParams)
          flg === true && p === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: p }))
          break
        }

        case "phone": {
          validationFunction = validatePhoneField
          const x = await validationFunction(value, validationParams)
          flg === true && x === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: x }))
          break
        }

        case "skills": {
          validationFunction = validateStringArrayField
          const w = await validationFunction(value, validationParams)
          flg === true && w === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: w }))
          break
        }
        case "rolesNeeded": {
          validationFunction = validateStringArrayField
          const w = await validationFunction(value, validationParams)
          flg === true && w === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: w }))
          break
        }

        case "resume": {
          validationFunction = validatePdfField
          const a = await validationFunction(value, validationParams)
          flg === true && a === "" ? (flg = true) : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: a }))
          break
        }

        default:
          break
      }
    })
    await Promise.all(validationPromises)
    if (flg) {
      await onSubmit()
      setIsSubmitDisabled(false)
    } else {
      toast.dismiss()
      toast.info("Please fill the details Correctly")
      setIsSubmitDisabled(false)
    }
  }
  const getValidationParamsForField = (field: string): ValidationParams => {
    // Define validation parameters for each field
    const validationParams: Record<string, ValidationParams> = {
      motivationToApply: { required: true, maxLength: 200 },
      rolesApplied: { required: true },
      applyMethod: { required: true },
      bio: { required: true, maxLength: 200 },
      email: { required: true },
      firstName: { required: true, maxLength: 60 },
      lastName: { required: true, maxLength: 60 },
      phone: { required: true },
      portfolio: { required: true },
      resume: { required: true, fileMaxSize: 5 * 1024 * 1024 },
      skills: { required: true, maxLength: 10 },
      country: {},
      city: {},
    }

    return validationParams[field] || {}
  }
  useEffect(() => {
    handleCityOptions(codemapping[BasicInfo.country as string])
  }, [])
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
              onTagsChange={field.onTagsChange}
            />
          </div>
        ))}
        <div className="flex items-center p-2 md:gap-8 w-full mt-[8px] flex-col">
          <Filter
            title="Skills"
            inputType="tags"
            placeholder="E.g. React , Next"
            onTagsChange={(value) => {
              handleInputChange("skills", value, validateStringArrayField, {
                required: true,
                maxLength: 10,
              })
            }}
            value={BasicInfo.skills as string[]}
            Variant="flex-col w-full flex"
            className="bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center"
            errorMessage={errors.skills}
          />
        </div>
        <div className="flex items-center p-2 md:gap-2 w-full mt-[8px] flex-col">
          <Filter
            title="Bio"
            inputType="text"
            value={BasicInfo.bio as string}
            onChange={(value) =>
              handleInputChange("bio", value as string, validateStringField, {
                maxLength: 200,
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
                maxLength: 200,
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
              handleInputChange("portfolio", value as string, validateURLField, {
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
            value={BasicInfo.resume as string}
            onChange={(value) =>
              handleInputChange("resume", value as File, validatePdfField, {
                required: true,
                fileMaxSize: 4 * 1024 * 1024,
              })
            }
            Variant="flex-col w-full flex"
            className="bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center"
            errorMessage={errors.resume}
          />
        </div>
        <Button
          disabled={isSubmitDisabled}
          className={
            "transition-all  p-2 disabled:bg-[#00B87D90]  bg-secondary hover:opacity-80  rounded-md text-text"
          }
          onClick={applyJobHandler}
        >
          {isSubmitDisabled ? "Submitting" : "Submit Application"}
        </Button>
      </div>
    </>
  )
}

export default StepThree
