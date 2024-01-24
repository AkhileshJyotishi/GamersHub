import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { signOut } from "next-auth/react"

import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import CreateJob from "@/components/createJob"

const index = ({
  jobSoftwareSuggestions,
  jobRolesSuggestions,
}: {
  jobSoftwareSuggestions: JobSoftwareSuggestions
  jobRolesSuggestions: JobRolesSuggestions
}) => {
  return (
    <>
      <Head>
        <title>GameCreators | CreateJob</title>
      </Head>
      <CreateJob
        jobSoftwareSuggestions={jobSoftwareSuggestions}
        jobRolesSuggestions={jobRolesSuggestions}
      />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
  const res2 = await fetchWithoutAuthorization("/v1/users/software", "GET")
  const res3 = await fetchWithoutAuthorization("/v1/users/jobRoles", "GET")

  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  if (res3?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  const jobSoftwareSuggestions: JobSoftwareSuggestions = res2?.data
  const jobRolesSuggestions: JobRolesSuggestions = res3?.data.jobRole
  console.log("data", res3?.data)
  return {
    props: {
      jobSoftwareSuggestions,
      jobRolesSuggestions,
    },
  }
}
