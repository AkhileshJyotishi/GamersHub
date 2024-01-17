import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { FaBookmark, FaRegBookmark, FaRegCommentAlt, FaRegStar, FaStar } from "react-icons/fa"
import SlotCounter from "react-slot-counter"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultUserImage from "@/assets/image/user-profile.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

interface ProfileCardProps {
  className?: string
  id: number
  userId: number
  username: string
  title: string

  userProfilePhoto: string | null
  matureContent: boolean
  actions?: Array<{
    profileLink?: string
    name: string
    onClick: () => void
    className?: string
  }>
  bannerImage?: string | null
  likeCount?: number
  commentCount?: number
  onChange?: (id: number) => void
  onSavedSuccess?: (id: number, state: string) => void
  savedPost: {
    id: number
  }[]
  likedPost: {
    id: number
  }[]
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  // user,
  actions,
  bannerImage,
  likeCount,
  commentCount,
  likedPost,
  savedPost,
  id,
  userId,
  className,
  username,
  userProfilePhoto,
  title,
}) => {
  const savePost = async () => {
    const data = await fetchData(
      `/v1/post/user/save/${id}`,
      session.data?.user?.name as string,
      "POST"
    )
    toast.dismiss()
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setSaved(!saved)
    }
  }
  const likePost = async () => {
    let method
    if (liked) {
      method = "DELETE"
    } else {
      method = "POST"
    }

    const data = await fetchData(`/v1/post/like/${id}`, session.data?.user?.name as string, method)
    toast.dismiss()
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setLiked(!liked)
    }
  }

  const commentOnPost = () => {}
  const session = useSession()
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const { userData } = useUserContext()
  const router = useRouter()
  useEffect(() => {
    if (savedPost?.length > 0) {
      setSaved((savedPost ?? [])?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
    if (likedPost?.length > 0) {
      setLiked((likedPost ?? [])?.some((obj) => obj.id == (userData?.id ?? 0)))
    }
  }, [savedPost, likePost])

  return (
    <div
      className={clsx(
        // !aspect-[3/2]
        "group w-full h-fit bg-user_interface_1    py-2 flex flex-col gap-2",
        className
      )}
    >
      <div className="flex justify-between items-start px-4">
        <div className="center gap-4 w-full">
          <Image
            alt=""
            height={200}
            width={200}
            className="w-10 h-10 rounded-full shadow object-cover"
            src={userProfilePhoto || defaultUserImage}
            onClick={() => {
              router.push(`/${userId}/profile/albums`)
            }}
          />
          <div className="flex flex-col w-full">
            <div
              className="block capitalize text-lg font-semibold line-clamp-1 md:max-w-[225px] text-ellipsis whitespace-nowrap overflow-hidden hover:text-secondary duration-200 cursor-pointer"
              onClick={() => {
                router.push(`/posts/${id}`)
              }}
            >
              {title}
            </div>
            <div
              className="text-sm opacity-70 line-clamp-1 md:max-w-[225px] truncate whitespace-nowrap overflow-hidden cursor-pointer  duration-200"
              onClick={() => {
                router.push(`/${userId}/profile/albums`)
              }}
            >
              by{" "}
              <span className="hover:text-secondary capitalize duration-200 hover:underline">
                {username}
              </span>
            </div>
          </div>
        </div>
        {actions ? <DropDownActionButton actions={actions} /> : null}
      </div>
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={bannerImage || defaultbannerImage}
          alt=""
          height={400}
          width={400}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          onClick={() => router.push(`/posts/${id}`)}
          className="h-[280px] w-full group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="flex justify-between items-center gap-2 md:gap-4 px-4">
        {/* {userId !== userData?.id && ( */}
        <>
          <div className="center gap-3 md:gap-4">
            <div className="w-min center gap-2 cursor-pointer">
              {liked ? (
                <FaRegStar
                  onClick={userId !== userData?.id ? likePost : undefined}
                  className="hover:text-secondary_2 text-secondary_2 text-2xl"
                />
              ) : (
                <FaStar
                  onClick={userId !== userData?.id ? likePost : undefined}
                  className="hover:text-secondary_2 text-2xl"
                />
              )}
              <span className="text-sm">
                <SlotCounter value={likeCount ?? 0} />
              </span>
            </div>
            <div className="w-min center gap-2 cursor-pointer">
              <FaRegCommentAlt onClick={commentOnPost} className="hover:text-secondary_2 text-xl" />
              <span className="text-sm">
                <SlotCounter value={commentCount ?? 0} />
              </span>
            </div>
          </div>
          <div className="">
            {saved ? (
              <FaBookmark
                onClick={userId !== userData?.id ? savePost : undefined}
                className="hover:text-secondary text-xl cursor-pointer"
              />
            ) : (
              <FaRegBookmark
                onClick={userId !== userData?.id ? savePost : undefined}
                className="hover:text-secondary text-xl cursor-pointer"
              />
            )}
          </div>
        </>
        {/* )} */}
      </div>
    </div>
  )
}

interface DropDownActionButtonProps {
  actions: Array<{
    name: string
    onClick: () => void
    className?: string
  }>
  className?: string
}

export const DropDownActionButton: React.FC<DropDownActionButtonProps> = ({
  actions,
  className,
}) => {
  const [openActionDropdown, setOpenActionDropdown] = useState(false)

  useEffect(() => {
    const dropdownButton = document.getElementById("dropdownButton")
    const dropdown = document.getElementById("dropdown")

    const handleClickOutside = (event: Allow) => {
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        dropdownButton &&
        !dropdownButton.contains(event.target)
      ) {
        setOpenActionDropdown(false)
      }
    }

    if (openActionDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [openActionDropdown])

  return (
    <div
      onMouseLeave={() => setOpenActionDropdown(false)}
      className={clsx("relative group flex flex-col items-end", className)}
    >
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenActionDropdown((prev) => !prev)}
        className={clsx(
          "w-min text-gray-500 dark:text-gray-400 hover:bg-background active:bg-background focus:ring-0 focus:outline-none rounded-lg text-sm p-1.5",
          openActionDropdown ? "bg-gray-100" : ""
        )}
        type="button"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div
        id="dropdown"
        className={clsx(
          "absolute top-8 right-0 z-10 text-base list-none bg-white rounded-lg shadow w-44 bg-background",
          openActionDropdown ? "block" : "hidden"
        )}
      >
        <ul className="py-2" aria-labelledby="dropdownButton">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={clsx(
                "w-full block px-4 py-2 text-sm hover:bg-user_interface_3 hover:text-secondary",
                action.className
              )}
            >
              {action.name}
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileCard
