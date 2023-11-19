import React, { useState } from "react"
// import clsx from "clsx"
import { City, Country } from "country-state-city"

import { FilterDetail } from "@/interface/filter"

import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"

import { uploadUserEducation, uploadUserExperience } from "./editprofileHandler"
import EducationSection from "./EducationSection"
import ExperienceSection from "./ExperienceSection"
import ProfileSection from "./profileSection"

const EditProfilePage = ({
  profileDetails,
  allSkills,
  allSoftwares,
}: {
  profileDetails: IDetails
  allSkills: IuserSkill[]
  allSoftwares: IuserSoftware[]
}) => {
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
  if (profileDetails.country) {
    initcity = City.getCitiesOfCountry(codemapping[profileDetails.country])
    if (initcity)
      initialcitylist = initcity.map((city1) => {
        return {
          label: city1?.name,
          value: city1?.name,
        }
      })
  }

  const [city, setCity] = useState<{ label?: string; value?: string }[]>(initialcitylist || [{}])

  const [profileData, setprofileData] = useState({
    userBio: profileDetails?.userBio,
    country: profileDetails?.country,
    city: profileDetails?.city,
    userSkills: profileDetails?.userSkills,
  })
  const initialskillstags = profileDetails.userSkills
    ? profileDetails?.userSkills?.map((userskill) => userskill.skill)
    : []
  const initialsoftwaretags =
    profileDetails.userSoftwares && profileDetails?.userSoftwares.length > 0
      ? profileDetails?.userSoftwares?.map((usersofware) => usersofware.software as string)
      : []

  // console.log("initialskillstags ", initialskillstags)
  const [experience, setExperience] = useState<IuserExperience[]>(
    profileDetails.userExperience || []
  )

  const [education, setEducation] = useState<IuserEducation[]>(profileDetails.userEducation || [])

  const [, setSelectedTags] = useState<string[]>([])
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

  const handleFieldChange = (key: string, value: string) => {
    setprofileData((prevState) => ({ ...prevState, [key]: value }))
    if (key == "country") {
      handleCityOptions(codemapping[value])
    }
  }

  const addExperience = () => {
    console.log("working")
    setnewexperience((prevExperience) => [
      ...prevExperience,
      {
        id: -1,
        company: "",
        role: "",
        startingDate: null,
        endingDate: null,
        description: "",
      },
    ])
  }
  const [newExperience, setnewexperience] = useState<IuserExperience[]>([
    {
      id: -1,
      company: "",
      role: "",
      startingDate: null,
      endingDate: null,
      description: "",
      presentWorking: false,
    },
  ])
  const removenewExperience = (index: number) => {
    setnewexperience((prevExperience) => prevExperience.filter((_, i) => i !== index))
  }
  const removenewEducation = (index: number) => {
    setnewEducation((prevEducation) => prevEducation.filter((_, i) => i !== index))
  }

  const handleExperienceChange = (
    index: number,
    field: keyof IuserExperience,
    value: Date | string | boolean
  ) => {
    const updatedExperience = [...experience]
    console.log("updatedExperience ", updatedExperience)
    console.log("field ", field)
    switch (field) {
      case "company":
        updatedExperience[index][field] = value as string
        break
      case "description":
        updatedExperience[index][field] = value as string
        break
      case "role":
        updatedExperience[index][field] = value as string
        break

      case "endingDate":
        updatedExperience[index][field] = value as Date
        break
      case "startingDate":
        updatedExperience[index][field] = value as Date
        break
      case "presentWorking":
        updatedExperience[index][field] = value as boolean
        break
    }

    setExperience(updatedExperience)
  }

  const handlenewExperienceChange = (
    index: number,
    field: keyof IuserExperience,
    value: Date | string | boolean
  ) => {
    const updatedExperience = [...newExperience]
    console.log("updatedExperience ", updatedExperience)
    console.log("field ", field)
    switch (field) {
      case "company":
        updatedExperience[index][field] = value as string
        break
      case "description":
        updatedExperience[index][field] = value as string
        break
      case "role":
        updatedExperience[index][field] = value as string
        break

      case "endingDate":
        updatedExperience[index][field] = value as Date
        break
      case "startingDate":
        updatedExperience[index][field] = value as Date
        break
      case "presentWorking":
        updatedExperience[index][field] = value as boolean
        break
    }

    setnewexperience(updatedExperience)
  }

  const addEducation = () => {
    setnewEducation((prevEducation) => [
      ...prevEducation,
      {
        id: -1,
        university: "",
        degree: "",
        startingDate: null,
        endingDate: null,
        description: "",
      },
    ])
  }

  const handleEducationChange = (
    index: number,
    field: keyof IuserEducation,
    value: string | Date
  ) => {
    const updatedEducation = [...education]

    switch (field) {
      case "degree":
        updatedEducation[index][field] = value as string
        break
      case "description":
        updatedEducation[index][field] = value as string
        break
      case "university":
        updatedEducation[index][field] = value as string
        break
      case "startingDate":
        updatedEducation[index][field] = value as Date
        break
      case "endingDate":
        updatedEducation[index][field] = value as Date
        break
    }

    setEducation(updatedEducation)
  }
  const handlenewEducationChange = (
    index: number,
    field: keyof IuserEducation,
    value: string | Date
  ) => {
    const updatedEducation = [...newEducation]
    console.log("updatedEducation ", updatedEducation)

    switch (field) {
      case "degree":
        updatedEducation[index][field] = value as string
        break
      case "description":
        updatedEducation[index][field] = value as string
        break
      case "university":
        updatedEducation[index][field] = value as string
        break
      case "startingDate":
        updatedEducation[index][field] = value as Date
        break
      case "endingDate":
        updatedEducation[index][field] = value as Date
        break
    }

    setnewEducation(updatedEducation)
  }

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const predefinedTagsAsSelectOptions = allSkills.map((tag) => ({
    label: tag,
    value: tag,
  }))
  // console.log(predefinedTagsAsSelectOptions)

  const [, setSelectedSoftwareTags] = useState<string[]>([])
  const predefinedSoftwareTagsAsSelectOptions = allSoftwares.map((tag) => ({
    label: tag,
    value: tag,
  }))
  // console.log(predefinedSoftwareTagsAsSelectOptions)

  const handleSoftwareTagsChange = (tags: string[]) => {
    setSelectedSoftwareTags(tags)
  }

  const profileArray: FilterDetail[] = [
    {
      title: "Bio",
      inputType: "text",
      placeholder: "Bio goes here...",
      value: profileData.userBio,
      onChange: (value) => handleFieldChange("userBio", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Country",
      inputType: "select",
      value: profileData.country,
      onChange: (value) => handleFieldChange("country", value as string),
      selectOptions: [{ label: "--Select a Country--", value: "" }, ...countryList],
    },
    {
      title: "City",
      inputType: "select",
      value: profileData.city,
      onChange: (value) => handleFieldChange("city", value as string),
      className: "bg-transparent rounded-md",
      selectOptions: [{ label: "--Select a City--", value: "" }, ...city],
    },
    {
      title: "skills",
      inputType: "tags",
      placeholder: "skills...",
      initialtags: initialskillstags,
      onTagsChange: handleTagsChange,
      selectOptions: predefinedTagsAsSelectOptions,
      Variant: "flex-col w-full flex",
    },
    {
      title: "Softwares",
      inputType: "tags",
      placeholder: "Softwares...",
      initialtags: initialsoftwaretags,
      onTagsChange: handleSoftwareTagsChange,
      selectOptions: predefinedSoftwareTagsAsSelectOptions,
      Variant: "flex-col w-full flex",
    },
  ]
  type exptypes = Array<{ id?: number; detail: FilterDetail[] }>

  // FilterDetail[] | number
  const ExperienceArray: exptypes = experience.map((exp, index) => ({
    id: exp.id,
    detail: [
      {
        title: `Company Name ${index + 1}`,
        inputType: "text",
        placeholder: "Eg: Epic games, Ubisoft",
        value: exp.company,
        onChange: (value) => handleExperienceChange(index, "company", value as string),
        className: "bg-transparent rounded-md",
      },
      {
        title: `Job Title `,
        inputType: "text",
        placeholder: "Eg: 3D Animator, Unity Developer",
        value: exp.role,
        onChange: (value) => handleExperienceChange(index, "role", value as string),
        className: "bg-transparent rounded-md",
      },
      {
        title: `Starting Date `,
        inputType: "date",
        value: exp.startingDate,
        onChange: (date) => handleExperienceChange(index, "startingDate", date as Date),
        className: "bg-transparent rounded-md w-[50%]",
      },
      {
        title: `Ending Date`,
        inputType: "date",
        value: exp.endingDate || "",
        onChange: (date) => handleExperienceChange(index, "endingDate", date as Date),
        className: "bg-transparent rounded-md",
      },
      {
        title: `Description `,
        inputType: "text",
        placeholder: "Brief description of what you did here",
        value: exp.description,
        onChange: (value) => handleExperienceChange(index, "description", value as string),
        className: "bg-transparent rounded-md",
      },
      {
        title: `Working currently?`,
        inputType: "radio",
        value: exp.presentWorking,
        onChange: (value) => handleExperienceChange(index, "presentWorking", value as boolean),
        selectOptions: [
          {
            label: "yes",
            value: true,
          },
          {
            label: "no",
            value: false,
          },
        ],
      },
    ],
  }))
  const newExperienceArray: Array<FilterDetail[]> = newExperience.map((exp, index) => [
    {
      title: `Company Name ${experience.length + index + 1}`,
      inputType: "text",
      placeholder: "Eg: Epic games, Ubisoft",
      value: exp.company,
      onChange: (value) => handlenewExperienceChange(index, "company", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: `Job Title `,
      inputType: "text",
      placeholder: "Eg: 3D Animator, Unity Developer",
      value: exp.role,
      onChange: (value) => handlenewExperienceChange(index, "role", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: `Starting Date `,
      inputType: "date",
      value: exp.startingDate,
      onChange: (date) => handlenewExperienceChange(index, "startingDate", date as Date),
      className: "bg-transparent rounded-md w-[50%]",
    },
    {
      title: `Ending Date`,
      inputType: "date",
      value: exp.endingDate || "",
      onChange: (date) => handlenewExperienceChange(index, "endingDate", date as Date),
      className: "bg-transparent rounded-md",
    },
    {
      title: `Description `,
      inputType: "text",
      placeholder: "Brief description of what you did here",
      value: exp.description,
      onChange: (value) => handlenewExperienceChange(index, "description", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: `Working currently?`,
      inputType: "radio",
      value: exp.presentWorking,
      onChange: (value) => handlenewExperienceChange(index, "presentWorking", value as boolean),
      selectOptions: [
        {
          label: "yes",
          value: true,
        },
        {
          label: "no",
          value: false,
        },
      ],
    },
  ])

  type edutypes = Array<{ id?: number; detail: FilterDetail[] }>

  const EducationArray: edutypes = education.map((edu, index) => ({
    id: edu.id,
    detail: [
      {
        title: `Institution Name ${index + 1}`,
        inputType: "text",
        placeholder: "Eg: Stanford University, Harvard University",
        value: edu.university || "",
        onChange: (value) => handleEducationChange(index, "university", value as string),
        className: "bg-transparent rounded-md",
      },
      {
        title: "Degree",
        inputType: "text",
        placeholder: "Eg: Computer Science Eng, Electrical Eng",
        value: edu.degree || "",
        onChange: (value) => handleEducationChange(index, "degree", value as string),
        className: "bg-transparent rounded-md",
      },
      {
        title: "Starting Date",
        inputType: "date",
        value: edu.startingDate,
        onChange: (date) => handleEducationChange(index, "startingDate", date as Date),
        className: "bg-transparent rounded-md w-[50%]",
      },
      {
        // edu.endingDate || ''
        title: "Ending Date",
        inputType: "date",
        value: edu.endingDate,
        onChange: (date) => handleEducationChange(index, "endingDate", date as Date),
        className: "bg-transparent rounded-md w-[50%]",
      },
      {
        title: "Description",
        inputType: "text",
        placeholder: "Brief description of what you did here",
        value: edu.description || "",
        onChange: (value) => handleEducationChange(index, "description", value as string),
        className: "bg-transparent rounded-md",
      },
    ],
  }))

  const [newEducation, setnewEducation] = useState<IuserEducation[]>([
    {
      id: -1,
      university: "",
      degree: "",
      startingDate: null,
      endingDate: null,
      description: "",
    },
  ])

  const newEducationArray: Array<FilterDetail[]> = newEducation.map((edu, index) => [
    {
      title: `Institution Name ${index + 1}`,
      inputType: "text",
      placeholder: "Eg: Stanford University, Harvard University",
      value: edu.university || "",
      onChange: (value) => handlenewEducationChange(index, "university", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Degree",
      inputType: "text",
      placeholder: "Eg: Computer Science Eng, Electrical Eng",
      value: edu.degree || "",
      onChange: (value) => handlenewEducationChange(index, "degree", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Starting Date",
      inputType: "date",
      value: edu.startingDate || null,
      onChange: (date) => handlenewEducationChange(index, "startingDate", date as Date),
      className: "bg-transparent rounded-md w-[50%]",
    },
    {
      // edu.endingDate || ''
      title: "Ending Date",
      inputType: "date",
      value: edu.endingDate,
      onChange: (date) => handlenewEducationChange(index, "endingDate", date as Date),
      className: "bg-transparent rounded-md w-[50%]",
    },
    {
      title: "Description",
      inputType: "text",
      placeholder: "Brief description of what you did here",
      value: edu.description || "",
      onChange: (value) => handlenewEducationChange(index, "description", value as string),
      className: "bg-transparent rounded-md",
    },
  ])

  return (
    <>
      <div className="flex p-3 gap-y-6 w-full md:w-[80%] lg:w-[60%] mx-auto flex-wrap justify-evenly">
        <ProfileSection profileArray={profileArray} />
        <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
          Experience
        </h1>
        {experience.length > 0 && (
          <ExperienceSection
            ExperienceArray={ExperienceArray}
            experience={experience}
            setExperience={setExperience}
            onaddExperience={addExperience}
            // onremoveExperience={removeExperience}
            handleExperienceChange={handleExperienceChange}
            initialExperience={profileDetails.userExperience}
          />
        )}
        {newExperienceArray.map((filterdetailarray, idx) => (
          <>
            {filterdetailarray.map((field, index) => (
              <>
                <div
                  key={index}
                  className={`flex items-center p-2 md:gap-8 w-full ${
                    field.inputType == "date" ? "sm:w-[50%]" : ""
                  }`}
                >
                  <Filter
                    key={index}
                    inputType={field.inputType}
                    title={field.title}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    selectOptions={field.selectOptions}
                    className={field.className || ""}
                    Variant="flex-col w-full flex"
                  />
                </div>
              </>
            ))}
            <div className="flex justify-between w-full">
              <Button
                className={
                  "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                }
                onClick={() => uploadUserExperience(newExperience[0])}
              >
                upload
              </Button>
              {/* {(ExperienceArray.length + newExperienceArray.length)} */}
              {ExperienceArray.length + newExperienceArray.length > 1 && (
                <Button
                  className="px-[12px] py-[6px] border-red-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                  onClick={() => removenewExperience(idx)}
                >
                  Remove
                </Button>
              )}
            </div>
          </>
        ))}
        {newExperienceArray.length < 1 && (
          <Button
            className={
              "bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center w-full"
            }
            onClick={() => addExperience()}
          >
            Add Experience
          </Button>
        )}

        <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
          Education
        </h1>
        {education.length > 0 && (
          <>
            <EducationSection
              EducationArray={EducationArray}
              education={education}
              setEducation={setEducation}
              onAddEducation={addEducation}
              // onRemoveEducation={removeEducation}
              handleEducationChange={handleEducationChange}
              initialEducation={profileDetails.userEducation}
            />
          </>
        )}
        {newEducationArray.map((filterdetailarray, idx) => (
          <>
            {filterdetailarray.map((field, index) => (
              <>
                <div
                  key={index}
                  className={`flex items-center p-2 md:gap-8 w-full ${
                    field.inputType == "date" ? "sm:w-[50%]" : ""
                  }`}
                >
                  <Filter
                    key={index}
                    inputType={field.inputType}
                    title={field.title}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    selectOptions={field.selectOptions}
                    className={field.className || ""}
                    Variant="flex-col w-full flex"
                  />
                </div>
              </>
            ))}
            <div className="flex justify-between w-full">
              <Button
                className={
                  "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                }
                onClick={() => uploadUserEducation(newEducation[0])}
              >
                Upload
              </Button>
              {newEducationArray.length + EducationArray.length > 1 && (
                <Button
                  className="px-[12px] py-[6px] border-red-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                  onClick={() => removenewEducation(idx)}
                >
                  Remove
                </Button>
              )}
            </div>
          </>
        ))}

        {newEducationArray.length < 1 && (
          <>
            <Button
              className={
                "bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center w-full"
              }
              onClick={() => addEducation()}
            >
              add education
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default EditProfilePage
