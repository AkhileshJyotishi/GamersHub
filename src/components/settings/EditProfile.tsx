import React, { useState } from "react"
import clsx from "clsx"

import { FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"

type EditProfilePageProps = {
  filterArray?: FilterDetail[]
  props?: any
}
interface ExperienceData {
  company: string
  job_title: string
  starting_date?: Date
  ending_date?: Date
  description: string
}

interface EducationData {
  institution_name: string
  degree: string
  starting_date?: Date
  ending_date?: Date
  description: string
}
const EditProfilePage: React.FC<EditProfilePageProps> = ({ props }) => {
  console.log("ye props hain  ", props)
  console.log("editprofilepage")
  const [profileData, setprofileData] = useState({
    profileName: "",
    occupation: "",
    country: "",
    city: "",
  })
  const [experience, setExperience] = useState<ExperienceData>({
    company: "",
    job_title: "",
    starting_date: new Date(),
    ending_date: new Date(),
    description: "",
  })

  const [education, setEducation] = useState<EducationData>({
    institution_name: "",
    degree: "",
    starting_date: new Date(),
    ending_date: new Date(),
    description: "",
  })

  const handleFieldChange = (key: string, value: string) => {
    setprofileData((prevState) => ({ ...prevState, [key]: value }))
  }

  const profileArray: FilterDetail[] = [
    {
      title: "Profile Name",
      inputType: "text",
      placeholder: "rockstar",
      value: profileData.profileName,
      onChange: (value) => handleFieldChange("profileName", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Occupation / One line about you",
      inputType: "text",
      placeholder: "Freelance artist, Game Developer",
      value: profileData.occupation,
      onChange: (value) => handleFieldChange("occupation", value as string),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Country",
      inputType: "select",
      value: profileData.country,
      onChange: (value) => handleFieldChange("country", value as string),
      selectOptions: [
        { label: "--Select a Country--", value: "" },
        // Add other country options here
      ],
    },
    {
      title: "City",
      inputType: "text",
      placeholder: "City Name",
      value: profileData.city,
      onChange: (value) => handleFieldChange("city", value as string),
      className: "bg-transparent rounded-md",
    },
  ]

  const ExperienceArray: FilterDetail[] = [
    {
      title: "Company Name",
      inputType: "text",
      placeholder: "Eg: Epic games, Ubisoft",
      value: experience?.company || "",
      onChange: (value) => setExperience({ ...experience, company: value as string }),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Job Title",
      inputType: "text",
      placeholder: "Eg: 3D Animator, Unity Developer",
      value: experience?.job_title || "",
      onChange: (value) => setExperience({ ...experience, job_title: value as string }),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Starting Date",
      inputType: "date",
      value: experience?.starting_date || "",
      onChange: (date) => setExperience({ ...experience, starting_date: date as Date }),
      className: "bg-transparent rounded-md w-[50%]",
    },
    {
      title: "Ending Date",
      inputType: "date",
      value: experience?.ending_date || new Date(),
      onChange: (date) => setExperience({ ...experience, ending_date: date as Date }),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Description",
      inputType: "text",
      placeholder: "Brief description of what you did here",
      value: experience?.description || "",
      onChange: (value) => setExperience({ ...experience, description: value as string }),
      className: "bg-transparent rounded-md",
    },
  ]
  // const currentYear = new Date().getFullYear();

  const EducationArray: FilterDetail[] = [
    {
      title: "Institution Name",
      inputType: "text",
      placeholder: "Eg: Stanford University, Harvard University",
      value: education?.institution_name || "",
      onChange: (value) => {
        setEducation({ ...education, institution_name: value as string })
      },
      className: "bg-transparent rounded-md",
    },
    {
      title: "Degree",
      inputType: "text",
      placeholder: "Eg: Computer Science Eng, Electrical Eng",
      value: education?.degree || "",
      onChange: (value) => {
        setEducation({ ...education, degree: value as string })
      },
      className: "bg-transparent rounded-md",
    },
    {
      title: "Starting Date",
      inputType: "date",
      value: education?.starting_date || "",
      onChange: (date) => setEducation({ ...education, starting_date: date as Date }),
      className: "bg-transparent rounded-md w-[50%]",
    },
    {
      title: "Ending Date",
      inputType: "date",
      value: education?.ending_date || "",
      onChange: (date) => setEducation({ ...education, starting_date: date as Date }),
      className: "bg-transparent rounded-md w-[50%]",
    },
    {
      title: "Description",
      inputType: "text",
      placeholder: "Brief description of what you did here",
      value: education?.description || "",
      onChange: (value) => {
        setEducation({ ...education, description: value as string })
      },
      className: "bg-transparent rounded-md ",
    },
  ]

  // export default filterArray;

  const [, setSelectedTags] = useState<string[]>([])
  const predefinedTags = [
    "programming",
    "design",
    "web development",
    "javascript",
    "python",
    "css",
    "html",
    "backend",
    "frontend",
    "database",
  ]
  const predefinedTagsAsSelectOptions = predefinedTags.map((tag) => ({
    label: tag,
    value: tag,
  }))
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const predefinedSoftwareTags = [
    "React",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "HTML",
    "CSS",
    "Git",
    "Docker",
    // Add more software tags as needed
  ]
  const [, setSelectedSoftwareTags] = useState<string[]>([])
  const predefinedSoftwareTagsAsSelectOptions = predefinedSoftwareTags.map((tag) => ({
    label: tag,
    value: tag,
  }))

  const handleSoftwareTagsChange = (tags: string[]) => {
    setSelectedSoftwareTags(tags)
  }

  return (
    <div className="flex p-3 gap-y-6 w-full md:w-[80%] lg:w-[60%] mx-auto flex-wrap justify-evenly">
      <h1
        className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center"
        id="profile"
      >
        Profile
      </h1>
      {profileArray?.map((filter, index) => (
        <div
          key={index}
          className={"flex items-center justify-between p-2 md:gap-8 overflow-hidden w-full"}
        >
          {/* {console.log(filter.inputType)} */}
          <Filter
            key={index}
            inputType={filter?.inputType}
            title={filter?.title}
            placeholder={filter.placeholder}
            value={filter?.value}
            onChange={filter.onChange}
            selectOptions={filter.selectOptions}
            className={` ${filter?.className || ""}`}
            Variant={"flex-col  w-full flex "}
          />
        </div>
      ))}

      <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
        Experience
      </h1>

      {ExperienceArray.map((field, index) => (
        <>
          <div
            key={index}
            className={clsx(
              "flex items-center   p-2 md:gap-8 ",
              field.inputType == "date" ? "w-full sm:w-[50%]" : "w-full"
            )}
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
      <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
        Education
      </h1>

      {EducationArray.map((field, index) => (
        <>
          <div
            key={index}
            className={clsx(
              "flex items-center   p-2 md:gap-8 ",
              field.inputType == "date" ? "w-full sm:w-[50%]" : "w-full"
            )}
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
      <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
        Skills
      </h1>

      <div className="flex items-center justify-between w-full p-2 md:gap-8">
        <Filter
          key={"index"}
          inputType={"tags"}
          title={"skills"}
          placeholder={"skills..."}
          onTagsChange={handleTagsChange}
          selectOptions={predefinedTagsAsSelectOptions}
          className={""}
          Variant="flex-col w-full flex"
        />
      </div>

      <h1
        className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center"
        id="softwares"
      >
        Softwares
      </h1>

      <div className="flex items-center justify-between w-full p-2 md:gap-8">
        <Filter
          key={"index"}
          inputType={"tags"}
          title={"softwares"}
          placeholder={"softwares..."}
          onTagsChange={handleSoftwareTagsChange}
          selectOptions={predefinedSoftwareTagsAsSelectOptions}
          className={""}
          Variant="flex-col w-full flex"
        />
      </div>
    </div>
  )
}

export default EditProfilePage
