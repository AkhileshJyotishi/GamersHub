import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { useUserContext } from "@/providers/user-context"
import { fetchData, shimmer, toBase64 } from "@/utils/functions"

import DeleteIcon from "@/components/icons/deleteIcon"

// import EditIcon from "../icons/editIcon"

interface CardProps {
  id: number
  username: string
  title: string
  //   location: string;
  cover?: string | StaticImageData
  banner?: string | StaticImageData
  className: string
  userId: number
  savedUsers: {
    id: number
  }[]
  onChange?: (id: number) => void
  //   likes: number;
}

const SocialCard: React.FC<CardProps> = ({
  id,
  username,
  title,
  //   location,
  userId,
  cover,
  banner,
  className,
  savedUsers,
  onChange,
  //   likes,
}) => {
  const { data: session } = useSession()
  const { userData } = useUserContext()
  // const isSaved

  // const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    if (savedUsers?.length) {
      setSaved(savedUsers?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
  }, [savedUsers])

  const savePost = async () => {
    const data = await fetchData(`/v1/game/user/save/${id}`, session?.user?.name as string, "POST")
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setSaved(!saved)
    }
  }
  const deletePost = async (id: number) => {
    const data = await fetchData(`/v1/game/${id}`, session?.user?.name as string, "DELETE")
    if (data?.error) {
      toast.error(data.message)
    } else {
      onChange && onChange(id)
      toast.success(data?.message)
      // setSaved(!saved)
    }
  }
  // const updatePost = async (id: number) => {
  //   router.push(`/${userId}/profile/portfolio/updateGame/${id}`)
  // }

  return (
    <div className={clsx("p-1 bg-user_interface_2 rounded-xl", className)}>
      <div className="max-w-md bg-white rounded-sm">
        <div className="flex items-center px-2 py-2">
          <Image
            className="w-6 h-6 rounded-full"
            src={cover || defaultbannerImage}
            alt={""}
            width={100}
            height={100}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}

          />
          <div className="ml-2 ">
            <span
              className="block text-sm antialiased leading-tight transition duration-200 cursor-pointer hover:text-secondary"
              onClick={() => router.push(`/${userId}/profile/albums`)}
            >
              {username}
            </span>
            {/* <span className="block text-xs text-gray-600">{location}</span> */}
          </div>
          {session && userData?.id == userId && (
            <div className="ml-auto">
              <DeleteIcon
                className="h-[28px] w-[28px] fill-red-300  hover:fill-red-500 hover:cursor-pointer  transition duration-200"
                onClick={() => deletePost(id)}
              />
            </div>
          )}
        </div>
        <div className="flex items-center px-2">
          <span
            className="block text-[16px] font-bold antialiased leading-tight  transition duration-200 cursor-pointer hover:text-secondary"
            onClick={() => router.push(`/games/${id}`)}
          >
            {title}
          </span>
        </div>
        <div className="h-[200px] rounded-sm p-2">
          <Image
            src={banner || defaultbannerImage}
            alt=""
            // blurDataURL={defaultbannerImage}
            width={400}
            height={100}
            className="w-[100%] object-cover rounded-lg h-[100%] border-[1px] border-user_interface_4 "
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}

          />
        </div>
        <div className="flex items-center justify-between px-4 py-1">
          {/* <div className="flex cursor-pointer" onClick={() => likePost()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={liked ? "#fff" : "none"}
            stroke="#B4B4B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div> */}
          {userData?.id !== userId && (
            <div className="flex cursor-pointer" onClick={() => savePost()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={saved ? "#fff" : "none"}
                stroke="#B4B4B4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SocialCard
