import React, { useState } from "react"
import { signIn } from "next-auth/react"

import Button from "@/components/ui/button"
import TextInput from "@/components/ui/textInput"
const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
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
                // className="bg-[#101014] mt-2"
                className="mt-2 tracking-wider bg-transparent rounded-md"
                value={formValues.email}
                name="email"
                placeholder="rockstar@gmail.com"
              />
            </label>
          </div>

          <Button
            className="px-[12px] py-[6px] border-[#323235] bg-secondary border-[0.01px] flex items-center mt-6 rounded-xl"
            onClick={() => signIn("credentials", {}, {})}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </>
  )
}

export default LoginPage
