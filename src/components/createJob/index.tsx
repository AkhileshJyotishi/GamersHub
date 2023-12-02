import React, { useState } from "react"
import dynamic from "next/dynamic"

import Layout from "./layout"
import { fetchData } from "@/utils/functions"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

const CreateJob: React.FC = () => {
  const { data: session } = useSession()
  interface JobInfo {
    jobType: string

    remote: boolean
    country?: string
    city?: string

    paymentType: string
    paymentValue: number

    banner: File | null | string
    expertise: string
    jobSoftwares: string[]
    title: string
    publishDate: string | null
    jobDetails: object | null
  }

  const initialJobInfo: JobInfo = {
    title: "",
    banner: null,
    publishDate: null,
    jobType: "",
    jobDetails: {},
    expertise: "",
    remote: false,
    country: "",
    city: "",

    paymentType: "",
    paymentValue: 0,

    jobSoftwares: [],
  }

  const [jobInfo, setJobInfo] = useState<JobInfo>(initialJobInfo)

  const uploadJob = async () => {
    const storedContent = localStorage.getItem("novel__content")
    console.log("stored_contnetn " , storedContent)
    if (storedContent) {
      jobInfo.jobDetails = JSON.parse(storedContent)
    }
    localStorage.removeItem("novel__content")
    jobInfo.banner = "https://picsum.photos/id/250/900/900"
    jobInfo.publishDate = new Date().toISOString()
    // jobInfo.title;
    // console.log(jobInfo.jobDetails)
    console.log("jobinfo  ", jobInfo)
    // delete jobInfo.roles
    const data = await fetchData("/v1/job/user", session?.user?.name as string, "POST", jobInfo)
      if (data?.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data?.message)

    // fetchData("v1/job/user", token, "POST", {

    // })
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

export default CreateJob
