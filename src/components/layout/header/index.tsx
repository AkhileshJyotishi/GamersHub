// export default Header
import React, { useState } from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"

import logoblackbg from "@/assets/image/logo-black-bg.png"
import logotextblackbg from "@/assets/image/logo-text-black-bg.png"
import { useUserContext } from "@/providers/user-context"
import defaultUserImage from "@/assets/image/user-profile.svg"
import ProfileBannerImage from "@/components/profile/profileImage"
import Button from "@/components/ui/button"
import ModalComponent from "@/components/ui/ConfirmationModal"
import LoginModal from "@/components/ui/login"
import RegisterModal from "@/components/ui/register"

import NavbarLink from "./NavbarLink"
import Sidemenu from "./sidemenu3"
import { shimmer, toBase64 } from "@/utils/functions"
const ProfileSettingsCard = dynamic(() => import("@/components/profile/profileSettingsCard"), {
  loading: () => (
    <div className="scale-0 origin-top-right group-hover:scale-100 group-hover-top-[140%] sm:right-0 w-[95vw] sm:w-auto min-w-[250px] right-[-140%]  ease-in duration-200  absolute top-[100%] z-50 max-w-[170px] ">
      <svg
        aria-hidden="true"
        className="text-gray-200 h-14 w-14 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  ),
})
interface Props {
  userSession?: Session | null
  userData: Iuser | null
}

const UserImage = ({ href,onClick }: { href?: string | null, onClick?: React.MouseEventHandler<HTMLImageElement> | undefined }) => (
  <div className="cursor-pointer" onClick={onClick}>
    <Image
      width={100}
      height={100}
      alt={""}
      className="  rounded-full "
      src={(href || defaultUserImage)??defaultUserImage}
      priority
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}

    />
  </div>
)
const AuthButtons = ({
  className,
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
}: {
  className?: string
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className={clsx("flex items-center gap-3 w-fit whitespace-pre mt-2", className)}>
      <Button
        variant="nav"
        className="flex px-4 sm:text-sm md:text-md bg-user_interface_4"
        onClick={() => {
          setIsLoginModalOpen(true)
        }}
      >
        Log In
      </Button>

      <Button
        variant="nav"
        className="flex px-4 sm:text-sm md:text-md bg-secondary"
        onClick={() => {
          setIsRegisterModalOpen(true)
        }}
      >
        Sign Up
      </Button>
    </div>
  )
}

const LoggedInUserButtons = ({ userSession, userData }: Props) => {
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  return (
    <>
      <div className="relative flex flex-row items-center gap-2 sm:gap-4 md:flex xl:gap-10 w-fit ">
        {/* <div className="relative w-fit">
          <Image
            className="w-[18px] cursor-pointer mt-[5px]"
            src={BellSVG}
            alt=" "
            width={18}
            height={21}
          />
        </div> */}
        {/* <Button
          className="block w-[18px] h-[18px]"
        >
          <MailIcon className="" fill="#fff" />
        </Button> */}

        <div className="group w-[36px] h-[36px] ">
          <UserImage href={userData?.profileImage}   onClick={() => {
              setShowProfileSettings(!showProfileSettings)
            }} />
          {/* <ProfileBannerImage
            onClick={() => {
              setShowProfileSettings(!showProfileSettings)
            }}
          /> */}
          <ProfileSettingsCard
            className={clsx(
              `scale-0 origin-top-right   -right-7 sm:right-0 w-[95vw] sm:w-auto min-w-[250px] ease-in duration-200  absolute top-[100%] z-50 max-w-[170px]`,
              showProfileSettings && "scale-100 top-[140%]"
            )}
            authUser={userSession}
            userData={userData}
            onClose={() => {
              setShowProfileSettings(!setShowProfileSettings)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default function Navbar() {
  const router = useRouter()
  const {
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
    isRegisterModalOpen,
    isLoginModalOpen,
    setIsDrawerOpen,
    tap,
    setTap,
    userSession,
    userData,
  } = useUserContext()
  const { data: session } = useSession()

  return (
    <>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => {
          setIsRegisterModalOpen(false)
        }}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <ModalComponent />
      <nav
        className={clsx(
          "w-[100vw] flex flex-row items-center justify-between mx-auto py-[20px] sticky top-0 h-[62px] bg-background px-8 xl:pl-28",
          !tap ? "z-20" : "z-0"
        )}
      >
        <div
          className={`absolute transform transition-all -translate-y-5 ${
            tap ? " -translate-x-[20px] opacity-100" : " translate-x-[-500px] opacity-100"
          } duration-[1s] ease-in-out`}
        ></div>
        <div className="center">
          <Button
            onClick={() => {
              router.push("/")
            }}
            className="flex items-center w-full h-full xl:justify-center"
          >
            <Image
              src={logotextblackbg}
              width={200}
              height={25}
              alt="GameCreators"
              className="hidden sm:block xl:absolute w-[180px] sm:w-[200px] md:w-[220px] left-5"
              priority
              // placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
            <Image
              src={logoblackbg}
              width={60}
              height={10}
              alt="GameCreators"
              className="block sm:hidden xl:absolute w-[40px] left-5"
              priority
              // placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </Button>
        </div>

        <div className="center grow hidden w-fit xl:flex lg:gap-8 xl:gap-8 2xl:gap-14 font-[sans-serif]">
          <NavbarLink label="Home" href="/" />
          <NavbarLink label="Jobs" href="/jobs" />
          <NavbarLink label="Creators" href="/creator" />
          <NavbarLink label="Games" href="/games" />
          <NavbarLink label="About Us" href="/about-us" />

          {/* {session && <NavbarLink label="Profile" href={`/${userData?.id}/profile/albums`} />} */}

          {userSession && <NavbarLink label="Assets" href="/help" />}
        </div>

        <div className="relative flex items-center gap-2 mb-1 xl:gap-12 ">
          <div className="">
            {session ? (
              <LoggedInUserButtons userSession={session} userData={userData} />
            ) : (
              <AuthButtons
                className="hidden min-[1280px]:flex"
                setIsLoginModalOpen={setIsLoginModalOpen}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
              />
            )}
          </div>
          <Button
            className="z-40 flex flex-col gap-1 mt-1 cursor-pointer xl:hidden"
            onClick={() => {
              setIsDrawerOpen(true)
              setTap(!tap)
            }}
          >
            <div
              className={`w-[20px] h-[2px] bg-[#fff] rounded-lg transform transition-all ${
                tap ? "rotate-45 translate-y-[6px]" : "rotate-0 translate-y-0"
              } duration-[0.5s] ease-out`}
            ></div>
            <div
              className={`w-[20px] h-[2px] bg-[#fff]  rounded-lg transform transition-all ${
                tap ? "opacity-0" : "opacity-100"
              } duration-[1s] ease-out`}
            ></div>
            <div
              className={`w-[20px] h-[2px] bg-[#fff]  rounded-lg transform transition-all ${
                tap ? "rotate-[-45deg] translate-y-[-6px]" : "rotate-0 translate-y-0"
              } duration-[1s] ease-out`}
            ></div>
          </Button>
        </div>
      </nav>
      <Sidemenu />
      {/* <Example /> */}
    </>
  )
}
