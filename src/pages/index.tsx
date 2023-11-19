import React, { useEffect } from "react"
import { useRouter } from "next/router"

import Img from "@/assets/image/profiles-slide-show.png"
import RightSVG from "@/assets/svg/chevron-right.svg"

import TalentSection from "@/components/home/banner"
import { OverlayBackground, OverlayContent, VideoBackground } from "@/components/home/home-hero"
import JobSection from "@/components/home/Jobs"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card/card2"
const HomePage = () => {
  const router = useRouter()

  const { logout } = router.query

  useEffect(() => {
    if (logout && logout === "true") {
      // toast("Force logging out")
      // signOut();

      router.replace("/", undefined, { shallow: true })
    }
  }, [logout, router])

  const cardData = [
    {
      username: "John Doe",
      userProfilePhoto: "https://picsum.photos/200/300",
      coverPhoto: "https://picsum.photos/id/249/900/900",
      matureContent: true,
      location: "New York, USA",
      views: "1,234",
    },
    {
      username: "Alice Smith",
      userProfilePhoto: "https://picsum.photos/200/301",
      coverPhoto: "https://picsum.photos/id/250/900/900",
      matureContent: true,

      location: "Los Angeles, USA",
      views: "2,345",
    },
    {
      username: "Bob Johnson",
      userProfilePhoto: "https://picsum.photos/200/302",
      coverPhoto: "https://picsum.photos/id/251/900/900",
      matureContent: true,

      location: "Chicago, USA",
      views: "3,456",
    },
    {
      username: "Eve Williams",
      userProfilePhoto: "https://picsum.photos/200/303",
      coverPhoto: "https://picsum.photos/id/252/900/900",
      matureContent: true,

      location: "San Francisco, USA",
      views: "4,567",
    },
    {
      username: "Michael Brown",
      userProfilePhoto: "https://picsum.photos/200/304",
      coverPhoto: "https://picsum.photos/id/253/900/900",
      matureContent: true,

      location: "Miami, USA",
      views: "5,678",
    },
    {
      username: "Sophia Lee",
      userProfilePhoto: "https://picsum.photos/200/305",
      matureContent: true,
      coverPhoto: "https://picsum.photos/id/254/900/900",
      location: "Seattle, USA",
      views: "6,789",
    },
    {
      username: "William Davis",
      matureContent: true,
      userProfilePhoto: "https://picsum.photos/200/306",
      coverPhoto: "https://picsum.photos/id/255/900/900",
      location: "Houston, USA",
      views: "7,890",
    },
  ]
  // const searchParams = useSearchParams();
  // const param=URLsea
  // useEffect(() => {
  //   if (searchParams.get("error")) {
  //     toast.error(searchParams.get("error"))
  //     // searchParams.delete();

  //   }
  // })
  return (
    <>
      <VideoBackground videoSource="https://uploads-ssl.webflow.com/619bb8aeb704b2a91db4da59/619bb8aeb704b24e2ab4db00_ivs_hero_video-transcode.webm" />
      <OverlayBackground />
      <div className="relative top-0">
        <OverlayContent />

        <div className="flex flex-wrap justify-center gap-16 mt-10 text-center mx-14">
          {cardData.map((data, index) => (
            <Card
              key={index}
              username={data.username}
              userProfilePhoto={data.userProfilePhoto}
              coverPhoto={data.coverPhoto}
              matureContent={data.matureContent}
              // location={data.location}
              // views={data.views}
              className="w-[320px] h-[350px]"
            />
          ))}
        </div>

        <Button
          className="
                        bg-user_interface_3 hover:bg--user_interface_2 active:bg--user_interface_2 text-text  
                        font-medium px-[30px] py-[10px] rounded-[10px] flex items-center justify-center w-fit mt-16 mx-auto"
          variant="secondary"
        >
          Load More
        </Button>

        <JobSection />
        <TalentSection Img={Img} RightSVG={RightSVG} />
        {/* <Example /> */}
      </div>
    </>
  )
}

export default HomePage
