import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { BackendGame, CustomGameTags } from "@/interface/games"
import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import GamesPage from "@/components/games"

const Games = ({
  parsedgamesDetails,
  customGameTags,
}: {
  parsedgamesDetails: BackendGame[]
  customGameTags: CustomGameTags
}) => {
  return (
    <>
      <Head>
        <title>GameCreators |Games</title>
      </Head>
      <GamesPage gameDetails={parsedgamesDetails} customGameTags={customGameTags} />
    </>
  )
}

export default Games

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let gameDetails
  if (session) {
    gameDetails = await fetchData("/v1/game/others", session.user?.name as string, "GET")
  } else {
    gameDetails = await fetchWithoutAuthorization(`/v1/game`, "GET")
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
  if (gameDetails?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

  const customGameTags: CustomGameTags = res2?.data
  return {
    props: {
      parsedgamesDetails,
      customGameTags,
    },
  }
}
