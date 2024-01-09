import React, { useEffect, useState } from "react"
import clsx from "clsx"
import { FaBookmark, FaRegBookmark, FaRegCommentAlt, FaRegStar, FaStar } from "react-icons/fa"
import SlotCounter from "react-slot-counter"

const ProfileCardPage = () => {
  const isMe = Math.random() > 0.5

  return (
    <div className="min-h-screen center">
      <ProfileCard
        user={{
          name: "John Doe",
          role: "Software Developer",
          avatar: "https://source.unsplash.com/random",
        }}
        isMe={true}
        actions={
          isMe
            ? [
                {
                  name: "Share",
                  onClick: () => {},
                  className: "share-action",
                },
                {
                  name: "Edit",
                  onClick: () => {},
                  className: "edit-action",
                },
                {
                  name: "Delete",
                  onClick: () => {},
                  className: "delete-action",
                },
              ]
            : [
                {
                  name: "Share",
                  onClick: () => {},
                  className: "share-action",
                },
                {
                  name: "Report",
                  onClick: () => {},
                  className: "report-action",
                },
              ]
        }
        bannerImage="https://source.unsplash.com/random"
        likeCount={100}
        commentCount={50}
        isLiked={true}
        isSaved={false}
        onLike={() => {}}
        onSave={() => {}}
        onEdit={() => {}}
        onComment={() => {}}
      />
    </div>
  )
}

export default ProfileCardPage

interface ProfileCardProps {
  className?: string
  user: {
    name: string
    role: string
    avatar: string
  }
  isMe?: boolean
  actions?: Array<{
    profileLink?: string
    name: string
    onClick: () => void
    className?: string
  }>
  bannerImage?: string
  likeCount?: number
  commentCount?: number
  isLiked?: boolean
  isSaved?: boolean
  onLike?: () => void
  onSave?: () => void
  onComment?: () => void
  onEdit?: () => void
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  // isMe,
  actions,
  bannerImage,
  likeCount,
  commentCount,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onComment,
}) => {
  return (
    <div className="group w-full h-full bg-user_interface_2 sm:min-w-[360px] max-w-sm !aspect-square py-2 flex flex-col gap-2">
      <div className="flex justify-between items-start px-4">
        <div className="center gap-2">
          <img className="aspect-square h-10 rounded shadow object-cover" src={user?.avatar} />
          <div className="flex flex-col">
            <div className="block text-lg font-semibold line-clamp-1 w-[218px] text-ellipsis whitespace-nowrap overflow-hidden">
              {user?.name}
            </div>
            <div className="text-sm text-gray-500 line-clamp-1 w-[218px] text-ellipsis whitespace-nowrap overflow-hidden">
              {user?.role}
            </div>
          </div>
        </div>
        {actions ? <DropDownActionButton actions={actions} /> : null}
      </div>
      <div className="relative h-[280px] overflow-hidden">
        <img
          src={bannerImage}
          alt=""
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          className="h-[280px] w-full group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="flex justify-between items-center gap-4 px-4">
        <div className="center gap-4">
          <div className="w-min center gap-2 cursor-pointer">
            {isLiked ? (
              <FaRegStar onClick={onLike} className="hover:text-secondary_2 text-2xl" />
            ) : (
              <FaStar onClick={onLike} className="hover:text-secondary_2 text-2xl" />
            )}
            <span className="text-sm">
              <SlotCounter value={likeCount ?? 0} />
            </span>
          </div>
          <div className="w-min center gap-2 cursor-pointer">
            <FaRegCommentAlt onClick={onComment} className="hover:text-secondary_2 text-xl" />
            <span className="text-sm">
              <SlotCounter value={commentCount ?? 0} />
            </span>
          </div>
        </div>
        <div className="">
          {isSaved ? (
            <FaBookmark onClick={onSave} className="hover:text-secondary text-xl cursor-pointer" />
          ) : (
            <FaRegBookmark
              onClick={onSave}
              className="hover:text-secondary text-xl cursor-pointer"
            />
          )}
        </div>
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
}

const DropDownActionButton: React.FC<DropDownActionButtonProps> = ({ actions }) => {
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
      className="relative group flex flex-col items-end"
    >
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenActionDropdown((prev) => !prev)}
        className={clsx(
          "w-min text-gray-500 dark:text-gray-400 hover:bg-gray-100 active:bg-gray-100 focus:ring-0 focus:outline-none rounded-lg text-sm p-1.5",
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
          "absolute top-8 right-0 z-10 text-base list-none bg-white rounded-lg shadow w-44 bg-gray-700",
          openActionDropdown ? "block" : "hidden"
        )}
      >
        <ul className="py-2" aria-labelledby="dropdownButton">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={clsx(
                "w-full block px-4 py-2 text-sm hover:bg-gray-100 hover:text-user_interface_1",
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
