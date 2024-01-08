import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { dateToTimeAgo, fetchData } from "@/utils/functions"

import BriefcaseIcon from "@/components/icons/briefcase"
import ChevronDownIcon from "@/components/icons/chevrondownicon"
import DeleteIcon from "@/components/icons/deleteIcon"
import MapPinIcon from "@/components/icons/mappinicon"
import WifiIcon from "@/components/icons/wifi"
interface JobCardProps {
  id: number
  title: string
  desc: string | null
  date: string | null
  salary: string
  type: string
  banner: string | null
  location: string
  remote: boolean
  href: string
  className: string
  chips?: string[]
  savedUsers?: {
    id: number
  }[]
  userId: number
  profileImage: string
  onChange?: (id: number) => void
  onsavedSuccess?: (id: number, state: string) => void
}

interface JobTitleProps {
  title: string
  slug: number
  userId: number
  savedUsers:
    | {
        id: number
      }[]
    | undefined
  onChange: ((id: number) => void) | undefined
  onsavedSuccess: ((id: number, state: string) => void) | undefined
  id: number
}

const JobTitle: React.FC<JobTitleProps> = ({
  title,
  slug,
  userId,
  savedUsers,
  onChange,
  onsavedSuccess,
  id,
}) => {
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const { setmodalData } = useModalContext()
  const [saved, setSaved] = useState<boolean>(false)
  useEffect(() => {
    if (savedUsers?.length) {
      setSaved(savedUsers?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
  }, [savedUsers, userData])

  const savePost = async (id: number) => {
    const data = await fetchData(`/v1/job/user/save/${id}`, session?.user?.name as string, "POST")
    toast.dismiss()
    if (data?.error) {
      toast.error(data.message)
    } else {
      if (saved) {
        onsavedSuccess && onsavedSuccess(id, "unsave")
      } else {
        onsavedSuccess && onsavedSuccess(id, "save")
      }
      toast.success(data?.message)
      setSaved(!saved)
    }
  }
  const deletePost = async (id: number) => {
    toast.info("Removing the Job...")
    handleClose()
    const data = await fetchData(`/v1/job/${id}`, session?.user?.name as string, "DELETE")
    toast.dismiss()
    if (data?.error) {
      toast.error(data.message)
    } else {
      onChange && onChange(id)
      toast.success(data?.message)
      // setSaved(!saved)
    }
  }
  const handleClose = () => {
    setmodalData(() => ({
      buttonText: "",
      onClick: () => {},
      content: <></>,
      isOpen: false,
      onClose: () => {},
      title: <></>,
    }))
  }
  const { setIsLoginModalOpen } = useUserContext()
  return (
    <div className="flex flex-row items-start justify-between w-full">
      <Link
        href={`/jobs/${slug}`}
        className="text-[22px] font-semibold hover:text-secondary duration-200 "
      >
        {title?.[0]?.toUpperCase() + title?.slice(1)}
      </Link>

      {userData?.id !== userId ? (
        <>
          <div
            className={clsx("flex items-center  cursor-pointer ml-auto")}
            onClick={(e) => {
              e.stopPropagation()
              !session ? setIsLoginModalOpen(true) : savePost(id)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={saved ? "#fff" : "none"}
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </>
      ) : (
        <>
          <div
            className={clsx("flex items-center ml-auto")}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setmodalData(() => ({
                buttonText: "Delete Job",
                content: <>Are you sure you want to delete Job</>,
                onClick: () => deletePost(id),
                isOpen: true,
                onClose: () => {
                  handleClose()
                },
                title: <>{title}</>,
              }))
            }}
          >
            <DeleteIcon className="h-[28px] w-[28px] fill-red-300  hover:fill-red-500 hover:cursor-pointer hover:scale-150 transition duration-200" />
          </div>
        </>
      )}
    </div>
  )
}

interface JobProfileProps {
  profileImage: string
  title: string
  id: number
  location: string
}

const JobProfile: React.FC<JobProfileProps> = ({ profileImage, id, location, title }) => {
  const router = useRouter()
  return (
    <div className="flex flex-row gap-3 mt-[50px]">
      <div
        onClick={(e) => {
          e.stopPropagation()
          router.push(`${id}/profile/albums`)
        }}
      >
        {profileImage ? (
          <Image
            alt={""}
            src={profileImage}
            width={40}
            height={40}
            className="w-[46px] h-[46px] rounded-full"
          />
        ) : (
          <div className="w-[46px] h-[46px] rounded-full bg-gray-400/50" />
        )}
      </div>
      <div className="flex flex-col items-start gap-1">
        <Link href={`/${id}/profile/albums`} className="font-medium text-[14px]">
          {title ?? "Guest"}
        </Link>
        {location.trim().length > 1 && (
          <span className="flex flex-row items-center gap-2">
            <MapPinIcon className="text-user_interface_6 w-4 h-4" />
            <span className="text-[12px] text-user_interface_6 font-medium">{location}</span>
          </span>
        )}
      </div>
    </div>
  )
}

interface JobDescriptionProps {
  description: string
}

const JobDescription: React.FC<JobDescriptionProps> = ({ description }) => (
  <p className="mt-7 text-[14px] min-h-[64px] text-user_interface_5 line-clamp-3">{description}</p>
)

interface JobDetailsProps {
  jobLocation: {
    remote: boolean
  }
  location: string

  type: string
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobLocation, location, type }) => (
  <div className="flex self-end flex-row w-full flex-wrap mt-10 gap-[20px]">
    <span className="flex flex-row items-center gap-1">
      {jobLocation.remote ? (
        <WifiIcon className="text-secondary_2 w-[18px] h-[18px]" />
      ) : (
        <MapPinIcon className="text-secondary_2 w-[18px] h-[18px]" />
      )}
      <span>{jobLocation.remote ? "Remote" : location}</span>
    </span>
    <span className="flex flex-row items-center gap-1">
      <BriefcaseIcon className="text-secondary_2 w-[18px] h-[18px]" />
      <span>{type}</span>
    </span>
  </div>
)

interface JobPostedProps {
  createdAt: string
}

const JobPosted: React.FC<JobPostedProps> = ({ createdAt }) => (
  <div className="flex flex-row justify-between w-full mt-5">
    <div className="text-user_interface_5">Posted {dateToTimeAgo(new Date(createdAt))}</div>
    <div className="flex group flex-row items-center gap-2 text-secondary">
      <span>Know more</span>
      <ChevronDownIcon className="text-secondary stroke-secondary transition-all group-hover:translate-x-2" />
    </div>
  </div>
)
const AdditionalDetails = ({ type, chips }: { type: string; chips?: string[] }) => {
  return (
    <div className="flex flex-wrap gap-3 p-3">
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center ">
          <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full cursor-pointer hover:border-secondary">
            <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px]">
              {type}
            </div>
          </div>
        </span>
      </div>
      {chips &&
        chips?.map((chip, index) => (
          <div key={index} className="flex flex-wrap items-center cursor-pointer ">
            <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full hover:border-secondary bg-user_interface_2">
              <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px] break-all">
                {chip}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

const DynamicJobCard: React.FC<JobCardProps> = ({
  className,
  date,
  // salary,
  desc,
  location,
  type,
  chips,
  title,
  href,
  id,
  savedUsers,
  profileImage,
  onsavedSuccess,
  userId,
  onChange,
}) => {
  const router = useRouter()
  return (
    <article
      className={`flex w-full cursor-pointer flex-col items-start rounded-lg md:rounded-[17px] py-[25px] px-4 md:px-[36px] bg-user_interface_2 h-fit ${className}`}
      onClick={() => router.push(href)}
    >
      <JobTitle
        title={title}
        slug={id}
        userId={userId}
        savedUsers={savedUsers}
        onChange={onChange}
        onsavedSuccess={onsavedSuccess}
        id={id}
      />
      <JobProfile
        id={userId}
        location={location}
        profileImage={profileImage}
        title={title}
        key={"profile"}
      />
      <JobDescription description={desc || ""} />
      <JobDetails jobLocation={{ remote: true }} location={location} type={type} />
      <AdditionalDetails type={type} chips={chips} key={"Additional Details "} />
      <JobPosted createdAt={date || ""} />
    </article>
  )
}

export default DynamicJobCard
