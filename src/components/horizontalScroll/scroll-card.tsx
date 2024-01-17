import React from "react"
import Image from "next/image"

import styles from "./scroll.module.css"
const ScrollCard = ({ cover, headline }: { cover: string; headline: string }) => {
  return (
    <div className={" max-w-[360px] w-[205px] h-fit rounded-[10px] cursor-pointer "}>
      <div className={"rounded-[10px] w-full h-[200px] relative " + styles["card-image-container"]}>
        <span
          id="blackOverlay"
          className="duration-200 absolute  w-full h-full bg-[#000] opacity-20"
        ></span>
        {
          <Image
            width={600}
            height={600}
            alt={""}
            src={cover}
            className="rounded-[10px] object-cover w-full h-full "
          />
        }
        <div className="absolute mx-auto font-[700] border-[1px] border-text p-1 text-center bg-transparent rounded-[50rem] w-[80%]  left-0 right-0 bottom-[6px]">
          {headline}
        </div>
      </div>
    </div>
  )
}

export default ScrollCard
