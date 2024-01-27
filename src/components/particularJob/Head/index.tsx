import React, { useEffect, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { VscMail } from "react-icons/vsc"
import { toast } from "react-toastify"

import logoblackbg from "@/assets/image/logo-black-bg.png"
// import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultUserImage from "@/assets/image/user-profile.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchData, shimmer, toBase64 } from "@/utils/functions"

import EditIcon from "@/components/icons/editIcon"
import MapPinIcon from "@/components/icons/mappinicon"
import SaveIcon from "@/components/icons/SaveIcon"
import Button from "@/components/ui/button"
import DynamicPopover from "@/components/ui/popover"

interface JobPageHeaderProps {
  logoSrc: string | null
  title: string
  jobId: number
  userId: number
  remote: boolean
  savedUsers: { id: number }[]
  setisApplyJobOpen: React.Dispatch<React.SetStateAction<boolean>>
  isApplyJobOpen: boolean
  setisApplyJobGCHOpen: React.Dispatch<React.SetStateAction<boolean>>
  isApplyJobGCHOpen: boolean
  location: string
  jobApplyUrl: string | null | undefined
  rolesNeeded?: { role: string }[]
  jobApplyEmail?: string
  isProfileFilled?: boolean
  appliedUsers: { id: number }[]
}
const UserImage = ({ href }: { href: string | StaticImageData }) => (
  <span className="my-auto">
    <div className="flex items-center">
      <Image width={400} height={400} alt={""} className="w-20 h-20 rounded-full" src={href} />
    </div>
  </span>
)

const UserInfo = ({ title }: { title: string }) => (
  <div className="flex flex-col items-start justify-center gap-1">
    <span className="font-bold text-[36px]">{title}</span>
    {/* <span className="flex flex-row items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-user_interface_6" />
            <span className="text-[15px] text-user_interface_6 font-medium">{company}</span>
        </span> */}
  </div>
)

const JobPageHeader: React.FC<JobPageHeaderProps> = ({
  logoSrc,
  title,
  jobId,
  location,
  remote,
  userId,
  savedUsers,
  setisApplyJobOpen,
  setisApplyJobGCHOpen,
  jobApplyUrl,
  jobApplyEmail,
  isProfileFilled,
  appliedUsers,
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const [isJobSaved, setIsJobSaved] = useState(savedUsers.some((user) => user.id === userData?.id))
  const { setIsLoginModalOpen } = useUserContext()
  const saveJob = async (jobId: number) => {
    const res = await fetchData(`/v1/job/user/save/${jobId}`, session?.user?.name as string, "POST")
    toast.dismiss()
    if (res?.error) {
      toast.error(res.message)
    } else {
      setIsJobSaved(!isJobSaved)
      toast.dismiss()
      toast.success(res?.message)
    }
  }
  useEffect(() => {
    setIsJobSaved(savedUsers.some((user) => user.id === userData?.id))
  }, [userData])
  const popoverItems: {
    name: string
    description: string
    hrefOrState: string | Setjob
    applyWith?: "GCH" | "MANUAL"
    icon: React.JSX.Element
  }[] =
    jobApplyUrl && jobApplyUrl !== null
      ? [
          {
            name: "Apply with GameCreators",
            description: "Easy application directly using your Gamecreators profile and portfolio",
            hrefOrState: setisApplyJobGCHOpen,
            applyWith: "GCH",
            icon: (
              <>
                <Image
                  src={logoblackbg}
                  width={60}
                  height={10}
                  alt=""
                  className="block xl:absolute w-[40px]"
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
              </>
            ),
          },
          {
            name: "Apply Directly",
            description: "Apply manually by filling details and uploading resume",
            hrefOrState: setisApplyJobOpen,
            applyWith: "MANUAL",
            icon: <div className=""></div>,
          },
          {
            name: "Apply Through Link",
            description: "",
            hrefOrState: "##",
            icon: (
              <>
                <FaExternalLinkAlt className="w-5 h-5" />
              </>
            ),
          },
          {
            name: "Apply Through Mail",
            description: "",
            hrefOrState: jobApplyEmail ? `mailto:${jobApplyEmail}` : "#",
            icon: (
              <>
                <VscMail className="w-5 h-5" />
              </>
            ),
          },
        ]
      : [
          {
            name: "Apply with GameCreators",
            description: "Easy application directly using your Gamecreators profile and portfolio",
            hrefOrState: setisApplyJobGCHOpen,
            applyWith: "GCH",
            icon: (
              <>
                <Image
                  src={logoblackbg}
                  width={60}
                  height={10}
                  alt=""
                  className="block xl:absolute w-[40px]"
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
              </>
            ),
          },
          {
            name: "Apply Directly",
            description: "Apply manually by filling details and uploading resume",
            hrefOrState: setisApplyJobOpen,
            applyWith: "MANUAL",
            icon: <div className=""></div>,
          },
          {
            name: "Apply Through Mail",
            description: "",
            hrefOrState: "##",
            icon: (
              <>
                <VscMail className="w-5 h-5" />
              </>
            ),
          },
        ]

  return (
    <div>
      <div className="p-4">
        <Button className="gap-2 opacity-75 center hover:opacity-100" onClick={() => router.back()}>
          <IoIosArrowBack />
          <span>back</span>
        </Button>
      </div>
      <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
        <div className="flex gap-[25px] flex-wrap">
          <UserImage href={logoSrc || defaultUserImage} />
          <UserInfo title={title[0].toUpperCase() + title.slice(1)} />
        </div>
        <div className="flex gap-[25px]"></div>
      </div>
      {!remote && (
        <div className="flex flex-wrap gap-3 p-2">
          <MapPinIcon className="w-4 h-4 text-user_interface_6" />

          <div>{location}</div>
        </div>
      )}

      {userData?.id !== userId ? (
        <div className="flex mt-3 gap-x-4 ">
          <Button
            className=" flex items-center hover:bg-secondary border-secondary border-[0.1px] py-[10px] px-[15px] md:px-[30px] font-medium rounded-xl gap-2"
            onClick={() => {
              !session?.user ? setIsLoginModalOpen(true) : saveJob(jobId)
            }}
          >
            <SaveIcon className="w-5 h-5 fill-text" fill="" />
            {isJobSaved ? "Unsave Job" : "Save Job"}
          </Button>

          {appliedUsers.filter((user) => user.id === userData?.id).length > 0 ? (
            <div className=" flex items-center bg-secondary border-secondary border-[0.1px] py-[10px] px-[15px] md:px-[30px] font-medium rounded-xl gap-2">
              Applied
            </div>
          ) : (
            <DynamicPopover
              buttonText="Apply Now"
              items={popoverItems}
              isProfileFilled={isProfileFilled}
            />
          )}
        </div>
      ) : (
        <div className="flex mt-3 gap-x-4 ">
          <Button
            className="mt-2 flex gap-1 border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl hover:bg-secondary"
            onClick={() => router.push(`/user/profile/portfolio/updateJob/${jobId}`)}
          >
            <EditIcon className="w-5 h-5 text-user_interface_7" />
            Edit Job
          </Button>
          <Button
            className="mt-2 flex gap-1 border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl hover:bg-secondary"
            onClick={() => router.push(`/jobs/${jobId}/response`)}
          >
            View Responses
          </Button>
        </div>
      )}
    </div>
  )
}

export default JobPageHeader
