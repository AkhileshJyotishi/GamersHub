import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"
import { fetchWithoutAuthorization } from "@/utils/functions"

import Button from "@/components/ui/button"
import TextInput from "@/components/ui/textInput"
const Forgotpassword = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }
  const router = useRouter()
  const userContext = useUserContext()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    userContext.setIsLoginModalOpen(false)

    const data = await fetchWithoutAuthorization(`v1/auth/forgot-password`, "POST", {
      email: formValues.email,
    })
    // console.log(data?.error)
    toast.dismiss()
    if (data?.error) {
      toast.error((data?.error?.response?.data?.message || "Request failed") ?? "Request failed")
    } else {
      toast.success("Password reset mail sent successfully")
      router.push("/")
    }
  }
  return (
    <>
      <Head>
        <title>GameCreators | Forgot</title>
      </Head>
      <div className="w-full ">
        <h1 className="text-center text-[45px] font-[600]">Forgot your password?</h1>
      </div>
      <div className="text-text text-[16px] bg-user_interface_2  shadow-secondary flex p-4  flex-col items-start mt-6 lg:w-[40rem] w-11/12 sm:w-5/6 md:w-2/3 mx-auto mb-6 rounded-xl">
        <form className="w-full">
          <div className="mt-2">
            <label>
              <div className="text-[14px]">Your email</div>
              <TextInput
                type="email"
                onChange={handleChange}
                className="mt-2 tracking-wider bg-transparent rounded-md"
                value={formValues.email}
                name="email"
                placeholder="rockstar@gmail.com"
              />
            </label>
          </div>

          <Button
            className="mt-6 transition-all  py-2 rounded-lg hover:opacity-90 flex px-4 sm:text-sm md:text-md bg-secondary"
            onClick={(e) => handleReset(e)}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </>
  )
}

export default Forgotpassword
