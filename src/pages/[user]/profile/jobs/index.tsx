import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { fetchWithoutAuthorization } from "@/utils/functions"

import Card from "@/components/jobs/jobsCard"

import ProfilePageLayout from "../ProfileLayout"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Jobs = () => {
  const session = useSession()
  const FrontendCompatibleObject = (backendJob: BackendJob): Job => {
    return {
      id: backendJob.id,
      title: backendJob.title,
      desc: backendJob.description,
      date: backendJob.publishDate, // Replace with the relevant date field from the backend
      salary: `${backendJob.paymentValue} ${backendJob.paymentType}`, // Adjust based on your backend structure
      type: backendJob.jobType,
      location: `${backendJob.country}, ${backendJob.city}`, // Adjust based on your backend structure
      href: `/jobs/${backendJob.id}`, // Adjust based on your backend structure
      // chips: backendJob.jobSoftwares,
      savedUsers: backendJob.savedUsers,
    }
  }
  const router = useRouter()
  const [jobDetails, setjobDetails] = useState<BackendJob[]>([])
  // let albumDetails = await fetchData(`/v1/album/user`, token, "GET");

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      // ${router.query.user}
      const data = await fetchWithoutAuthorization(`v1/job/user/${router.query.user}`, "GET")
      console.log(data?.data.jobs)
      if (data?.error) {
        router.push(`/?error=Please authenticate`)
      } else {
        setjobDetails(data?.data?.jobs)
      }
      // console.log(data?.data)

      // return data?.data;
    }
    loadData()
  }, [session.data?.user?.name, router])

  return (
    <>
      {/* sdfsdfsdf */}
      {jobDetails &&
        jobDetails.map((job) => {
          console.log("job upload  ", job)
          const x = FrontendCompatibleObject(job)
          return (
            <>
              <Card {...x} className="" />
            </>
          )
        })}
    </>
  )
}

Jobs.getLayout = ProfilePageLayout
export default Jobs
