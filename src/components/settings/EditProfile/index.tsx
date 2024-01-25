import React, { useEffect, useState } from "react"
import clsx from "clsx"
// import clsx from "clsx"
import { City, Country } from "country-state-city"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { FilterDetail } from "@/interface/filter"
import { useUserContext } from "@/providers/user-context"

import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"
import dynamic from "next/dynamic"

import { uploadUserEducation, uploadUserExperience } from "./editprofileHandler"
import EducationSection from "./EducationSection"
import ExperienceSection from "./ExperienceSection"
import { validatePdfField } from "@/utils/functions/validationUtils"
// import ProfileSection from "./profileSection"
const ProfileSection = dynamic(() => import("./profileSection"), {
  ssr: true,
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[40vh]"></div>
  },
})
// const { City, Country }=dynamic(import("country-state-city").then())

export const Tab = ({
  tabs,
  activeTab,
  setactiveTab,
}: {
  tabs: string[]
  setactiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
}) => {
  return tabs?.map((tab) => {
    return (
      <>
        <div
          className={clsx("sm:min-w-[80px] active:current cursor-pointer")}
          // href={`/${data?.id}/profile/${tab}`}
          onClick={() => setactiveTab(tab)}
        >
          <div
            // href="#"
            className={clsx(
              ` inline-block   p-2 active:text-secondary  active:bg-[#00000090]
          bg-white
            text-light outline-none focus:outline-none   `,
              activeTab === tab && "text-secondary"
            )}
          >
            {tab}
          </div>
        </div>
      </>
    )
  })
}

const EditProfilePage = ({
  profileDetails,
  allSkills,
  allSoftwares,
}: {
  profileDetails: IDetails
  allSkills: string[]
  allSoftwares: string[]
}) => {
  const [activeTab, setactiveTab] = useState<string>("Profile")
  const country = Country.getAllCountries()
  const { data: session } = useSession()

  const countryList = country?.map((country) => {
    return {
      label: country?.name,
      value: country?.name,
    }
  })
  const codemapping: { [key: string]: string } = {}
  country?.forEach((ctry) => {
    const name = ctry.name
    const code = ctry.isoCode

    codemapping[name] = code
  })
  let initcity
  let initialcitylist = [{ label: "", value: "" }]
  if (profileDetails?.country) {
    initcity = City.getCitiesOfCountry(codemapping[profileDetails.country])
    if (initcity)
      initialcitylist = initcity?.map((city1) => {
        return {
          label: city1?.name,
          value: city1?.name,
        }
      })
  }

  const [city, setCity] = useState<{ label?: string; value?: string }[]>(initialcitylist || [{}])
  const [dimensions, setdimensions] = useState<{
    height: number | null
    width: number | null
  }>({
    height: null,
    width: null,
  })
  // console.log(profileDetails)
  const initProfile = {
    userBio: profileDetails?.userBio ?? "",
    country: profileDetails?.country ?? "",
    city: profileDetails?.city ?? "",
    // userSkills: profileDetails?.userSkills,
    userSkills: profileDetails?.userSkills
      ? profileDetails?.userSkills?.map((userskill) => userskill.skill)
      : undefined,
    userSoftwares:
      profileDetails?.userSoftwares && profileDetails?.userSoftwares.length > 0
        ? profileDetails?.userSoftwares?.map((usersofware) => usersofware?.software as string)
        : undefined,
    profileImage: profileDetails?.user?.profileImage ?? "",
    resume: profileDetails.resume ?? ""
  }
  interface ProfileInterface {
    userBio: string
    country: string
    city: string
    userSkills: string[] | undefined
    userSoftwares: string[] | undefined
    profileImage: string | File
    resume?: File | string | null
  }
  const [profileData, setprofileData] = useState<ProfileInterface>(initProfile)
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string | null }>({})
  const [ExpErrors, setExpErrors] = useState<{ [key: string]: string | null }>({})
  const [newExpErrors, setnewExpErrors] = useState<{ [key: string]: string | null }>({})
  const [EduErrors, setEduErrors] = useState<{ [key: string]: string | null }>({})
  const [newEduErrors, setnewEduErrors] = useState<{ [key: string]: string | null }>({})


  const isProfileDataFilled = Object.values(initProfile).some((value) => {
    return value !== null && value !== undefined && value !== "" && value
  })
  const [filled, setFilled] = useState(isProfileDataFilled)
  const initialskillstags = profileDetails?.userSkills
    ? profileDetails?.userSkills?.map((userskill) => userskill.skill)
    : []
  const initialsoftwaretags =
    profileDetails?.userSoftwares && profileDetails?.userSoftwares.length > 0
      ? profileDetails?.userSoftwares?.map((usersofware) => usersofware?.software as string)
      : []

  // console.log("initialskillstags ", initialskillstags)
  const [experience, setExperience] = useState<IuserExperience[]>(
    profileDetails?.userExperience || []
  )

  const [education, setEducation] = useState<IuserEducation[]>(profileDetails?.userEducation || [])

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

  const handleFieldChange = async (key: string, value: string | string[] | File) => {
    switch (key) {
      case "profileImage":
        if (value instanceof File) {
          // Your validation logic for banner (File type)
          // Check file size
          // value.
          // console.log("banner working")
          const maxSizeInBytes = 1024 * 1024 // 1MB
          // console.log(value.size, maxSizeInBytes)
          if (value.size > maxSizeInBytes) {
            // console.log("errors")
            setFieldErrors((prev) => ({ ...prev, profileImage: "File size must be less than 1MB" }))
            return // Stop further processing
          } else {
            setFieldErrors((prev) => ({ ...prev, profileImage: null }))
          }

          // Create an image element to check dimensions
          const img = new Image()
          img.src = URL.createObjectURL(value)

          // Check image dimensions
          img.onload = () => {
            const maxWidth = 1920
            const maxHeight = 1080
            const minWidth = 640
            const minHeight = 320

            if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
              setFieldErrors((prev) => ({
                ...prev,
                profileImage: `Cover dimensions needs to be ${maxWidth}p - ${maxHeight}p or smaller`,
              }))
            } else if (img.naturalWidth < minWidth || img.naturalHeight < minHeight) {
              setFieldErrors((prev) => ({
                ...prev,
                profileImage: `Cover dimensions needs to be ${minWidth}p - ${minHeight}p or larger`,
              }))
            } else {
              setFieldErrors((prev) => ({ ...prev, profileImage: null }))
            }
            setdimensions({
              height: img.naturalHeight,
              width: img.naturalWidth,
            })
            setprofileData((prevState) => ({ ...prevState, [key]: value as File }))
          }

          img.onerror = () => {
            setFieldErrors((prev) => ({ ...prev, profileImage: "Error loading image" }))
          }
          setprofileData((prevState) => ({ ...prevState, [key]: value as File }))
        }
        break
      case "userBio":
        if (typeof value === "string") {
          setprofileData((prevState) => ({ ...prevState, [key]: value }))
        }
        break
      case "country":
        if (typeof value === "string") {
          handleCityOptions(codemapping[value as string])
          setprofileData((prevState) => ({ ...prevState, [key]: value }))
        }
        break

      case "city":
        if (typeof value === "string") {
          setprofileData((prevState) => ({ ...prevState, [key]: value }))
        }
        break

      case "userSoftwares":
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          if (value.length == 0) {
            setFieldErrors((prev) => ({ ...prev, userSoftwares: "*required" }))
          } else if (value.length >= 11) {
            setFieldErrors((prev) => ({ ...prev, userSoftwares: "*maximum 11 can  be selected" }))
          } else {
            setFieldErrors((prev) => ({ ...prev, userSoftwares: "" }))
          }
          setprofileData((prevState) => ({ ...prevState, [key]: value as string[] }))
        }
        break
      case "userSkills":
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          if (value.length == 0) {
            setFieldErrors((prev) => ({ ...prev, userSkills: "*required" }))
          } else if (value.length >= 11) {
            setFieldErrors((prev) => ({ ...prev, userSkills: "*maximum 11 can  be selected" }))
          } else {
            setFieldErrors((prev) => ({ ...prev, userSkills: "" }))
          }
          setprofileData((prevState) => ({ ...prevState, [key]: value as string[] }))
        }
        break
        case "resume": {
          console.log("key ",key)
    
            let x = await validatePdfField(value, { required: true });
            setFieldErrors((prev => ({ ...prev, resume: x })))
    
            setprofileData((prevState) => ({ ...prevState, [key]: value as File }))
            break;
          }

    }
    // setprofileData((prevState) => ({ ...prevState, [key]: value }))
    if (key == "country") {
      handleCityOptions(codemapping[value as string])
    } else if (key == "userSoftwares") {
      handleSoftwareTagsChange(value as string[])
    } else if (key == "userSkills") {
      handleTagsChange(value as string[])
    }
    // else if()
  }


  const addExperience = () => {
    // console.log("working")
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
    // console.log("updatedExperience ", updatedExperience)
    // console.log("field ", field)
    switch (field) {
      case "company":
      case "description":
      case "role":
        if (typeof value === "string") {
          if (value === "") {
            setExpErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length > 60) {
            setExpErrors((prev) => ({ ...prev, [field]: `*${field} can be max, 60 characters` }))
          } else {
            setExpErrors((prev) => ({ ...prev, [field]: null }))
          }

          updatedExperience[index][field] = value as string
        }
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
    switch (field) {
      case "company":
      case "description":
      case "role":
        if (typeof value === "string") {
          if (value === "") {
            setnewExpErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length > 60) {
            setnewExpErrors((prev) => ({ ...prev, [field]: `*${field} can be max, 60 characters` }))
          } else {
            setnewExpErrors((prev) => ({ ...prev, [field]: null }))
          }

          updatedExperience[index][field] = value as string
        }
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
      case "description":
      case "university":
        if (typeof value === "string") {
          if (value === "") {
            setEduErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length > 60) {
            setEduErrors((prev) => ({ ...prev, [field]: `*${field} can be max, 60 characters` }))
          } else {
            setEduErrors((prev) => ({ ...prev, [field]: null }))
          }

          updatedEducation[index][field] = value as string
        }
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
    // console.log("updatedEducation ", updatedEducation)

    switch (field) {
      case "degree":
      case "description":
      case "university":
        if (typeof value === "string") {
          if (value === "") {
            setnewEduErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length > 60) {
            setnewEduErrors((prev) => ({ ...prev, [field]: `*${field} can be max, 60 characters` }))
          } else {
            setnewEduErrors((prev) => ({ ...prev, [field]: null }))
          }

          updatedEducation[index][field] = value as string
        }
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

  const predefinedTagsAsSelectOptions = allSkills?.map((tag) => ({
    label: tag,
    value: tag,
  }))
  // console.log(predefinedTagsAsSelectOptions)

  const [, setSelectedSoftwareTags] = useState<string[]>([])
  const predefinedSoftwareTagsAsSelectOptions = allSoftwares?.map((tag) => ({
    label: tag,
    value: tag,
  }))
  // console.log(predefinedSoftwareTagsAsSelectOptions)

  const handleSoftwareTagsChange = (tags: string[]) => {
    setSelectedSoftwareTags(tags)
  }

  const profileArray: FilterDetail[] = [
    {
      inputType: "file",
      title: "Profile Image",
      accept: "image/*",
      multiple: false,
      value: profileData.profileImage as string,
      onChange: (value) => handleFieldChange("profileImage", value as File),
      className: "h-[200px]",
      errorMessage: fieldErrors.profileImage,
      dimensionsImage: dimensions,
    },
    {
      title: "Bio",
      inputType: "text",
      placeholder: "Bio goes here...",
      value: profileData.userBio,
      onChange: (value) => handleFieldChange("userBio", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: fieldErrors.userBio,
    },
    {
      title: "Country",
      inputType: "select",
      value: profileData.country,
      onChange: (value) => handleFieldChange("country", value as string),
      selectOptions: countryList,
      errorMessage: fieldErrors.country,
    },
    {
      title: "City",
      inputType: "select",
      value: profileData.city,
      onChange: (value) => handleFieldChange("city", value as string),
      className: "bg-transparent rounded-md",
      selectOptions: city,
      errorMessage: fieldErrors.city,
    },
    {
      title: "skills",
      inputType: "tags",
      placeholder: "3D modeller, 2D modeller ,voice artist....",
      initialtags: initialskillstags,
      onTagsChange: (value) => handleFieldChange("userSkills", value as string[]),
      value: profileData.userSkills,
      selectOptions: predefinedTagsAsSelectOptions,
      Variant: "flex-col w-full flex",
      errorMessage: fieldErrors.userSkills,
    },
    {
      title: "Softwares",
      inputType: "tags",
      placeholder: "Blender, Unreal Engine, Photoshop...",
      initialtags: initialsoftwaretags,
      onTagsChange: (value) => handleFieldChange("userSoftwares", value as string[]),
      value: profileData.userSoftwares,

      selectOptions: predefinedSoftwareTagsAsSelectOptions,
      Variant: "flex-col w-full flex",
      errorMessage: fieldErrors.userSoftwares,
    },
    {
      title: "Resume Upload (PDF format)",
      inputType: "file",
      accept: ".pdf",
      multiple:false,
      value: profileData.resume as string,
      onChange: (value) => handleFieldChange("resume", value as File),
      Variant: "flex-col w-full flex",
      className: "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
      errorMessage: fieldErrors.resume
    }
  ]

  type exptypes = Array<{ id?: number; detail: FilterDetail[] }>

  // FilterDetail[] | number
  const ExperienceArray: exptypes = experience?.map((exp, index) => ({
    id: exp.id,
    detail: [
      {
        title: `Company Name `,
        inputType: "text",
        placeholder: "Eg: Epic games, Ubisoft",
        value: exp.company,
        onChange: (value) => handleExperienceChange(index, "company", value as string),
        className: "bg-transparent rounded-md",
        errorMessage: ExpErrors.company,
      },
      {
        title: `Job Title `,
        inputType: "text",
        placeholder: "Eg: 3D Animator, Unity Developer",
        value: exp.role,
        onChange: (value) => handleExperienceChange(index, "role", value as string),
        className: "bg-transparent rounded-md",
        errorMessage: ExpErrors.role,
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
        errorMessage: ExpErrors.presentWorking,
      },
      {
        title: `Starting Date `,
        inputType: "date",
        value: exp.startingDate,
        onChange: (date) => handleExperienceChange(index, "startingDate", date as Date),
        className: "bg-transparent rounded-md w-[50%]",
        errorMessage: ExpErrors.startingDate,
      },
      {
        title: `Ending Date`,
        inputType: "date",
        value: exp.endingDate || "",
        onChange: (date) => handleExperienceChange(index, "endingDate", date as Date),
        className: "bg-transparent rounded-md",
        errorMessage: ExpErrors.endingDate,
      },
      {
        title: `Description `,
        inputType: "text",
        placeholder: "Brief description of what you did here",
        value: exp.description,
        onChange: (value) => handleExperienceChange(index, "description", value as string),
        className: "bg-transparent rounded-md",
        errorMessage: ExpErrors.description,
      },
    ],
  }))
  const newExperienceArray: Array<FilterDetail[]> = newExperience?.map((exp, index) => [
    {
      title: `Company Name`,
      inputType: "text",
      placeholder: "Eg: Epic games, Ubisoft",
      value: exp.company,
      onChange: (value) => handlenewExperienceChange(index, "company", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: newExpErrors.company,
    },
    {
      title: `Job Title `,
      inputType: "text",
      placeholder: "Eg: 3D Animator, Unity Developer",
      value: exp.role,
      onChange: (value) => handlenewExperienceChange(index, "role", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: newExpErrors.role,
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
      errorMessage: newExpErrors.presentWorking,
    },
    {
      title: `Starting Date`,
      inputType: "date",
      value: exp.startingDate,
      onChange: (date) => handlenewExperienceChange(index, "startingDate", date as Date),
      className: "bg-transparent rounded-md w-[50%]",
      errorMessage: newExpErrors.startingDate,
    },
    {
      title: `Ending Date`,
      inputType: "date",
      value: exp.endingDate || "",
      onChange: (date) => handlenewExperienceChange(index, "endingDate", date as Date),
      className: "bg-transparent rounded-md",
      errorMessage: newExpErrors.endingDate,
    },
    {
      title: `Description `,
      inputType: "text",
      placeholder: "Brief description of what you did here",
      value: exp.description,
      onChange: (value) => handlenewExperienceChange(index, "description", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: newExpErrors.description,
    },
  ])

  type edutypes = Array<{ id?: number; detail: FilterDetail[] }>

  const EducationArray: edutypes = education?.map((edu, index) => ({
    id: edu.id,
    detail: [
      {
        title: `Institution Name `,
        inputType: "text",
        placeholder: "Eg: Stanford University, Harvard University",
        value: edu.university || "",
        onChange: (value) => handleEducationChange(index, "university", value as string),
        className: "bg-transparent rounded-md",
        errorMessage: EduErrors.university,
      },
      {
        title: "Degree",
        inputType: "text",
        placeholder: "Eg: Computer Science Eng, Electrical Eng",
        value: edu.degree || "",
        onChange: (value) => handleEducationChange(index, "degree", value as string),
        className: "bg-transparent rounded-md",
        errorMessage: EduErrors.degree,
      },
      {
        title: "Starting Date",
        inputType: "date",
        value: edu.startingDate,
        onChange: (date) => handleEducationChange(index, "startingDate", date as Date),
        className: "bg-transparent rounded-md w-[50%]",
        errorMessage: EduErrors.startingDate,
      },
      {
        // edu.endingDate || ''
        title: "Ending Date",
        inputType: "date",
        value: edu.endingDate,
        onChange: (date) => handleEducationChange(index, "endingDate", date as Date),
        className: "bg-transparent rounded-md w-[50%]",
        errorMessage: EduErrors.endingDate,
      },
      {
        title: "Description",
        inputType: "text",
        placeholder: "Brief description of what you did here",
        value: edu.description || "",
        onChange: (value) => handleEducationChange(index, "description", value as string),
        className: "bg-transparent rounded-md",
        errorMessage: EduErrors.description,
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

  const newEducationArray: Array<FilterDetail[]> = newEducation?.map((edu, index) => [
    {
      title: `Institution Name `,
      inputType: "text",
      placeholder: "Eg: Stanford University, Harvard University",
      value: edu.university || "",
      onChange: (value) => handlenewEducationChange(index, "university", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: newEduErrors.university,
    },
    {
      title: "Degree",
      inputType: "text",
      placeholder: "Eg: Computer Science Eng, Electrical Eng",
      value: edu.degree || "",
      onChange: (value) => handlenewEducationChange(index, "degree", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: newEduErrors.degree,
    },
    {
      title: "Starting Date",
      inputType: "date",
      value: edu.startingDate || null,
      onChange: (date) => handlenewEducationChange(index, "startingDate", date as Date),
      className: "bg-transparent rounded-md w-[50%]",
      errorMessage: newEduErrors.startingDate,
    },
    {
      // edu.endingDate || ''
      title: "Ending Date",
      inputType: "date",
      value: edu.endingDate,
      onChange: (date) => handlenewEducationChange(index, "endingDate", date as Date),
      className: "bg-transparent rounded-md w-[50%]",
      errorMessage: newEduErrors.endingDate,
    },
    {
      title: "Description",
      inputType: "text",
      placeholder: "Brief description of what you did here",
      value: edu.description || "",
      onChange: (value) => handlenewEducationChange(index, "description", value as string),
      className: "bg-transparent rounded-md",
      errorMessage: newEduErrors.description,
    },
  ])
  const tabs = ["Profile", "Experience", "Education"]

  const [manageExperience, setManageExperience] = useState<boolean>(false)
  const [manageEducation, setManageEducation] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const tab = router.query?.tab
    if (tab == "Profile" || tab == "Education" || tab == "Experience") {
      setactiveTab(tab as string)
    }
  }, [router.query])
  const { userData } = useUserContext()

  return (
    <>
      <div className="bg-user_interface_1 w-[90%] sm:w-[90%]  text-sm font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-10 p-3  mt-[20px] ">
        <Tab tabs={tabs} activeTab={activeTab} setactiveTab={setactiveTab} />
      </div>
      <div className="flex p-3 gap-y-6 w-full md:w-[80%] lg:w-[60%] mx-auto flex-wrap justify-evenly mt-4">
        {activeTab == "Profile" && (
          <ProfileSection
            profileArray={profileArray}
            profileData={profileData}
            isProfileDataFilled={filled}
            setProfileFilled={setFilled}
          />
        )}
        {activeTab == "Experience" && (
          <>
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
            {newExperienceArray?.map((filterdetailarray, idx) => (
              <>
                {filterdetailarray?.map((field, index) => (
                  <>
                    {!(field.title === "Ending Date" && newExperience[idx].presentWorking) && (
                      <div
                        key={index}
                        className={`flex items-center p-2 md:gap-8 w-full ${field.inputType == "date" ? "sm:w-[50%]" : ""
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
                          errorMessage={field.errorMessage}
                        />
                      </div>
                    )}
                  </>
                ))}
                <div className="flex justify-between w-full">
                  <Button
                    disabled={manageExperience}
                    className={
                      "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                    }
                    onClick={async () => {
                      setManageExperience(true)
                      await uploadUserExperience(
                        router,
                        userData?.id as number,
                        newExperience[0],
                        session?.user?.name as string
                      )
                      setManageExperience(false)
                    }}
                  >
                    {manageExperience ? "Uploading" : "Upload"}
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
          </>
        )}
        {activeTab == "Education" && (
          <>
            {/*             
                    <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
                      Education
                    </h1> */}
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
            {newEducationArray?.map((filterdetailarray, idx) => (
              <>
                {filterdetailarray?.map((field, index) => (
                  <>
                    <div
                      key={index}
                      className={`flex items-center p-2 md:gap-8 w-full ${field.inputType == "date" ? "sm:w-[50%]" : ""
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
                        errorMessage={field.errorMessage}
                      />
                    </div>
                  </>
                ))}
                <div className="flex justify-between w-full">
                  <Button
                    disabled={manageEducation}
                    className={
                      "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                    }
                    onClick={async () => {
                      setManageEducation(true)
                      await uploadUserEducation(
                        router,
                        userData?.id as number,
                        newEducation[0],
                        session?.user?.name as string
                      )
                      setManageEducation(false)
                    }}
                  >
                    {manageEducation ? "Uploading" : "Upload"}
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
                  Add education
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default EditProfilePage
