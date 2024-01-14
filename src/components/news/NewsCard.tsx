import React, { FC } from "react"
import cn from "classnames"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { ArticleProps } from "@/interface/news"

import news from "./news.module.css"

interface FeaturedListProps {
  articles: ArticleProps[]
}

export const Article: FC<ArticleProps & { className: string }> = ({
  imgSrc,
  category,
  title,
  link,
  className,
}) => {
  return (
    <article className={cn("h-fit", className)}>
      <div className=" relative flex flex-col mt-auto">
        <Image
          height={1200}
          width={800}
          alt={""}
          className="absolute h-full bg-[#181818] min-h-[312px] object-cover"
          src={imgSrc || defaultbannerImage}
        />
      </div>

      {/* <span
          id="blackOverlay"
          className="hover:opacity-30 duration-200 absolute w-full h-full bg-[#000] opacity-20"
        ></span> */}
      <div className={clsx(" relative mt-auto p-2 ", news.background)}>
        <div className="flex flex-row items-center gap-2 ">
          <Link className="" href={`/${category.toLowerCase()}/`}>
            {category}
          </Link>
        </div>
        <h3 className="hover:text-secondary">
          <Link
            href={link ?? ""}
            className="md:text-[1.25rem] text-text font-[700] hover:text-secondary duration-200"
            title={title}
          >
            {title}
          </Link>
        </h3>
      </div>
    </article>
  )
}

const FeaturedList: FC<FeaturedListProps> = ({ articles }) => (
  <>
    {/* Primary Section */}
    <section className={cn("col-start-1 col-span-4  h-fit p-2")}>
      <div className={cn("relative h-[400px]")}>
        {articles &&
          (articles?.slice(0, 1) ?? []).map((article) => (
            <Article
              key={article.id}
              {...article}
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

const GeneralizedComponent: FC<FeaturedListProps> = ({ articles }) => (
  <>
    <div className={cn("min-[1024px]:p-12 min-[1440px]:p-20 mx-auto h-fit")}>
      <div className={cn("md:grid md:grid-cols-8 w-full gap-4 h-fit flex flex-col")}>
        <FeaturedList articles={articles} />
      </div>
    </div>
  </>
)

export default GeneralizedComponent
