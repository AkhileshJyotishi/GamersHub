import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import defaultbannerImage from "@/assets/image/user-banner.png"

import GearIcon from "@/components/icons/gear"
import HelpIcon from "@/components/icons/gear"
import LogOutIcon from "@/components/icons/logout"
import SaveIcon from "@/components/icons/save"
import Button from "@/components/ui/button"

interface Props {
  authUser: any
  className?: string
  onSignOut?: React.MouseEventHandler<HTMLDivElement>
}

export default function ProfileSettingsCard({ className, authUser, onSignOut }: Props) {
  // const [alertData, setAlertData] = useState<any>({
  //   show: false,
  //   duration: 6000,
  //   message: "",
  //   title: "",
  //   type: "success",
  // })
  // const profileImage = authUser?.profile_image?.url
  // const bannerImage = authUser?.banner?.url
  const router = useRouter()
  return (
    <div
      className={`p-4 shadow-glow bg-user_interface_2 border-[1px] border-solid border-user_interface_3 right-0 flex flex-col items-center px-[6px] min-h-[560px] w-[340px] rounded-xl ${className}`}
    >
      {/* IMAGE */}
      <div className="relative flex flex-col items-center w-full">
        <Image
          width={400}
          height={300}
          alt={""}
          className="w-full object-cover  h-[100px] rounded-[5px]"
          src={
            // bannerImage
            //     ? MediaHostURL + bannerImage
            //     :
            defaultbannerImage
          }
        />

        <Image
          width={100}
          height={100}
          alt={""}
          className="w-[92px] h-[92px] rounded-full absolute bottom-[-50%] object-cover border-solid border-[2px] border-[#D9D9D9]"
          src={
            // profileImage
            //     ? MediaHostURL + profileImage
            //     :
            // "/assets/placeholders/user-profile.png"
            defaultbannerImage
          }
        />
      </div>
      {/* IMAGE  END*/}

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-[3px] mt-[3.2rem] md:mt-[70px] w-[100%]">
        <h2 className="text-[18px]  font-semibold ">{authUser?.username} akhilesh</h2>
        <h3 className="font-medium text-user_interface_6 mt-[20px] mb-1">
          {authUser?.email} xyz@gmai..com
        </h3>
        <Button
          onClick={() => router.push("/user/profile")}
          className="text-center rounded-xl  text-user_interface_3 py-[15px] bg-secondary font-medium mt-1 md:mt-[16px] w-[70%] "
        >
          View Profile
        </Button>
      </div>

      {/* Profile Info End*/}

      {/* Account */}

      <div className="flex flex-col items-start w-full mt-[20px] py-[15px] border-t-[1px] border-b-[1px] border-user_interface_3 ">
        <h1 className="text-[14px] mb-2 font-semibold pl-[32px]">Account</h1>

        <div className="flex items-start w-full md:flex-col ">
          <Link
            href={`/settings`}
            className="flex flex-row items-center text-user_interface_7 gap-[12px] hover:bg-user_interface_4 w-full py-[10px] pl-[32px] cursor-pointer"
          >
            <GearIcon className={"w-[17px] h-[17px]"} />
            <span>Settings</span>
          </Link>

          <Link
            href={`/help`}
            className="flex flex-row items-center text-user_interface_7 gap-[12px] hover:bg-user_interface_4 w-full py-[10px] pl-[32px] cursor-pointer"
          >
            <HelpIcon className={"w-[17px] h-[17px]"} />
            <p>Help</p>
          </Link>
        </div>
      </div>

      {/* Account End */}

      {/* Manage  */}
      <div className="flex flex-col items-start w-full mt-[20px] py-[15px] border-b-[1px] border-user_interface_3 ">
        <h1 className="text-[14px] mb-2 font-semibold pl-[32px]">Manage</h1>

        <div className="flex items-start w-full md:flex-col ">
          <Link
            href={`#`}
            className="flex flex-row items-center text-user_interface_7 gap-[12px] hover:bg-user_interface_4 w-full py-[10px] pl-[32px] cursor-pointer"
          >
            <SaveIcon className={"w-[17px] h-[17px]"} />
            <p>My bookmarks</p>
          </Link>
        </div>
      </div>

      {/* Manage  End*/}

      <div className="flex flex-col items-start w-full py-[15px] ">
        <div
          className="flex flex-row items-center text-user_interface_7 gap-[12px] hover:bg-user_interface_4 w-full  pl-[32px] cursor-pointer"
          onClick={onSignOut}
        >
          <LogOutIcon className={"w-[17px] h-[17px]"} />
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  )
}
