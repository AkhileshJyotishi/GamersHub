import React, { useEffect, useState } from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { toast } from "react-toastify"

import Img from "@/assets/image/profiles-slide-show.png"
import logotextblackbg from "@/assets/image/text-black-bg.png"
import image from "@/assets/image/void.svg"
import RightSVG from "@/assets/svg/chevron-right.svg"
import scrollData from "@/data/imageScroll.json"
import { ArticleProps, INews } from "@/interface/news"
import { getSession } from "@/lib/auth"
import { FrontendCompatibleObject } from "@/pages/jobs"
import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import Filter from "@/components/filter/mainfilter/filter"
import TalentSection from "@/components/home/banner"
import { OverlayContent } from "@/components/home/home-hero"
// import { OverlayBackground, OverlayContent, VideoBackground } from "@/components/home/home-hero"
import JobSection from "@/components/home/Jobs"
import { Banner } from "@/components/horizontalScroll"
import CloseIcon from "@/components/icons/closeIcon"
import Card from "@/components/jobs/Old-GCH-card"
import ProfileCard from "@/components/newPostCard"
import GeneralizedComponent from "@/components/news/NewsCard"
import TabButtons from "@/components/tabbuttons"
import Button from "@/components/ui/button"
// import Card from "@/components/ui/card/card2"
import Modal from "@/components/ui/modal"

const HomePage = ({
  news,
  jobs,
  postsExplore,
  postsTrending,
  postsFollowing,
  postsSaved,
  users,
}: {
  users: Allow
  jobs: Job[]
  news: ArticleProps[]
  postsExplore: IHomePostResponse[]
  postsTrending: IHomePostResponse[]
  postsFollowing: IHomePostResponse[]
  postsSaved: IHomePostResponse[]
}) => {
  const router = useRouter()
  // const { data: session } = useSession()
  const { logout, verify, message, emessage, data } = router.query
  const { verifyMail, verifyModal, setVerifyMail, setVerifyModal } = useUserContext()
  const { data: session } = useSession()
  const [activeTab, setactiveTab] = useState(session ? "Explore" : "-1")
  const [, setforcererender] = useState(false)
  const HomeTabs = ["Explore", "Trending", "Following", "Saved"]
  useEffect(() => {
    if (logout && logout === "true") {
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
      toast.dismiss()
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
      toast.dismiss()
      toast.error((res.error?.response?.data?.message || "Request failed") ?? res?.message)
      return
    }
    toast.success(res?.message)
  }
  const renderPosts = (activeTab: string) => {
    let postsToRender: Allow = []

    switch (activeTab) {
      case "Explore":
        postsToRender = postsExplore
        break
      case "Trending":
        postsToRender = postsTrending
        break
      case "Following":
        postsToRender = postsFollowing
        break
      case "Saved":
        postsToRender = postsSaved
        break
      default:
        postsToRender = users

        break
    }
    return postsToRender.length > 0 ? (
      (postsToRender as IHomePostResponse[]).map((data, index) => (
        <ProfileCard
          key={index}
          username={data.user.username}
          userId={data.userId}
          userProfilePhoto={data.user.profileImage}
          bannerImage={data.banner}
          matureContent={data.matureContent}
          id={data.id}
          title={data.title}
          likedPost={data?.postLikes?.likedUsers.map((like) => like) ?? []}
          savedPost={data.savedUsers && data?.savedUsers?.length > 0 ? data?.savedUsers : []}
        />
      ))
    ) : (
      <>
        <div className="hidden xl:block"></div>
        <div className=" flex-col flex gap-10 mt-4">
          <h3 className="text-3xl font-bold text-dull">No Posts yet.</h3>
          <Image width={2060} height={2060} alt={""} className="w-[200px] mx-auto " src={image} />
        </div>
      </>
    )
  }
  useEffect(() => {
    setforcererender((prev) => !prev)
  }, [])
  return (
    <>
      <Head>
        <title>GameCreators | Home</title>
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
              alt=""
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

          <Button
            className="border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl w-[40%] mx-auto mt-1"
            onClick={() => verifyEmail()}
          >
            Send Mail
          </Button>
        </div>
      </Modal>
      {/* <VideoBackground videoSource="https://uploads-ssl.webflow.com/619bb8aeb704b2a91db4da59/619bb8aeb704b24e2ab4db00_ivs_hero_video-transcode.webm" /> */}
      {/* <OverlayBackground /> */}
      <div className="relative top-0">
        <OverlayContent />
        <Banner images={scrollData} speed={5000} />

        {!!news.length && <GeneralizedComponent articles={news} />}

        <div className=" flex flex-wrap flex-col mt-10 text-center w-[90%] mx-auto rounded-xl p-1 md:p-8">
          {/* <div className=" w-[90%] sm:w-fit font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-10 p-3  mt-[20px] "> */}
          {/* <Tab tabs={HomeTabs} activeTab={activeTab} setactiveTab={setactiveTab} /> */}
          {session ? (
            <div className="mt-[45px]  w-[90vw] sm:w-[70vw] md:w-[80vw] mx-auto flex  items-center justify-center rounded-xl">
              <TabButtons
                tabNames={HomeTabs}
                setActiveTab={setactiveTab}
                activeTab={activeTab}
                className="flex-nowrap relative overflow-x-scroll no-scrollbar !text-[22px]"
                tabColors="!bg-transparent"
                seperator={false}
              />
            </div>
          ) : (
            <>
              <div className=" text-3xl sm:text-4xl font-[800] break-words p-4  tracking-wider">
                Showcase your <span className=" text-secondary">Portfolio</span> to the World
              </div>
              <div className="text-text_dull text-lg sm:text-xl">
                {" "}
                Connect with the best community of game creators
              </div>
              <Button
                className="transition-all px-6 py-2 rounded-lg hover:opacity-90 flex  sm:text-sm md:text-md bg-secondary w-fit mx-auto my-4"
                onClick={() => {}}
              >
                Portfolio
              </Button>
            </>
          )}

          <div className="grid   my-4  sm:p-4  md:grid-cols-2 xl:grid-cols-3  gap-[20px] 3xl:grid-cols-4">
            {renderPosts(activeTab)}
          </div>
        </div>

        <div className=" flex flex-wrap flex-col mt-10 text-center w-[90%] mx-auto rounded-xl p-1 md:p-8">
          {/* <div className=" w-[90%] sm:w-fit font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-10 p-3  mt-[20px] "> */}
          {/* <Tab tabs={HomeTabs} activeTab={activeTab} setactiveTab={setactiveTab} /> */}
          {jobs && !!jobs.length && (
            <>
              <div className=" text-3xl sm:text-4xl font-[800] break-words p-4  tracking-wider">
                Find your Dream <span className=" text-secondary">Career</span>
              </div>
              <div className="text-text_dull text-lg sm:text-xl">
                {" "}
                Find your dream career, whether full time, freelance or collabration project you can
                find it in our job listing
              </div>
              <Button
                className="transition-all px-6 py-2 rounded-lg hover:opacity-90 flex  sm:text-sm md:text-md bg-secondary w-fit mx-auto my-4"
                onClick={() => {
                  router.push("/jobs")
                }}
              >
                Find Jobs
              </Button>
              <div className="w-full md:w-[70vw] mx-auto my-4 sm:p-4 gap-[20px] grid grid-cols-1  lg:grid-cols-2 2xl:w-[90vw] 2xl:grid-cols-4">
                {jobs.map((job, idx) => {
                  return <Card {...job} className="" key={idx} />
                })}
              </div>
            </>
          )}
        </div>

        <JobSection />
        <TalentSection Img={Img} RightSVG={RightSVG} />
      </div>
    </>
  )
}

export default HomePage
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let response
  let news
  let users
  let jobs
  if (session) {
    response = await fetchData(`/v1/users/home`, session?.user?.name as string, "GET")
  } else {
    news = await fetchWithoutAuthorization("/v1/news/latest", "GET")
    users = await fetchWithoutAuthorization("/v1/post/", "GET")
    jobs = await fetchWithoutAuthorization("/v1/job/latest", "GET")
    if (news?.error) {
      news = []
    } else {
      news = news?.data.LatestNews
    }
    if (users?.error) {
      users = []
    } else {
      users = users?.data?.posts
    }
    if (jobs?.error) {
      jobs = []
    } else {
      jobs = jobs?.data.Latestjobs?.map((job: BackendJob) => FrontendCompatibleObject(job))
    }
  }
  if (response?.error) {
    return {
      redirect: {
        destination: `/?emessage=${response?.message}`,
        permanent: false,
      },
    }
  }
  // console.log("Jobs", jobs)

  const News: ArticleProps[] = CreateNewsFrontend(response?.data?.LatestNews ?? [])
  const postsExplore: IHomePostResponse[] = response?.data.postsExplore
  const postsTrending: IHomePostResponse[] = response?.data.postsTrending
  const postsFollowing: IHomePostResponse[] = response?.data.postsFollowing
  const postsSaved: IHomePostResponse[] = response?.data.postsSaved
  if (session) {
    return {
      props: {
        News,
        postsExplore,
        postsTrending,
        postsFollowing,
        postsSaved,
      },
    }
  }
  return {
    props: {
      news,
      users,
      jobs,
    },
  }
}
export const CreateNewsFrontend = (NewsArray: INews[]) => {
  const res2: ArticleProps[] = (NewsArray ?? []).map((Pnews) => {
    return {
      id: Pnews.id,
      imgSrc: Pnews?.bannerImage ?? "",
      imgAlt: "",
      category: Pnews.category,
      title: Pnews.title,
      subtitle: Pnews.subtitle ?? "",
      link: "",
    }
  })
  return res2
}
