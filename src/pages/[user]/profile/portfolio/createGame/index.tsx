import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { signOut } from "next-auth/react"

import { CustomGameTags } from "@/interface/games"
import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"

import CreateGame from "@/components/createGame"

const index = ({ customGameTags }: { customGameTags: CustomGameTags }) => {
  return (
    <>
      <Head>
        <title>GameCreators | CreateGame</title>
      </Head>

      <CreateGame customGameTags={customGameTags} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (!session) {
    signOut()
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const res2 = await fetchWithoutAuthorization("/v1/users/customGameTags", "GET")
  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  const jobSoftwareSuggestions: JobSoftwareSuggestions = res2?.data
  const customGameTags = res2?.data

  return {
    props: {
      jobSoftwareSuggestions,
      customGameTags,
    },
  }
}
