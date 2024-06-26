import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import DeleteIcon from "@/components/icons/deleteIcon"
import EditIcon from "@/components/icons/editIcon"
import { SecondaryTag } from "@/components/ui/badges"

interface CardProps {
  imageSrc: string
  id: number
  title: string
  tags: Keyword[]
  userId: number
  className?: string
}

const CustomCard: React.FC<CardProps> = ({ imageSrc, title, id, tags, className, userId }) => {
  const router = useRouter()
  const { userData, handleAlbumEdit } = useUserContext()
  const { setmodalData } = useModalContext()
  const session = useSession()
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
  async function deleteAlbum(id: number) {
    toast.info("Deleting Album")
    const res = await fetchData(`/v1/album/${id}`, session.data?.user?.name as string, "DELETE")
    if (res?.error) {
      toast.dismiss()
      toast.error("Error deleting album")
    } else {
      router.push(`/${userData?.id}/profile/albums`)
      toast.success(res?.message)
      setmodalData(() => ({
        buttonText: "",
        onClick: () => {},
        content: <></>,
        isOpen: false,
        onClose: () => {},
        title: <></>,
      }))
    }
  }
  return (
    <div
      className={`mx-auto md:mx-0 relative  rounded overflow-hidden shadow-lg bg-user_interface_2 ${className}`}
    >
      <Image
        className="h-40 w-full"
        src={imageSrc == "" ? defaultbannerImage : imageSrc}
        alt={""}
        height={400}
        width={400}
      />
      <div className="px-6 py-2">
        <span
          className="p-1 mb-2 text-xl font-bold cursor-pointer hover:text-green-600 duration-200 capitalize"
          onClick={() => {
            router.push(`/${userData?.id}/profile/albums/${id}`)
          }}
        >
          {title}
        </span>
        {/* <p className="text-base text-gray-700">{description}</p> */}
      </div>
      <div className="flex items-center px-2 py-1 gap-1 overflow-x-scroll w-[100%] bg-[inherit] no-scroll mb-2">
        {tags?.map((tag, index) => (
          <SecondaryTag name={tag.keyword} key={index} className=" cursor-pointer" />
        ))}
      </div>
      {userId === userData?.id && (
        <div className="absolute top-1 right-1 bg-[#00000080] rounded-md flex gap-2 items-center py-1">
          <div
            className="flex items-center mx-auto "
            onClick={() => {
              handleAlbumEdit({
                AlbumKeywords: (tags ?? []).map((id) => id.keyword),
                banner: imageSrc,
                id,
                title,
              })
            }}
          >
            <EditIcon className="h-[18px] w-[28px]  hover:fill-white hover:cursor-pointer hover:scale-110 transition duration-200" />
          </div>
          <div
            className="flex items-center mx-auto "
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setmodalData(() => ({
                buttonText: "Delete Album",
                content: <>Are you sure you want to delete Album</>,
                onClick: () => deleteAlbum(id),
                isOpen: true,
                onClose: () => {
                  handleClose()
                },
                title: <>{title}</>,
              }))
            }}
          >
            <DeleteIcon className="h-[24px] -mb-1 w-[28px] fill-red-300  hover:fill-red-500 hover:cursor-pointer hover:scale-110 transition duration-200" />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomCard
