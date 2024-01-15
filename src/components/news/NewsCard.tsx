import React, { FC } from "react"
import cn from "classnames"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/router"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { ArticleProps } from "@/interface/news"

import NewsCarousel from "./NewsCarousel"

import news from "./news.module.css"

interface FeaturedListProps {
  articles: ArticleProps[]
  activetab?: string
}

export const Article: FC<ArticleProps & { className: string; activetab?: string }> = ({
  imgSrc,
  id,
  category,
  subtitle,
  title,
  // link,
  className,
  activetab,
}) => {
  const router = useRouter()
  return (
    <article
      className={cn("relative cursor-pointer group rounded-xl overflow-hidden w-full", className)}
      onClick={() => router.push(`/news/${id}`)}
    >
      <div className={clsx("h-[inherit] w-[inherit] relative flex flex-col mt-auto")}>
        <Image
          height={900}
          width={900}
          alt={""}
          className={clsx(
            "absolute group-hover:scale-105 h-full w-full transition-all bg-[#181818]  hover:scale-50",
            news.background
          )}
          src={imgSrc || defaultbannerImage}
        />

        <span
          id="blackOverlay"
          className="group-hover:block hidden duration-200 absolute w-full h-full bg-[#000] opacity-20"
        ></span>
        <span className={clsx("absolute w-full h-full", news.background)}></span>
        <div className={clsx(" relative flex flex-col h-full p-3 w-full")}>
          <div className=" w-fit mb-auto px-2 py-1 rounded-[50rem] bg-[#000000b3] text-[#e6e6ea] backdrop-blur-[25px] overflow-hidden text-ellipsis max-w-[200px]">
            {category?.title ?? activetab}
          </div>
          <h3 className="">
            <div
              className="text-[1.25rem] font-serif text-[#fff] font-[700] break-words drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] line-clamp-2 my-1 mx-0 text-ellipsis"
              title={title}
            >
              {title}
            </div>
          </h3>
          <h5 className="">
            <div
              className="text-[1rem] text-[#96969a] font-[700] line-clamp-1 text-ellipsis"
              title={title}
            >
              {subtitle}
            </div>
          </h5>
        </div>
      </div>
    </article>
  )
}

const FeaturedList: FC<FeaturedListProps> = ({ articles, activetab }) => (
  <>
    {/* Primary Section */}
    <section className={cn("col-start-1 col-span-4  h-fit p-2")}>
      <div className={cn("relative h-[400px]")}>
        {articles &&
          (articles?.slice(0, 1) ?? []).map((article) => (
            <Article
              key={article.id}
              activetab={activetab}
              {...article}
              // subtitle="sd"
              // imgSrc={article.imgSrc}
              // imgAlt={``}
              className={"h-[inherit]"}
            />
          ))}
      </div>
    </section>

    {/* Secondary Section */}
    <section className={cn("col-span-4 h-fit p-2")}>
      <div className="flex flex-col sm:grid grid-cols-2 grid-rows-2 gap-4 md:h-[400px] ">
        {articles &&
          (articles?.slice(1, 5) ?? []).map((article) => (
            <Article
              key={article.id}
              activetab={activetab}
              {...article}
              // imgSrc={article.imgSrc}
              // imgAlt={``}
              className="h-[200px]"
            />
          ))}
      </div>
    </section>
  </>
)

const GeneralizedComponent: FC<FeaturedListProps> = ({ articles, activetab }) => (
  <>
    <div className={cn("min-[1024px]:p-12 min-[1440px]:p-20 mx-auto h-fit hidden sm:block")}>
      <div className={cn("min-[1024px]:grid md:grid-cols-8 w-full gap-4 h-fit sm:flex flex-col ")}>
        <FeaturedList articles={articles} activetab={activetab} />
      </div>
    </div>
    <NewsCarousel articles={articles} />
  </>
)

export default GeneralizedComponent
