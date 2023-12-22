import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import CreatePortfolio from "@/components/creatPorfolio"

const index = ({ albums, post }: { albums: Allow; post: Allow }) => {
  return (
    <>
      <CreatePortfolio albums={albums} post={post} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let albums
  let post
  // query;
  if (session) {
    albums = await fetchWithoutAuthorization(`/v1/album/user/${query.user}`, "GET")
    post = await fetchWithoutAuthorization(`/v1/post/${query.id}`, "GET")
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
  if (post?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?emessage=${post?.message}`,
        permanent: false,
      },
    }
  }
  albums = albums?.data.albums
  // console.log("posts data", post?.data)
  post = post?.data.post
  // const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

  return {
    props: {
      albums,
      post,
    },
  }
}
