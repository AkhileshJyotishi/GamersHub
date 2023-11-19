import React from "react"
import clsx from "clsx"
import Image from "next/image" // Import your Image component library

// import viewIcon from "@/components/icons/viewIcon.svg"

interface CardProps {
  username: string
  userProfilePhoto: string
  coverPhoto: string
  // location: string;
  // views: string;
  className?: string
  imageWidth?: number
  matureContent: boolean
}

const Card: React.FC<CardProps> = ({
  // username,
  userProfilePhoto,
  coverPhoto,
  // location,
  // views,
  className,
  imageWidth,
  // matureContent,
}) => {
  return (
    <div
      className={clsx(
        "min-h-[350px]  group overflow-hidden rounded-xl shadow-[0_0px_20px_-11px_rgba(0,0,0,0.55)] shadow-slate-50 ",
        className
      )}
    >
      <div className="relative w-[inherit] h-[inherit]">
        <div className="absolute inset-0 w-[inherit] h-[inherit]">
          <Image
            src={coverPhoto}
            alt=""
            width={imageWidth || 320}
            height={200}
            className={clsx(
              "object-cover h-[inherit] w-[inherit]  group-hover:scale-105 transition duration-200 "
            )}
          />
        </div>
        <div className="w-full h-[350px] absolute top-0 bg-[#00000050] bg-gradient-to-b from-[#00000005] to-[#00000095]">
          <div className="h-[40px]">
            <div className="flex items-center p-1 py-3 px-4 text-[#fff] justify-between">
              <div className="flex justify-between">
                <Image
                  width={8}
                  height={8}
                  className="w-10 h-10 rounded-full"
                  src={userProfilePhoto}
                  alt={``}
                />
                <div className="ml-3">
                  {/* <span className="block antialiased font-bold leading-tight text-md">{username}</span> */}
                  {/* <span className="block text-xs">{location}</span> */}
                </div>
              </div>
              {/* <div className="flex items-center gap-4">
                                <span className="w-5 h-5 text-xs">{views}</span>
                                <Image width={8} height={8} className="w-5 h-5 rounded-full cursor-pointer" src={viewIcon} alt="View Icon" />
                            </div> */}
            </div>
          </div>
          <div className="flex justify-between h-[200px] items-end px-6 translate-y-36 group-hover:translate-y-20 transition duration-200">
            <div className="flex gap-5 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div className="flex cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
