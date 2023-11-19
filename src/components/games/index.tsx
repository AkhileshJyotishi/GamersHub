import React, { useState } from "react"

import testImage from "@/assets/image/profiles-slide-show.png"
import { Games } from "@/interface/games"

import Card from "./gamesCard"
import Layout from "./gamesLayout"
// {} // gamesDetails
// : {
//   gamesDetails: BackendGame[]
// }
const GamesPage = () => {
  const sampleGames: Games[] = [
    {
      id: 1,
      cover: testImage,
      likes: 500,
      banner: testImage,
      username: "user1",
      title: "Game 1",
      album_slug: "album-1",
      //   slug: "game-1",
      //   isSavedPost: true,
    },
    {
      id: 2,
      cover: testImage,
      likes: 300,
      banner: testImage,
      username: "user2",
      title: "Game 2",
      album_slug: "album-2",
      //   slug: "game-2",
      //   isSavedPost: false,
    },
    // Add more game entries as needed
  ]

  const [games, setGames] = useState<Games[]>(sampleGames)

  return (
    <Layout games={games} setGames={setGames}>
      <div className="w-[70%] grid sm:w-full grid-cols-1 gap-6 p-4 justify-items-center md:grid-cols-2 2xl:grid-cols-3">
        {games.map((game, idx) => (
          <Card {...game} className="w-[100%] h-[250px] md:h-[250px] lg:h-[350px]" key={idx} />
        ))}
      </div>
    </Layout>
  )
}

export default GamesPage
