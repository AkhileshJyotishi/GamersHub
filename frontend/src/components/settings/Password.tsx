import React, { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import { fetchWithoutAuthorization } from "@/utils/functions"

import Button from "../ui/button"
import TextInput from "../ui/textInput"

const Password = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

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
            className="px-[12px] py-[6px] border-[#323235] bg-secondary border-[0.01px] flex items-center mt-6 rounded-xl"
            onClick={(e) => handleReset(e)}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </>
  )
}

export default Password
