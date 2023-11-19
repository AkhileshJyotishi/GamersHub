import React from "react"
import Link from "next/link"
// import ChevronDownIcon from "../Icons/chevron-down";
//import RightSVG from "@/assets/svg/chevron-right.svg"

interface Props {
  labels: {
    name: string
    href: string
  }[]
  className?: string
}

export default function BreadCrumb({ labels, className }: Props) {
  return (
    <div className={"flex flex-row items-center gap-x-4 " + className}>
      {labels.map((label, i) => {
        return (
          <>
            {i != 0 &&
              i !== labels.length &&
              //   <ChevronDownIcon className="rotate-[-90deg] w-5 h-5" />
              "  >  "}

            <Link
              key={i}
              passHref
              href={label.href}
              className={`font-medium max-w-[20%] md:max-w-[50%] trim-text ${
                i === labels.length - 1 ? " text-secondary " : ""
              } `}
            >
              {label.name}
            </Link>
          </>
        )
      })}
    </div>
  )
}
