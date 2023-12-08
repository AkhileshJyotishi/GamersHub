import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import ChevronDownIcon from "@/assets/svg/chevron-right.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import DeleteIcon from "@/components/icons/deleteIcon"
// import testImage from "@/assets/image/profiles-slide-show.png"
import MapPinIcon from "@/components/icons/mappinicon"

interface JobCardProps {
  id: number
  title: string
  desc: string | null
  date: string | null
  salary: string
  type: string
  banner: string | null
  location: string
  href: string
  className: string
  chips?: string[]
  savedUsers?: {
    id: number
  }[]
  userId: number
  onChange?: (id: number) => void
}

const UserImage = ({ href }: { href: string | null }) => (
  <Link href={"#"} className="my-auto">
    <div className="flex items-center">
      <Image
        width={100}
        height={100}
        alt={""}
        className="w-10 h-10 border-[0.1px] rounded-full "
        src={href || defaultbannerImage}
      />
    </div>
  </Link>
)

const UserInfo = ({ title, location }: { title: string; location: string }) => (
  <div className="flex flex-col justify-center gap-1 text-center">
    <Link href={"#"} className="font-serif font-bold text-[16px] mx-auto md:mx-0">
      {title}
    </Link>
    {location.trim().length > 1 && (
      <span className="flex flex-row items-center gap-2">
        <MapPinIcon height="19" className="w-4 h-[inherit] text-user_interface_6" />
        <span className="text-[15px] text-user_interface_6 font-medium">{location}</span>
      </span>
    )}
  </div>
)

const JobDescription = ({ desc }: { desc: string }) => (
  <div className="w-full min-h-[100px] overflow-hidden mt-2 p-3">
    <p className="w-full pr-2 overflow-hidden text-light/40 line-clamp-3">{desc}</p>
  </div>
)

const JobDetails = ({ salary, date }: { salary: string; date: string }) => (
  <div className="flex flex-wrap gap-5 p-3 text-sm sm:mt-0">
    <span className="flex items-center font-semibold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mr-2"
        viewBox="0 0 20 20"
        fill="#00E59B"
      >
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
          clipRule="evenodd"
        />
      </svg>
      {salary}
    </span>
    <span className="flex items-center font-semibold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mr-2"
        viewBox="0 0 20 20"
        fill="#00E59B"
      >
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
      {new Date(date).toDateString()}
    </span>
  </div>
)

const AdditionalDetails = ({ type, chips }: { type: string; chips?: string[] }) => {
  // chips?.push(type)
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
        chips.map((chip, index) => (
          <span key={index} className="flex items-center cursor-pointer ">
            <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full hover:border-secondary bg-user_interface_2">
              {/* Add your Chip SVG or Icon here */}
              <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px] break-all">
                {chip}
              </div>
            </div>
          </span>
        ))}
    </div>
  )
}
const Card: React.FC<JobCardProps> = ({
  className,
  date,
  salary,
  desc,
  location,
  type,
  chips,
  title,
  href,
  id,
  savedUsers,
  banner,
  userId,
  onChange,
}) => {
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const router = useRouter()
  const [saved, setSaved] = useState<boolean>(false)
  // console.log(saved)
  useEffect(() => {
    if (savedUsers?.length) {
      setSaved(savedUsers?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
  }, [savedUsers])
  // console.log(id)
  // const issaved=
  // issaved?

  const savePost = async (id: number) => {
    const data = await fetchData(`/v1/job/user/save/${id}`, session?.user?.name as string, "POST")
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setSaved(!saved)
    }
  }
  const deletePost = async (id: number) => {
    const data = await fetchData(`/v1/job/${id}`, session?.user?.name as string, "DELETE")
    if (data?.error) {
      toast.error(data.message)
    } else {
      onChange && onChange(id)
      toast.success(data?.message)
      // setSaved(!saved)
    }
  }

  // const updatePost = async (id: number) => {
  //   router.push(`/${userId}/profile/portfolio/updateJob/${id}`)
  // }

  return (
    <>
      <div
        className={clsx(
          "p-3 flex flex-col gap-3 bg-[#161A1F] justify-between  rounded-xl  hover:border-[0.1px] w-full max-h-[650px]",
          className
        )}
        // href={href}
        onClick={() => router.push(href)}
      >
        <div className="">
          <div>
            <div className="flex flex-row flex-wrap justify-between gap-3 p-3">
              <div className="flex gap-[25px] flex-wrap justify-center">
                <UserImage href={banner} />
                <UserInfo title={title} location={location} />
              </div>

              {userData?.id !== userId ? (
                <>
                  <div
                    className="flex items-center "
                    onClick={(e) => {
                      e.stopPropagation()
                      savePost(id)
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
                    className="flex items-center mx-auto "
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      deletePost(id)
                    }}
                  >
                    <DeleteIcon className="h-[28px] w-[28px] fill-red-300  hover:fill-red-500 hover:cursor-pointer hover:scale-150 transition duration-200" />
                  </div>
                </>
              )}
            </div>
            <hr className="w-[70%] mx-auto my-[7px] h-[1px] border-user_interface_3" />
            <JobDescription desc={desc as string} />
          </div>
          <div>
            <JobDetails salary={salary} date={date as string} />
          </div>
          <div>
            <AdditionalDetails type={type} chips={chips!} />
          </div>
        </div>
        <Link className="flex items-center text-secondary group" href={href}>
          Know More
          <Image
            width={2060}
            height={2060}
            className="w-2 h-2 ml-2 -mr-1 transition duration-200 group-hover:translate-x-2 text-secondary hover:text-secondary"
            alt=""
            src={ChevronDownIcon}
          />
        </Link>
      </div>
    </>
  )
}

export default Card
