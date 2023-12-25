import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { fetchWithoutAuthorization } from "@/utils/functions"

import Card from "@/components/jobs/jobsCard"
import SkeletonLoader from "@/components/ui/SkeletonLoader2"

import ProfilePageLayout from "../ProfileLayout"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Jobs = () => {
  const session = useSession()
  const FrontendCompatibleObject = (backendJob: BackendJob): Job => {
    // console.log(backendJob)
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
      userId: backendJob.userId,
      banner: backendJob.banner,
      profileImage: backendJob?.user?.profileImage,
    }
  }
  const router = useRouter()
  const [jobDetails, setjobDetails] = useState<BackendJob[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // let albumDetails = await fetchData(`/v1/album/user`, token, "GET");

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      // ${router.query.user}
      const data = await fetchWithoutAuthorization(`v1/job/user/${router.query.user}`, "GET")
      setLoading(false)

      // console.log(data?.data.jobs)
      if (data?.error) {
        router.push(`/?emessage=Please authenticate`)
      } else {
        setjobDetails(data?.data?.jobs)
      }
    }
    loadData()
  }, [session.data?.user?.name, router])
  if (loading) {
    return (
      <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    )
  } else {
    return (
      <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
        {/* sdfsdfsdf */}
        {jobDetails.length > 0 ? (
          jobDetails?.map((job) => {
            // console.log("job upload  ", job)
            const x = FrontendCompatibleObject(job)
            return (
              <>
                <Card {...x} className="" />
              </>
            )
          })
        ) : (
          <>
            {
              <>
                <div className="flex flex-col items-center w-full gap-20">
                  <h3 className="text-3xl font-bold">No jobs yet.</h3>
                  <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
                </div>
              </>
            }
          </>
        )}
      </div>
    )
  }
}

Jobs.getLayout = ProfilePageLayout
export default Jobs
