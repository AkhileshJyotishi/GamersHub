import React, { useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { toast } from "react-toastify"

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
}[]

const socialMediaPlatforms: socialMediaPlatforms = [
  {
    name: "facebook",
    icon: <FaceBookIcon className="w-6 h-6" />,
    placeholder: "http://facebook.com/",
  },
  {
    name: "linkedin",
    icon: <LinkedInIcon className="w-6 h-6 " />,
    placeholder: "https://linkedin.com/in/gamecreatorshub",
  },
  {
    name: "twitter",
    icon: <TwitterIcon className="w-6 h-6" />,
    placeholder: "https://twitter.com/gamecreatorshub",
  },
  {
    name: "portfolio",
    icon: <GlobeIcon className="w-6 h-6 text-secondary_2" />,
    placeholder: "https://mywebsite.com",
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
  },
  {
    name: "github",
    icon: <GitHubIcon className="w-5 h-5 text-white" />,
    placeholder: "https://github.com/yourprofile",
  },
  {
    name: "youtube",
    icon: <YoutubeIcon className="w-5 h-5 text-white" />,
    placeholder: "place holder",
  },
]

type EditProfileProps = {
  title?: string
  socialsprops: Isocials
}
const Socials: React.FC<EditProfileProps> = ({ title = "Socials", socialsprops }) => {
  // console.log("session ", socialsprops)

  const [addOnWeb, setAddOnWeb] = useState<Isocials>({
    ...socialsprops,
  })
  const updateSocials = async () => {
    const hasDataChanged = Object.keys(addOnWeb).some(
      (key) => addOnWeb[key as keyof Isocials] !== socialsprops[key as keyof Isocials]
    )
    // delete addOnWeb.id;
    // delete addOnWeb.userId;

    if (hasDataChanged) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/users/socials`, {
          method: "PATCH",
          body: JSON.stringify(addOnWeb),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5OTU1Nzk4MiwiZXhwIjoxNjk5NTYxNTIyLCJ0eXBlIjoiQUNDRVNTIn0.tlcfQAz9fABBf5eTtX2mBb1dXdDlFiI8VFddawKHtIw",
          },
        })
        // console.log("fuck res", res)
        const resp: APITypes = await res.json()
        console.log("resp ", resp)

        resp.error ? toast.error(resp.message) : toast.success(resp.message)
      } catch (error: Allow) {
        console.log(error)
        toast.error(error)
      }
    }
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    platform: string
  ) => {
    setAddOnWeb({ ...addOnWeb, [platform]: e.target.value })
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="mx-auto text-2xl font-bold text-center ">{title}</div>
      <div className="flex flex-wrap items-start  gap-6 py-6 w-[80%] mx-auto">
        {socialMediaPlatforms.map((platform) => (
          <div key={platform.name} className="flex items-center w-full gap-4 p-1 md:flex-row">
            <label htmlFor={platform.name} className={clsx("p-2 rounded-full ")}>
              {platform.icon}
            </label>
            <TextInput
              name={platform.name}
              placeholder={platform.placeholder}
              className="bg-transparent rounded-md "
              onChange={(e) => handleInputChange(e, platform?.name)}
              value={addOnWeb[platform.name as keyof Isocials] || ""}
              id={platform.name}
            />
          </div>
        ))}
        <Button className="mx-auto text-2xl font-bold text-center" onClick={() => updateSocials()}>
          dsfd{" "}
        </Button>
      </div>
    </div>
  )
}

export default Socials
