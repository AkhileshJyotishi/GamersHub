import React from "react"
// import Button from "../common/Button";
import { useRouter } from "next/navigation"

import Button from "../ui/button"

export default function TabButtons({ tabNames }: { tabNames: Array<string> }) {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-row justify-between w-full text-xs whitespace-nowrap sm:text-sm sm:w-auto md:gap-15 lg:gap-20">
        {tabNames?.map((tabName, index) => {
          return (
            <>
              <Button
                onClick={() => {
                  router.push(`/jobs`)
                }}
                // variant={router.pathname.endsWith("/jobs") ? "secondary" : "text"}
                className="px-[12px] sm:px-[25px] py-[10px]"
              >
                {tabName}
              </Button>
              {index === 1 && <span className="bg-secondary w-[2px] h-[2rem] mx-5 my-auto"></span>}
            </>
          )
        })}
      </div>
    </>
  )
}
