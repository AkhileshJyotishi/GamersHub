import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import CreatePortfolio from "@/components/creatPorfolio"
import Head from "next/head"

const index = ({ albums, post }: { albums: Allow; post: IPostbackend }) => {
  const Title = `Update-Post | ${post.title}`
  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>
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
    return {
      redirect: {
        destination: `/?emessage=${albums.message}`,
        permanent: false,
      },
    }
  }
  if (post?.error) {
    return {
      redirect: {
        destination: `/?emessage=${post?.message}`,
        permanent: false,
      },
    }
  }
  albums = albums?.data.albums
  post = post?.data.post

  return {
    props: {
      albums,
      post,
    },
  }
}
