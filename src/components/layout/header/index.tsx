// export default Header
import React, { useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"

import logo from "@/assets/image/logo-with-text.png"
import BellSVG from "@/assets/svg/bell.svg"
import { useUserContext } from "@/providers/user-context"

import MailIcon from "@/components/icons/mail"
// import ProfileImage from "@/components/profile/profileImage"
import ProfileBannerImage from "@/components/profile/profileImage"
import ProfileSettingsCard from "@/components/profile/profileSettingsCard"
import Button from "@/components/ui/button"
import LoginModal from "@/components/ui/login"
import RegisterModal from "@/components/ui/register"

// import Search from "../../mainsearch/index"
import NavbarLink from "./NavbarLink"
import { Example } from "./sidemenu2"
interface Props {
  userSession?: Session | null
  userData: Iuser | null
}

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
    <div className={clsx("flex items-center gap-3 w-fit whitespace-pre mt-2 ", className)}>
      <Button
        variant="secondary"
        className="flex px-4 sm:text-sm md:text-md "
        onClick={() => {
          setIsLoginModalOpen(true)
        }}
      >
        Log In
      </Button>

      <Button
        variant="primary"
        className="flex px-4 sm:text-sm md:text-md "
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
  const router = useRouter()

  const [showProfileSettings, setShowProfileSettings] = useState(false)
  // const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);

  return (
    <>
      <div
        className="relative flex-row items-center hidden gap-4 md:flex xl:gap-10 w-fit "
        onClick={() => {
          setShowProfileSettings(!showProfileSettings)
        }}
      >
        <div className="relative w-fit">
          <Image
            className="w-[18px] cursor-pointer mt-[5px]"
            src={BellSVG}
            alt=" "
            width={18}
            height={21}
          />
        </div>
        <Button
          className="block w-[18px] h-[18px]"
          onClick={() => {
            router.push("/inbox")
          }}
        >
          <MailIcon className="" fill="#fff" />
        </Button>

        <div className="group w-[20px] h-[20px]">
          <ProfileBannerImage />
          <ProfileSettingsCard
            onSignOut={() => signOut()}
            className={`scale-0 origin-top-right group-hover:scale-100 group-hover-top-[140%] sm:right-0 w-[95vw] sm:w-auto min-w-[250px] right-[-140%]  ease-in duration-200  absolute top-[100%] z-50 max-w-[170px] `}
            authUser={userSession}
            userData={userData}
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
    isOpen,
    toggleOpen,
    tap,
    setTap,
    containerRef,
    // handleLogout,
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
      <nav
        className={clsx(
          "  leading-[0.015rem] w-[100vw] flex flex-row items-center justify-between px-[15px] mx-auto py-[20px]   sticky top-0  h-[61px] backdrop-blur",
          !tap ? "z-20" : "z-0"
        )}
      >
        <div className=" flex flex-row md:min-w-[70%] xl:w-fit">
          <div
            className={` transform transition-all -translate-y-5 ${
              tap ? " -translate-x-[20px] opacity-100" : " translate-x-[-500px] opacity-100"
            } duration-[1s] ease-in-out`}
          ></div>
          <div className="flex flex-row items-center justify-start w-full sm:items-center ">
            <Button
              onClick={() => {
                router.push("/")
              }}
              className="flex items-center w-full h-full xl:justify-center"
            >
              <Image
                src={logo}
                width={200}
                height={25}
                alt="Game Creators Hub"
                className="xl:absolute w-[180px] sm:w-[200px] md:w-[220px] left-5"
              />
            </Button>
          </div>

          <div className="flex-row items-center hidden w-fit xl:flex lg:gap-8 xl:gap-8 2xl:gap-14 font-[sans-serif] ml-[250px]">
            <NavbarLink label="Home" href="/" />
            <NavbarLink label="Jobs" href="/jobs" />
            <NavbarLink label="Creators" href="/creator" />
            <NavbarLink label="Games" href="/games" />
            <NavbarLink label="Profile" href={`/${userData?.id}/profile/albums`} />

            {userSession && <NavbarLink label="Assets" href="/help" />}
          </div>
        </div>

        <div className="relative flex items-center gap-2 mb-1 xl:gap-12 ">
          <div className="">
            {session ? (
              <LoggedInUserButtons userSession={session} userData={userData} />
            ) : (
              <AuthButtons
                className="hidden md:flex"
                setIsLoginModalOpen={setIsLoginModalOpen}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
              />
            )}
          </div>
          <Button
            className="z-40 flex flex-col gap-1 mt-1 cursor-pointer xl:hidden"
            onClick={() => {
              if (!isOpen && containerRef.current) {
                containerRef.current.style.display = "block" // Set display back to block when the "Toggle" button is clicked
              }
              setTap(!tap)
              toggleOpen()
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

      <Example />
    </>
  )
}
