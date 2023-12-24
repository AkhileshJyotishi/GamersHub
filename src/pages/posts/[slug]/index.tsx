import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"

import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import Particularpage from "./particularPost"

const index = ({ profileData }: { profileData: IPostbackend }) => {
  // console.log("prifle data ti is ", profileData)
  return (
    <>
      <Head>
        <title>Posts | {profileData.title || ""}</title>
        
      </Head>
      <Particularpage profileData={profileData} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  const { slug } = query


  let profileData = await fetchData(`/v1/post/${slug}`, session?.user?.name as string, "GET")

  if (profileData?.error) {
    toast.error(profileData?.message)
  } else {
    toast.success(profileData?.message)
  }
  // return resp.data;

  profileData = profileData?.data.post
  console.log("settings detaisls", profileData)
  return {
    props: {
      profileData,
    },
  }

  // http://localhost:5000/v1/users/details
}
