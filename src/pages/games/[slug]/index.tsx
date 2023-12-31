// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as SliderImage, DotGroup, Dot, } from 'pure-react-carousel';
import React from "react"
import clsx from "clsx"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { BackendGame } from "@/interface/games"
import { fetchWithoutAuthorization } from "@/utils/functions"

import GamePageHeader from "@/components/ParticularGame/Head"
import Gamesection from "@/components/ParticularGame/Section"

const Particularpage = ({ parsedgamesDetails }: { parsedgamesDetails: BackendGame }) => {
  // user,
  const { title, banner, id, savedUsers } = parsedgamesDetails
  // console.log(profileDataGameSection)
  return (
    <>
      <Head>
        <title>GameCreators | {title}</title>
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
        <Image
          alt=""
          src={banner || defaultbannerImage}
          height={500}
          width={900}
          className="h-[490px] absolute w-full bg-cover  bg-no-repeat bg-top"
        />
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div
        className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3  w-full "
        style={{ zIndex: 19 }}
      >
        <GamePageHeader
          title={title}
          logoSrc={parsedgamesDetails.banner}
          userId={parsedgamesDetails.userId}
          jobId={id}
          savedUsers={savedUsers}
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
