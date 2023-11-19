import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

import FacebookIcon from "@/components/icons/facebook"
import GoogleIcon from "@/components/icons/google"
import SigninIcon from "@/components/icons/signin"
import Button from "@/components/ui/button"
import TextInput from "@/components/ui/textInput"
const LoginPage = () => {
  const [formValues, setFormValues] = useState<FormType>({
    email: "",
    password: "",
  })

  const router = useRouter()
  interface FormType {
    email: string
    password: string
  }
  const [errors, setErrors] = useState<FormType>({
    email: "",
    password: "",
  })
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

  const onSubmit = async (provider: string) => {
    const newError = validateForm()
    console.log(newError)
    if (Object.values(newError).some((error) => error !== "")) {
      setErrors(newError)
      return
    }
    setErrors({ email: "", password: "" })

    try {
      const credentials = {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: `${window.location.origin}`,
      }
      const res = await signIn(provider, credentials)
      setFormValues({ email: "", password: "" })
      if (res?.error) {
        // console.log(res?.error?.message)
        toast.error(await JSON.parse(res?.error)?.message)
      } else {
        router.push("/")
      }
    } catch (error: unknown) {
      console.log("catch in auth login ", error)
      toast.error(error)
    }
  }
  return (
    <div className="text-text text-[16px] bg-user_interface_2  shadow-secondary flex p-5  flex-col items-start mt-12 lg:w-[27rem] w-11/12 sm:w-5/6 md:w-2/3 mx-auto mb-6 rounded-xl">
      <div className="w-full">
        <div className="flex flex-col justify-around w-full gap-4 mt-3 overflow-hidden md:flex-row">
          <Button
            type="button"
            className="inline-flex items-center whitespace-nowrap  mb-2 mr-2 text-sm font-medium text-center text-gray-900 w-[100%] bg-gray-100  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 p-[2px] rounded-xl"
            onClick={() => {
              signIn("google", { callbackUrl: "/" })
            }}
          >
            <GoogleIcon className="" />
            Sign up with Google
          </Button>

          <Button
            type="button"
            className="inline-flex items-center whitespace-nowrap mb-2 mr-2 text-sm font-medium text-center  w-[100%] bg-[#2c5699]  text-[#fff] opacity-1 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 p-[2px] min-h-[40px] rounded-xl"
          >
            <FacebookIcon className="" />
            Sign up with Facebook
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between w-full gap-4 mt-5">
          <div className="h-[1.5px] w-full rounded-3xl bg-user_interface_3"></div>
          <p>Or</p>
          <div className="h-[1.5px] w-full round-3xl bg-user_interface_3"></div>
        </div>
        <div className="mt-8">
          <label>
            <div className="text-[14px]">Your email</div>
            <TextInput
              type="email"
              onChange={handleChange}
              // className="bg-[#101014] mt-2"
              className="mt-2 tracking-wider bg-transparent rounded-md"
              errorMessage={errors.email}
              value={formValues.email}
              name="email"
              placeholder="rockstar@gmail.com"
            />
          </label>
        </div>
        <div className="mt-8">
          <label className="my-2 text-[14px]">
            Password
            <div className="relative flex flex-row items-center">
              <TextInput
                type={"password"}
                onChange={handleChange}
                // className="bg-[#101014] mt-2"
                className="mt-2 tracking-wider bg-transparent rounded-md"
                errorMessage={errors.password}
                value={formValues.password}
                name="password"
                placeholder="*********"
                // className="flex flex-row items-center w-full px-3 py-3 pr-12 text-sm border-2 border-transparent rounded-lg shadow-sm bg-gray_dull bg-user_interface_3 hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 "
              />
            </div>
          </label>
        </div>
        <Button
          className="px-[12px] py-[6px] border-[0.01px] border-[#505054]  flex items-center mt-8 rounded-xl"
          onClick={() => onSubmit("credentials")}
        >
          <SigninIcon className="" />
          Sign in
        </Button>
        <div className="flex justify-between">
          <div className="py-4 text-secondary text-[14px]">
            <Link href={"/auth/forgotpassword"}>Forgot Password?</Link>
          </div>

          <div className="py-4 text-secondary text-[14px]">
            <Link href={"/auth/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
