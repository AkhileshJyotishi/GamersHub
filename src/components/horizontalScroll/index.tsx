import Image from "next/image"
import React from "react"
import scroll from "./scroll.module.css"
import clsx from "clsx"
import ScrollCard from "./scroll-card"
interface Image {
  id: string
  image: string
  headline: string
}

interface BannerProps {
  images: Image[]
  speed?: number
}

interface SectionProps {
  image: Image
  speed: number
}

const Section: React.FC<SectionProps> = ({ image, speed }) => (
  <section className={"flex animate-[swipe]"}>
    <div>
      <Image
        src={image.image}
        alt={image.id}
        width={200}
        height={200}
        className={clsx(scroll.img)}
      />
    </div>
  </section>
)

const Banner: React.FC<BannerProps> = ({ images, speed = 5000 }) => (
  <div className={clsx(scroll.inner, "rounded-md")}>
    <div className={clsx(scroll.wrapper)}>
      <section className="flex gap-4" style={{ animation: "swipe 30s linear infinite " }}>
        {images.map((image, id) => (
          <ScrollCard cover={image.image} headline={image.headline} />
        ))}
      </section>
      <section className="flex gap-4" style={{ animation: "swipe 30s linear infinite " }}>
        {images.map((image, id) => (
          // <div key={id}>
          <ScrollCard cover={image.image} headline={image.headline} />
        ))}
      </section>
      <section className="flex gap-4" style={{ animation: "swipe 30s linear infinite " }}>
        {images.map((image, id) => (
          <ScrollCard cover={image.image} headline={image.headline} />
        ))}
      </section>
    </div>
  </div>
)

export { Banner }
