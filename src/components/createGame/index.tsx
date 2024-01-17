import React, { useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { BackendGame, CustomGameTags, GameInfo } from "@/interface/games"
import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchFile } from "@/utils/functions"

import Layout from "@/components/createGame/layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})

// import { Editor } from "novel";

const CreateGame = ({
  game,
  customGameTags,
}: {
  game?: BackendGame
  customGameTags?: CustomGameTags
}) => {
  // console.log("latest error", game)
  const path = usePathname()
  const router = useRouter()
  // console.log("[ath", path)

  let isUpdate = false
  if (path) isUpdate = path.includes("updateGame")
  let initGameInfo

  if (isUpdate && game) {
    initGameInfo = {
      title: game?.title, //title
      description: game?.description,

      banner: game?.banner, //banner
      platforms: game?.platforms?.map((plat) => plat.name) ?? [], //platforms
      genre: game?.genre?.map((genre) => genre.name) ?? [],
      gameMode: game?.gameMode,
      developerName: game?.developer?.developerName,
      developerType: game?.developer?.developerType,
      // developerId: null,
      distributionPlatforms: game?.distributionPlatforms?.map((dist) => dist.name),
      tags: game?.tags?.map((tag) => tag.keyword), //tags
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
      gameAssets: [],
    }
  }
  const [gameInfo, setGameInfo] = useState<GameInfo>(initGameInfo)
  const [oldAssets, setoldAssets] = useState((initGameInfo?.gameAssets ?? []) as string[])

  const session = useSession()
  // const router=useRouter()
  const { setLoading } = useUserContext()
  // console.log("that is the path  ",path.includes("updatePost"),post)
  const uploadGame = async () => {
    setLoading(true)
    const storedContent = localStorage.getItem("noval__content4")
    if (storedContent !== null) {
      gameInfo.description = JSON.parse(storedContent)
    }
    const formdata = new FormData()

    formdata.append("file", gameInfo.banner as Blob)
    formdata.append("type", "games")

    // console.log("jobInfo.banner ", gameInfo.banner)
    if (gameInfo.banner && typeof gameInfo.banner == "object") {
      const isuploaded = await fetchFile(
        "/v1/upload/file",
        session?.data?.user?.name as string,
        "POST",
        formdata
      )
      if (isuploaded?.error) {
        toast.dismiss()
        toast.error("Error uploading banner")
        setLoading(false)
        return
      }
      gameInfo.banner = isuploaded?.data.image.Location
    } else {
      if (!gameInfo.banner) {
        gameInfo.banner = ""
      }
    }
    gameInfo.releaseDate = new Date().toISOString()
    const formdata2 = new FormData()

    let uploadKey: string
    if (gameInfo.gameAssets && !!gameInfo.gameAssets.length && gameInfo.gameAssets.length == 1) {
      uploadKey = "file"
    } else {
      uploadKey = "files"
    }
    gameInfo.gameAssets?.map((game) => {
      formdata2.append(uploadKey, game as Blob)
    })
    formdata2.append("type", "games")
    const newArray: string[] = []
    if (
      gameInfo.gameAssets &&
      gameInfo.gameAssets.every((asset) => typeof asset === "object") &&
      gameInfo.gameAssets?.length > 0
    ) {
      let route
      if (gameInfo.gameAssets.length == 1) {
        route = "/v1/upload/file"
        const multiisuploaded = await fetchFile(
          route,
          session?.data?.user?.name as string,
          "POST",
          formdata2
        )
        if (multiisuploaded?.error) {
          toast.dismiss()

          toast.error("Error uploading assets")
          setLoading(false)
          return
        } else {
          gameInfo.gameAssets = []
          // console.log(multiisuploaded?.data.image[0])
          newArray.push(multiisuploaded?.data.image.Location)
        }
      } else {
        route = "/v1/upload/multiple"
        const multiisuploaded = await fetchFile(
          route,
          session?.data?.user?.name as string,
          "POST",
          formdata2
        )
        if (multiisuploaded?.error) {
          toast.dismiss()

          toast.error("Error uploading assets")
          setLoading(false)
          return
        } else {
          gameInfo.gameAssets = []
          // console.log(multiisuploaded?.data.image[0])
          gameInfo.gameAssets = multiisuploaded?.data?.image?.map((loc: Allow) => {
            newArray.push(loc.Location)
          })
        }
      }
    } else {
      gameInfo.gameAssets = []
    }
    gameInfo.gameAssets = [...newArray, ...oldAssets]
    let data
    if (isUpdate) {
      data = await fetchData(
        `v1/game/${game?.id}`,
        session.data?.user?.name as string,
        "PATCH",
        gameInfo
      )
    } else {
      data = await fetchData("v1/game/user", session.data?.user?.name as string, "POST", gameInfo)
    }
    if (data?.error) {
      setLoading(false)
      toast.error(data?.message)
      return
    }
    toast.dismiss()

    toast.success(data?.message)
    setLoading(false)
    router.push("/games")
  }

  return (
    <Layout
      gameInfo={gameInfo}
      setGameInfo={setGameInfo}
      uploadGame={uploadGame}
      oldAssets={oldAssets}
      setoldAssets={setoldAssets}
      isUpdate={isUpdate}
      customGameTags={customGameTags}
    >
      {/* Render the filterDetails here */}
      <>
        <h1 className="text-[22px] mt-4 font-semibold">Description</h1>
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable
          storageKey="noval__content4"
          defaultValue={isUpdate ? gameInfo.description || {} : {}}
        />
      </>
    </Layout>
  )
}

export default CreateGame
