import React from "react"
import { Carousel } from "react-responsive-carousel"

import { ArticleProps } from "@/interface/news"

import { Article } from "./NewsCard"

import "react-responsive-carousel/lib/styles/carousel.min.css"

interface FeaturedListProps {
  articles: ArticleProps[]
}

const NewsCarousel: React.FC<FeaturedListProps> = ({ articles }) => {
  return (
    <div className=" px-2 py-4 w-[95vw] mx-auto  sm:hidden">
      <Carousel
        infiniteLoop={true}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        useKeyboardArrows={true}
        autoPlay={true}
        showThumbs={false}
        centerSlidePercentage={42}
        interval={2500}
      >
        {articles.slice(0, 6)?.map((article, i) => (
          <div
            key={i}
            className="mx-auto flex h-[250px] min-[400px]:h-[300px] w-[100%] items-center md:h-[200px]"
          >
            <Article {...article} className="h-full" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default NewsCarousel
