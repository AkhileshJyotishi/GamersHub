import React, { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultUserImage from "@/assets/image/user-profile.svg"
import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import EditIcon from "@/components/icons/editIcon"
import ShareIcon from "@/components/icons/share"
import Button from "@/components/ui/button"
import Share from "@/components/ui/Share"
interface JobPageHeaderProps {
  logoSrc: string | null
  title: string
  postId: number
  userId: number
}
const UserImage = ({ href }: { href: string | StaticImageData }) => (
  <span className="my-auto">
    <div className="flex items-center">
      <Image width={400} height={400} alt={""} className="w-16 h-16 rounded-full" src={href} />
    </div>
  </span>
)

const UserInfo = ({ title }: { title: string }) => (
  <div className="flex flex-col items-start justify-center gap-1">
    <span className="font-bold text-[36px]">{title}</span>
  </div>
)

const JobPageHeader: React.FC<JobPageHeaderProps> = ({ logoSrc, title, postId, userId }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const { setmodalData } = useModalContext()
  // const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const [, setCopied] = useState<boolean>(false)
  // const likePost = async (postId: number) => {
  //   let method
  //   if (liked) {
  //     method = "DELETE"
  //   } else {
  //     method = "POST"
  //   }

  //   const data = await fetchData(`/v1/post/like/${postId}`, session?.user?.name as string, method)
  //   if (data?.error) {
  //     toast.error(data.message)
  //   } else {
  //     toast.success(data?.message)
  //     setLiked(!liked)
  //   }
  // }

  const savePost = async (postId: number) => {
    const data = await fetchData(
      `/v1/post/user/save/${postId}`,
      session?.user?.name as string,
      "POST"
    )
    toast.dismiss()
    if (data?.error) {
      toast.error(data.message)
    } else {
      setSaved(!saved)
      toast.success(data?.message)
    }
  }

  // const deletePost = async (postId: number) => {
  //   const data = await fetchData(`/v1/post/${postId}`, session?.user?.name as string, "DELETE")
  //   if (data?.error) {
  //     toast.error(data.message)
  //   } else {
  //     toast.success(data?.message)
  //     // setSaved(!saved)
  //   }
  // }
  const updatePost = async (postId: number) => {
    router.push(`/${userId}/profile/portfolio/updatePost/${postId}`)
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
  const copy = async () => {
    navigator.clipboard
      .writeText(`${window.location.href}`)
      .then(() => {
        setCopied(true)
        toast.dismiss()
        toast.success("Copied!")
      })
      .catch((error) => {
        console.error(error)
        setCopied(false)
      })
  }
  return (
    <div>
      <div className="p-2 font-extrabold">
        <Button onClick={() => router.back()}> Back</Button>
      </div>
      <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
        <div className="flex gap-[25px] flex-wrap">
          <UserImage href={logoSrc == "" ? defaultUserImage : logoSrc} />
          <UserInfo title={title} />
        </div>
      </div>
      <div className="pt-6">
        <Button
          className="mt-2 flex gap-1 border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setmodalData(() => ({
              buttonText: "Copy Link",
              content: (
                <>
                  {
                    <Share
                      description="description to the job post"
                      hashtag="#GameCreators.io"
                      image={logoSrc || window.location.href}
                      title={title}
                      key={Math.random() * 100}
                    />
                  }
                  <div className="w-[80%] mx-auto  p-2 my-2 mt-4  text-text border-[0.1px] rounded border-secondary overflow-x-scroll">
                    {window.location.href}
                  </div>
                </>
              ),
              onClick: () => {
                copy()
              },
              isOpen: true,
              onClose: () => {
                handleClose()
              },
              title: <>{title}</>,
            }))
          }}
        >
          <ShareIcon className="w-5 h-5 mt-1 fill-text" />
          Share
        </Button>
      </div>

      {userData?.id !== userId ? (
        <div className="flex mt-3 gap-x-4 ">
          <Button
            className="  border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl"
            onClick={() => savePost(postId)}
          >
            Save Post
          </Button>
          <Button className="  border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl">
            Apply Now
          </Button>
        </div>
      ) : (
        <>
          <Button
            className="mt-2 flex gap-1 border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl"
            onClick={() => updatePost(postId)}
          >
            <EditIcon className="w-5 h-5 text-user_interface_7" />
            Edit Post
          </Button>
        </>
      )}
    </div>
  )
}

export default JobPageHeader
