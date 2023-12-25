import React, { useState } from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"

import CloseIcon from "@/components/icons/closeIcon"
import FacebookIcon from "@/components/icons/facebook"
import GoogleIcon from "@/components/icons/google"
import SigninIcon from "@/components/icons/signin"

import Button from "../button"
import Modal from "../modal"
import TextInput from "../textInput"
interface LoginModaProps {
  isOpen: boolean
  onClose: () => void
}
const LoginModal = ({ isOpen, onClose }: LoginModaProps) => {
  const [formValues, setFormValues] = useState<FormType>({
    email: "",
    password: "",
  })
  const { setIsLoginModalOpen } = useUserContext()

  interface FormType {
    email: string
    password: string
  }
  const [errors, setErrors] = useState<FormType>({
    email: "",
    password: "",
  })

  const router = useRouter()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validateForm = () => {
    const newErrors = { ...errors }

    if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = "Invalid email address"
    } else {
      newErrors.email = ""
    }

    if (
      formValues.password.length < 8 ||
      !/[A-Z]/.test(formValues.password) ||
      !/[\W_]/.test(formValues.password)
    ) {
      newErrors.password =
        "Password should be at least 8 characters with an uppercase letter and a special character"
    } else {
      newErrors.password = ""
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newError = validateForm()
    // console.log(newError)
    if (Object.values(newError).some((error) => error !== "")) {
      setErrors(newError)
      return
    }
    try {
      const credentials = {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: `${window.location.origin}`,
      }
      const res = await signIn("credentials", credentials)
      if (res?.error) {
        const statusCode = (await JSON.parse(res?.error)?.status) ?? "401"
        const emessage: string = (await JSON.parse(res?.error)?.message) ?? "Request failed"
        if (statusCode == 511 && emessage.includes("verified")) {
          // toast.error("Email not verified")
          // setVerifyMail(formValues.email)
          // setVerifyModal(true)
          setIsLoginModalOpen(false)
          router.replace(
            `/?verify=true&data=${formValues.email}&emessage=Email Not Verified`,
            "/",
            {
              shallow: true,
            }
          )
        } else {
          toast.error(await JSON.parse(res?.error)?.message)
        }
        return
      } else {
        setFormValues({ email: "", password: "" })
        setIsLoginModalOpen(false)
        router.push("/")
      }
    } catch (error: Allow) {
      toast.error(error)
    }
  }

  const userContext = useUserContext()

  // const handleVerify = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   userContext.setIsLoginModalOpen(false)
  //   router.push("/?verify=true")
  // }
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    userContext.setIsLoginModalOpen(false)
    router.push("/auth/forgotpassword")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-text text-[16px]  flex p-5  flex-col items-start  w-full  mb-6 justify-center">
        <form className="w-full">
          <div className="pb-[12px] w-full">
            <Button
              type="button"
              className="float-right"
              onClick={(e) => {
                e.preventDefault()
                onClose()
              }}
            >
              <CloseIcon className="" />
            </Button>
          </div>
          <h1 className="font-medium text-[2rem]  ">Sign In</h1>
          <div className="flex flex-col justify-around w-full gap-4 mt-3 overflow-hidden md:flex-row">
            <Button
              type="button"
              className="flex items-center justify-center whitespace-nowrap  mb-2 mr-2 text-sm font-medium text-center text-gray-900 w-[100%] bg-gray-100  hover:bg-gray-200  focus:outline-none rounded-xl focus:ring-gray-100 dark:focus:ring-gray-500 p-[2px]"
              onClick={() => {
                signIn("google", { callbackUrl: "/" })
              }}
            >
              <GoogleIcon className="" />
              Sign in with Google
            </Button>

            <Button
              type="button"
              className="flex items-center justify-center whitespace-nowrap mb-2 rounded-xl mr-2 text-sm font-medium text-center  w-[100%] bg-[#2c5699]  text-[#fff] opacity-1  focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 p-[2px] min-h-[40px]"
              onClick={() => {
                signIn("facebook", { callbackUrl: "/" })
              }}
            >
              <FacebookIcon className="" />
              Sign in with Facebook
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between w-full gap-4 mt-5">
            <div className="h-[1.5px] w-full rounded-3xl bg-user_interface_3"></div>
            <p className="text-[#505054]">Or </p>
            <div className="h-[1.5px] w-full round-3xl bg-user_interface_3"></div>
          </div>
          <div className="mt-6">
            <label>
              <div className="text-[14px] h-[21px]">Your email</div>
              <TextInput
                type="email"
                onChange={handleChange}
                // className="mt-2 tracking-wider border-none bg-background rounded-xl"
                className="mt-2 tracking-wider bg-transparent rounded-md"
                value={formValues.email}
                name="email"
                placeholder="rockstar@gmail.com"
                errorMessage={errors.email}
              />
            </label>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between h-[21px]">
              <div className="my-2 text-[14px]">Password</div>

              <div className="cursor-pointer text-secondary text-[14px] ">
                <div
                  onClick={(e) => {
                    handleForgot(e)
                  }}
                >
                  Forgot Password?
                </div>
              </div>
            </div>
            <div className="relative flex flex-row items-center">
              <TextInput
                type={"password"}
                onChange={handleChange}
                // className="mt-2 tracking-wider border-none bg-background rounded-xl"
                className="mt-2 tracking-wider bg-transparent rounded-md"
                value={formValues.password}
                name="password"
                placeholder="***"
                errorMessage={errors.password}
              />
            </div>
          </div>
          <Button
            className="px-[12px] py-[6px] border-[#323235] border-[0.01px] flex items-center mt-7  rounded-xl bg-secondary w-full justify-center h-10"
            type="button"
            onClick={handleSubmit}
          >
            <SigninIcon className="" />
            Sign in
          </Button>
          {/* <div className=" text-secondary text-[14px] pt-4 cursor-pointer">
            <div
              onClick={(e) => {
                handleVerify(e)
              }}
            >
              Verify Email
            </div>
          </div> */}
          {/* <div className='flex justify-between'>
                        <div className='py-4 text-secondary text-[14px]'>
                            <Link href={"hash"}>
                                Forgot Password?
                            </Link>
                        </div>

                        <div className='py-4 text-secondary text-[14px]'>
                            <Link href={"hash"}>
                                Sign Up
                            </Link>
                        </div>

                    </div> */}
          {/* <Input name="name" control={control}/> */}
        </form>
      </div>
      <div className="bg-[#18181c] text-center text-[#bebec2] p-[15px] rounded-b-3xl">
        {"Not a member yet?"}
        {"  "}
        <Button
          onClick={() => {
            onClose()
            router.push("/auth/signup")
          }}
          className="text-secondary"
        >
          Sign up here
        </Button>
      </div>
    </Modal>
  )
}

export default LoginModal
