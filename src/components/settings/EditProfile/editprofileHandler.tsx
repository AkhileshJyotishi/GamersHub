import { NextRouter } from "next/router"
import { toast } from "react-toastify"

import { fetchData, fetchFile } from "@/utils/functions"

export const uploadUserEducation = async (
  router: NextRouter,
  userId: number,
  userEducation: IuserEducation,
  token: string,
  initialUserEducation = {
    id: -1,
    university: "",
    degree: "",
    startingDate: null,
    endingDate: null,
    description: "",
  }
) => {
  // const token = useSession().data?.user?.name as string
  // const session = await getSession(req as NextApiRequest, res as NextApiResponse)

  const hasDataChanged =
    userEducation.university !== initialUserEducation.university ||
    userEducation.degree !== initialUserEducation.degree ||
    userEducation.startingDate !== initialUserEducation.startingDate ||
    userEducation.endingDate !== initialUserEducation.endingDate ||
    userEducation.description !== initialUserEducation.description

  if (!hasDataChanged) {
    toast.info("Fill the credentials")
    return
  }
  // if (hasDataChanged) {
  delete userEducation.id
  toast.info("Uploading Education Info...")
  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/education`,
    token,
    "POST",
    userEducation
  )
  toast.dismiss()
  if (response?.error) {
    toast.error(response?.message)
  } else {
    toast.success(response?.message)
    router.push(`${userId}/profile/about`)
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
  initialEducation: IuserEducation[] | undefined,
  token: string
) => {
  const educationToUpdate = findEducationToUpdate(education, userId)
  // const initialeducationtoupdate = findEducationToUpdate(initialEducation, userId)
  // console.log(initialEducation)
  // const token = useSession().data?.user?.name as string

  if (!educationToUpdate) {
    toast.info("Some error occured , please retry")
    return
  }

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
  toast.dismiss()
  toast.info("Updating Education Info...")

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/education/${userId}`,
    token,
    "PATCH", // Use PATCH to update existing education
    educationToUpdate
  )
  if (response?.error) {
    toast.dismiss()
    toast.error(response.message)
  } else {
    toast.dismiss()
    toast.success(response?.message)
  }
  return response
}

export const removeUserEducation = async (
  Id: number | undefined,
  setEducation: React.Dispatch<React.SetStateAction<IuserEducation[]>>,
  index: number,
  token: string
) => {
  // const token = useSession().data?.user?.name as string

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/education/${Id}`,
    token,
    "DELETE"
  )
  // console.log("delete ", response)
  toast.dismiss()
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
    // console.log(newexp)
    return newexp
  })
}

export const removeuserExperience = async (
  Id: number | undefined,
  setExperience: React.Dispatch<React.SetStateAction<IuserExperience[]>>,
  index: number,
  token: string
) => {
  // const token = useSession().data?.user?.name as string

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/experience/${Id}`,
    token,
    "DELETE"
  )
  // console.log("delete experince", response)

  toast.dismiss()
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
  token: string

  // initialExperience: IuserExperience[] | undefined
) => {
  const experienceToUpdate = findExperienceToUpdate(experience, userId)
  // const initialexperiencetoupdate = findExperienceToUpdate(initialExperience, userId)
  // console.log(initialExperience)
  // const token = useSession().data?.user?.name as string

  if (!experienceToUpdate) {
    toast.info("Some error occured , please retry")
    return
  }

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
  toast.info("Updating Your Experiences...")

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/experience/${userId}`,
    token,
    "PATCH", // Use PATCH to update existing experience
    experienceToUpdate
  )
  toast.dismiss()
  if (response?.error) {
    toast.error(response.message)
  } else {
    toast.success(response?.message)
  }
  return response
}

export const uploadUserExperience = async (
  router: NextRouter,
  userId: number,
  userExperience: IuserExperience,
  token: string,
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
  // const token = useSession().data?.user?.name as string

  const hasDataChanged =
    userExperience.company !== initialUserExperience?.company ||
    userExperience.description !== initialUserExperience?.description
  userExperience.endingDate !== initialUserExperience?.endingDate ||
    userExperience.startingDate !== initialUserExperience?.startingDate ||
    userExperience.presentWorking !== initialUserExperience?.presentWorking ||
    userExperience.role !== initialUserExperience?.role

  if (!hasDataChanged) {
    toast.info("Fill the credentials")
    return
  }
  // if (hasDataChanged) {
  delete userExperience.id
  // console.log("userexpt ", userExperience)
  toast.info("Uploading Your Experiences...")

  const response = await fetchData(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/experience`,
    token,
    "POST",
    userExperience
  )
  toast.dismiss()
  if (response?.error) {
    toast.error(response?.message)
  } else {
    toast.success(response?.message)
    router.push(`${userId}/profile/about`)
  }

  return response?.data
}
/**
 * Uploads profile data to a server.
 *
 * @param {Object} profileData - An object containing profile details such as user bio, country, city, user skills, user softwares, and profile image.
 * @param {string} token - The authentication token.
 * @param {string} method - The HTTP method to be used for the API request.
 * @param {function} setProfileFilled - A function to set the state indicating whether the profile is filled or not.
 * @returns {Promise<Object>} - The response from the server if the request is successful. Otherwise, an error object with the error message and null data.
 */
export const uploadProfileData = async (
  profileData:
    | {
        userBio: string | null | undefined
        country: string | null | undefined
        city: string | null | undefined
        userSkills: IuserSkill[] | string[] | undefined
        userSoftwares: IuserSoftware[] | undefined | string[]
        profileImage: string | undefined | File
      }
    | undefined,
  token: string,
  method: string,
  setProfileFilled: Allow
) => {
  const formdata = new FormData()
  // console.log(newAlbum)
  // return
  toast.info("Uploading Your Profile...")

  if (profileData?.profileImage && typeof profileData?.profileImage == "object") {
    formdata.append("file", profileData?.profileImage as File)
    formdata.append("type", "user")
    const isuploaded = await fetchFile("/v1/upload/file", token, "POST", formdata)
    // console.log("is uploaded", isuploaded)
    toast.dismiss()
    if (isuploaded?.error) {
      toast.error(isuploaded?.message)
      return
    }
    profileData.profileImage = isuploaded?.data?.image?.Location
  }

  const response = await fetchData(`/v1/users/details`, token, method, profileData)
  toast.dismiss()
  if (response?.error) {
    toast.error(response?.message)
  } else {
    toast.success(response?.message)

    setProfileFilled(true)
    return response
  }
}
