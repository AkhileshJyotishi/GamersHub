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
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})

const UpdateJob = ({ job }: { job: JobInfo }) => {
  const session = useSession()
  const { setLoading } = useUserContext()
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
    localStorage.setItem("noval__content1", "")
    localStorage.setItem("noval__content2", "")
    // localStorage.removeItem("noval__content1")
    // localStorage.removeItem("noval__content2")
    const formdata = new FormData()
    formdata.append("file", jobInfo.banner as Blob)
    formdata.append("type", "jobs")
    if (jobInfo.banner && typeof jobInfo.banner === "object") {
      const isuploaded = await fetchFile(
        "/v1/upload/file",
        session?.data?.user?.name as string,
        "POST",
        formdata
      )
      if (isuploaded?.error) {
        toast.info(isuploaded?.message)
        setLoading(false)
        return
      }
      // console.log(isuploaded?.data)
      // return;
      jobInfo.banner = isuploaded?.data.image.Location
    }
    // console.log("jobInfo.banner ", jobInfo.banner)
    jobInfo.publishDate = new Date().toISOString()
    delete jobInfo.userId
    delete jobInfo.id
    const data = await fetchData(
      `/v1/job/${router?.query.id}`,
      session?.data?.user?.name as string,
      "PATCH",
      jobInfo
    )
    toast.dismiss()
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
      <>
        <div className="flex flex-col w-[100vw] gap-4 md:max-w-[59vw] lg:max-w-[67vw]">
          <>
            <h1 className="text-[22px] mt-4 font-semibold">Description</h1>

            <div className="w-full p-12 bg-user_interface_2 rounded-xl">
              <Filter
                key={"text"}
                inputType={"text"}
                title={""}
                placeholder={"Enter the description"}
                value={jobInfo.description}
                className="static bg-transparent border-none rounded-md"
                onChange={(value) =>
                  setJobInfo((prev) => ({ ...prev, description: value as string }))
                }
              />
            </div>
          </>
          <>
            <h1 className="text-[22px] font-semibold">Skills and requirements</h1>
            <Editor
              className={"bg-user_interface_2 w-full rounded-xl md:h-[40vh] md:overflow-y-scroll"}
              editable={true}
              storageKey="noval__content2"
              defaultValue={jobInfo.jobDetails ?? {}}
            />
          </>

          <>
            <h1 className="text-[22px] mt-4 font-semibold">About the Recruiter</h1>
            <Editor
              className={"bg-user_interface_2 w-full rounded-xl md:h-[40vh] md:overflow-y-scroll"}
              editable={true}
              storageKey="noval__content1"
              defaultValue={jobInfo.aboutRecruiter ?? {}}
            />
          </>
        </div>
      </>
    </Layout>
  )
}

export default UpdateJob
