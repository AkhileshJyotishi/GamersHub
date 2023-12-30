import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { IoIosArrowBack } from "react-icons/io"
import { toast } from "react-toastify"

import defaultUserImage from "@/assets/image/user-profile.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import Button from "@/components/ui/button"
interface GamePageHeaderProps {
  logoSrc: string
  title: string
  userId: number
  jobId: number
  savedUsers: { id: number }[]

  // location: string;
}

export const UserImage = ({ href }: { href: string }) => (
  <div className="my-auto">
    <div className="flex items-center">
      <Image
        width={400}
        height={400}
        alt={""}
        className="w-20 h-20 rounded-full"
        src={href == "" ? defaultUserImage : href}
      />
    </div>
  </div>
)

export const UserInfo = ({ title }: { title: string }) => (
  <div className="flex flex-col items-start justify-center gap-1">
    <div className="font-bold text-[36px]">{title}</div>
  </div>
)

const GamePageHeader: React.FC<GamePageHeaderProps> = ({
  logoSrc,
  title,
  userId,
  jobId,
  savedUsers,
}) => {
  const { userData } = useUserContext()
  const router = useRouter()
  const { data: session } = useSession()
  const [isGameSaved, setIsGameSaved] = useState(
    savedUsers.some((user) => user.id === userData?.id)
  )
  const saveGame = async (jobId: number) => {
    const res = await fetchData(
      `/v1/game/user/save/${jobId}`,
      session?.user?.name as string,
      "POST"
    )
    if (res?.error) {
      toast.error(res.message)
    } else {
      setIsGameSaved(!isGameSaved)
      toast.dismiss()
      toast.success(res?.message)
    }
  }
  useEffect(() => {
    setIsGameSaved(savedUsers.some((user) => user.id === userData?.id))
  }, [userData])

  return (
    <div>
      <div className="p-4">
        <Button className="gap-2 opacity-75 center hover:opacity-100" onClick={() => router.back()}>
          <IoIosArrowBack />
          <span>back</span>
        </Button>
      </div>
      <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
        <div className="flex gap-[25px] flex-wrap justify-center md:justify-normal ">
          <UserImage href={logoSrc} />
          <UserInfo title={title} />
        </div>
        <div className="flex gap-[25px]"></div>
      </div>
      {userData?.id !== userId && (
        <div className="flex flex-wrap justify-center mt-3 md:justify-normal gap-x-4 gap-y-3">
          <Button
            className="px-8 py-4 font-medium border border-secondary hover:bg-secondary rounded-xl"
            onClick={() => saveGame(jobId)}
          >
            {isGameSaved ? "Unsave Game" : "Save Game"}
          </Button>
          <Button className="px-8 py-4 font-medium border border-secondary hover:bg-secondary rounded-xl">
            Buy Now
          </Button>
        </div>
      )}
    </div>
  )
}

export default GamePageHeader
