import React from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { fetchData } from "@/utils/functions"

import MapPinIcon from "@/components/icons/mappinicon"
import Button from "@/components/ui/button"

interface JobPageHeaderProps {
  logoSrc: string | null
  title: string
  jobId: number
  // company: string;
  // website: string;
  location: string
}
const UserImage = ({ href }: { href: string | StaticImageData }) => (
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
    {/* <span className="flex flex-row items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-user_interface_6" />
            <span className="text-[15px] text-user_interface_6 font-medium">{company}</span>
        </span> */}
  </div>
)

const JobPageHeader: React.FC<JobPageHeaderProps> = ({ logoSrc, title, jobId, location }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const saveJob = async (jobId: number) => {
    fetchData(`/v1/job/user/save/${jobId}`, session?.user?.name as string, "POST")
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
        {/* <div className="flex items-center">
                    <SaveIcon className="w-5 h-5" />
                </div> */}
      </div>

      <div className="flex flex-wrap gap-3 p-2">
        <MapPinIcon className="w-4 h-4 text-user_interface_6" />

        <div>{location}</div>
      </div>
      <div className="flex mt-3 gap-x-4 ">
        <Button
          className="  border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl"
          onClick={() => saveJob(jobId)}
        >
          Save Job
        </Button>
        <Button className="  border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl">
          Apply Now
        </Button>
      </div>
    </div>
  )
}

export default JobPageHeader
