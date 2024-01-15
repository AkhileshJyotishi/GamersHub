import React, { useState } from "react"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { INewsCategory } from "@/interface/news"

// import { useUserContext } from "@/providers/user-context"
import { Article } from "./NewsCard"
import Layout from "./newsLayout"

type NewsPageProps = {
  parsedCategoriesDetails: INewsCategory[]
}
const NewsPage: React.FC<NewsPageProps> = ({ parsedCategoriesDetails }) => {
  console.log("parser", parsedCategoriesDetails)
  const [activetab, setactivetab] = useState<INewsCategory["title"]>("All")
  // const { userData, setIsLoginModalOpen } = useUserContext()
  const [AllCategory, setAllCategory] = useState<INewsCategory[] | null>(parsedCategoriesDetails)

  const [loading, setLoading] = useState<boolean>(false)
  // useEffect(() => {
  //   if (activetab === "Saved" && userData === null) {
  //     setIsLoginModalOpen(true)
  //     setactivetab("All")
  //   } else if (activetab === "My News Posts" && userData === null) {
  //     setIsLoginModalOpen(true)
  //     setactivetab("All")
  //   }
  // }, [activetab])

  return (
    <Layout
      AllCategory={AllCategory || []}
      activeTab={activetab}
      setActiveTab={setactivetab}
      setAllCategory={setAllCategory}
      setLoading={setLoading}
      loading={loading}
    >
      {activetab == "All" ? (
        <>
          {" "}
          {AllCategory &&
            AllCategory.map((cat) => {
              console.log("cat ", cat)
              return cat.News?.map((article) => {
                return (
                  <Article
                    id={article.id}
                    title={article.title}
                    key={article.id}
                    activetab={cat.title}
                    subtitle={article.subtitle}
                    // subtitle={}
                    imgSrc={article.bannerImage ?? defaultbannerImage}
                    imgAlt={``}
                    className="h-full"
                    link={`/news/${article.id}`}
                  />
                )
              })
            })}
        </>
      ) : (
        <>
          {" "}
          {AllCategory &&
            AllCategory.find((x) => x.title === activetab)?.News?.map((article) => {
              return (
                <Article
                  id={article.id}
                  title={article.title}
                  key={article.id}
                  category={article.category}
                  activetab={activetab}
                  subtitle={article.subtitle}
                  imgSrc={article.bannerImage ?? defaultbannerImage}
                  imgAlt={``}
                  className="h-full"
                  link={`/news/${article.id}`}
                />
              )
            })}
        </>
      )}
    </Layout>
  )
}

export default NewsPage
