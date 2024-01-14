import React, { useRef, useState } from "react"
import clsx from "clsx"
import a from "./tab.module.css"
// import Button from "../common/Button";
// import { useRouter } from "next/navigation"
import Button from "../ui/button"

export default function TabButtons({
  tabNames,
  setActiveTab,
  activeTab,
  className,
  seperator = true,
}: {
  tabNames: Array<string>
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  className?: string
  seperator?: boolean
}) {
  let scrollref = useRef<HTMLUListElement>(null)
  const [scrollX, setscrollX] = useState<number>(0)
  const [scrolEnd, setscrolEnd] = useState<boolean>(false)
  //Slide click
  const slide = (shift: Allow) => {
    if (scrollref.current) {
      scrollref.current.scrollLeft += shift

      setscrollX(scrollX + shift)
      if (
        Math.floor(scrollref.current.scrollWidth - scrollref.current.scrollLeft) <=
        scrollref.current.offsetWidth
      ) {
        setscrolEnd(true)
      } else {
        setscrolEnd(false)
      }
    }
  }

  const scrollCheck = () => {
    if (scrollref.current) {
      setscrollX(scrollref.current.scrollLeft)
      if (
        Math.floor(scrollref.current.scrollWidth - scrollref.current.scrollLeft) <=
        scrollref.current.offsetWidth
      ) {
        setscrolEnd(true)
      } else {
        setscrolEnd(false)
      }
    }
  }
  return (
    <>
      <div
        className={clsx(
          "flex flex-row justify-between w-full p-2 text-xs whitespace-nowrap sm:text-sm sm:w-auto md:gap-15 lg:gap-20",
          className
        )}
      >
        {scrollX !== 0 && (
          <button className={a.button} onClick={() => slide(-50)}>
            L
          </button>
        )}
        <ul ref={scrollref} onScroll={scrollCheck} className={clsx(a.App, "no-scrollbar")}>
          {tabNames?.map((tabName, index) => {
            return (
              <>
                <li
                  onClick={() => {
                    if (setActiveTab) setActiveTab(tabName)
                  }}
                  // variant={router.pathname.endsWith("/jobs") ? "secondary" : "text"}
                  // className={clsx(
                  //   "px-[12px] sm:px-[25px] py-[10px] rounded-xl m-5",
                  //   activeTab === tabName && "bg-secondary"
                  // )}
                  className={a.li}
                >
                  {tabName}
                </li>
                {seperator && index === 1 && (
                  <span className="bg-secondary w-[2px] h-[2rem] mx-5 my-auto"></span>
                )}
              </>
            )
          })}
        </ul>
        {!scrolEnd && (
          <button className={a.button} onClick={() => slide(+50)}>
            R
          </button>
        )}
      </div>
    </>
  )
}
