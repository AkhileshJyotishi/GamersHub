import React, { useState } from "react"

import { BackendGame, Games } from "@/interface/games"

import Card from "./anotherCard"
import Layout from "./gamesLayout"
// {} // gamesDetails
// : {
//   gamesDetails: BackendGame[]
// }
const GamesPage = ({ gameDetails }: { gameDetails: BackendGame[] }) => {
  function convertToGamesInterface(backendGame: BackendGame): Games {
    const { id, banner, user, title } = backendGame

    // Assuming you want to use the profileImage property if available, otherwise fallback to a default value
    const profileImage = user?.profileImage || "default-profile-image.jpg"

    // Create the simplified Games object
    const gamesInterface: Games = {
      id,
      banner,
      username: user?.username || "Unknown User",
      title,
      cover: profileImage,
    }

    return gamesInterface
  }
  const games2 = gameDetails.map((game, idx) => {
    return convertToGamesInterface(game)
  })
  // convertToGamesInterface(parsedgamesDetails)
  const [games, setGames] = useState<Games[]>(games2)

  return (
    <Layout games={games} setGames={setGames}>
      <div className="w-[70%] grid sm:w-full grid-cols-1 gap-6 p-4 justify-items-center md:grid-cols-2 2xl:grid-cols-3">
        {games.map((game, idx) => (
          //
          <Card {...game} className="w-[100%] h-[300px] md:h-[250px] lg:h-[350px]" key={idx} />
        ))}
      </div>
    </Layout>
  )
}

export default GamesPage
