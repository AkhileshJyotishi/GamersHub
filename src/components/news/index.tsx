import React, { useEffect, useState } from "react"
import Image from "next/image"

// import { useSession } from "next-auth/react"
import image from "@/assets/image/void.svg"
import { ArticleProps } from "@/interface/news"
import { useUserContext } from "@/providers/user-context"

// import { fetchData } from "@/utils/functions"
import SkeletonLoader from "@/components/ui/SkeletonLoader2"

import { Article } from "./NewsCard"
import Layout from "./newsLayout"

type NewsPageProps = {
  news: ArticleProps[]
  // newsSuggestions?: JobSoftwareSuggestions
}
const NewsPage: React.FC<NewsPageProps> = ({ news }) => {
  const [activetab, setactivetab] = useState<string>("All")
  const { userData, setIsLoginModalOpen } = useUserContext()
  // const { data: session } = useSession()
  const [AllNews, setNews] = useState<ArticleProps[] | null>(news)
  const [myNews, setmyNews] = useState<ArticleProps[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (activetab === "Saved" && userData === null) {
      setIsLoginModalOpen(true)
      setactivetab("All")
    } else if (activetab === "My News Posts" && userData === null) {
      setIsLoginModalOpen(true)
      setactivetab("All")
    }
  }, [activetab])

  // const myNews = async () => {
  //   if (session) {
  //     const data = await fetchData(
  //       `/v1/news/user/${userData?.id}`,
  //       session?.user?.name as string,
  //       "GET"
  //     )
  //     if (data?.error) {
  //       return
  //     }
  //     const sett = data?.data?.news?.map((news: INews[]) => FrontendCompatibleObject(INews))
  //     setmyjobs([])
  //   }
  // }
  // const onChange = (id: number) => {
  //   setmyNews((prev) => {
  //     const x = prev?.filter((news) => news.id !== id)
  //     if (x) return x
  //     else return null
  //   })
  // }
  // const handleSavedSuccess = (id: number, state: string) => {
  //   setjobs((prevJobs) => {
  //     if (prevJobs) {
  //       const updatedJobs = prevJobs.map((news) =>
  //         news.id === id
  //           ? {
  //             ...news,
  //             savedUsers:
  //               state === "save"
  //                 ? [...news.savedUsers, { id: userData?.id ?? 0 }]
  //                 : job.savedUsers.filter((user) => user.id !== (userData?.id ?? 0)),
  //           }
  //           : job
  //       )
  //       return updatedJobs
  //     }
  //     return prevJobs
  //   })
  // }

  // useEffect(() => {
  //   myjobs()
  // }, [userData])
  useEffect(() => {
    setNews(news)
  }, [activetab])
  return (
    <Layout
      news={activetab === "My News Posts" ? myNews || [] : news}
      activeTab={activetab}
      setActiveTab={setactivetab}
      setNews={activetab === "My News Posts" ? setmyNews || [] : setNews}
      setLoading={setLoading}
      loading={loading}
      // jobSoftwareSuggestions={jobSoftwareSuggestions}
    >
      {activetab === "All" && (
        <>
          {news.length > 0 ? (
            <>
              <div className="grid  mx-auto my-4  p-2 md:p-4 lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 md:gap-[20px] gap-[10px] w-full">
                {loading ? (
                  <>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </>
                ) : (
                  AllNews?.map((article) => (
                    <>
                      <Article
                        id={article.id}
                        title={article.title}
                        category={article.category}
                        key={article.id}
                        // {...article}
                        imgSrc={article.imgSrc}
                        imgAlt={``}
                        className=""
                        link="error"
                      />
                    </>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No News Yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
              </div>
            </>
          )}
        </>
      )}

      {/* 
      {activetab === "Saved" && (
        <>
          {AllNews?.filter((job) => job.savedUsers.some((user) => user.id === userData?.id))
            .length !== 0 ? (
            <div className="grid  mx-auto my-4  p-2 md:p-4 lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 md:gap-[20px] gap-[10px] w-full">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                Alljobs?.filter((job) =>
                  job.savedUsers.some((user) => user.id === userData?.id)
                ).map((job, idx) => (
                  <Card
                    {...job}
                    className=""
                    key={idx}
                    onsavedSuccess={(id, state) => handleSavedSuccess(id, state)}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-20">
              <h3 className="text-3xl font-bold">No news yet.</h3>
              <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
            </div>
          )}
        </>
      )}
       */}
      {/* {activetab === "My News Posts" && (
        <>
          {myNews && Array.from(myNews).length > 0 ? (
            <div className="grid  mx-auto my-4  p-2 md:p-4 lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 md:gap-[20px] gap-[10px] w-full">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                myNews &&
                myNews?.map((news, idx) => (
                  // <Card {...job} className="" key={idx} onChange={onChange} />
                ))
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No news yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
              </div>
            </>
          )}
        </>
      )} */}
    </Layout>
  )
}

export default NewsPage
