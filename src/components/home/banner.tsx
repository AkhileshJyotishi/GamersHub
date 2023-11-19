import React from "react"
import Image from "next/image"
import { StaticImageData } from "next/image"
import Link from "next/link"

interface TalentSectionProps {
  RightSVG: string | StaticImageData
  Img: StaticImageData | string
}

const TalentSection: React.FC<TalentSectionProps> = ({ RightSVG, Img }) => (
  <div className="mx-auto w-11/12 bg-user_interface_2 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 pb-6 md:pb-0 justify-between rounded-xl border-gray-800 border-[0.1px] my-20 p-0 max-w-7xl">
    <div className="flex flex-col items-start gap-8 font-semibold md:gap-16 ml-7 w-fit">
      <p className="text-[24px] font-bold">
        Find the <span className="mx-1 text-secondary">best</span> talent for your next project
      </p>
      <Link href="#" className="flex flex-row items-center gap-3 text-xl group">
        <p className="text-[20px] whitespace-nowrap">Find Now</p>
        <div className="w-full transition-all group-hover:translate-x-4 md:w-auto">
          <Image width={2060} height={2060} className="w-3" alt={""} src={RightSVG} />
        </div>
      </Link>
    </div>
    <div className="md:w-[47%]">
      <Image width={2060} height={2060} className="object-cover md:w-[150%]" src={Img} alt="" />
    </div>
  </div>
)

export default TalentSection
