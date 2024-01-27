import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"

import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import Particularpage from "@/components/particularJob/"

const index = ({
  profileData,
  JobApplicationInfo,
}: {
  profileData: BackendJob
  JobApplicationInfo: IBasicInfo
}) => {
  return (
    <>
      <Head>
        <title>Jobs | {profileData.title || ""}</title>
      </Head>
      <Particularpage profileData={profileData} JobApplicationInfo={JobApplicationInfo} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  const { slug } = query

  // if (!session) {
  // return {
  //     redirect: {
  //         destination: '/',
  //         permanent: false,
  //     },
  //     }
  // }

  let profileData = await fetchData(`/v1/job/${slug}`, session?.user?.name as string, "GET")
  let JobApplicationInfo
  let users
  if (session) {
    users = await fetchData("/v1/users/applyDetails", session.user?.name as string, "GET")
    if (users?.error) {
      return {
        redirect: {
          destination: `/?emessage=${users.message}`,
          permanent: false,
        },
      }
    } else {
      const res3: IinitJobApplication = users?.data.applyDetails
      console.log(res3)
      JobApplicationInfo = {
        jobId: res3.id,
        firstName: res3.username,
        motivationToApply: null,
        applyMethod: null,
        bio: res3?.userDetails?.userBio ?? null,
        city: res3?.userDetails?.city ?? null,
        country: res3?.userDetails?.country ?? null,
        email: res3?.email,
        lastName: null,
        phone: null,
        portfolio: res3?.socials?.portfolio ?? null,
        resume: res3?.userDetails?.resume ?? null,
        rolesApplied: null,
        skills: res3?.userDetails?.userSkills?.map((userSkill) => userSkill?.skill) ?? null,
      }
    }
  }

  toast.dismiss()
  if (profileData?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  // return resp.data;

  profileData = profileData?.data.job
  if (session) {
    return {
      props: {
        profileData,
        JobApplicationInfo,
      },
    }
  } else {
    return {
      props: {
        profileData,
      },
    }
  }
}
