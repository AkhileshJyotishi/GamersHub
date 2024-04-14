import * as React from "react"
import { useRouter } from "next/router"

import { useUserContext } from "@/providers/user-context"
type menuProps = {
  data: {
    title: string
    path: string
  }
}
export const MenuItem = ({ data }: menuProps) => {
  const router = useRouter()
  const { setTap, tap, setIsDrawerOpen } = useUserContext()
  return (
    <>
      <li className="m-0 p-0 flex items-center justify-center cursor-pointer mb-[30px]">
        <div
          onClick={() => {
            setTap(!tap)
            setIsDrawerOpen(false)
            router.replace(data.path)
          }}
          className="hover:text-secondary hover:scale-125 text-[18px]"
        >
          {data.title}
        </div>
      </li>
    </>
  )
}
