

import React from "react"

import Particularpage from "./particularpage"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"
import { toast } from "react-toastify"
import defaultbannerImage from "@/assets/image/user-banner.png"

const index = ({profileData}:{profileData:BackendJob}) => {
  console.log("prifle data ti is ",profileData)
  return (
    <>
      <Particularpage profileData={profileData} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res,query }) => {
    const session = await getSession(req as NextApiRequest, res as NextApiResponse)
    const {slug}=query;

    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     }
    // }

    let profileData = await fetchData(`/v1/job/${slug}`, session?.user?.name as string, "GET");

    if (profileData?.error) {
        toast.error(profileData?.message);
    }
    else {
        toast.success(profileData?.message)

    }
    // return resp.data;
    
    profileData = profileData?.data.job;
    console.log("settings detaisls", profileData)
    return {
        props: {
          profileData,

        },
    }

    // http://localhost:5000/v1/users/details

}
