import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { fetchData } from "@/utils/functions"

export const uploadUserEducation = async (
  userEducation: IuserEducation,
  initialUserEducation = {
    id: -1,
    university: "",
    degree: "",
    startingDate: null,
    endingDate: null,
    description: "",
  }
) => {
  const token = useSession().data?.user?.name as string
  const hasDataChanged =
    userEducation.university !== initialUserEducation.university ||
    userEducation.degree !== initialUserEducation.degree ||
    userEducation.startingDate !== initialUserEducation.startingDate ||
    userEducation.endingDate !== initialUserEducation.endingDate ||
    userEducation.description !== initialUserEducation.description

  if (!hasDataChanged) {
    toast.info("fill the credentials")
    return
  }
  // if (hasDataChanged) {
  delete userEducation.id
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/education`,
    token,
    "POST",
    userEducation
  )
  if (response?.error) {
    toast.error(response?.message)
  } else {
    toast.success(response?.message)
  }

  return response?.data
}

const findEducationToUpdate = (
  userEducation: IuserEducation[] | undefined,
  userId: number | undefined
) => {
  const foundEducationEntry = userEducation?.find((edu) => edu.id === userId)
  return foundEducationEntry
}
export const updateUserEducation = async (
  userId: number | undefined,
  education: IuserEducation[],
  initialEducation: IuserEducation[] | undefined
) => {
  const educationToUpdate = findEducationToUpdate(education, userId)
  const initialeducationtoupdate = findEducationToUpdate(initialEducation, userId)
  console.log(initialEducation)
  if (!educationToUpdate) {
    toast.info("Some error occured , please retry")
    return
  }
  console.log("educationToUpdate ", educationToUpdate)
  console.log("initialeducationtoupdate ", initialeducationtoupdate)
  // const hasDataChanged =
  //   educationToUpdate.university !== initialeducationtoupdate?.university ||
  //   educationToUpdate.degree !== initialeducationtoupdate?.degree ||
  //   educationToUpdate.startingDate !== initialeducationtoupdate?.startingDate ||
  //   educationToUpdate.endingDate !== initialeducationtoupdate?.endingDate ||
  //   educationToUpdate.description !== initialeducationtoupdate?.description

  // if (!hasDataChanged) {
  //     toast.info("No changes made to education details.");
  //     return;
  // }

  // Send a request to update the education details
  delete educationToUpdate.id
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/education/${userId}`,
    token,
    "PATCH", // Use PATCH to update existing education
    educationToUpdate
  )
  if (response?.error) {
    toast.error(response.message)
  } else {
    toast.success(response?.message)
  }
  return response?.data
}

export const removeUserEducation = async (
  Id: number | undefined,
  setEducation: React.Dispatch<React.SetStateAction<IuserEducation[]>>,
  index: number
) => {
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/education/${Id}`,
    token,
    "DELETE"
  )
  console.log("delete ", response)
  if (response?.error) {
    toast.error(response.message)
  } else {
    toast.success(response?.message)
    removefromarray(index, setEducation)
  }

  return response?.data
  // console.log("response of delter ", response)
}

export const removefromarray = (
  index: number | undefined,
  arraytoupdate: (value: React.SetStateAction<Array<Allow>>) => void
) => {
  arraytoupdate((prev) => {
    const newexp = prev.filter((_, i) => i !== index)
    console.log(newexp)
    return newexp
  })
}

export const removeuserExperience = async (
  Id: number | undefined,
  setExperience: React.Dispatch<React.SetStateAction<IuserExperience[]>>,
  index: number
) => {
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/experience/${Id}`,
    token,
    "DELETE"
  )
  console.log("delete experince", response)
  if (response?.error) {
    toast.error(response.message)
  } else {
    toast.success(response?.message)
    removefromarray(index, setExperience)
  }

  return response?.data
  // console.log("response of delter ", response)
}

const findExperienceToUpdate = (
  userExperience: IuserExperience[] | undefined,
  userId: number | undefined
) => {
  const founduserExperience = userExperience?.find((edu) => edu.id === userId)
  return founduserExperience
}

export const updateUserExperience = async (
  userId: number | undefined,
  experience: IuserExperience[],
  initialExperience: IuserExperience[] | undefined
) => {
  const experienceToUpdate = findExperienceToUpdate(experience, userId)
  const initialexperiencetoupdate = findExperienceToUpdate(initialExperience, userId)
  console.log(initialExperience)
  if (!experienceToUpdate) {
    toast.info("Some error occured , please retry")
    return
  }
  console.log("experienceToUpdate ", experienceToUpdate)
  console.log("initialexperiencetoupdate ", initialexperiencetoupdate)
  // const hasDataChanged =
  //   experienceToUpdate.company !== initialexperiencetoupdate?.company ||
  //   experienceToUpdate.description !== initialexperiencetoupdate?.description
  // experienceToUpdate.endingDate !== initialexperiencetoupdate?.endingDate ||
  //   experienceToUpdate.startingDate !== initialexperiencetoupdate?.startingDate ||
  //   experienceToUpdate.presentWorking !== initialexperiencetoupdate?.presentWorking ||
  //   experienceToUpdate.role !== initialexperiencetoupdate?.role

  // if (!hasDataChanged) {
  //     toast.info("No changes made to experience details.");
  //     return;
  // }

  // Send a request to update the experience details
  delete experienceToUpdate.id
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/experience/${userId}`,
    token,
    "PATCH", // Use PATCH to update existing experience
    experienceToUpdate
  )
  if (response?.error) {
    toast.error(response.message)
  } else {
    toast.success(response?.message)
  }
  return response?.data
}

export const uploadUserExperience = async (
  userExperience: IuserExperience,
  initialUserExperience = {
    id: -1,
    company: "",
    role: "",
    startingDate: null,
    endingDate: null,
    description: "",
    presentWorking: false,
  }
) => {
  const hasDataChanged =
    userExperience.company !== initialUserExperience?.company ||
    userExperience.description !== initialUserExperience?.description
  userExperience.endingDate !== initialUserExperience?.endingDate ||
    userExperience.startingDate !== initialUserExperience?.startingDate ||
    userExperience.presentWorking !== initialUserExperience?.presentWorking ||
    userExperience.role !== initialUserExperience?.role

  if (!hasDataChanged) {
    toast.info("fill the credentials")
    return
  }
  // if (hasDataChanged) {
  delete userExperience.id
  console.log("userexpt ", userExperience)
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/experience`,
    token,
    "POST",
    userExperience
  )
  if (response?.error) {
    toast.error(response?.message)
  } else {
    toast.success(response?.message)
  }

  return response?.data
}
