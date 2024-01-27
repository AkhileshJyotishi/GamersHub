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
  jobRolesSuggestions,
}: {
  jobs: Job[]
  jobSoftwareSuggestions: JobSoftwareSuggestions
  jobRolesSuggestions: JobRolesSuggestions
}) => {
  return (
    <>
      <Head>
        <title>Jobs | GameCreators</title>
      </Head>
      <JobsPage
        jobs={jobs}
        jobSoftwareSuggestions={jobSoftwareSuggestions}
        jobRolesSuggestions={jobRolesSuggestions}
      />
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
  const res3 = await fetchWithoutAuthorization("/v1/users/jobRoles", "GET")

  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage=Something went wrong.`,
        permanent: false,
      },
    }
  }
  if (jobsDetails?.error) {
    return {
      redirect: {
        destination: `/?emessage=Something went wrong.`,
        permanent: false,
      },
    }
  }
  if (res3?.error) {
    return {
      redirect: {
        destination: `/?emessage=Something went wrong.`,
        permanent: false,
      },
    }
  }
  const parsedjobsDetails: BackendJob[] = jobsDetails?.data.jobs
  const jobSoftwareSuggestions: JobSoftwareSuggestions = res2?.data
  const jobRolesSuggestions: JobRolesSuggestions = res3?.data.jobRole

  const jobs: Job[] = parsedjobsDetails?.map((job) => FrontendCompatibleObject(job))
  return {
    props: {
      jobs,
      jobSoftwareSuggestions,
      jobRolesSuggestions,
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
    rolesNeeded: [],
    // levelOfExpertise:backendJob.expertise,
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
