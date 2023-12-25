import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import Card from "./jobsCard"
import Layout from "./jobsLayout"
const FrontendCompatibleObject = (backendJob: BackendJob): Job => {
  const salary = backendJob.paymentValue != 0 ? `${backendJob.paymentValue} ${backendJob.paymentType}` : `${backendJob.paymentType}`
  return {
    id: backendJob.id,
    title: backendJob.title,
    desc: backendJob.description,
    date: backendJob.publishDate, // Replace with the relevant date field from the backend
    salary, // Adjust based on your backend structure
    type: backendJob.jobType,
    location: `${backendJob.country}, ${backendJob.city}`, // Adjust based on your backend structure
    href: `/jobs/${backendJob.id}`, // Adjust based on your backend structure
    // chips: backendJob.jobSoftwares,
    savedUsers: backendJob.savedUsers,
    banner: backendJob.banner,
    userId: backendJob.userId,
    remote: backendJob?.remote,
    profileImage: backendJob?.user?.profileImage ?? "",
  }
}
type JobsPageProps = {
  jobs: Job[]
}
const JobsPage: React.FC<JobsPageProps> = ({ jobs }) => {
  const [activetab, setactivetab] = useState<string>("All")
  const { userData, setIsLoginModalOpen } = useUserContext()
  const { data: session } = useSession()
  const [Alljobs, setjobs] = useState<Job[] | null>(jobs)
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
  const handleSavedSuccess = (id: number, state: string) => {
    // Update the Alljobs state based on the state parameter
    setjobs((prevJobs) => {
      if (prevJobs) {
        const updatedJobs = prevJobs.map((job) =>
          job.id === id
            ? {
              ...job,
              savedUsers:
                state === 'save'
                  ? [...job.savedUsers, { id: userData?.id ?? 0 }]
                  : job.savedUsers.filter((user) => user.id !== (userData?.id ?? 0)),
            }
            : job
        );
        return updatedJobs;
      }
      return prevJobs;
    });
  };

  useEffect(() => {

    myjobs()
  }, [userData])




  return (
    <Layout jobs={jobs} activeTab={activetab} setActiveTab={setactivetab}>
      {activetab === "All" && (
        <>
          {jobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-3 md:p-4 p-2 justify-items-center sm:grid-cols-2 lg:grid-cols-3 w-[100%] mx-auto">
                {Alljobs?.map((job, idx) => <Card {...job} className="" key={idx} onsavedSuccess={(id, state) => handleSavedSuccess(id, state)} />)}
              </div>
            </>
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
        </>
      )}

      {activetab === "Saved" && (
        <>
          {Alljobs?.filter((job) => job.savedUsers.some((user) => user.id === userData?.id)).length !== 0 ? (
            <div className="grid grid-cols-1 gap-3 md:p-4 p-2 justify-items-center sm:grid-cols-2 lg:grid-cols-3 w-[100%] mx-auto">
              {Alljobs
                ?.filter((job) => job.savedUsers.some((user) => user.id === userData?.id))
                .map((job, idx) => (
                  <Card {...job} className="" key={idx} onsavedSuccess={(id, state) => handleSavedSuccess(id, state)} />
                ))}
            </div>
          ) :
            <div className="flex flex-col items-center w-full gap-20">
              <h3 className="text-3xl font-bold">No jobs yet.</h3>
              <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
            </div>

          }

        </>
      )}
      {activetab === "My Job Posts" && (
        <>
          {myjob && Array.from(myjob).length > 0 ? (
            <div className="grid w-[90%] mx-auto my-4  p-4 lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px] ">
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
                    <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
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
