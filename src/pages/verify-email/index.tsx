import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import { fetchWithoutAuthorization } from "@/utils/functions"

const Verify = () => {
  const router = useRouter()
  const { token } = router.query
  // console.log(token)
  useEffect(() => {
    const loaddata = async () => {
      const data = await fetchWithoutAuthorization(
        `v1/auth/verify-email?token=${token}`,
        "POST",
        {}
      )
      // console.log(data)
      if (data?.error) {
        toast.error("Email verification failed")
      } else {
        toast.success("Email verified successfully")
        router.push("/")
      }
    }
    if (token) {
      loaddata()
    }
  }, [router, token])
  return (
    <>
      <div className=" text-secondary text-[14px] p-8">Verifying your E-mail...</div>
    </>
  )
}

export default Verify
