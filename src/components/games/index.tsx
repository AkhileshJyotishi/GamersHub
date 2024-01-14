import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { BackendGame, CustomGameTags, Games } from "@/interface/games"
import { useUserContext } from "@/providers/user-context"
import { convertToGamesInterface, fetchData } from "@/utils/functions"

import SkeletonLoader from "../ui/SkeletonLoader2"

import Card from "./anotherCard"
import Layout from "./gamesLayout"

const renderNoGamesMessage = () => (
  <div className="flex flex-col items-center w-full gap-20">
    <h3 className="text-3xl font-bold">No games yet.</h3>
    <Image width={2060} height={2060} alt="" className="w-[200px]" src={image} />
  </div>
)

const GamesPage = ({
  gameDetails,
  customGameTags,
}: {
  gameDetails: BackendGame[]
  customGameTags: CustomGameTags
}) => {
  const games2 = useMemo(
    () =>
      gameDetails?.map((game) => {
        return convertToGamesInterface(game)
      }),
    []
  )
  const [games, setGames] = useState<Games[] | null>(games2)
  const [activetab, setactivetab] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [myjob, setmyjobs] = useState<Games[] | null>(null)
  // let temptagsuggestions = [...(games?.flatMap((game) => game.tags.map((x) => x.keyword)) ?? [])]
  // let tempgamePlatformsSuggestions = [...(games?.flatMap((game) => game.platforms.map((x) => x.name)) ?? [])]
  // let tempgenresSuggestions = [...(games?.flatMap((game) => game.genre.map((x) => x.name)) ?? [])]

  // const [gamePlatformsSuggestions, setgamePlatformsSuggestions] = useState<string[]>(tempgamePlatformsSuggestions)
  // const [genresSuggestions, setgenresSuggestions] = useState<string[]>(tempgenresSuggestions)
  // const [tagSuggestions, settagSuggestions] = useState<string[]>(temptagsuggestions)

  const { userData, setIsLoginModalOpen } = useUserContext()
  const { data: session } = useSession()

  const mygames = async () => {
    if (session) {
      const data = await fetchData(
        `/v1/game/user/${userData?.id}`,
        session?.user?.name as string,
        "GET"
      )
      const sett = data?.data?.games?.map((game: BackendGame) => convertToGamesInterface(game))
      setmyjobs(sett)
    }
  }
  const onChange = (id: number) => {
    setmyjobs((prev) => {
      const x = prev?.filter((job) => job.id !== id)
      if (x) return x
      else return null
    })
  }

  useEffect(() => {
    mygames()
  }, [userData])
  useEffect(() => {
    // if(activetab==="Saved")
    if (activetab === "Saved" && userData === null) {
      setIsLoginModalOpen(true)
      setactivetab("All")
    } else if (activetab === "My Games" && userData === null) {
      setIsLoginModalOpen(true)
      setactivetab("All")
    }
  }, [activetab])
  // useEffect(() => {
  //   setgamePlatformsSuggestions((prev) => [
  //     ...prev,
  //     ...(myjob?.flatMap((game) => game.platforms.map((x) => x.name)) ?? []),
  //   ])
  //   setgenresSuggestions((prev) => [
  //     ...prev,
  //     ...(myjob?.flatMap((game) => game.genre.map((x) => x.name)) ?? []),
  //   ])
  //   settagSuggestions((prev) => [
  //     ...prev,
  //     ...(myjob?.flatMap((game) => game.tags.map((x) => x.keyword)) ?? []),
  //   ])
  //   return () => {
  //     settagSuggestions(temptagsuggestions)
  //     setgamePlatformsSuggestions(tempgamePlatformsSuggestions)
  //     setgenresSuggestions(tempgenresSuggestions)
  //   }
  // }, [myjob])
  const handleSavedSuccess = (id: number, state: string) => {
    setGames((prevGames) => {
      if (prevGames) {
        const updatedGames = prevGames.map((game) =>
          game.id === id
            ? {
                ...game,
                savedUsers:
                  state === "save"
                    ? [...game.savedUsers, { id: userData?.id ?? 0 }]
                    : game.savedUsers.filter((user) => user.id !== (userData?.id ?? 0)),
              }
            : game
        )
        return updatedGames
      }
      return prevGames
    })
  }
  useEffect(() => {
    setGames(games2)
  }, [activetab])
  return (
    <Layout
      games={activetab === "My Games" ? myjob || [] : games2}
      setGames={activetab === "My Games" ? setmyjobs : setGames}
      setActiveTab={setactivetab}
      activeTab={activetab}
      loading={loading}
      setLoading={setLoading}
      gamePlatformsSuggestions={customGameTags.platform}
      genresSuggestions={customGameTags.genre}
      tagSuggestions={customGameTags.tags}
    >
      {activetab === "All" && (
        <>
          {games && games?.length > 0 ? (
            <>
              <div className="grid w-full min-[600px]:grid-cols-2 md:grid-cols-1 gap-3 p-4 md:p-0 justify-items-center min-[950px]:grid-cols-2 min-[1150px]:grid-cols-3">
                {loading ? (
                  <>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </>
                ) : (
                  games?.map((game, idx) => (
                    <Card
                      {...game}
                      className="w-[100%]  h-[320px]"
                      key={idx}
                      onsavedSuccess={(id, state) => handleSavedSuccess(id, state)}
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            renderNoGamesMessage()
          )}
        </>
      )}
      {activetab === "Saved" && (
        <>
          {games?.filter((game) => game.savedUsers.some((user) => user.id === userData?.id))
            .length !== 0 ? (
            <>
              <div className="grid w-full grid-cols-1 gap-3 p-4 md:p-0 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  <>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </>
                ) : (
                  games
                    ?.filter((game) => game.savedUsers.some((user) => user.id === userData?.id))
                    .map((game, idx) => (
                      <Card
                        {...game}
                        className="w-[100%] max-w-[380px] h-[320px]"
                        key={idx}
                        onsavedSuccess={(id, state) => handleSavedSuccess(id, state)}
                      />
                    ))
                )}
              </div>
            </>
          ) : (
            renderNoGamesMessage()
          )}
        </>
      )}
      {activetab === "My Games" && (
        <>
          {myjob && Array.from(myjob).length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-3 p-4 md:p-0 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                myjob &&
                myjob?.map((job, idx) => (
                  <Card
                    {...job}
                    className="w-[100%] max-w-[380px] h-[320px]"
                    key={idx}
                    onChange={onChange}
                  />
                ))
              )}
            </div>
          ) : (
            renderNoGamesMessage()
          )}
        </>
      )}
    </Layout>
  )
}

export default GamesPage
