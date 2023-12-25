import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import defaultUserImage from "@/assets/image/user-profile.svg"

import { useUserContext } from "@/providers/user-context"

import Button from "@/components/ui/button"
import { IoIosArrowBack } from "react-icons/io"
interface GamePageHeaderProps {
  logoSrc: string
  title: string
  userId: number

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

const GamePageHeader: React.FC<GamePageHeaderProps> = ({ logoSrc, title, userId }) => {
  const { userData } = useUserContext()
  const router = useRouter()
  return (
    <div>
      <div className="p-4">
        <Button className="center gap-2 opacity-75 hover:opacity-100" onClick={() => router.back()}>
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
          <Button className="border-secondary border py-4 px-8 hover:bg-secondary font-medium rounded-xl">
            Save Game
          </Button>
          <Button className="border-secondary border py-4 px-8 hover:bg-secondary font-medium rounded-xl">
            Buy Now
          </Button>
        </div>
      )}
    </div>
  )
}

export default GamePageHeader
