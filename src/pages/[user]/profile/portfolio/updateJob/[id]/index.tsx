// import { useRouter } from 'next/router'
import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { signOut } from "next-auth/react"

import { getSession } from "@/lib/auth"
// import { token } from "@/pages/settings"
import { fetchData } from "@/utils/functions"

import UpdateJob from "@/components/updateJob"

const index = ({ job }: { job: JobInfo }) => {
  return (
    <>
      <UpdateJob job={job} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (!session) {
    signOut()
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  // console.log("this  is session", session)
  const { id } = query
  const jobsDetails = await fetchData(`/v1/job/${id}`, session.user?.name as string, "GET")

  if (jobsDetails?.error) {
    return {
      redirect: {
        destination: `/?emessage=${jobsDetails.message}`,
        permanent: false,
      },
    }
  }
  const parsedjobDetails: BackendJob = jobsDetails?.data.job

  const convertBackendJobToJobInfo = (backendJob: BackendJob): JobInfo => {
    const {
      id,
      jobType,
      remote,
      country,
      city,
      paymentType,
      paymentValue,
      banner,
      expertise,
      jobSoftwares,
      title,
      publishDate,
      jobDetails,
      userId,
      aboutRecruiter,
      description,
    } = backendJob

    // jobSoftwares=
    return {
      id,
      jobType,
      remote,
      country: country || "", // Adjust based on your needs
      city: city || "", // Adjust based on your needs
      paymentType,
      paymentValue,
      banner,
      expertise,
      jobSoftwares: jobSoftwares?.map((software) => software.software),
      title,
      publishDate: publishDate || null, // Adjust based on your needs
      jobDetails: jobDetails || null, // Adjust based on your needs
      userId: userId,
      aboutRecruiter,
      description,
    }
  }

  // Example usage:
  const job: JobInfo = convertBackendJobToJobInfo(parsedjobDetails)

  return {
    props: {
      job,
    },
  }
}
