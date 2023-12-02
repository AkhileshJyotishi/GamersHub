import React, { useState } from "react"
import dynamic from "next/dynamic"
import { fetchData } from "@/utils/functions"

import Layout from "@/components/createGame/layout"
import { useSession } from "next-auth/react"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

// import { Editor } from "novel";

const CreateGame: React.FC = () => {
  interface GameInfo {
    title: string
    description: object | null
    banner: File | null | string
    platforms: string[]
    genre: string[]
    gameMode: string
    developerName: string
    developerType: string
    developerId: number | null
    distributionPlatforms: string[]
    tags: string[] | null
    // publisherName: string;
    releaseDate: string
    gameAssets: File[] | null | string[]
  }

  const [gameInfo, setGameInfo] = useState<GameInfo>({
    title: "", //title
    description: {},

    banner: null, //banner
    platforms: [], //platforms
    genre: [],
    gameMode: "",
    developerName: "",
    developerType: "",
    developerId: null,
    distributionPlatforms: [],
    tags: [], //tags
    // publisherName: "",
    releaseDate: "",
    gameAssets: null,
  })
  const session=useSession()
  const uploadGame = async () => {
    const storedContent = localStorage.getItem("novel__content")
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
    gameInfo.developerId = 11
    console.log(gameInfo)

    fetchData("v1/game/user", session.data?.user?.name as string, "POST", gameInfo)
  }

  return (
    <Layout gameInfo={gameInfo} setGameInfo={setGameInfo} uploadGame={uploadGame}>
      {/* Render the filterDetails here */}
      <>
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable
        />
      </>
    </Layout>
  )
}

export default CreateGame
