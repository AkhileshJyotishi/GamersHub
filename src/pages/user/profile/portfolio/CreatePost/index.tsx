import React from "react"

import CreatePortfolio from "@/components/creatPorfolio"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { fetchData } from "@/utils/functions"
import { getSession } from "@/lib/auth"

const index = ({albums}:{albums:Allow}) => {
  return (
    <>
      <CreatePortfolio albums={albums}/>
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let albums
  if (session) {
   
albums=await fetchData("/v1/album/user",session.user?.name as string ,"GET");
  }
 

  if (albums?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?error=${albums.message}`,
        permanent: false,
      },
    }
  }
albums=  albums?.data.albums
  // const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

  return {
    props: {
      albums,
    },
  }
}
