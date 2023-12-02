// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as SliderImage, DotGroup, Dot, } from 'pure-react-carousel';
import React from "react"
import clsx from "clsx"

import { BackendGame } from "@/interface/games"

import GamePageHeader from "./GamePageHeader"
import Gamesection from "./Gamesection"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"
// import JobPageHeader from './jobPageHeader'
// import Jobsection from './jobsection'

//  website locaation
const GameData: BackendGame = {
  id: 1,
  title: "Example Game",
  description: "This is an example game.",
  banner:
    "bg-[url(https://cdnb.artstation.com/p/recruitment_companies/headers/000/003/159/thumb/ArtStation_Header.jpg)]",
  developerId: 1,
  gameMode: "singlePlayer",
  releaseDate: "2023-11-10T00:00:00.000Z",
  userId: 1,
  slug: "8f7c3334-ac5c-4ead-9f0c-84af6baffc1b",
  platforms: [
    {
      name: "Windows",
    },
    {
      name: "PlayStation",
    },
    {
      name: "Xbox",
    },
  ],
  tags: [
    {
      keyword: "example",
    },
    {
      keyword: "gaming",
    },
  ],
  developer: {
    developerName: "Example Developer",
    developerType: "studio",
  },
  genre: [
    {
      name: "Adventure",
    },
    {
      name: "Action",
    },
  ],
  distributionPlatforms: [
    {
      name: "Steam",
    },
    {
      name: "Epic Games Store",
    },
  ],
  GameAssets: [
    "https://picsum.photos/id/244/900/900",
    "https://picsum.photos/id/244/900/900",
    "https://picsum.photos/id/244/900/900",
  ],
}

const Particularpage = ({parsedgamesDetails}:{parsedgamesDetails:BackendGame}) => {
  // user,
  const { title, banner, ...profileDataGameSection } = parsedgamesDetails
  // console.log(profileDataGameSection)
  return (
    <>
      <div
        className={clsx(
          "absolute w-full ",
          ` bg-cover  bg-no-repeat bg-top`,
          "h-[490px]",
          banner && banner
        )}
      >
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3 z-20 w-full ">
        {/* profileData?.user?.profileImage ||  */}
        <GamePageHeader title={title} logoSrc={"https://picsum.photos/id/250/900/900"} />
        <Gamesection GameData={profileDataGameSection} />
      </div>
    </>
  )
}

export default Particularpage

export const getServerSideProps: GetServerSideProps = async ({ req, res ,query}) => {
  const {slug}=query
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let gameDetails=await fetchWithoutAuthorization(`/v1/game/${slug}`,"GET");


  if (gameDetails?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?error=${gameDetails.message}`,
        permanent: false,
      },
    }
  }
  console.log(gameDetails?.data.game.gameAssets)
  const parsedgamesDetails: BackendGame = gameDetails?.data?.game

  return {
    props: {
      parsedgamesDetails,
    },
  }
}
