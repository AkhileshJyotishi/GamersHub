import React from "react"
import clsx from "clsx"

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
  return (
    <>
      <div
        className={clsx(
          "flex flex-row flex-wrap justify-between w-full p-2 text-xs whitespace-nowrap sm:text-sm sm:w-auto md:gap-15 lg:gap-20",
          className
        )}
      >
        {tabNames?.map((tabName, index) => {
          return (
            <>
              <Button
                onClick={() => {
                  if (setActiveTab) setActiveTab(tabName)
                }}
                // variant={router.pathname.endsWith("/jobs") ? "secondary" : "text"}
                className={clsx(
                  "px-[12px] sm:px-[25px] py-[10px] rounded-xl",
                  activeTab === tabName && "bg-secondary"
                )}
              >
                {tabName}
              </Button>
              {seperator && index === 1 && (
                <span className="bg-secondary w-[2px] h-[2rem] mx-5 my-auto"></span>
              )}
            </>
          )
        })}
      </div>
    </>
  )
}
