import React from "react"
import clsx from "clsx"

import { FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"
import MultipleFileInput from "../ui/multifileInput"

interface GameInfo {
  title: string
  description: object | null
  banner: File | null | string
  platforms: string[]
  genre: string[]
  gameMode: string
  developerName: string
  developerType: string
  distributionPlatforms: string[]
  tags: string[] | null
  // publisherName: string;
  releaseDate: string
  gameAssets: File[] | null | string[]
  developerId: number | null
}

interface LayoutProps {
  children: React.ReactNode
  gameInfo: GameInfo
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>
  uploadGame: () => Promise<void>
}

const Layout: React.FC<LayoutProps> = ({ children, gameInfo, setGameInfo, uploadGame }) => {
  const initialDetailsArray: FilterDetail[] = [
    {
      title: "Game Name",
      inputType: "text",
      placeholder: "what's your game called",
      value: gameInfo?.title || "",
      onChange: (value) => setGameInfo((prevState) => ({ ...prevState, title: value as string })),
      className: "bg-transparent rounded-md",
    },
    {
      inputType: "file",
      title: "Game Cover",
      accept: "image/*",
      multiple: false,
      value: null,
      onChange: (value) => setGameInfo((prevState) => ({ ...prevState, banner: value as File })),
      className: "",
    },
    {
      title: "Supported Platforms",
      inputType: "tags",
      placeholder: "platform",
      onTagsChange: (tags) => setGameInfo((prevState) => ({ ...prevState, platforms: tags })),
    },

    {
      title: "Genre",
      inputType: "tags",
      placeholder: "genres...",
      onTagsChange: (tags) => setGameInfo((prevState) => ({ ...prevState, genre: tags })),
    },
    {
      title: "Mode",
      inputType: "select",
      selectOptions: [
        {
          label: "Select Developer Type",
          value: "",
        },
        {
          label: "Indie",
          value: "indie",
        },
        {
          label: "Studio",
          value: "studio",
        },
        {
          label: "Collaboration",
          value: "collaboration",
        },
      ],
      value: gameInfo.gameMode,
      onChange: (value) =>
        setGameInfo((prevState) => ({
          ...prevState,
          gameMode: value as string,
        })),
    },

    {
      title: "Developer Name",
      inputType: "text",
      placeholder: "developer name",
      value: gameInfo.developerName,
      onChange: (value) =>
        setGameInfo((prevState) => ({
          ...prevState,
          developerName: value as string,
        })),
      className: "bg-transparent rounded-md",
    },
    {
      title: "Developer Type",
      inputType: "select",
      selectOptions: [
        {
          label: "Select Developer Type",
          value: "",
        },
        {
          label: "Indie",
          value: "indie",
        },
        {
          label: "Studio",
          value: "studio",
        },
        {
          label: "Collaboration",
          value: "collaboration",
        },
      ],
      value: gameInfo.developerType,
      onChange: (value) =>
        setGameInfo((prevState) => ({
          ...prevState,
          developerType: value as string,
        })),
    },
    {
      title: "Distribution platforms",
      inputType: "tags",
      placeholder: "distribution platforms...",
      // value: gameInfo.distributionPlatforms,
      onTagsChange: (value) =>
        setGameInfo((prevState) => ({
          ...prevState,
          distributionPlatforms: value,
        })),
    },
    {
      title: "Tags",
      inputType: "tags",
      placeholder: "Action, Shooting",
      onTagsChange: (tags) => setGameInfo((prevState) => ({ ...prevState, tags: tags })),
    },
    // {
    //     title: "Publisher name",
    //     inputType: "text",
    //     placeholder: "Publisher name",
    //     value: gameInfo.publisherName,
    //     onChange: (value) => setGameInfo((prevState) => ({
    //         ...prevState,
    //         publisherName: value as string
    //     })),
    //     className: 'bg-transparent rounded-md',

    // },
    {
      title: "Release date",
      inputType: "date",
      value: gameInfo.releaseDate,
      className: "bg-transparent rounded-md w-[50%]",
      onChange: (value) =>
        setGameInfo((prevState) => ({
          ...prevState,
          releaseDate: value as string,
        })),
    },
  ]

  return (
    <>
      <div className="flex gap-4 p-6 mt-3 w-[100%] mx-auto md:flex-row flex-col items-center md:items-start">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex md:flex-row justify-center min-w-[280px] md:sticky top-[61px] h-fit flex-col"
          )}
        >
          <div className="h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px] flex ">
            {initialDetailsArray?.map((filter, index) => (
              <Filter
                key={index}
                inputType={filter.inputType}
                title={filter.title}
                placeholder={filter.placeholder}
                value={filter.value}
                onChange={filter.onChange}
                selectOptions={filter.selectOptions}
                onTagsChange={filter.onTagsChange}
                className={filter.className}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
              />
            ))}

            <Button className="p-2 bg-secondary" onClick={() => uploadGame()}>
              Upload Game
            </Button>
            {/* <>{JSON.stringify(gameInfo)}</> */}
          </div>
        </div>
        {children}
      </div>
      <div className="flex gap-4 p-6 pt-0 mt-3 w-[100%] mx-auto md:flex-row flex-col items-center md:items-start flex-wrap">
        <div className="w-full bg-user_interface_2 py-[16px] px-[15px] ">
          {
            <MultipleFileInput
              onFileChange={(files) =>
                setGameInfo((prevState) => ({ ...prevState, gameAssets: files }))
              }
            />
          }
        </div>
      </div>
    </>
  )
}

export default Layout
