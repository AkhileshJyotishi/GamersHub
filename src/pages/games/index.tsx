import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { BackendGame } from "@/interface/games"
import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import GamesPage from "@/components/games"
import Head from "next/head"

const Games = ({ parsedgamesDetails }: { parsedgamesDetails: BackendGame[] }) => {
  return (
    <>
      <Head>
        <title>GameCreatorsHub |Games</title>
      </Head>
      <GamesPage gameDetails={parsedgamesDetails} />
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

  if (gameDetails?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?emessage=${gameDetails.message}`,
        permanent: false,
      },
    }
  }
  console.log(gameDetails?.data.games)
  const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

  return {
    props: {
      parsedgamesDetails,
    },
  }
}
