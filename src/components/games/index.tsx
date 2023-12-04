import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { BackendGame, Games } from "@/interface/games"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import Card from "./anotherCard"
import Layout from "./gamesLayout"

// {} // gamesDetails
// : {
//   gamesDetails: BackendGame[]
// }
const GamesPage = ({ gameDetails }: { gameDetails: BackendGame[] }) => {
  function convertToGamesInterface(backendGame: BackendGame): Games {
    const { id, banner, user, title, savedUsers } = backendGame

    // Assuming you want to use the profileImage property if available, otherwise fallback to a default value
    const profileImage = user?.profileImage || ""

    // Create the simplified Games object
    const gamesInterface: Games = {
      id,
      banner,
      username: user?.username || "Unknown User",
      title,
      cover: profileImage,
      savedUsers,
    }

    return gamesInterface
  }
  const games2 = gameDetails.map((game) => {
    return convertToGamesInterface(game)
  })
  // convertToGamesInterface(parsedgamesDetails)
  const [games, setGames] = useState<Games[]>(games2)
  const [activetab, setactivetab] = useState<string>("All")
  const { userData, setIsLoginModalOpen } = useUserContext()
  const { data: session } = useSession()
  const [myjob, setmyjobs] = useState<Games[] | null>(null)

  const mygames = async () => {
    if (session) {
      const data = await fetchData(
        `/v1/game/user/${userData?.id}`,
        session?.user?.name as string,
        "GET"
      )
      console.log("myjobposts     ", data)
      const sett = data?.data.games.map((game: BackendGame) => convertToGamesInterface(game))
      setmyjobs(sett)
    }
  }
  useEffect(() => {
    mygames()
  }, [])
  useEffect(() => {
    // if(activetab==="Saved")
    if (activetab === "Saved" && userData === null) {
      setIsLoginModalOpen(true)
    } else if (activetab === "My Games" && userData === null) {
      setIsLoginModalOpen(true)
    }
  }, [activetab])

  let savedGame = false

  games.forEach((game) => {
    game.savedUsers.forEach((id) => {
      if (id.id == userData?.id) {
        savedGame = true
      }
    })
  })

  console.log(games)

  return (
    <Layout games={games} setGames={setGames} setActiveTab={setactivetab}>
      {activetab === "All" && (
        <>
          {games.length > 0 ? (
            <>
              <div className="w-[70%] grid sm:w-full grid-cols-1 gap-6 p-4 justify-items-center md:grid-cols-2 2xl:grid-cols-3">
                {games.map((game, idx) => (
                  <Card
                    {...game}
                    className="w-[100%] h-[300px] md:h-[250px] lg:h-[350px]"
                    key={idx}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {
                <>
                  <div className="flex flex-col items-center w-full gap-20">
                    <h3 className="text-3xl font-bold">No games yet.</h3>
                    <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
                  </div>
                </>
              }
            </>
          )}
        </>
      )}
      {activetab === "Saved" && (
        <>
          {savedGame ? (
            <>
              <div className="w-[70%] grid sm:w-full grid-cols-1 gap-6 p-4 justify-items-center md:grid-cols-2 2xl:grid-cols-3">
                {games.map((game, idx) => {
                  const arr = game.savedUsers.map((obj) => obj.id)
                  return arr.filter((id) => {
                    id === userData?.id && (
                      <Card
                        {...game}
                        className="w-[100%] h-[300px] md:h-[250px] lg:h-[350px]"
                        key={idx}
                      />
                    )
                  })
                })}
              </div>
            </>
          ) : (
            <>
              {
                <>
                  <div className="flex flex-col items-center w-full gap-20">
                    <h3 className="text-3xl font-bold">No Games yet.</h3>
                    <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
                  </div>
                </>
              }
            </>
          )}
        </>
      )}
      {activetab === "My Games" && (
        <>
          <>
            {myjob && Array.from(myjob).length > 0 ? (
              // <div className="grid grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 w-[100%]">
              <div className="w-[70%] grid sm:w-full grid-cols-1 gap-6 p-4 justify-items-center md:grid-cols-2 2xl:grid-cols-3">
                {myjob && myjob.map((job, idx) => <Card {...job} className="" key={idx} />)}
              </div>
            ) : (
              <>
                {
                  <>
                    <div className="flex flex-col items-center w-full gap-20">
                      <h3 className="text-3xl font-bold">No games yet.</h3>
                      <Image
                        width={2060}
                        height={2060}
                        alt={""}
                        className="w-[400px]"
                        src={image}
                      />
                    </div>
                  </>
                }
              </>
            )}
          </>
        </>
      )}
    </Layout>
  )
}

export default GamesPage
