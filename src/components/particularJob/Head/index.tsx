import React, { useEffect, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

// import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultUserImage from "@/assets/image/user-profile.svg"

import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"
import EditIcon from "@/components/icons/editIcon"
import { IoIosArrowBack } from "react-icons/io"
import MapPinIcon from "@/components/icons/mappinicon"
import Button from "@/components/ui/button"
import { toast } from "react-toastify"
import SaveIcon from "@/components/icons/SaveIcon"

interface JobPageHeaderProps {
    logoSrc: string | null
    title: string
    jobId: number
    userId: number
    remote: boolean
    savedUsers: { id: number }[]
    // company: string;
    // website: string;
    location: string
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
        {/* <span className="flex flex-row items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-user_interface_6" />
            <span className="text-[15px] text-user_interface_6 font-medium">{company}</span>
        </span> */}
    </div>
)

const JobPageHeader: React.FC<JobPageHeaderProps> = ({
    logoSrc,
    title,
    jobId,
    location,
    remote,
    userId,
    savedUsers
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const { userData } = useUserContext()
    const [isJobSaved, setIsJobSaved] = useState(savedUsers.some((user) => user.id === userData?.id));
    
    const saveJob = async (jobId: number) => {
        const res = await fetchData(`/v1/job/user/save/${jobId}`, session?.user?.name as string, "POST")
        if (res?.error) {
            toast.error(res.message)
        } else {
            setIsJobSaved(!isJobSaved);
            toast.success(res?.message)
        }
    }
useEffect(()=>{
    setIsJobSaved(savedUsers.some((user) => user.id === userData?.id));
},[userData])
    return (
        <div>
            <div className="p-4">
                <Button className="gap-2 opacity-75 center hover:opacity-100" onClick={() => router.back()}>
                    <IoIosArrowBack />
                    <span>back</span>
                </Button>
            </div>
            <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
                <div className="flex gap-[25px] flex-wrap">
                    <UserImage href={logoSrc || defaultUserImage} />
                    <UserInfo title={title[0].toUpperCase() + title.slice(1)} />
                </div>
                <div className="flex gap-[25px]"></div>
                {/* <div className="flex items-center">
                    <SaveIcon className="w-5 h-5" />
                </div> */}
            </div>
            {!remote && (
                <div className="flex flex-wrap gap-3 p-2">
                    <MapPinIcon className="w-4 h-4 text-user_interface_6" />

                    <div>{location}</div>
                </div>
            )}

            {userData?.id !== userId ? (
                <div className="flex mt-3 gap-x-4 ">
                    <Button
                        className=" flex items-center hover:bg-secondary border-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl gap-2"
                        onClick={() => saveJob(jobId)}
                    >
                        <SaveIcon className="w-5 h-5 fill-text" fill=""/>
                        {isJobSaved ? 'Unsave Job' : 'Save Job'}
                    </Button>
                    <Button className="  border-secondary hover:bg-secondary border-[0.1px] py-[10px] px-[30px] font-medium rounded-xl">
                        Apply Now
                    </Button>
                </div>
            ) : (
                <>
                    <Button
                        className="mt-2 flex gap-1 border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl hover:bg-secondary"
                        onClick={() => router.push(`/user/profile/portfolio/updateJob/${jobId}`)}
                    >
                        <EditIcon className="w-5 h-5 text-user_interface_7" />
                        Edit Job
                    </Button>
                </>
            )}
        </div>
    )
}

export default JobPageHeader
