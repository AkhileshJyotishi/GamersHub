import React, { useEffect } from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

// import logo from "@/assets/image/logo-with-text.svg"
import logotextblackbg from "@/assets/image/text-black-bg.png"

import Img from "@/assets/image/profiles-slide-show.png"
import RightSVG from "@/assets/svg/chevron-right.svg"
import { getSession } from "@/lib/auth"
import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import Filter from "@/components/filter/mainfilter/filter"
import TalentSection from "@/components/home/banner"
import { OverlayBackground, OverlayContent, VideoBackground } from "@/components/home/home-hero"
import JobSection from "@/components/home/Jobs"
import CloseIcon from "@/components/icons/closeIcon"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card/card2"
import Modal from "@/components/ui/modal"
import { signOut } from "next-auth/react"

const HomePage = ({ users }: { users: IPostbackend[] }) => {
  const router = useRouter()
  // const { data: session } = useSession()
  const { logout, verify, message, emessage, data } = router.query
  const { verifyMail, verifyModal, setVerifyMail, setVerifyModal } = useUserContext()
  useEffect(() => {
    // console.log("thse post are to  be mapped  ", users)

    // console.log("router ", router.query)
    if (logout && logout === "true") {
      // toast("Force logging out")
      signOut({
        callbackUrl: "/",
      })

      router.replace("/", undefined, { shallow: true })
    }
    if (verify && verify == "true") {
      setVerifyModal(true)
      router.replace("/", undefined, { shallow: true })
    }
    if (message) {
      toast.success(message)
      router.replace("/", undefined, { shallow: true })
    }
    if (emessage) {
      toast.error(emessage)
      router.replace("/", undefined, { shallow: true })
    }
    if (data) {
      setVerifyMail((data as string) ?? "")
    }
  }, [verify, logout, router])

  const verifyEmail = async () => {
    const res = await fetchWithoutAuthorization("/v1/auth/send-verification-email", "POST", {
      email: verifyMail,
    })
    setVerifyMail("")
    setVerifyModal(false)
    if (res?.error) {
      toast.error((res.error?.response?.data?.message || "Request failed") ?? res?.message)
      return
    }
    toast.success(res?.message)
  }

  return (
    <>
      <Head>
        <title>GameCreatorsHub | Home</title>
      </Head>
      <Modal isOpen={verifyModal} onClose={() => setVerifyModal(false)} className="">
        <div className="bg-[#18181c] text-center text-[#bebec2] p-[15px] rounded-3xl flex flex-col gap-3">
          <div
            className="relative flex w-full bg-transparent rounded-md h-[19px]"
            onClick={() => setVerifyModal(false)}
          >
            <CloseIcon className="absolute right-0 cursor-pointer fill-light hover:fill-secondary flex-end" />
          </div>
          <div className="flex justify-center w-full h-[25px] relative">
            <Image
              src={logotextblackbg}
              width={200}
              height={25}
              alt="Game Creators Hub"
              onClick={() => {
                router.push("/")
                setVerifyMail("")
                setVerifyModal(false)
              }}
              className="cursor-pointer"
            />
          </div>
          <Filter
            key={"input"}
            inputType={"text"}
            title={"Verify your Email"}
            placeholder={""}
            value={verifyMail}
            onChange={(value) => setVerifyMail(value as string)}
            className={"bg-transparent rounded-md"}
            Variant="flex flex-col items-start gap-[10px] text-[14px] "
          />

          {/* Verify your Email */}
          <Button
            className="border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl w-[40%] mx-auto mt-1"
            onClick={() => verifyEmail()}
          >
            Send Mail
          </Button>
        </div>
      </Modal>
      {/* <VideoBackground videoSource="https://uploads-ssl.webflow.com/619bb8aeb704b2a91db4da59/619bb8aeb704b24e2ab4db00_ivs_hero_video-transcode.webm" /> */}
      <OverlayBackground />
      <div className="relative top-0">
        <OverlayContent />

        <div className="flex flex-wrap justify-center gap-16 mt-10 text-center mx-14">
          {users?.map((data, index) => {
            return (
              <Card
                key={index}
                username={data.user.username}
                userId={data.userId}
                userProfilePhoto={data.user.profileImage}
                coverPhoto={data.banner}
                matureContent={data.matureContent}
                // location={data.location}
                // views={data.views}
                className="w-[60vw] sm:w-[280px] lg:w-[300px] h-[350px]"
                id={data.id}
                title={data.title}
                likedPost={data?.postLikes?.likedUsers.map((like) => like) ?? []}
                savedPost={data.savedUsers && data?.savedUsers?.length > 0 ? data?.savedUsers : []}
              />
            )
          })}
        </div>
        {/* 
        <Button
          className="
                        bg-user_interface_3 hover:bg--user_interface_2 active:bg--user_interface_2 text-text  
                        font-medium px-[30px] py-[10px] rounded-[10px] flex items-center justify-center w-fit mt-16 mx-auto"
          variant="secondary"
        >
          Load More
        </Button> */}
        <JobSection />
        <TalentSection Img={Img} RightSVG={RightSVG} />
        {/* <Example /> */}
      </div>
    </>
  )
}

export default HomePage
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let users
  if (session) {
    users = await fetchData(`/v1/post/?skip=5`, session.user?.name as string, "GET")
  } else {
    users = await fetchWithoutAuthorization("/v1/post/", "GET")
  }

  if (users?.error) {
    // toast.error(jobsDetails.message)
    // return {
    //   redirect: {
    //     destination: `/?emessage=${users.message}`,
    //     permanent: false,
    //   },
    // }
    return {
      props: {
        users: [],
      },
    }
  }
  users = users?.data?.posts
  // console.log("home page ", users)
  // const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

  return {
    props: {
      users,
    },
  }
}
