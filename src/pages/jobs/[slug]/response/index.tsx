import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"
import { fetchWithoutAuthorization } from "@/utils/functions"
import JobResponses from "@/components/jobResponses"
import { getSession } from "@/lib/auth"

const index = ({
  jobApplicants,
  customCreatorsTags,
}: {
  jobApplicants: jobApplications[]
  customCreatorsTags: ICustomCreatorsTags
}) => {
  return (
    <>
      <Head>
        <title>
          Job Responses |{" "}
          {(jobApplicants && !!jobApplicants.length && jobApplicants[0].job.title) || ""}
        </title>
      </Head>
      <JobResponses jobApplicants={jobApplicants} customCreatorsTags={customCreatorsTags} />
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

  const response = await fetchWithoutAuthorization(`/v1/job/jobApplications/${slug}`, "GET")

  toast.dismiss()
  if (response?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  console.log(response?.data)
  const res2 = await fetchWithoutAuthorization("/v1/users/customCreatorsTags", "GET")
  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  const customCreatorsTags: ICustomCreatorsTags = res2?.data
  const jobApplicants: jobApplications[] = response?.data.applications
  return {
    props: {
      jobApplicants,
      customCreatorsTags,
    },
  }
}
