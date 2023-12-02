import React from "react"

import CreatorsPage from "@/components/creators"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

const Creators = () => {
  return (
    <>
      <CreatorsPage />
    </>
  )
}

export default Creators
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession(req as NextApiRequest, res as NextApiResponse)
//   let users
//   if (session) {
   
// users=await fetchWithoutAuthorization("/v1/user/details/others","GET");
//   }
 

//   if (users?.error) {
//     // toast.error(jobsDetails.message)
//     return {
//       redirect: {
//         destination: `/?error=${users.message}`,
//         permanent: false,
//       },
//     }
//   }
// users=  users?.data.users
//   // const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

//   return {
//     props: {
//       users,
//     },
//   }
// }
