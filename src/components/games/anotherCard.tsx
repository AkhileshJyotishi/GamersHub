import React, { useState } from "react"
import clsx from "clsx"
import Image, { StaticImageData } from "next/image"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { fetchData } from "@/utils/functions"

interface CardProps {
  id: number
  username: string
  title: string
  //   location: string;
  cover?: string | StaticImageData
  banner?: string | StaticImageData
  className: string
  //   likes: number;
}

const SocialCard: React.FC<CardProps> = ({
  id,
  username,
  title,
  //   location,
  cover,
  banner,
  className,
  //   likes,
}) => {
  const { data: session } = useSession()
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)

  const likePost = async () => {
    let method
    if (liked) {
      method = "DELETE"
    } else {
      method = "POST"
    }

    const data = await fetchData(`/v1/game/like/${id}`, session?.user?.name as string, method)
    if (data?.error) {
      toast.error(data.message)
    } else {
      // toast.success(data?.message)
      setLiked(!liked)
    }
  }

  const savePost = async () => {
    const data = await fetchData(`/v1/game/user/save/${id}`, session?.user?.name as string, "POST")
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setSaved(!saved)
    }
  }

  return (
    <div className={clsx("p-4 bg-slate-700 rounded-xl", className)}>
      <div className="max-w-md bg-white border rounded-sm">
        <div className="flex items-center px-4 py-3">
          <Image
            className="w-8 h-8 rounded-full"
            src={cover || defaultbannerImage}
            alt={""}
            width={100}
            height={100}
          />
          <div className="ml-3 ">
            <span className="block text-sm antialiased font-semibold leading-tight">
              {username}
            </span>
            <span className="block text-sm antialiased font-semibold leading-tight">{title}</span>
            {/* <span className="block text-xs text-gray-600">{location}</span> */}
          </div>
        </div>
        <div className="h-[200px]">
          <Image
            src={banner || defaultbannerImage}
            alt=""
            width={400}
            height={100}
            className="w-[70%] h-full"
          />
        </div>
        <div className="flex items-center justify-between mx-4 mt-3 mb-2">
          <div className="flex gap-5" onClick={() => likePost()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={liked ? "#fff" : "none"}
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className="flex" onClick={() => savePost()}>
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
      </div>
    </div>
  )
}

export default SocialCard
