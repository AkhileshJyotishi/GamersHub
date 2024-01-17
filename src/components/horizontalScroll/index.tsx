import React from "react"
import clsx from "clsx"
import Image from "next/image"

import ScrollCard from "./scroll-card"

import scroll from "./scroll.module.css"
interface Image {
  id: string
  image: string
  headline: string
}

interface BannerProps {
  images: Image[]
  speed?: number
}

const Banner: React.FC<BannerProps> = ({ images }) => (
  <div className={clsx(scroll.inner, "rounded-md")}>
    <div className={clsx(scroll.wrapper)}>
      <section className="flex gap-4" style={{ animation: "swipe 30s linear infinite " }}>
        {images.map((image) => (
          <ScrollCard key={image.id} cover={image.image} headline={image.headline} />
        ))}
      </section>
      <section className="flex gap-4" style={{ animation: "swipe 30s linear infinite " }}>
        {images.map((image) => (
          // <div key={id}>
          <ScrollCard key={image.id} cover={image.image} headline={image.headline} />
        ))}
      </section>
      <section className="flex gap-4" style={{ animation: "swipe 30s linear infinite " }}>
        {images.map((image) => (
          <ScrollCard key={image.id} cover={image.image} headline={image.headline} />
        ))}
      </section>
    </div>
  </div>
)

export { Banner }
