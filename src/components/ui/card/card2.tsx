import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image" // Import your Image component library
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import DeleteIcon from "@/components/icons/deleteIcon"
import EditIcon from "@/components/icons/editIcon"
import { useModalContext } from "@/providers/modal-context"

// import viewIcon from "@/components/icons/viewIcon.svg"

interface CardProps {
  id: number
  username: string
  userProfilePhoto: string | null
  coverPhoto: string | null
  title: string
  userId: number
  // location: string;
  // views: string;
  className?: string
  imageWidth?: number
  matureContent: boolean
  savedPost: {
    id: number
  }[]
  likedPost: {
    id: number
  }[]
}

const Card: React.FC<CardProps> = ({
  username,
  userProfilePhoto,
  coverPhoto,
  title,
  // location,
  // views,
  className,
  imageWidth,
  savedPost,
  likedPost,
  userId,
  id,
}) => {
  const { userData } = useUserContext()
  const router = useRouter()

  const session = useSession()
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const { setmodalData } = useModalContext()

  const likePost = async () => {
    let method
    if (liked) {
      method = "DELETE"
    } else {
      method = "POST"
    }

    const data = await fetchData(`/v1/post/like/${id}`, session.data?.user?.name as string, method)
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setLiked(!liked)
    }
  }

  const savePost = async () => {
    const data = await fetchData(
      `/v1/post/user/save/${id}`,
      session.data?.user?.name as string,
      "POST"
    )
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setSaved(!saved)
    }
  }

  const deletePost = async (id: number) => {
    const data = await fetchData(`/v1/post/${id}`, session.data?.user?.name as string, "DELETE")
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      // setSaved(!saved)
    }
  }
  const updatePost = async (id: number) => {
    router.push(`/${userId}/profile/portfolio/updatePost/${id}`)
  }
  useEffect(() => {
    if (savedPost?.length) {
      setSaved(savedPost?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
    if (likedPost?.length) {
      setLiked(likedPost?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
  }, [savedPost, likePost])
  // useEffect(() => {
  //   if (likedPost?.length) {
  //     setLiked(likedPost?.some(obj => obj.id == (userData?.id ?? 0)))
  //   }
  // }, [likedPost])
  const handleClose = () => {
    setmodalData(() => ({
      buttonText: "",
      onClick: () => { },
      content: <></>,
      isOpen: false,
      onClose: () => { },
      title: <></>
    }))
  }
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
            src={coverPhoto || defaultbannerImage}
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
              <div className="flex justify-between ">
                <Image
                  width={8}
                  height={8}
                  className="w-10 h-10 rounded-full"
                  src={userProfilePhoto || defaultbannerImage}
                  alt={``}
                />
                <div className="flex justify-center ml-3">
                  <span
                    onClick={() => {
                      router.push(`/${userId}/profile/albums`)
                    }}
                    className="block antialiased font-bold leading-tight break-words cursor-pointer text-md"
                  >
                    {username}
                  </span>
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
            {userId !== userData?.id && (
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
            )}
            <div
              className="mx-auto cursor-pointer"
              onClick={() => {
                router.push(`/jobs/${id}`)
              }}
            >
              {title}
            </div>
            {userId !== userData?.id ? (
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
            ) : (
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center mx-auto "
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updatePost(id)
                  }}
                >
                  <EditIcon className="h-[22px] w-[28px]  hover:fill-white hover:cursor-pointer hover:scale-110 transition duration-200" />
                </div>
                <div
                  className="flex items-center mx-auto "
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setmodalData(() => ({
                      buttonText: "Delete Post",
                      content: <>Are you sure you want to delete Post</>,
                      onClick: () => deletePost(id),
                      isOpen: true,
                      onClose: () => { handleClose() },
                      title: <>{title}</>
                    }))
                  }}
                >
                  <DeleteIcon className="h-[24px] w-[28px] fill-red-300  hover:fill-red-500 hover:cursor-pointer hover:scale-110 transition duration-200" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
