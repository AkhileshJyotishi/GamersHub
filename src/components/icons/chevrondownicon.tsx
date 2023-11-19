import React from "react"

interface IconProps {
  className: string
}

function Icon({ className }: IconProps) {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 13L7 7L1 1"
        stroke="#F7F7F7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Icon
