import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import JobsPage from "@/components/jobs"

// type jobsDetails=
const Jobs = ({
  jobs,
  jobSoftwareSuggestions,
}: {
  jobs: Job[]
  jobSoftwareSuggestions: JobSoftwareSuggestions
}) => {
  return (
    <>
      <Head>
        <title>GameCreators | Jobs</title>
      </Head>
      <JobsPage jobs={jobs} jobSoftwareSuggestions={jobSoftwareSuggestions} />
    </>
  )
}

export default Jobs

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let jobsDetails
  if (!session) {
    jobsDetails = await fetchWithoutAuthorization(`/v1/job`, "GET")
  } else {
    jobsDetails = await fetchData(`/v1/job/others`, session.user?.name as string, "GET")
  }
  const res2 = await fetchWithoutAuthorization("/v1/users/software", "GET")

  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  if (jobsDetails?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  const parsedjobsDetails: BackendJob[] = jobsDetails?.data.jobs
  const jobSoftwareSuggestions: JobSoftwareSuggestions = res2?.data
  const jobs: Job[] = parsedjobsDetails?.map((job) => FrontendCompatibleObject(job))

  return {
    props: {
      jobs,
      jobSoftwareSuggestions,
    },
  }
}
export const FrontendCompatibleObject = (backendJob: BackendJob): Job => {
  const salary =
    backendJob.paymentValue != 0
      ? `${backendJob.paymentValue} ${backendJob.paymentType}`
      : `${backendJob.paymentType}`
  return {
    id: backendJob?.id,
    title: backendJob.title,
    desc: backendJob.description,
    remote: backendJob.remote,
    date: backendJob.publishDate,
    // levelOfExpertise:backendJob.expertise,
    // Replace with the relevant date field from the backend
    salary, // Adjust based on your backend structure
    type: backendJob?.jobType,
    location: `${backendJob?.country}, ${backendJob?.city}`, // Adjust based on your backend structure
    href: `/jobs/${backendJob?.id}`, // Adjust based on your backend structure
    // chips: backendJob.jobSoftwares,
    savedUsers: backendJob?.savedUsers,
    banner: backendJob?.user?.bannerImage ?? "",
    profileImage: backendJob?.user?.profileImage ?? "",
    userId: backendJob?.userId,
    username: backendJob?.user?.username,
  }
}
