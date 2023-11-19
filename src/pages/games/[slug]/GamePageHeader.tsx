import React from "react"
import Image from "next/image"
import Link from "next/link"

import Button from "@/components/ui/button"
interface GamePageHeaderProps {
  logoSrc: string
  title: string

  // location: string;
}

const UserImage = ({ href }: { href: string }) => (
  <Link href={"#"} className="my-auto">
    <div className="flex items-center">
      <Image width={400} height={400} alt={""} className="w-20 h-20 rounded-full" src={href} />
    </div>
  </Link>
)

const UserInfo = ({ title }: { title: string }) => (
  <div className="flex flex-col items-start justify-center gap-1">
    <Link href={"#"} className="font-bold text-[36px]">
      {title}
    </Link>
  </div>
)

const GamePageHeader: React.FC<GamePageHeaderProps> = ({ logoSrc, title }) => {
  return (
    <div>
      <div className="p-4 font-extrabold">
        <Button> Back</Button>
      </div>
      <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
        <div className="flex gap-[25px] flex-wrap">
          <UserImage href={logoSrc} />
          <UserInfo title={title} />
        </div>
        <div className="flex gap-[25px]"></div>
      </div>

      <div className="flex flex-wrap justify-center mt-3 md:justify-normal gap-x-4">
        <Button className="  border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl">
          Save Game
        </Button>
        <Button className="  border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl">
          Buy Now
        </Button>
      </div>
    </div>
  )
}

export default GamePageHeader
