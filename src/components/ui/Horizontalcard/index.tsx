import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useUserContext } from "@/providers/user-context"
import EditIcon from "@/components/icons/editIcon"
import { useModalContext } from "@/providers/modal-context"
import DeleteIcon from "@/components/icons/deleteIcon"
import { toast } from "react-toastify"
import { fetchData } from "@/utils/functions"
import { useSession } from "next-auth/react"

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
      className={`relative max-w-sm rounded overflow-hidden shadow-lg bg-user_interface_2 ${className}`}
    >
      <Image className="max-w-sm h-40" src={imageSrc} alt={""} height={400} width={400} />
      <div className="px-6 py-2">
        <span
          className="mb-2 p-1 text-xl font-bold hover:text-green-600 cursor-pointer"
          onClick={() => {
            router.push(`/${userData?.id}/profile/albums/${id}`)
          }}
        >
          {title}
        </span>
        {/* <p className="text-base text-gray-700">{description}</p> */}
      </div>
      <div className="px-6 pb-2">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full"
          >
            {tag.keyword}
          </span>
        ))}
      </div>
      {userId === userData?.id && (
        <div className="absolute top-1 right-1 bg-[#00000080] rounded-md flex gap-2 items-center py-1">
          <div
            className="flex items-center mx-auto "
            onClick={(e) => {
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
