import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import CreatePortfolio from "@/components/creatPorfolio"

const index = ({ albums }: { albums: Allow }) => {
  return (
    <>
      <CreatePortfolio albums={albums} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let albums
  // query;
  // console.log("user query  ", query)
  if (session) {
    albums = await fetchWithoutAuthorization(`/v1/album/user/${query.user}`, "GET")
    // console.log()
  }

  if (albums?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?emessage=${albums.message}`,
        permanent: false,
      },
    }
  }
  albums = albums?.data.albums
  // const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games
  if (albums.length <= 0) {
    return {
      redirect: {
        destination: `/?emessage=First Create an album`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      albums,
    },
  }
}
