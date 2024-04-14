import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import CreatePortfolio from "@/components/creatPorfolio"

const index = ({ albums, keywords }: { albums: Allow; keywords?: string[] }) => {
  return (
    <>
      <Head>
        <title>GameCreators | CreatePost</title>
      </Head>
      <CreatePortfolio albums={albums} keywords={keywords} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let albums
  let keywords
  // query;
  // console.log("user query  ", query)
  if (session) {
    albums = await fetchWithoutAuthorization(`/v1/album/user/${query.user}`, "GET")
    keywords = await fetchWithoutAuthorization(`/v1/users/keyword`, "GET")

    // console.log()
  } else {
    return {
      redirect: {
        destination: `/?emessage=Please Authenticate`,
        permanent: false,
      },
    }
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
  keywords = keywords?.data?.Keyword
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
      keywords,
    },
  }
}
