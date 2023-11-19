import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { fetchData } from "@/utils/functions"

import Layout from "./layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

const UpdateJob = ({ job }: { job: JobInfo }) => {
  const session = useSession()

  const router = useRouter()

  // const initialJobInfo: JobInfo = {
  //   title: "xgf",
  //   banner: null,
  //   publishDate: null,
  //   jobType: "",
  //   jobDetails: {},
  //   expertise: "",
  //   remote: false,
  //   country: "",
  //   city: "",

  //   paymentType: "",
  //   paymentValue: 60,

  //   jobSoftwares: ["sfs", "dfdf"],
  // }

  const [jobInfo, setJobInfo] = useState<JobInfo>(job)

  const uploadJob = async () => {
    const storedContent = localStorage.getItem("novel__content")
    if (storedContent) {
      jobInfo.jobDetails = JSON.parse(storedContent)
    }
    jobInfo.banner = "https://picsum.photos/id/250/900/900"
    jobInfo.publishDate = new Date().toISOString()
    // jobInfo.title;
    // console.log(jobInfo.jobDetails)
    // console.log(jobInfo)

    const data = await fetchData(`/v1/job/1`, session.data?.user?.name as string, "PATCH", jobInfo)
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
      router.back()
    }
  }

  return (
    <Layout jobInfo={jobInfo} setJobInfo={setJobInfo} uploadJob={uploadJob}>
      {/* Render the filterDetails here */}
      <>
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable={true}
        />
      </>
    </Layout>
  )
}

export default UpdateJob
