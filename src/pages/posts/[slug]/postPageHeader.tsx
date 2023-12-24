import React, { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"
import EditIcon from "@/components/icons/editIcon"
import Button from "@/components/ui/button"
import { toast } from "react-toastify"

interface JobPageHeaderProps {
  logoSrc: string | null
  title: string
  postId: number
  userId: number
}
const UserImage = ({ href }: { href: string | StaticImageData }) => (
  <span className="my-auto">
    <div className="flex items-center">
      <Image width={400} height={400} alt={""} className="w-20 h-20 rounded-full" src={href} />
    </div>
  </span>
)

const UserInfo = ({ title }: { title: string }) => (
  <div className="flex flex-col items-start justify-center gap-1">
    <span className="font-bold text-[36px]">{title}</span>

  </div>
)

const JobPageHeader: React.FC<JobPageHeaderProps> = ({
  logoSrc,
  title,
  postId,
  userId,
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const likePost = async (postId: number) => {
    let method
    if (liked) {
      method = "DELETE"
    } else {
      method = "POST"
    }

    const data = await fetchData(`/v1/post/like/${postId}`, session?.user?.name as string, method)
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      setLiked(!liked)
    }
  }

  const savePost = async (postId: number) => {
    const data = await fetchData(
      `/v1/post/user/save/${postId}`,
      session?.user?.name as string,
      "POST"
    )
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

  return (
    <div>
      <div className="p-4 font-extrabold">
        <Button onClick={() => router.back()}> Back</Button>
      </div>
      <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
        <div className="flex gap-[25px] flex-wrap">
          <UserImage href={logoSrc || defaultbannerImage} />
          <UserInfo title={title} />
        </div>
        <div className="flex gap-[25px]"></div>

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
          <Button className="mt-2 flex gap-1 border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl" onClick={() => updatePost(postId)}>
            <EditIcon className="w-5 h-5 text-user_interface_7" />
            Edit Post
          </Button>

        </>
      )
      }
    </div>
  )
}

export default JobPageHeader
