// import Editor from '@/components/NovalEditor';
import React from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"

import { BackendGame } from "@/interface/games"

import Carousel from "@/components/carousel"

import carousel from "@/components/carousel/carousel.module.css"
type OmittedProperties = "user" | "title" | "banner"
type Gamedataprop = Omit<BackendGame, OmittedProperties>

interface Section {
  title: string
  dataKey: string
  render: (data: Gamedataprop) => React.ReactNode
}
const Gamesection = ({ GameData }: { GameData: Gamedataprop }) => {
  // GameData.GameAssets
  const Editor = dynamic(() => import("@/components/NovalEditor"), {
    ssr: false,
    loading: () => {
      return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
    },
  })
  console.log("gamesection ",GameData.description)

  const SectionRenderer: React.FC<Section & { data: Gamedataprop }> = ({ title, data, render }) => (
    <div className="bg-background flex flex-col items-start rounded-xl gap-[12px] p-3 flex-wrap">
      <h3 className="mb-2 font-medium text-[18px]">{title}</h3>
      <div className="flex flex-wrap w-full gap-2">{render(data)}</div>
    </div>
  )
  const gameSections: Section[] = [
    {
      title: "Game Mode",
      dataKey: "gameMode",
      render: (data) => (
        <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
          {data?.gameMode}
        </span>
      ),
    },
    {
      title: "Release Date",
      dataKey: "releaseDate",
      render: (data) => (
        <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
          {new Date(data?.releaseDate).toDateString()}
        </span>
      ),
    },
    {
      title: "Developer",
      dataKey: "developer",
      render: (data) => (
        <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
          {data?.developer?.developerName}
        </span>
      ),
    },
    {
      title: "Platforms",
      dataKey: "platforms",
      render: (data) => (
        <div className="flex flex-wrap gap-2">
          {data?.platforms?.length > 0 &&
            data?.platforms?.map((platform, index) => (
              <span
                key={index}
                className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
              >
                {platform?.name}
              </span>
            ))}
        </div>
      ),
    },
    {
      title: "Tags",
      dataKey: "tags",
      render: (data) => (
        <div className="flex flex-wrap gap-2">
          {data?.tags?.length > 0 &&
            data?.tags?.map((tag, index) => (
              <span
                key={index}
                className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
              >
                {tag?.keyword}
              </span>
            ))}
        </div>
      ),
    },
    {
      title: "Genre",
      dataKey: "genre",
      render: (data) => (
        <div className="flex flex-wrap gap-2">
          {data?.genre?.length > 0 &&
            data?.genre?.map((genre, index) => (
              <span
                key={index}
                className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
              >
                {genre?.name}
              </span>
            ))}
        </div>
      ),
    },
    {
      title: "Distribution Platforms",
      dataKey: "distributionPlatforms",
      render: (data) => (
        <div className="flex flex-wrap gap-2">
          {data?.distributionPlatforms?.length > 0 &&
            data?.distributionPlatforms?.map((distributionPlatform, index) => (
              <span
                key={index}
                className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
              >
                {distributionPlatform?.name}
              </span>
            ))}
        </div>
      ),
    },
    // Add more sections as needed
  ]

  const GameDetails: React.FC<{ GameData: Gamedataprop }> = ({ GameData }) => (
    <>
      {gameSections?.length > 0 &&
        gameSections?.map((section, index) => (
          <SectionRenderer key={index} {...section} data={GameData} />
        ))}
    </>
  )

  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="text-[25px] font-bold flex-wrap">Game Description</div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex md:flex-row justify-center min-w-[200px] md:sticky top-[61px] h-fit flex-col"
          )}
        >
          <div className="flex-col min-w-[200px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px]  flex ">
            <GameDetails GameData={GameData} />
          </div>
        </div>
        <div className={clsx(" carousel-body w-[89vw] md:w-[60vw] lg:w-[70vw]", carousel["carousel-body"])}>
          <Carousel GameAssets={GameData?.gameAssets} />
        </div>
      </div>
      <div className="w-full">
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl "}
          editable={false}
          defaultValue={GameData.description ||{}}
        />
      </div>
    </div>
  )
}

export default Gamesection
