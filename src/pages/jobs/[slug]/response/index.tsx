import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"

import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import JobResponses from "@/components/jobResponses"

const index = ({
  jobApplicants,
  jobTitle,
  customJobResponseTags,
}: {
  jobApplicants: jobApplications[]
  jobTitle: string
  customJobResponseTags: ICustomJobResponseTags
}) => {
  return (
    <>
      <Head>
        <title>Job Responses | {jobTitle || ""}</title>
      </Head>
      <JobResponses
        jobTitle={jobTitle}
        jobApplicants={jobApplicants}
        customJobResponseTags={customJobResponseTags}
      />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (!session) {
    return {
      redirect: {
        destination: `/?emessage="Please Authenticate."`,
        permanent: false,
      },
    }
  }
  const { slug } = query

  const response = await fetchData(
    `/v1/job/jobApplications/${slug}`,
    session.user?.name as string,
    "GET"
  )
  toast.dismiss()
  if (response?.error) {
    if (response?.error?.response?.status == 403) {
      return {
        redirect: {
          destination: `/?emessage=${response?.message}`,
          permanent: false,
        },
      }
    } else {
      return {
        redirect: {
          destination: `/?emessage=Something went wrong.`,
          permanent: false,
        },
      }
    }
  }
  const res2 = await fetchWithoutAuthorization("/v1/users/customJobResponseTags", "GET")
  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage=Something went wrong.`,
        permanent: false,
      },
    }
  }
  const customJobResponseTags: ICustomJobResponseTags = res2?.data
  const jobApplicants: jobApplications[] = response?.data.applications
  const jobTitle: string = response?.data?.title
  return {
    props: {
      jobApplicants,
      customJobResponseTags,
      jobTitle,
    },
  }
}
