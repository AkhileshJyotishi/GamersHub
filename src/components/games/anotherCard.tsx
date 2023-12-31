import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultUserImage from "@/assets/image/user-profile.svg"
import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { fetchData, shimmer, toBase64 } from "@/utils/functions"

import DeleteIcon from "@/components/icons/deleteIcon"
import EditIcon from "@/components/icons/editIcon"

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
  onsavedSuccess?: (id: number, state: string) => void

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
  onsavedSuccess,
  //   likes,
}) => {
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const { setmodalData } = useModalContext()

  // const isSaved

  // const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    if (savedUsers?.length) {
      setSaved(savedUsers?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
  }, [savedUsers, userData])

  const savePost = async () => {
    const data = await fetchData(`/v1/game/user/save/${id}`, session?.user?.name as string, "POST")
    if (data?.error) {
      toast.dismiss()
      toast.error(data.message)
      // setSaved()
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
    const data = await fetchData(`/v1/game/${id}`, session?.user?.name as string, "DELETE")
    if (data?.error) {
      toast.error(data.message)
    } else {
      onChange && onChange(id)
      toast.dismiss()
      toast.success(data?.message)
      // setSaved(!saved)
    }
  }
  const updatePost = async (id: number) => {
    router.push(`/${userId}/profile/portfolio/updateGame/${id}`)
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

  return (
    <div className={clsx("p-1 bg-user_interface_2 rounded-xl", className)}>
      <div className="max-w-md bg-white rounded-sm">
        <div className="flex items-center px-2 py-2">
          <Image
            className="object-cover w-6 h-6 rounded-full"
            src={cover || defaultUserImage}
            alt={""}
            width={100}
            height={100}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
          <div className="ml-2 ">
            <span
              className="block text-base antialiased leading-tight transition duration-200 cursor-pointer hover:text-secondary"
              onClick={() => router.push(`/${userId}/profile/albums`)}
            >
              {username}
            </span>
            {/* <span className="block text-xs text-gray-600">{location}</span> */}
          </div>
          {session && userData?.id == userId ? (
            <div className="flex gap-2 ml-auto mr-1">
              <DeleteIcon
                className="h-[28px] w-[28px] fill-red-300  hover:fill-red-500 hover:cursor-pointer  transition duration-200 mt-1"
                onClick={() => {
                  setmodalData(() => ({
                    buttonText: "Delete Game",
                    content: <>Are you sure you want to delete Game</>,
                    onClick: () => deletePost(id),
                    isOpen: true,
                    onClose: () => {
                      handleClose()
                    },
                    title: <>{title}</>,
                  }))
                }}
              />
              <>
                <div
                  className="flex items-center "
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updatePost(id)
                  }}
                >
                  <EditIcon className="h-[22px] w-[28px]  hover:fill-white hover:cursor-pointer hover:scale-110 transition duration-200" />
                </div>
              </>
            </div>
          ) : (
            <>
              {userData?.id !== userId && (
                <div className="flex ml-auto cursor-pointer" onClick={() => savePost()}>
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
            </>
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
        <div className="flex items-center justify-between px-4 py-1"></div>
      </div>
    </div>
  )
}

export default SocialCard
