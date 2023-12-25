import React from "react"

import Button from "../ui/button"
import { useUserContext } from "@/providers/user-context"

interface VideoBackgroundProps {
  videoSource: string
}

export const OverlayBackground = () => {
  return <div className="w-full h-screen absolute top-0 bg-[#00000080]"></div>
}

export const OverlayContent: React.FC = () => {
  const { setIsRegisterModalOpen } = useUserContext()
  return (
    <div className="relative top-0 flex flex-col items-start pt-[25vh] w-full h-screen px-[5vw] justify-start">
      <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl xl:text-7xl">
        The Ultimate Platform
        <br />
        for
        <span className="text-secondary_2"> Game Creators</span>
      </h1>
      <h2 className="text-lg md:text-[22px] font-medium text-user_interface_6 mt-[16px]">
        Find Talent, Jobs, and Inspiration
      </h2>
      <Button
        className="mt-8 md:mt-[86px] bg-secondary_2 py-[10px] px-[30px] font-medium rounded-xl"
        onClick={() => {
          setIsRegisterModalOpen(true)
        }}
      >
        Get Started
      </Button>
    </div>
  )
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSource }) => {
  return (
    <div className="absolute top-0 object-cover w-full h-screen">
      {/* poster="video-poster.jpg" */}
      <video autoPlay loop muted className="object-cover w-full h-full">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
