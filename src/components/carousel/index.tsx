import React, { LegacyRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from "react-slick"

import { shimmer, toBase64 } from "@/utils/functions"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import carousel from "@/components/carousel/carousel.module.css"
import thumbnail from "@/components/carousel/thumbnail.module.css"

type SlickSlider = LegacyRef<Slider> & {
  innerSlider: {
    state: {
      currentSlide: number
    }
  }
  slickGoTo: (index: number) => void
}

//   export default AfroStyles;
const Carousel = ({ GameAssets }: { GameAssets: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slider1, setSlider1] = useState<SlickSlider | null>(null)

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1500,
    lazyLoad: true,
    onReInit: () => setCurrentSlide(slider1?.innerSlider?.state?.currentSlide ?? 0),
    // asNavFor: ".slider-nav",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  // console.log("carousel  ", GameAssets)
  return (
    <>
      <div className={clsx(carousel["content"])}>
        <div className={clsx(carousel["container"])}>
          <Slider
            {...settings}
            ref={(slider: Allow) => setSlider1(slider)}
            // style={{}}
            className="whah md:h-[700px] h-[300px]"
          >
            {GameAssets.map((item, idx) => {
              return (
                <div key={idx} className="">
                  <div className="">
                    <Image
                      src={item}
                      alt={""}
                      height={500}
                      width={500}
                      className={clsx(carousel["img"], "md:h-[700px] h-[300px]")}
                      // placeholder="blur"
                      priority
                      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                      // blurDataURL=""
                      // bl
                    />
                  </div>
                </div>
              )
            })}
          </Slider>
          <div className={clsx(thumbnail["thumb-wrapper"], "")}>
            {GameAssets.map((item, idx) => (
              <div
                key={idx}
                className={clsx(currentSlide === idx ? "active" : "", "p-2 w-[200px]")}
                onClick={() => {
                  slider1?.slickGoTo(idx)
                }}
              >
                <Image src={item} alt={""} height={500} width={500} />

                {/* <img src={item.src} alt={item.alt} /> */}
                {/* {currentSlide} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel
