import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

import logo from "@/assets/image/logo-with-text.png"
import showPassword from "@/assets/svg/view-white.svg"

import FacebookIcon from "@/components/icons/facebook"
import GoogleIcon from "@/components/icons/google"
import Button from "@/components/ui/button"
import TextInput from "@/components/ui/textInput"
interface FormErrors {
  username: string
  email: string
  password: string
}

export default function SignUpPage() {
  const router = useRouter()
  console.log("server")
  const SignUpForm = () => {
    const [showPaswd, setShowPaswd] = useState(false)

    const [formValues, setFormValues] = useState({
      username: "",
      email: "",
      password: "",
    })
    const [errors, setErrors] = useState<FormErrors>({
      username: "",
      email: "",
      password: "",
    })

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const newErrors = validateForm()

      if (Object.values(newErrors).some((error) => error !== "")) {
        setErrors(newErrors)
        return
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const res2: APITypes = await res.json()

        if (res2.error) {
          toast.error(res2.message)
          console.log("this is res 2 message ", res2.message)
          return
        }
        setFormValues({ username: "", email: "", password: "" })
        res.status === 201 && router.push("/auth/login")
      } catch (error: unknown) {
        console.log("auth/signup ", error)
        toast.error(error)
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setFormValues({ ...formValues, [name]: value })
    }
    const validateForm = () => {
      const newErrors = { ...errors }

      if (formValues.username.length < 4) {
        newErrors.username = "Username should be at least 4 characters"
      } else {
        newErrors.username = ""
      }

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

    return (
      <>
        <div className="text-text text-[16px] bg-user_interface_2  shadow-secondary flex p-3  flex-col items-start mt-12 lg:w-[40rem] w-11/12 sm:w-5/6 md:w-2/3 mx-auto my-10 rounded-xl">
          {/* <p>Step  1 of 2</p> */}
          <div className="flex flex-col w-full p-[20px]">
            <h3 className="flex flex-row self-end gap-2 mb-2 tracking-normal text-shaded">
              Already have an account?
              <Link className="text-secondary" href="/auth/login">
                Sign in
              </Link>
            </h3>

            <Image height={17} alt={"not available"} src={logo} className="cursor-pointer " />
          </div>
          <h1 className="font-medium text-[2rem] my-[10px] px-9">Sign Up</h1>

          <form onSubmit={(e) => onSubmit(e)} className="w-full lg:px-9 lg:py-2 ">
            <label className="my-2 mt-6">*Name</label>
            <TextInput
              type="text"
              onChange={handleChange}
              // className="bg-[#101014]"
              className="mt-2 tracking-wider bg-transparent rounded-md"
              errorMessage={errors.username}
              required
              value={formValues.username}
              name="username"
              placeholder="rockstar"
            />
            <div className="my-2 mt-8">*Email</div>
            <TextInput
              type="email"
              onChange={handleChange}
              errorMessage={errors.email}
              // className="bg-[#101014]"
              className="mt-2 tracking-wider bg-transparent rounded-md"
              value={formValues.email}
              name="email"
              placeholder="rockstar@gmail.com"
            />

            <div className="my-2 mt-8">*Password</div>
            <div className="relative flex flex-row items-center">
              <TextInput
                errorMessage={errors.password}
                type={showPaswd ? "text" : "password"}
                onChange={handleChange}
                // className="bg-[#101014]"
                className="mt-2 tracking-wider bg-transparent rounded-md"
                required
                value={formValues.password}
                name="password"
                placeholder="*********"
                // className="flex flex-row items-center w-full px-3 py-3 pr-12 text-sm border-2 border-transparent rounded-lg shadow-sm bg-gray_dull bg-user_interface_3 hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 "
              />
              <Image
                width={2060}
                height={2060}
                alt={""}
                onClick={() => setShowPaswd(!showPaswd)}
                src={showPassword}
                className="absolute right-[1rem] w-4 cursor-pointer"
              />
            </div>

            {/* <div className="my-2 mt-6">*Confirm Password</div>
            <div className="relative flex flex-row items-center">
              <TextInput
                type={showConfirmPaswd ? "text" : "password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                className="bg-[#101014]"

                name="password"
                placeholder="*********"
              // className="flex flex-row items-center w-full px-3 py-3 pr-12 text-sm border-2 border-transparent rounded-lg shadow-sm bg-gray_dull bg-user_interface_3 hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 "
              />
              <Image
                width={2060}
                height={2060}
                alt={""}
                onClick={() => setShowConfirmPaswd(!showConfirmPaswd)}
                src={showPassword}
                className="absolute right-[1rem] w-4 cursor-pointer"
              />
            </div> */}

            <Button
              type="submit"
              variant="primary"
              className="mt-14  text-light  ml-auto bg-secondary  px-[30px] py-[10px] font-medium mb-[1.8em] rounded-xl"
            >
              Create account
            </Button>
            <div className="text-shaded">
              or signup with
              <div className="flex justify-around gap-[16px] mt-3">
                <Button
                  type="button"
                  className="inline-flex items-center px-5 mb-2 mr-2 text-sm font-medium text-center text-gray-900 w-[100%] bg-gray-100  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 rounded-xl"
                  onClick={() => {
                    signIn("google", { callbackUrl: "/" })
                  }}
                >
                  <GoogleIcon className="" />
                  Sign up with Google
                </Button>

                <Button
                  type="button"
                  className="inline-flex items-center px-5 mb-2 mr-2 text-sm font-medium text-center  w-[100%] bg-[#2c5699]  text-[#fff] opacity-1 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 rounded-xl"
                >
                  <FacebookIcon className="" />
                  Sign up with Facebook
                </Button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <SignUpForm />
    </>
  )
}
