import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { signOut } from "next-auth/react"

import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import CreateGame from "@/components/createGame"

const index = (game: Allow) => {
  // console.log("object in back", game)
  return (
    <>
      <CreateGame game={game.game} />
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
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
  const { id } = query
  const games = await fetchData(`/v1/game/${id}`, session.user?.name as string, "GET")

  if (games?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?error=${games.message}`,
        permanent: false,
      },
    }
  }
  // console.log(games?.data.game.gameAssets)
  const game = games?.data?.game
  // console.log("game in back",game)
  return {
    props: {
      game,
    },
  }
}

export default index
