import React, { useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { BackendGame } from "@/interface/games"
import { fetchData } from "@/utils/functions"

import Layout from "@/components/createGame/layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})
interface GameInfo {
  title: string
  description: object | null
  banner: File | null | string
  platforms: string[]
  genre: string[]
  gameMode: string
  developerName: string
  developerType: string
  // developerId?: number | null
  distributionPlatforms: string[]
  tags: string[] | null
  // publisherName: string;
  releaseDate: string
  gameAssets: File[] | null | string[]
}
// import { Editor } from "novel";

const CreateGame = ({ game }: { game?: BackendGame }) => {
  console.log("latest error", game)
  const path = usePathname()

  const isUpdate = path.includes("updateGame")
  let initGameInfo

  if (isUpdate && game) {
    initGameInfo = {
      title: game?.title, //title
      description: game?.description,

      banner: game?.banner, //banner
      platforms: game?.platforms?.map((plat) => plat.name) ?? [], //platforms
      genre: game?.genre?.map((genre) => genre.name) ?? [],
      gameMode: game?.gameMode,
      developerName: game?.developer.developerName,
      developerType: game?.developer.developerType,
      // developerId: null,
      distributionPlatforms: game?.distributionPlatforms.map((dist) => dist.name),
      tags: game?.tags.map((tag) => tag.keyword), //tags
      // publisherName: "",
      releaseDate: game?.releaseDate,
      gameAssets: game?.gameAssets,
    }
  } else {
    initGameInfo = {
      title: "", //title
      description: {},

      banner: null, //banner
      platforms: [], //platforms
      genre: [],
      gameMode: "",
      developerName: "",
      developerType: "",
      // developerId: null,
      distributionPlatforms: [],
      tags: [], //tags
      // publisherName: "",
      releaseDate: "",
      gameAssets: null,
    }
  }

  const [gameInfo, setGameInfo] = useState<GameInfo>(initGameInfo)
  const session = useSession()
  // console.log("that is the path  ",path.includes("updatePost"),post)
  const uploadGame = async () => {
    const storedContent = localStorage.getItem("noval__content4")
    if (storedContent !== null) {
      gameInfo.description = JSON.parse(storedContent)
    }
    gameInfo.banner = "https://picsum.photos/id/250/900/900"
    gameInfo.releaseDate = new Date().toISOString()
    gameInfo.gameAssets = [
      "https://picsum.photos/id/250/900/900",
      "https://picsum.photos/id/250/900/900",
      "https://picsum.photos/id/250/900/900",
    ]
    // gameInfo.developerId = 11
    // delete gameInfo.developerId
    console.log(gameInfo)
    if (isUpdate) {
      fetchData(`v1/game/${game?.id}`, session.data?.user?.name as string, "PATCH", gameInfo)
    } else {
      fetchData("v1/game/user", session.data?.user?.name as string, "POST", gameInfo)
    }
  }

  return (
    <Layout gameInfo={gameInfo} setGameInfo={setGameInfo} uploadGame={uploadGame}>
      {/* Render the filterDetails here */}
      <>
        <h1 className="text-[22px] mt-4 font-semibold">Description</h1>
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable
          storageKey="noval__content4"
        />
      </>
    </Layout>
  )
}

export default CreateGame
