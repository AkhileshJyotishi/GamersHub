import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"

import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import Particularpage from "@/components/particularJob/"

const index = ({ profileData }: { profileData: BackendJob }) => {
  // console.log("prifle data ti is ", profileData)
  return (
    <>
      <Head>
        <title>Jobs | {profileData.title || ""}</title>
      </Head>
      <Particularpage profileData={profileData} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  const { slug } = query

  // if (!session) {
  //     return {
  //         redirect: {
  //             destination: '/',
  //             permanent: false,
  //         },
  //     }
  // }

  let profileData = await fetchData(`/v1/job/${slug}`, session?.user?.name as string, "GET")
  toast.dismiss()
  if (profileData?.error) {
    toast.error(profileData?.message)
  } else {
    toast.success(profileData?.message)
  }
  // return resp.data;

  profileData = profileData?.data.job
  return {
    props: {
      profileData,
    },
  }
}
