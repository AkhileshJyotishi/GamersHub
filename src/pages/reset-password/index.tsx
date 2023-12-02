import Button from "@/components/ui/button"
import TextInput from "@/components/ui/textInput"
import { fetchWithoutAuthorization } from "@/utils/functions"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    password: "",
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }
  const router = useRouter()
  const { token } = router.query

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formValues.password.length < 8 ||
      !/[A-Z]/.test(formValues.password) ||
      !/[\W_]/.test(formValues.password)
    ) {
      setErrors(
        "Password should be at least 8 characters with an uppercase letter and a special character"
      )
      return
    } else {
      setErrors("")
    }

    const data = await fetchWithoutAuthorization(`v1/auth/reset-password?token=${token}`, "POST", {
      password: formValues.password,
    })
    if (data?.error) {
      toast.error((data?.error?.response?.data?.message || "Request failed") ?? "Request failed")
    } else {
      toast.success("Password reset successfully")
      router.push("/")
    }
  }

  const [errors, setErrors] = useState<string>()

  return (
    <>
      <div className="w-full ">
        <h1 className="text-center text-[45px] font-[600]">Reset password</h1>
      </div>
      <div className="text-text text-[16px] bg-user_interface_2  shadow-secondary flex p-4  flex-col items-start mt-6 lg:w-[40rem] w-11/12 sm:w-5/6 md:w-2/3 mx-auto mb-6 rounded-xl">
        <form className="w-full">
          <div className="mt-2">
            <label>
              <div className="text-[14px]">New Password</div>
              <TextInput
                type="password"
                onChange={handleChange}
                // className="bg-[#101014] mt-2"
                className="mt-2 tracking-wider bg-transparent rounded-md"
                value={formValues.password}
                name="password"
                placeholder="****"
              />
            </label>
          </div>
          {errors && <div className="pt-4 text-sm text-red-500">{errors}</div>}

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

export default ResetPassword