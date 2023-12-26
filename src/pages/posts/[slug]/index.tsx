import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import Particularpage from "@/components/particularPost"

const index = ({ profileData }: { profileData: IPostbackend }) => {
  // console.log("prifle data ti is ", profileData)
  return (
    <>
      {/* <Head><title>Posts | {profileData.title || ""}</title></Head> */}
      <Particularpage profileData={profileData} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  const { slug } = query

  let profileData = await fetchWithoutAuthorization(`/v1/post/${slug}`, "GET")

  if (profileData?.error) {
    return {
      notFound: true,
    }
  }
  profileData = profileData?.data?.post
  return {
    props: {
      profileData,
    },
  }
}
