import React from "react"

interface IconProps {
  className: string
}

function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={30}
      width={39}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      xmlSpace="preserve"
      className={className}
      // fill="#fff"
    >
      {/* <style type="text/css">{`.st0{fill:#fff}`}</style> */}
      <path
        className="st0"
        d="M56.5,47.5L78.9,25c1.2-1.2,1.2-3.1,0-4.2c-1.2-1.2-3.1-1.2-4.2,0L52.3,43.3L29.8,20.8c-1.2-1.2-3.1-1.2-4.2,0  c-1.2,1.2-1.2,3.1,0,4.2L48,47.5L25.6,70c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l22.5-22.5l22.5,22.5  c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2L56.5,47.5z"
      />
    </svg>
  )
}

export default Icon
