import React, { useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { Errors } from "@/interface/filter"
import { fetchData, isValidURL } from "@/utils/functions"

import FaceBookIcon from "@/components/icons/facebook"
import GitHubIcon from "@/components/icons/github"
import GlobeIcon from "@/components/icons/globe"
import LinkedInIcon from "@/components/icons/linkedin"
import TwitterIcon from "@/components/icons/twitter"
import YoutubeIcon from "@/components/icons/youtube"

import Button from "../ui/button"
// import Input from "../ui/input"
import TextInput from "../ui/textInput"
// import { NODE_BACKEND_URL } from '@/config/env';
type socialMediaPlatforms = {
  name: string
  icon: React.JSX.Element
  placeholder: string
  error: string | null | undefined
}[]

type EditProfileProps = {
  title?: string
  socialsprops: Isocials
}
const Socials: React.FC<EditProfileProps> = ({ title = "Socials", socialsprops }) => {
  // console.log("session ", socialsprops)
  const { data: session } = useSession()
  const [addOnWeb, setAddOnWeb] = useState<Isocials>({
    ...socialsprops,
  })
  const [errors, setErrors] = useState<Errors<Isocials>>({
    artstation: "",
    facebook: "",
    github: "",
    linkedin: "",
    portfolio: "",
    twitter: "",
    youtube: "",
  })

  const socialMediaPlatforms: socialMediaPlatforms = [
    {
      name: "facebook",
      icon: <FaceBookIcon className="w-6 h-6" />,
      placeholder: "http://facebook.com/",
      error: errors.facebook,
    },
    {
      name: "linkedin",
      icon: <LinkedInIcon className="w-6 h-6 " />,
      placeholder: "https://linkedin.com/in/gamecreatorshub",
      error: errors.linkedin,
    },
    {
      name: "twitter",
      icon: <TwitterIcon className="w-6 h-6" />,
      placeholder: "https://twitter.com/gamecreatorshub",
      error: errors.twitter,
    },
    {
      name: "portfolio",
      icon: <GlobeIcon className="w-6 h-6 text-secondary_2" />,
      placeholder: "https://mywebsite.com",
      error: errors.portfolio,
    },
    {
      name: "artstation",
      icon: (
        <Image
          src="/assets/icons/artstation.svg"
          alt="Artstation"
          width={50}
          height={50}
          className="w-10 h-10 m-[-0.7rem]"
        />
      ),
      placeholder: "https://artstation.com/yourprofile",
      error: errors.artstation,
    },
    {
      name: "github",
      icon: <GitHubIcon className="w-5 h-5 text-white" />,
      placeholder: "https://github.com/yourprofile",
      error: errors.github,
    },
    {
      name: "youtube",
      icon: <YoutubeIcon className="w-5 h-5 text-white" />,
      placeholder: "https://youtube.com/xyz",
      error: errors.youtube,
    },
  ]

  const updateSocials = async () => {
    const hasErrors = Object.values(errors).some(
      (error) => error !== null && error !== undefined && error !== ""
    )

    if (hasErrors) {
      toast.error("Please enter valid urls before updating social links.")
      return
    }

    const hasDataChanged = Object.keys(addOnWeb).some(
      (key) => addOnWeb[key as keyof Isocials] !== socialsprops[key as keyof Isocials]
    )
    // delete addOnWeb.id;
    // delete addOnWeb.userId;

    if (hasDataChanged) {
      toast.info("Uploading Profiles... ")
      const changeSocials = await fetchData(
        `/v1/users/socials`,
        session?.user?.name as string,
        "PATCH",
        addOnWeb
      )
      toast.dismiss()
      if (changeSocials?.error) {
        toast.error(changeSocials.message)
      } else {
        toast.success(changeSocials?.message)
      }
    }
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    platform: string
  ) => {
    console.log("object")
    switch (platform) {
      case platform:
        if (isValidURL(e.target.value)) {
          setErrors((prev) => ({ ...prev, [platform]: "" }))
        } else {
          setErrors((prev) => ({ ...prev, [platform]: "*enter a valid url" }))
        }
    }
    setAddOnWeb({ ...addOnWeb, [platform]: e.target.value })
  }

  return (
    <div className="flex flex-col gap-5 p-2 md:p-5">
      <div className="mx-auto text-2xl font-bold text-center ">{title}</div>
      <div className="flex flex-wrap items-start  gap-6 py-6 md:w-[80%] md:mx-auto">
        {socialMediaPlatforms?.map((platform) => (
          <div key={platform.name} className="flex items-center w-full gap-4 p-1 md:flex-row ">
            <label
              htmlFor={platform.name}
              className={clsx("md:p-2 rounded-full focus-within:bg-user_interface_1")}
            >
              {platform.icon}
            </label>
            <TextInput
              name={platform.name}
              placeholder={platform.placeholder}
              className="bg-transparent rounded-md "
              onChange={(e) => handleInputChange(e, platform?.name)}
              value={addOnWeb[platform.name as keyof Isocials] || ""}
              id={platform.name}
              errorMessage={platform.error}
            />
          </div>
        ))}
        <Button
          className={
            "px-[12px] py-[6px] border-green-500 mx-auto  border-[0.01px] flex items-center mt-6 rounded-xl"
          }
          onClick={() => updateSocials()}
        >
          upload
        </Button>
      </div>
    </div>
  )
}

export default Socials
