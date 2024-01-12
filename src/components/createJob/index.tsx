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
interface CreateJobProps {
  jobSoftwareSuggestions?: JobSoftwareSuggestions
}
/**
 * React functional component for creating and uploading a job to the server.
 * Uses hooks and components from Next.js and React libraries.
 * Renders a form with input fields and an editor component for job description and recruiter information.
 * Handles the job upload process, including fetching data and uploading files.
 * Displays toast messages to indicate the success or failure of the upload process.
 *
 * Example Usage:
 * <CreateJob />
 *
 * Inputs: None
 *
 * Flow:
 * 1. Initializes hooks and state variables.
 * 2. Defines initial job information with default values.
 * 3. Defines the uploadJob function to handle the job upload process.
 * 4. When the form is submitted, calls the uploadJob function.
 * 5. Sets the loading state to true.
 * 6. Retrieves job details and recruiter information from local storage.
 * 7. Uploads the job banner image to the server using the fetchFile function.
 * 8. Sends the job data to the server using the fetchData function.
 * 9. If the upload is successful, displays a success toast message and redirects to the jobs page.
 * 10. If there is an error during the upload process, displays an error toast message.
 *
 * Outputs: None
 */

const CreateJob: React.FC<CreateJobProps> = ({ jobSoftwareSuggestions }) => {
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

  /**
   * Uploads a job to the server.
   * Retrieves the job details and about the recruiter information from the local storage,
   * prepares the data to be sent to the server, and makes an API call to upload the job.
   * Handles any errors that occur during the upload process and displays appropriate toast messages.
   * Updates the loading state and redirects the user to the jobs page.
   */
  const uploadJob = async () => {
    setLoading(true)

    const storedContent = localStorage.getItem("noval__content2")
    const aboutRecuiter = localStorage.getItem("noval__content1")

    if (storedContent) {
      jobInfo.jobDetails = JSON.parse(storedContent)
    }
    if (aboutRecuiter) {
      jobInfo.aboutRecruiter = JSON.parse(aboutRecuiter)
    }
    localStorage.setItem("noval__content1", "")
    localStorage.setItem("noval__content2", "")

    const formdata = new FormData()
    formdata.append("file", jobInfo.banner as Blob)
    formdata.append("type", "jobs")

    if (jobInfo.banner && typeof jobInfo.banner == "object") {
      const isuploaded = await fetchFile(
        "/v1/upload/file",
        session?.user?.name as string,
        "POST",
        formdata
      )
      if (isuploaded?.error) {
        setLoading(false)
        return
      }
      jobInfo.banner = isuploaded?.data.image.Location
    } else {
      jobInfo.banner = ""
    }

    jobInfo.publishDate = new Date().toISOString()

    const data = await fetchData("/v1/job/user", session?.user?.name as string, "POST", jobInfo)
    if (data?.error) {
      setLoading(false)
      toast.dismiss()

      toast.error(data?.message)
      return
    }
    toast.dismiss()
    toast.success(data?.message)
    setLoading(false)
    router.push("/jobs")
  }

  return (
    <Layout
      jobInfo={jobInfo}
      setJobInfo={setJobInfo}
      uploadJob={uploadJob}
      jobSoftwareSuggestions={jobSoftwareSuggestions}
    >
      {/* Render the filterDetails here */}
      <div className="flex flex-col w-[100vw] gap-4 md:max-w-[59vw] lg:max-w-[67vw]">
        <>
          <h1 className="text-[22px] mt-4 font-semibold">Description</h1>

          <div className="w-full p-4 md:p-12 bg-user_interface_2 rounded-xl ">
            <Filter
              key={"text"}
              inputType={"text"}
              element={"textarea"}
              title={""}
              placeholder={"Enter the description"}
              value={jobInfo.description}
              className="bg-transparent border-transparent border-none rounded-md"
              onChange={(value) =>
                setJobInfo((prev) => ({ ...prev, description: value as string }))
              }
            />
          </div>
        </>
        <>
          <h1 className="text-[22px] font-semibold">Skills and requirements</h1>
          <Editor
            className={"bg-user_interface_2 w-full rounded-xl md:min-h-[40vh] "}
            editable={true}
            storageKey="noval__content2"
            defaultValue={{}}
          />
        </>

        <>
          <h1 className="text-[22px] mt-4 font-semibold">About the Recruiter</h1>
          <Editor
            className={"bg-user_interface_2 w-full rounded-xl md:min-h-[40vh] "}
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
