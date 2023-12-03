import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { fetchData } from "@/utils/functions"

import Filter from "../filter/mainfilter/filter"

import Layout from "./layout"

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
    description: string
    paymentType: string
    paymentValue: number

    banner: File | null | string
    expertise: string
    jobSoftwares: string[]
    title: string
    publishDate: string | null
    jobDetails: object | null
    aboutRecruiter: object | null
  }

  const initialJobInfo: JobInfo = {
    title: "",
    banner: null,
    publishDate: null,
    jobType: "",
    jobDetails: {},
    aboutRecruiter: {},
    expertise: "",
    description: "",
    remote: false,
    country: "",
    city: "",

    paymentType: "",
    paymentValue: 0,

    jobSoftwares: [],
  }

  const [jobInfo, setJobInfo] = useState<JobInfo>(initialJobInfo)

  const uploadJob = async () => {
    const storedContent = localStorage.getItem("novel__content2")
    const aboutRecuiter = localStorage.getItem("novel__content1")
    // console.log("stored_contnetn ", storedContent)
    if (storedContent) {
      jobInfo.jobDetails = JSON.parse(storedContent)
    }
    if (aboutRecuiter) {
      jobInfo.aboutRecruiter = JSON.parse(aboutRecuiter)
    }
    localStorage.removeItem("novel__content1")
    localStorage.removeItem("novel__content2")
    jobInfo.banner = "https://picsum.photos/id/250/900/900"
    jobInfo.publishDate = new Date().toISOString()
    // jobInfo.title;
    // console.log(jobInfo.jobDetails)
    console.log("jobinfo  ", jobInfo)
    // delete jobInfo.roles
    const data = await fetchData("/v1/job/user", session?.user?.name as string, "POST", jobInfo)
    if (data?.error) {
      toast.error(data.message)
      return
    }
    toast.success(data?.message)

    // fetchData("v1/job/user", token, "POST", {

    // })
  }

  return (
    <Layout jobInfo={jobInfo} setJobInfo={setJobInfo} uploadJob={uploadJob}>
      {/* Render the filterDetails here */}
      <div className="flex flex-col w-full gap-4">
        <>
          <h1 className="text-[22px] mt-4 font-semibold">Description</h1>
          {/* <Editor
          className={"bg-user_interface_2 w-full rounded-xl "}
          editable={true}
          storageKey="noval__content3"          
        /> */}
          <div className="w-full p-12 bg-user_interface_2 rounded-xl">
            <Filter
              key={"text"}
              inputType={"text"}
              title={""}
              placeholder={"Enter the description"}
              value={jobInfo.description}
              className="bg-transparent border-none rounded-md"
              onChange={(value) =>
                setJobInfo((prev) => ({ ...prev, description: value as string }))
              }
              // Variant={clsx(
              //   "flex flex-col items-start gap-[10px] text-[14px]",
              //   // hide ? "hidden" : ""
              // )}
              // hidden={filter.hidden}
            />
          </div>
        </>
        <>
          <h1 className="text-[22px] font-semibold">Skills and requirements</h1>
          <Editor
            className={"bg-user_interface_2 w-full rounded-xl md:h-[20h] md:overflow-y-scroll"}
            editable={true}
            storageKey="noval__content2"
          />
        </>

        <>
          <h1 className="text-[22px] mt-4 font-semibold">About the Recruiter</h1>
          <Editor
            className={"bg-user_interface_2 w-full rounded-xl "}
            editable={true}
            storageKey="noval__content1"
          />
        </>
      </div>
    </Layout>
  )
}

export default CreateJob
