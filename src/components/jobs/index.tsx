import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { FrontendCompatibleObject } from "@/pages/jobs"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import SkeletonLoader from "@/components/ui/SkeletonLoader2"

import Layout from "./jobsLayout"
// import Card from "./jobsCard"
import Card from "./Old-GCH-card"

type JobsPageProps = {
  jobs: Job[]
  jobSoftwareSuggestions: JobSoftwareSuggestions
}
const JobsPage: React.FC<JobsPageProps> = ({ jobs, jobSoftwareSuggestions }) => {
  const [activetab, setactivetab] = useState<string>("All")
  const { userData, setIsLoginModalOpen } = useUserContext()
  const { data: session } = useSession()
  const [Alljobs, setjobs] = useState<Job[] | null>(jobs)
  const [myjob, setmyjobs] = useState<Job[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (activetab === "Saved" && userData === null) {
      setIsLoginModalOpen(true)
      setactivetab("All")
    } else if (activetab === "My Job Posts" && userData === null) {
      setIsLoginModalOpen(true)
      setactivetab("All")
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
      const sett = data?.data?.jobs?.map((job: BackendJob) => FrontendCompatibleObject(job))
      setmyjobs(sett)
    }
  }
  const onChange = (id: number) => {
    setmyjobs((prev) => {
      const x = prev?.filter((job) => job.id !== id)
      if (x) return x
      else return null
    })
  }
  const handleSavedSuccess = (id: number, state: string) => {
    setjobs((prevJobs) => {
      if (prevJobs) {
        const updatedJobs = prevJobs.map((job) =>
          job.id === id
            ? {
                ...job,
                savedUsers:
                  state === "save"
                    ? [...job.savedUsers, { id: userData?.id ?? 0 }]
                    : job.savedUsers.filter((user) => user.id !== (userData?.id ?? 0)),
              }
            : job
        )
        return updatedJobs
      }
      return prevJobs
    })
  }

  useEffect(() => {
    myjobs()
  }, [userData])
  useEffect(() => {
    setjobs(jobs)
  }, [activetab])
  return (
    <Layout
      jobs={activetab === "My Job Posts" ? myjob || [] : jobs}
      activeTab={activetab}
      setActiveTab={setactivetab}
      setjobs={activetab === "My Job Posts" ? setmyjobs || [] : setjobs}
      setLoading={setLoading}
      loading={loading}
      jobSoftwareSuggestions={jobSoftwareSuggestions}
    >
      {activetab === "All" && (
        <>
          {jobs.length > 0 ? (
            <>
              <div className="grid  mx-auto my-4  p-2 md:p-4 lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 md:grid-cols-1 md:gap-[20px] gap-[10px] w-full 3xl:grid-cols-4">
                {loading ? (
                  <>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </>
                ) : (
                  Alljobs?.map((job, idx) => (
                    <Card
                      {...job}
                      className=""
                      key={idx}
                      onsavedSuccess={(id, state) => handleSavedSuccess(id, state)}
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No jobs yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
              </div>
            </>
          )}
        </>
      )}

      {activetab === "Saved" && (
        <>
          {Alljobs?.filter((job) => job.savedUsers.some((user) => user.id === userData?.id))
            .length !== 0 ? (
            <div className="grid  mx-auto my-4  p-2 md:p-4 lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 md:grid-cols-1 md:gap-[20px] gap-[10px] w-full 3xl:grid-cols-4">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                Alljobs?.filter((job) =>
                  job.savedUsers.some((user) => user.id === userData?.id)
                ).map((job, idx) => (
                  <Card
                    {...job}
                    className=""
                    key={idx}
                    onsavedSuccess={(id, state) => handleSavedSuccess(id, state)}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-20">
              <h3 className="text-3xl font-bold">No jobs yet.</h3>
              <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
            </div>
          )}
        </>
      )}
      {activetab === "My Job Posts" && (
        <>
          {myjob && Array.from(myjob).length > 0 ? (
            <div className="grid  mx-auto my-4  p-2 md:p-4 lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 md:grid-cols-1 md:gap-[20px] gap-[10px] w-full 3xl:grid-cols-4">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                myjob &&
                myjob?.map((job, idx) => (
                  <Card {...job} className="" key={idx} onChange={onChange} />
                ))
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No jobs yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  )
}

export default JobsPage
