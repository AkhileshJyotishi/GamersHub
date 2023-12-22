// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as SliderImage, DotGroup, Dot, } from 'pure-react-carousel';
import React from "react"
import clsx from "clsx"
import { GetServerSideProps } from "next"

import { BackendGame } from "@/interface/games"
import { fetchWithoutAuthorization } from "@/utils/functions"

import GamePageHeader from "./GamePageHeader"
import Gamesection from "./Gamesection"
import Head from "next/head"



const Particularpage = ({ parsedgamesDetails }: { parsedgamesDetails: BackendGame }) => {
  // user,
  const { title, banner } = parsedgamesDetails
  // console.log(profileDataGameSection)
  return (
    <>
      <Head>
        <title>GameCreatorsHub | {title}</title>
      </Head>
      <div
        className={clsx(
          "absolute w-full ",
          ` bg-cover  bg-no-repeat bg-top`,
          "h-[490px]"
          // banner && banner
        )}
        // style={{backgroundImage:`url(${banner})`}}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3  w-full " style={{ zIndex: 19 }}>
        {/* profileData?.user?.profileImage ||  */}
        <GamePageHeader
          title={title}
          logoSrc={parsedgamesDetails.banner}
          userId={parsedgamesDetails.userId}
        />
        <Gamesection GameData={parsedgamesDetails} />
      </div>
    </>
  )
}

export default Particularpage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query
  const gameDetails = await fetchWithoutAuthorization(`/v1/game/${slug}`, "GET")

  if (gameDetails?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?emessage=${gameDetails.message}`,
        permanent: false,
      },
    }
  }
  // console.log(gameDetails?.data.game.gameAssets)
  const parsedgamesDetails: BackendGame = gameDetails?.data?.game

  return {
    props: {
      parsedgamesDetails,
    },
  }
}
