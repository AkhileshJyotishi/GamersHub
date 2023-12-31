import { useEffect, useState } from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

import textblackbg from "@/assets/image/text-black-bg.png"
// import logo from "@/assets/image/logo-with-text.svg"
import showPassword from "@/assets/svg/view-white.svg"
import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import FacebookIcon from "@/components/icons/facebook"
import GoogleIcon from "@/components/icons/google"
import Button from "@/components/ui/button"
import { InfoTag } from "@/components/ui/Info"
import TextInput from "@/components/ui/textInput"

export default function SignUpPage() {
  const router = useRouter()
  const SignUpForm = () => {
    const [showPaswd, setShowPaswd] = useState(false)
    const [currentFieldName, setCurrentFieldName] = useState("")

    const [formValues, setFormValues] = useState({
      username: "",
      email: "",
      password: "",
    })
    const [errors, setErrors] = useState({
      username: "",
      email: "",
      password: "",
    })

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const newErrors = validateForm()

      if (Object.values(newErrors).some((error) => error !== "")) {
        setErrors(newErrors)
        toast.error("Please fix all errors")
        return
      }
      setErrors({
        username: "",
        email: "",
        password: "",
      })
      toast.info("Signing Up...")
      setCurrentFieldName("")
      const res = await fetchWithoutAuthorization("/v1/auth/register", "POST", {
        ...formValues,
      })
      if (res?.error) {
        toast.dismiss()
        toast.error(res.error?.response?.data?.message || res.message)
      } else {
        toast.dismiss()
        toast.info("Sending Mail...")
        const ress = await fetchWithoutAuthorization("/v1/auth/send-verification-email", "POST", {
          email: formValues.email,
        })
        if (ress?.error) {
          router.replace(
            `/?verify=true&data=${formValues.email}&message=Registration successfull`,
            "/",
            {
              shallow: true,
            }
          )
          return
        }
        setFormValues({ username: "", email: "", password: "" })
        router.replace("/?message=Verification mail sent", "/", { shallow: true })
      }
      // try {
      //   const res = await fetch("/v1//register", {
      //     method: "POST",
      //     body: JSON.stringify(formValues),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   const res2: APITypes = await res.json()

      //   if (res2.error) {
      //     toast.error(res2.message)
      //     console.log("this is res 2 message ", res2.message)
      //     return
      //   }
      //   setFormValues({ username: "", email: "", password: "" })
      //   res.status === 201 && router.push("/auth/login")
      // } catch (error: Allow) {
      //   console.log("auth/signup ", error)
      //   toast.error(error)
      // }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setCurrentFieldName(name as keyof typeof formValues) // Set the currently changing field
      setFormValues({ ...formValues, [name]: value })
    }

    useEffect(() => {
      if (currentFieldName) {
        const newErrors = validateForm()
        setErrors((prevErrors) => ({
          ...prevErrors,
          [currentFieldName]: (newErrors as Allow)[currentFieldName],
        }))
      }
    }, [(formValues as Allow)[currentFieldName]])
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
          "Password should be at least 4 characters with an uppercase letter and a special character"
      } else {
        newErrors.password = ""
      }

      return newErrors
    }

    return (
      <>
        <Head>
          <title>GameCreatorsHub | SignUp</title>
        </Head>
        <div className="text-text text-[16px] bg-user_interface_2  shadow-secondary flex p-3  flex-col items-start mt-12 lg:w-[40rem] w-11/12 sm:w-5/6 md:w-2/3 mx-auto my-10 rounded-xl">
          {/* <p>Step  1 of 2</p> */}
          <div className="flex flex-col w-full px-[20px] py-[10px] ">
            <h3 className="flex flex-row flex-wrap self-end gap-2 mb-2 tracking-normal text-shaded">
              Already have an account?
              <Link className="text-secondary" href="/auth/login">
                Sign in
              </Link>
            </h3>
          </div>
          <Image
            src={textblackbg}
            width={200}
            onClick={() => {
              router.push("/")
            }}
            height={30}
            alt="Game Creators Hub"
            className="my-2 cursor-pointer"
          />
          <h1 className="font-medium text-[2rem] mb-[10px] lg:px-9 lg:py-2">Sign Up</h1>

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
                className="absolute right-[1rem] top-6 w-4 cursor-pointer"
              />
            </div>
            <InfoTag />

            <Button
              type="submit"
              // variant="primary"
              className="mt-10  text-light  ml-auto bg-secondary  px-[30px] py-[10px] font-medium mb-[1.8em] rounded-xl"
            >
              Create account
            </Button>
            <div className="text-shaded">
              or signup with
              <div className="flex justify-around sm:flex-row gap-1 min-[400px]:gap-[16px] mt-3">
                <Button
                  type="button"
                  className="inline-flex items-center px-3 mb-2 mr-2 text-sm font-medium text-center text-gray-900 w-[100%] bg-gray-100  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 rounded-xl"
                  onClick={() => {
                    signIn("google", { callbackUrl: "/" })
                  }}
                >
                  <GoogleIcon className="" />
                  Google
                </Button>

                <Button
                  type="button"
                  className="inline-flex py-2 items-center px-3 mb-2 mr-2 text-sm font-medium text-center  w-[100%] bg-[#2c5699]  text-[#fff] opacity-1 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-500 rounded-xl"
                  onClick={() => {
                    signIn("facebook", { callbackUrl: "/" })
                  }}
                >
                  <FacebookIcon className="" />
                  Facebook
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  } else {
    return {
      props: {},
    }
  }
}
