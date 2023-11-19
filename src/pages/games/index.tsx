import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { BackendGame } from "@/interface/games"
import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import GamesPage from "@/components/games"

type GamesProps = {
  parsedgamesDetails: BackendGame[]
}
const Games: React.FC<GamesProps> = ({ parsedgamesDetails }) => {
  return (
    <>
      <GamesPage gamesDetails={parsedgamesDetails} />
    </>
  )
}

export default Games

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const gameDetails = await fetchData(`/v1/game`, session.user?.name as string, "GET")

  if (gameDetails?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?error=${gameDetails.message}`,
        permanent: false,
      },
    }
  }
  console.log(gameDetails?.data.games)
  const parsedgamesDetails: BackendGame[] = gameDetails?.data.games

  return {
    props: {
      parsedgamesDetails,
    },
  }
}
