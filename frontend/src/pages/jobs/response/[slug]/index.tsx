import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"

import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import ParticularApplicant from "@/components/particularApplicant"

const index = ({ applicant }: { applicant: ApplicantInfo }) => {
  return (
    <>
      <Head>
        <title>Job Responses | {applicant?.firstName || ""}</title>
      </Head>
      <ParticularApplicant applicant={applicant} />
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
    `/v1/job/applicantinfo/${slug}`,
    session?.user?.name as string,
    "GET"
  )
  toast.dismiss()
  if (response?.error || !response?.data) {
    toast.error(response?.message)
    return {
      notFound: true,
    }
  }
  // return resp.data;

  const applicant: ApplicantInfo = response?.data?.applicantInfo
  return {
    props: {
      applicant,
    },
  }
}
