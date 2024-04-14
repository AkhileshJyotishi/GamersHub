import React, { useEffect, useRef } from "react"
import Image from "next/image"
// import Link from "next/link"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"

// import { toast } from "react-toastify"
import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultUserImage from "@/assets/image/user-profile.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchWithoutAuthorization, shimmer, toBase64 } from "@/utils/functions"

import GearIcon from "@/components/icons/gear"
import HelpIcon from "@/components/icons/gear"
import LogOutIcon from "@/components/icons/logout"
// import SaveIcon from "@/components/icons/save"
import Button from "@/components/ui/button"

interface Props {
  authUser?: Session | null
  className?: string
  onSignOut?: React.MouseEventHandler<HTMLDivElement>
  userData: Iuser | null
  onClose: () => void
}

export default function ProfileSettingsCard({ className, userData, onClose }: Props) {
  const router = useRouter()
  const session = useSession()
  const { userData: newuserData } = useUserContext()
  const cardRef = useRef(null)
  async function logoutUser() {
    if (session && session.data?.user?.name) {
      await fetchWithoutAuthorization(`v1/auth/logout`, "POST", {
        accessToken: session.data?.user?.name,
      })
      signOut({
        callbackUrl: "/?message=Logged out successfully",
      })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !(cardRef.current as Allow).contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <>
      <div
        className={`py-2 mt-2 sm:mt-0 shadow-glow bg-user_interface_2 border-[1px] border-solid border-user_interface_3 right-0 flex flex-col items-center px-[2px]  w-[310px] rounded-xl ${className}`}
        ref={cardRef}
      >
        {/* IMAGE */}
        <div className="relative flex flex-col items-center w-full">
          <Image
            width={400}
            height={300}
            alt={""}
            className="w-full object-cover  h-[100px] rounded-[5px]"
            src={
              newuserData?.bannerImage !== "" && newuserData && newuserData?.bannerImage !== null
                ? newuserData.bannerImage
                : defaultbannerImage
            }
          />

          <Image
            width={100}
            height={100}
            alt={""}
            className="w-[92px] h-[92px] rounded-full absolute bottom-[-50%] object-cover border-solid border-[2px] border-[#D9D9D9]"
            src={
              userData?.profileImage !== "" && userData && userData?.profileImage !== null
                ? userData.profileImage
                : defaultUserImage
            }
            // placeholder="blur"
            priority
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            // blurDataURL=""
          />
        </div>
        {/* IMAGE  END*/}

        {/* Profile Info */}
        <div className="flex flex-col items-center overflow-hidden gap-[2px] mt-[3.2rem] md:mt-[70px] w-[100%]">
          <div className="mt-[5px] text-[12px] font-semibold ">{userData?.username} </div>
          <div className=" text-[10px] font-medium text-user_interface_6">{userData?.email}</div>
          <Button
            onClick={() => {
              router.replace(`/${newuserData?.id}/profile/albums`)
              onClose()
            }}
            className="text-center rounded-xl  text-text py-[5px] bg-secondary font-medium mt-1 md:mt-[16px] w-[70%] "
          >
            View Profile
          </Button>
        </div>

        {/* Profile Info End*/}

        {/* Account */}

        <div className="flex flex-col items-start w-full mt-[20px] py-[15px] border-t-[1px] border-b-[1px] border-user_interface_3 ">
          <h1 className="text-[14px] mb-2 font-semibold pl-[32px]">Account</h1>

          <div className="flex items-start w-full flex-col ">
            <div
              onClick={() => {
                router.push("/settings")
                onClose()
              }}
              className="flex flex-row items-center text-user_interface_7 gap-[12px] hover:bg-user_interface_4 w-full py-[5px] pl-[32px] cursor-pointer"
            >
              <GearIcon className={"w-[17px] h-[17px]"} />
              <span>Settings</span>
            </div>

            <div
              onClick={() => {
                router.push("/help")
                onClose()
              }}
              // href={`/help`}
              className="flex flex-row items-center text-user_interface_7 gap-[12px] hover:bg-user_interface_4 w-full py-[5px] pl-[32px] cursor-pointer"
            >
              <HelpIcon className={"w-[17px] h-[17px]"} />
              <p>Help</p>
            </div>
          </div>
        </div>

        {/* Account End */}

        {/* Manage  */}
        {/* <div className="flex flex-col items-start w-full my-2 py-[5px] border-b-[1px] border-user_interface_3 ">
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
      </div> */}

        {/* Manage  End*/}

        <div
          onClick={() => {
            logoutUser()
          }}
          className="flex flex-col cursor-pointer items-start w-full py-[10px] hover:bg-user_interface_4 group "
        >
          <div className="flex flex-row items-center text-user_interface_7 gap-[12px]  w-full  pl-[32px]  group-hover:text-red-500 transition duration-200">
            <LogOutIcon className={"w-[17px] h-[17px]"} />
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </>
  )
}
