import React, { useEffect } from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import JobsPage from "@/components/jobs"

// type jobsDetails=
const Jobs = ({ jobs }: { jobs: Job[] }) => {
  useEffect(() => {
    // Check if 'jobs' is being used here
    console.log("object")
    console.log("jobs coming ", jobs)
  }, [jobs])
  console.log("why ", jobs)
  return (
    <>
      <JobsPage jobs={jobs} />
    </>
  )
}

export default Jobs

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let jobsDetails
  if (!session) {
    // signOut();

    // return {
    //   redirect: {
    //     destination: "/?error=Please Authenticate&logout=true",
    //     permanent: false,
    //   },
    // }
    jobsDetails = await fetchWithoutAuthorization(`/v1/job`, "GET")
  } else {
    jobsDetails = await fetchData(`/v1/job/others`, session.user?.name as string, "GET")
  }
  // console.log("this  is session", session)

  if (jobsDetails?.error) {
    // toast.error(jobsDetails.message)]

    return {
      redirect: {
        destination: `/?error=${jobsDetails.message}`,
        permanent: false,
      },
    }
  }
  const parsedjobsDetails: BackendJob[] = jobsDetails?.data.jobs
  console.log(parsedjobsDetails)
  // console.log("this is the job details ", parsedjobsDetails)

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

  const jobs: Job[] = parsedjobsDetails.map((job) => FrontendCompatibleObject(job))

  return {
    props: {
      jobs,
    },
  }
}
