import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchFile } from "@/utils/functions"

import Filter from "../filter/mainfilter/filter"

import Layout from "./layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

const CreateJob: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { setLoading } = useUserContext()

  const initialJobInfo: Omit<JobInfo, "userId"> = {
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

  const [jobInfo, setJobInfo] = useState<Omit<JobInfo, "userId">>(initialJobInfo)

  const uploadJob = async () => {
    // console.log("job uploading")
    setLoading(true)

    const storedContent = localStorage.getItem("noval__content2")
    const aboutRecuiter = localStorage.getItem("noval__content1")
    // console.log("stored_contnetn ", storedContent)
    // console.log("aboutrecuiter ", aboutRecuiter)
    if (storedContent) {
      jobInfo.jobDetails = JSON.parse(storedContent)
    }
    if (aboutRecuiter) {
      jobInfo.aboutRecruiter = JSON.parse(aboutRecuiter)
    }
    localStorage.removeItem("noval__content1")
    localStorage.removeItem("noval__content2")
    const formdata = new FormData()
    formdata.append("file", jobInfo.banner as Blob)
    formdata.append("type","jobs")
    if (jobInfo.banner) {
      const isuploaded = await fetchFile(
        "/v1/upload/file",
        session?.user?.name as string,
        "POST",
        formdata
      )
      if (isuploaded?.error) {
        // toast.info(isuploaded?.message)
        setLoading(false)
        return
      }
      // console.log(isuploaded?.data)
      // return;
      jobInfo.banner = isuploaded?.data.image.Location
    } else {
      jobInfo.banner = ""
    }
    // console.log("jobInfo.banner ", jobInfo.banner)
    jobInfo.publishDate = new Date().toISOString()

    const data = await fetchData("/v1/job/user", session?.user?.name as string, "POST", jobInfo)
    if (data?.error) {
      setLoading(false)

      toast.error(data?.message)
      return
    }
    toast.success(data?.message)
    setLoading(false)

    // handleLoadChange()
    router.push("/jobs")
  }

  return (
    <Layout jobInfo={jobInfo} setJobInfo={setJobInfo} uploadJob={uploadJob}>
      {/* Render the filterDetails here */}
      <div className="flex flex-col w-full gap-4">
        <>
          <h1 className="text-[22px] mt-4 font-semibold">Description</h1>

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
            className={"bg-user_interface_2 w-full rounded-xl md:h-[40vh] md:overflow-y-scroll"}
            editable={true}
            storageKey="noval__content2"
            defaultValue={{}}
          />
        </>

        <>
          <h1 className="text-[22px] mt-4 font-semibold">About the Recruiter</h1>
          <Editor
            className={"bg-user_interface_2 w-full rounded-xl md:h-[40vh] md:overflow-y-scroll"}
            editable={true}
            storageKey="noval__content1"
            defaultValue={{}}

          />
        </>
      </div>
    </Layout>
  )
}

export default CreateJob
