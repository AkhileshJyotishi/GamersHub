import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/router"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { BackendNews } from "@/interface/news"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[40vh]"></div>
  },
})

const Particularpage = ({ newsData }: { newsData: BackendNews }) => {
  const router = useRouter()
  console.log("newsData.bannerImage", newsData.bannerImage)
  if (!newsData) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col items-center w-full">
          {/* Header part */}
          <p className="text-secondary p-4 flex flex-wrap justify-center">
            {/* Category */}
            <span
              className="hover:text-[#00B87D90] cursor-pointer"
              onClick={() => {
                router.push("/news?tab=All")
              }}
            >
              News
            </span>
            <span className="px-4">/</span>
            <span
              className="hover:text-[#00B87D90] cursor-pointer"
              onClick={() => {
                router.push(`/news?tab=${newsData.category.title}`)
              }}
            >
              {newsData.category.title}
            </span>
          </p>
          <h1 className="m-auto pt-[20px] px-[20px] text-[32px] md:text-[60px] capitalize text-center break-all">
            {/* Title */}
            {newsData.title}
          </h1>
          <h3 className="m-auto pb-[20px] px-[20px] text-text_dull text-[20px] md:text-[32px] text-center break-all">
            {/* Title */}
            {newsData.subtitle}
          </h3>
          <p className="pt-[10px]  justify-center flex flex-wrap">
            {/* User Info */}
            <span className="break-normal">By</span>
            <span
              className="break-all px-2 text-secondary cursor-pointer capitalize hover:text-[#00B87D90]"
              onClick={() => {
                router.push(`/${newsData.userId}/profile/albums`)
              }}
            >
              {newsData.publisher.username}
            </span>
            <span className="break-normal text-text_dull">
              -{" "}
              {new Date(newsData.publishedAt).toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
                day: "numeric",
              })}
            </span>
          </p>
        </div>
        <div className="px-4 py-6 w-full h-full">
          {/* Banner Image  */}
          <Image
            alt=""
            className="h-[200px] w-[95%] sm:w-[500px] sm:h-[250px] lg:w-[800px] mx-auto 2xl:h-[500px]  rounded-xl  "
            height={900}
            width={900}
            src={
              newsData.bannerImage
                ? newsData.bannerImage != ""
                  ? newsData.bannerImage
                  : defaultbannerImage
                : defaultbannerImage
            }
          />
        </div>

        {/* Editor Content */}
        {newsData?.content && (
          <Editor
            className={
              "bg-user_interface_2 w-[92%] sm:w-[500px] lg:w-[800px] mx-auto  rounded-xl select-none md:overflow-y-scroll"
            }
            editable={false}
            storageKey="news_content"
            defaultValue={newsData?.content || {}}
            disableLocalStorage
          />
        )}
      </div>
    </>
  )
}

export default Particularpage
