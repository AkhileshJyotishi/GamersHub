import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image" // Import your Image component library
import { toast } from "react-toastify"

import { Games } from "@/interface/games"
import { token } from "@/pages/settings"
import { fetchData } from "@/utils/functions"

import viewIcon from "@/components/icons/viewIcon.svg"
import Link from "next/link"

interface GamesCardProps extends Games {
  // location: string;
  id: number
  className?: string
  imageWidth?: number
}

const Card: React.FC<GamesCardProps> = ({
  id,
  username,
  title,
  banner,
// savedUsers
  // location,
  // album_slug,
  // likes,
  className,
  imageWidth,
}) => {
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)

  
  const likePost = async () => {
    let method
    if (liked) {
      method = "DELETE"
    } else {
      method = "POST"
    }

    const data = await fetchData(`/v1/game/like/${id}`, token, method)
    if (data?.error) {
      toast.error(data.message)
    } else {
      // toast.success(data?.message)
      setLiked(!liked)
    }
  }

  const savePost = async () => {
    const data = await fetchData(`/v1/game/user/save/${id}`, token, "POST")
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setSaved(!saved)
    }
  }

  return (
    <div
      className={clsx(
        "group overflow-hidden rounded-xl shadow-[0_0px_20px_-11px_rgba(0,0,0,0.55)] shadow-slate-50 ",
        className
      )}
    >
      <div className="relative w-[inherit] h-[inherit]">
        <div className="absolute inset-0 w-[inherit] h-[inherit]">
          <Image
            src={banner ?? ""}
            alt="img  "
            width={imageWidth || 320}
            height={200}
            className={clsx(
              "object-cover h-[inherit] w-[inherit] group-hover:scale-105 transition duration-200 "
            )}
          />
        </div>
        <div className="w-full h-[inherit] absolute top-0 bg-[#000] opacity-0 hover:opacity-70  transition duration-200">
          <div className="h-[40px]">
            <div className="flex items-center p-1 py-3 px-4 text-[#fff] justify-between flex-wrap gap-y-2 backdrop:blur-3xl">
              <div className="flex flex-wrap items-center justify-between">
                <Image
                  width={8}
                  height={8}
                  className="w-10 h-10 rounded-full"
                  src={banner ?? ""}
                  alt={`Profile Photo of ${username}`}
                />
                <div className="ml-3">
                  <span className="block antialiased font-bold leading-tight text-md">
                    {username}
                  </span>
                  {/* <span className="block text-xs">{album_slug}</span> */}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* <span className="w-5 h-5 text-xs">{likes}</span>
                <Image
                  width={8}
                  height={8}
                  className="w-5 h-5 rounded-full cursor-pointer"
                  src={viewIcon}
                  alt="View Icon"
                /> */}
              </div>
            </div>
          </div>
          <div className="flex justify-between h-[40px] items-end px-6 translate-y-80 group-hover:translate-y-60 transition duration-200">
            <div className="flex gap-5 cursor-pointer" onClick={() => likePost()}>
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
            <Link  href={`/games/${id}`}>
              {title}
            </Link>
            <div className="flex cursor-pointer" onClick={() => savePost()}>
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
    </div>
  )
}

export default Card
