import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import Card from "./jobsCard"
import Layout from "./jobsLayout"
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
    banner: backendJob.banner,
    userId: backendJob.userId,
  }
}
type JobsPageProps = {
  jobs: Job[]
}
const JobsPage: React.FC<JobsPageProps> = ({ jobs }) => {
  const [activetab, setactivetab] = useState<string>("All")
  const { userData, setIsLoginModalOpen } = useUserContext()
  const { data: session } = useSession()
  const [myjob, setmyjobs] = useState<Job[] | null>(null)
  useEffect(() => {
    // if(activetab==="Saved")
    if (activetab === "Saved" && userData === null) {
      setIsLoginModalOpen(true)
    } else if (activetab === "My Job Posts" && userData === null) {
      setIsLoginModalOpen(true)
    }
  }, [activetab])

  const myjobs = async () => {
    if (session) {
      const data = await fetchData(
        `/v1/job/user/${userData?.id}`,
        session?.user?.name as string,
        "GET"
      )
      if (data?.error) {
        return
      }
      // console.log("myjobposts     ", data)
      const sett = data?.data?.jobs?.map((job: BackendJob) => FrontendCompatibleObject(job))
      setmyjobs(sett)
    }
  }
  const onChange = (id: number) => {
    // const updatedJobs = jobs.filter(job => );
    setmyjobs((prev) => {
      const x = prev?.filter((job) => job.id !== id)
      if (x) return x
      else return null
    })
  }

  useEffect(() => {
    myjobs()
  }, [])

  // [
  //   {
  //     savedJobs:[
  //       {
  //         id : 6
  //       }
  //     ]
  //   }
  // ]

  // let arr = job.savedUsers.map((obj) => obj.id)
  // let savedPosts = arr.filter((id) => id == userData?.id)

  // let savedJobs= jobs.map((job, idx) => (
  //   job.savedUsers.filter((id) => id.id == userData?.id)
  // )

  // )
  // console.log()
  // let savedCount = false;
  // savedJobs.map((job)=>(
  //   job.map((op)=> op.id)
  // ))

  let savedPost = false

  jobs.forEach((job) => {
    job.savedUsers.forEach((id) => {
      if (id.id == userData?.id) {
        savedPost = true
      }
    })
  })

  return (
    <Layout jobs={jobs} activeTab={activetab} setActiveTab={setactivetab}>
      {activetab === "All" && (
        <>
          {jobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 w-[100%] mx-auto">
                {jobs?.map((job, idx) => <Card {...job} className="" key={idx} />)}
              </div>
            </>
          ) : (
            <>
              {
                <>
                  <div className="flex flex-col items-center w-full gap-20">
                    <h3 className="text-3xl font-bold">No jobs yet.</h3>
                    <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
                  </div>
                </>
              }
            </>
          )}
        </>
      )}

      {activetab === "Saved" && (
        <>
          {savedPost ? (
            <div className="grid grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 w-[100%] mx-auto">
              {jobs?.map((job, idx) => {
                const arr = job?.savedUsers?.map((obj) => obj.id)
                return arr.filter((id) => {
                  id === userData?.id && (
                    <>
                      (
                      <Card {...job} className="" key={idx} />)
                    </>
                  )
                })
              })}
            </div>
          ) : (
            <>
              {
                <>
                  <div className="flex flex-col items-center w-full gap-20">
                    <h3 className="text-3xl font-bold">No jobs yet.</h3>
                    <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
                  </div>
                </>
              }
            </>
          )}
        </>
      )}
      {activetab === "My Job Posts" && (
        <>
          {myjob && Array.from(myjob).length > 0 ? (
            <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px] ">
              {myjob &&
                myjob?.map((job, idx) => (
                  <Card {...job} className="" key={idx} onChange={onChange} />
                ))}
            </div>
          ) : (
            <>
              {
                <>
                  <div className="flex flex-col items-center w-full gap-20">
                    <h3 className="text-3xl font-bold">No jobs yet.</h3>
                    <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
                  </div>
                </>
              }
            </>
          )}
        </>
      )}
    </Layout>
  )
}

export default JobsPage
