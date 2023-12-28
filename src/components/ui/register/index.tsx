import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import logotextblackbg from "@/assets/image/logo-text-black-bg.png"
// import logo from "@/assets/image/logo-with-text.svg"
import { useUserContext } from "@/providers/user-context"

import CloseIcon from "@/components/icons/closeIcon"
import FacebookIcon from "@/components/icons/facebook"
import GoogleIcon from "@/components/icons/google"
import MailIcon from "@/components/icons/mail"

import Button from "../button"
import Modal from "../modal"

interface RegisterModaProps {
  isOpen: boolean
  onClose: () => void
}
const RegisterModal = ({ isOpen, onClose }: RegisterModaProps) => {
  const router = useRouter()
  const { setIsRegisterModalOpen } = useUserContext()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pt-[22px] px-8 pb-14 text-center">
        <div className="pb-[34px] w-full">
          <Button
            className="float-right"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
          >
            <CloseIcon className="" />
            {/* <NextImage src={CloseImage} alt={""} width={1060} height={1060} /> */}
          </Button>
        </div>
        <Image
          src={logotextblackbg}
          width={200}
          onClick={() => {
            router.push("/")
          }}
          height={25}
          alt="Game Creators Hub"
          className="mx-auto cursor-pointer"
        />

        <div className="grid grid-cols-1 gap-6 mx-auto mt-7">
          <Button
            type="button"
            className="flex items-center justify-center justify-self-center whitespace-nowrap  mb-2 mr-2 text-sm font-medium text-center text-gray-900 w-[100%] max-w-[228px] bg-gray-100  hover:bg-gray-200  focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 py-[2px] px-[10px] min-h-[40px] rounded-3xl"
            onClick={() => {
              signIn("google", { callbackUrl: "/" })
            }}
          >
            <GoogleIcon className="" />
            Sign up with Google
          </Button>
          <Button
            type="button"
            className="flex items-center justify-center justify-self-center whitespace-nowrap  mb-2 mr-2 text-sm font-medium text-center text-[#fff] w-[100%] max-w-[228px] bg-[#2c5699]    focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 py-[2px] px-[10px] min-h-[40px] rounded-3xl"
            onClick={() => {
              signIn("facebook", { callbackUrl: "/" })
            }}
          >
            <FacebookIcon className="" />
            Sign up with Facebook
          </Button>
          <Button
            type="button"
            className="flex items-center justify-center justify-self-center whitespace-nowrap  mb-2 mr-2 text-sm font-medium text-center text-gray-900 w-[100%] max-w-[228px] bg-gray-100  hover:bg-gray-200  focus:outline-none   p-[2px] min-h-[40px] rounded-3xl"
            onClick={() => {
              setIsRegisterModalOpen(false)
              router.push("/auth/signup")
            }}
          >
            <MailIcon className="w-[39px] h-[20px] " fill="#000" />
            Sign up with Email
          </Button>
        </div>
      </div>
      <div className="bg-[#18181c] text-center text-[#bebec2] p-[15px] rounded-b-3xl">
        {"Already have an account?"}
        {"  "}
        <Button
          onClick={() => {
            onClose()
            router.push("/auth/login")
          }}
          className="text-secondary"
        >
          Sign in here
        </Button>
      </div>
    </Modal>
  )
}

export default RegisterModal
