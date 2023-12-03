import React, { LegacyRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import carousel from "@/components/carousel/carousel.module.css"
import thumbnail from "@/components/carousel/thumbnail.module.css"
// import AfroStyles from "./afroStyles";

// const AfroStyles = [
//   {
//     id: 1,
//     title: "Model 1",

//     alt: "First Image",
//     src: "https://images.unsplash.com/photo-1528991435120-e73e05a58897?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 2,
//     title: "Model 2",
//     description: "Elevate your style with this Ankara long sleeve shirt and trouser",
//     alt: "Second Image",
//     src: "https://images.unsplash.com/photo-1572495532056-8583af1cbae0?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3,
//     title: "Model 3",
//     description: "Elevate your style with Ankara dresses.",
//     alt: "Third Image",
//     src: "https://images.unsplash.com/photo-1607823489283-1deb240f9e27?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fEFmcmljYW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
//   },
//   {
//     id: 4,
//     title: "Model 4",
//     description: "An elegant monochromatic image of a female figure.",
//     alt: "Forth Image",
//     src: "https://images.unsplash.com/flagged/photo-1578907015404-bd0176fb3108?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fEFmcmljYW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
//   },
//   {
//     id: 5,
//     title: "Model 5",
//     description: "Stylish trendy afro france man in red hat & white outfit",
//     alt: "Fifth Image",
//     src: "https://images.unsplash.com/photo-1584530193960-b4eb6c87081c?auto=format&fit=crop&q=80&w=2824&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 6,
//     title: "Model 6",
//     description: "African woman in a red dinner gown",
//     alt: "Sixth Image",
//     src: "https://images.unsplash.com/photo-1560457099-64cb8a5eb503?auto=format&fit=crop&q=80&w=2786&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 7,
//     title: "Model 7",
//     description: "Man in Suit",
//     alt: "Seventh Image",
//     src: "https://images.unsplash.com/photo-1530884698386-d42ad3199b1f?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 7,
//     title: "Model 7",
//     description: "Man in Suit",
//     alt: "Seventh Image",
//     src: "https://images.unsplash.com/photo-1530884698386-d42ad3199b1f?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 7,
//     title: "Model 7",
//     description: "Man in Suit",
//     alt: "Seventh Image",
//     src: "https://images.unsplash.com/photo-1530884698386-d42ad3199b1f?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 7,
//     title: "Model 7",
//     description: "Man in Suit",
//     alt: "Seventh Image",
//     src: "https://images.unsplash.com/photo-1530884698386-d42ad3199b1f?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ]

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
  console.log("carousel  ", GameAssets)
  return (
    <>
      <div className={clsx(carousel["content"])}>
        <div className={clsx(carousel["container"])}>
          <Slider
            {...settings}
            ref={(slider) => setSlider1(slider)}
            // style={{}}
            className="whah md:h-[700px] h-[300px]"
          >
            {GameAssets.map((item, idx) => (
              <div key={idx} className="">
                <div className="">
                  <Image
                    src={item}
                    alt={""}
                    height={500}
                    width={500}
                    className={clsx(carousel["img"], "md:h-[700px] h-[300px]")}
                  />
                </div>
              </div>
            ))}
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
