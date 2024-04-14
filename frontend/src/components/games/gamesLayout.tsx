// import { BannerComponent } from '@/components/filter/filterbanner'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { FilterDetail } from "@/interface/filter"
import { BackendGame, Games, GamesFilterProps } from "@/interface/games"
import { useUserContext } from "@/providers/user-context"
import {
  convertToGamesInterface,
  fetchWithoutAuthorization,
  generateQueryParams,
} from "@/utils/functions"

import BannerComponent from "@/components/filter/filterbanner"
import PlusIcon from "@/components/icons/plus"
import TabButtons from "@/components/NewtabButtons"
import Button from "@/components/ui/button"

import { DesktopFilter, FilterMobileDialog } from "../filter"

interface gamesLayoutProps {
  children: React.ReactNode
  games: Games[] | null
  setGames: React.Dispatch<React.SetStateAction<Games[] | null>>
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading?: boolean
  gamePlatformsSuggestions: string[]
  genresSuggestions: string[]
  tagSuggestions: string[]
}
const Layout: React.FC<gamesLayoutProps> = ({
  children,
  setActiveTab,
  activeTab,
  games,
  setGames,
  setLoading,
  loading,
  gamePlatformsSuggestions,
  genresSuggestions,
  tagSuggestions,
}) => {
  const router = useRouter()
  const [popup, setPopup] = useState<boolean>(false)
  const { setIsLoginModalOpen, userData } = useUserContext()
  const { data: session } = useSession()
  const initFilters = {
    tags: [],
    platforms: [],
    genre: [],
    developerType: [],
    gameMode: [],
  }
  const clearFilters = () => {
    setGamesFilter(initFilters)
    setGames(games)
  }

  const [gamesFilters, setGamesFilter] = useState<GamesFilterProps>(initFilters)

  const filterArray2: FilterDetail[] = [
    {
      inputType: "tags",
      title: "Platforms",
      value: gamesFilters.platforms,
      onTagsChange: (value) =>
        setGamesFilter((prev) => ({ ...prev, platforms: value as string[] })),
      placeholder: "Ex:Linux, Windows..",
      selectOptions: [
        // {
        //   label: "Select platform",
        //   value: "",
        // },
        ...(gamePlatformsSuggestions ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },
    {
      inputType: "tags",
      title: "Genre",
      placeholder: "Ex:Horror, Racing..",
      value: gamesFilters.genre,

      onTagsChange: (value) => setGamesFilter({ ...gamesFilters, genre: value as string[] }),
      selectOptions: [
        // {
        //   label: "Select genre",
        //   value: "",
        // },
        ...(genresSuggestions ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },
    {
      inputType: "checkbox",
      title: "Developer Type",
      value: gamesFilters.developerType,
      onChange: (value) => setGamesFilter({ ...gamesFilters, developerType: value as string[] }),
      selectOptions: [
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
    },
    {
      inputType: "checkbox",
      title: "Game Mode",
      value: gamesFilters.gameMode,
      onChange: (value) => setGamesFilter({ ...gamesFilters, gameMode: value as string[] }),
      selectOptions: [
        // {
        //   label: "Select mode",
        //   value: "",
        // },
        {
          label: "Single Player",
          value: "singlePlayer",
        },
        {
          label: "Multi Player",
          value: "multiPlayer",
        },
      ],
    },
    {
      inputType: "tags",
      title: "Softwares...",
      value: gamesFilters.tags,
      onTagsChange: (value) => setGamesFilter({ ...gamesFilters, tags: value as string[] }),
      placeholder: "Eg: Valorant, 3D",
      className: "mt-2 bg-transparent rounded-md",
      selectOptions: [
        ...tagSuggestions.map((suggestion) => ({ label: suggestion, value: suggestion })),
      ],
    },
  ]

  const searchWithFilters = async () => {
    const gamesFiltersParams = generateQueryParams(gamesFilters)
    setLoading(true)
    let x
    if (activeTab == "My Games") {
      x = await fetchWithoutAuthorization(
        `v1/game/user/${userData?.id}?${gamesFiltersParams}`,
        "GET"
      )
    } else {
      x = await fetchWithoutAuthorization(`v1/game/?${gamesFiltersParams}`, "GET")
    }

    setLoading(false)
    toast.dismiss()
    if (x?.error) {
      toast.error(x.message)
    } else {
      const filt = x?.data.games.map((mp: BackendGame) => convertToGamesInterface(mp))
      setGames(filt)
    }
  }
  useEffect(() => {
    setLoading(false)
    setGamesFilter(initFilters)
  }, [activeTab])
  return (
    <>
      <BannerComponent
        className={"w-[100%] py-[52px] text-center bg-user_interface_3 mx-auto"}
        bannerText={
          <>
            Expand your portfolio to show off to potential recruiters, <br />
            also have a place to display your work
          </>
        }
        bannerTitle={
          <>
            A Showcase of Our Community's <span className="text-secondary"> Games</span>
          </>
        }
      />

      <div className="mt-[45px] sm:px-[60px] w-[100%] mx-auto items-center ">
        <div className="flex flex-col items-center justify-between sm:flex-row ">
          <TabButtons
            tabNames={["All", "Saved", "My Games"]}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          {userData && (
            <Button
              onClick={() => {
                if (session) router.push(`/${userData?.id}/profile/portfolio/createGame`)
                else {
                  setIsLoginModalOpen(true)
                }
              }}
              // variant="primary"
              className=" flex flex-row items-center justify-center w-[80%] mt-5 md:w-fit h-fit sm:mt-0 bg-secondary py-[10px] px-[25px] rounded-xl"
            >
              <span className="text-sm">Add Game</span>
              <PlusIcon className="w-6 h-4 sm:h-6" />
            </Button>
          )}
        </div>
      </div>
      <div className="mt-[45px] sm:px-[60px] w-[80%] sm:w-full mx-auto flex items-center flex-wrap gap-5">
        <Button
          onClick={() => {
            setPopup(!popup)
          }}
          className="flex gap-2 px-3 m-auto border-2 border-green-900 text-secondary rounded-3xl md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 117.824"
            fill="none"
            stroke="green"
            className="w-4 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
              d="M122.774,16.459L122.774,16.459c0,5.393-4.412,9.805-9.805,9.805H92.202 c1.457-2.919,2.278-6.212,2.278-9.697c0-3.571-0.861-6.941-2.387-9.913h20.876C118.362,6.654,122.774,11.066,122.774,16.459 L122.774,16.459z M89.306,101.257c0,9.15-7.418,16.567-16.568,16.567s-16.567-7.417-16.567-16.567 c0-9.149,7.417-16.567,16.567-16.567S89.306,92.107,89.306,101.257L89.306,101.257z M122.869,101.148L122.869,101.148 c0,5.393-4.413,9.805-9.806,9.805H92.202c1.457-2.919,2.278-6.212,2.278-9.696c0-3.571-0.861-6.941-2.387-9.913h20.97 C118.457,91.344,122.869,95.756,122.869,101.148L122.869,101.148z M53.272,110.953H9.816c-5.393,0-9.805-4.412-9.805-9.805l0,0 c0-5.393,4.412-9.805,9.805-9.805h43.565c-1.525,2.972-2.387,6.342-2.387,9.913C50.994,104.741,51.815,108.034,53.272,110.953 L53.272,110.953z M28.326,58.717c0,9.149,7.418,16.567,16.568,16.567c9.149,0,16.567-7.418,16.567-16.567 c0-9.15-7.418-16.568-16.567-16.568C35.744,42.148,28.326,49.566,28.326,58.717L28.326,58.717z M0,58.608L0,58.608 c0,5.393,4.414,9.805,9.805,9.805h15.675c-1.457-2.92-2.278-6.169-2.278-9.696c0-3.528,0.861-6.941,2.387-9.914H9.805 C4.412,48.803,0,53.215,0,58.608L0,58.608z M64.409,68.413h48.666c5.392,0,9.805-4.412,9.805-9.805l0,0 c0-5.394-4.412-9.806-9.805-9.806H64.301c1.525,2.973,2.387,6.386,2.387,9.914C66.688,62.244,65.866,65.493,64.409,68.413 L64.409,68.413z M89.306,16.567c0,9.15-7.418,16.567-16.568,16.567S56.17,25.718,56.17,16.567C56.17,7.417,63.587,0,72.737,0 S89.306,7.417,89.306,16.567L89.306,16.567z M53.272,26.264H9.853c-5.393,0-9.805-4.413-9.805-9.805l0,0 c0-5.393,4.412-9.805,9.805-9.805h43.528c-1.525,2.972-2.387,6.342-2.387,9.913C50.994,20.052,51.815,23.345,53.272,26.264 L53.272,26.264z"
            />
          </svg>
          <div className="mt-[10px]">Filters</div>
        </Button>
      </div>
      <div className="flex gap-4 p-4 mt-3 w-[100%] mx-auto justify-center">
        <DesktopFilter
          className={"hidden md:flex"}
          key={1}
          clearFilters={clearFilters}
          Filters={gamesFilters}
          setFilters={setGamesFilter}
          FilterArray={filterArray2}
          searchWithFilters={searchWithFilters}
          loading={loading}
        />
        <FilterMobileDialog
          clearFilters={clearFilters}
          Filters={gamesFilters}
          setFilters={setGamesFilter}
          popup={popup}
          setPopup={setPopup}
          FilterArray={filterArray2}
          searchWithFilters={searchWithFilters}
          loading={loading}
        />
        {children}
      </div>
    </>
  )
}

export default Layout
