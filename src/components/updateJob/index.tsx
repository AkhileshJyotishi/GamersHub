import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchFile } from "@/utils/functions"

import Layout from "./layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
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
  localStorage.removeItem("noval__content1")
  localStorage.removeItem("noval__content2")
  const formdata = new FormData()
  formdata.append("file", jobInfo.banner as Blob)
  if (jobInfo.banner) {
    const isuploaded = await fetchFile(
      "/v1/upload/file",
      session?.data?.user?.name as string,
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

  const data = await fetchData("/v1/job/user", session?.data?.user?.name as string, "POST", jobInfo)
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
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable={true}
          storageKey="noval__content"
        />
      </>
    </Layout>
  )
}

export default UpdateJob
