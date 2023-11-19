import React, { useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

// import testImage from "@/assets/image/profiles-slide-show.png"
import MapPinIcon from "@/components/icons/mappinicon"
import SaveIcon from "@/components/icons/SaveIcon"
import ChevronDownIcon from "@/assets/svg/chevron-right.svg"
import { fetchData } from "@/utils/functions"

interface JobCardProps {
  title: string
  desc: string
  date: string
  salary: string
  type: string
  location: string
  href: string
  className: string
  chips?: string[]
}

const UserImage = ({ href }: { href: string }) => (
  <Link href={"#"} className="my-auto">
    <div className="flex items-center">
      <Image width={100} height={100} alt={""} className="w-10 h-10 rounded-full" src={href} />
    </div>
  </Link>
)

const UserInfo = ({ title, location }: { title: string; location: string }) => (
  <div className="flex flex-col items-start gap-1">
    <Link href={"#"} className="font-serif font-bold text-[16px]">
      {title}
    </Link>
    <span className="flex flex-row items-center gap-2">
      <MapPinIcon className="w-4 h-4 text-user_interface_6" />
      <span className="text-[15px] text-user_interface_6 font-medium">{location}</span>
    </span>
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
      {date}
    </span>
  </div>
)

const AdditionalDetails = ({ type, chips }: { type: string; chips?: string[] }) => (
  <div className="flex flex-wrap gap-3 p-3">
    <div className="flex flex-wrap gap-2">
      {/* <span className="flex items-center ">
                <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 20 20"
                        fill="#fff "
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px] break-all">
                        {location}
                    </div>
                </div>
            </span> */}
      <span className="flex items-center ">
        <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full ">
          <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px]">
            {type}
          </div>
        </div>
      </span>
    </div>
    {chips &&
      chips.map((chip, index) => (
        <span key={index} className="flex items-center cursor-pointer ">
          <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full hover:border-secondary bg-user_interface_2" >
            {/* Add your Chip SVG or Icon here */}
            <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px] break-all">
              {chip}
            </div>
          </div>
        </span>
      ))}
  </div>
)

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
}) => {

  const [saved,setSaved]=useState();
  // const savePost = async () => {
  //   const data = await fetchData(`/v1/post/user/save/${id}`, , "POST")
  //   if (data?.error) {
  //     toast.error(data.message)
  //   } else {
  //     toast.success(data?.message)
  //     setSaved(!saved)
  //   }
  // }

  
  return (
    <>
      <div className={clsx("p-3 flex flex-col gap-3 bg-[#161A1F] justify-between h-fit ", className)}>
        <div className="">
          <div>
            <div className="flex flex-row flex-wrap justify-between gap-3 p-3">
              <div className="flex gap-[25px] flex-wrap">
                <UserImage href={href} />
                <UserInfo title={title} location={location} />
              </div>
              <div className="flex items-center">
                
                {/* <SaveIcon className="w-5 h-5" /> */}
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
            </div>
            <JobDescription desc={desc} />
          </div>
          <div>
            <JobDetails salary={salary} date={date} />
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
