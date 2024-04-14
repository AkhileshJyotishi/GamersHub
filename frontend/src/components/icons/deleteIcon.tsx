import React from "react"

export default function EditIcon({
  className,
  onClick,
}: {
  className: string
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 64 80"
      //   style={{ enableBackground: "new 0 0 64 64" }}
      className={className}
      onClick={onClick}
      xmlSpace="preserve"
    >
      <g>
        <path d="M51.4,13.7h-6.5v-3.7c0-3.9-3.2-7.1-7.1-7.1H26.2c-3.9,0-7.1,3.2-7.1,7.1v3.7h-6.5c-1.7,0-3,1.3-3,3v3.1c0,1.7,1.3,3,3,3   h0.6v34.8c0,1.8,1.5,3.3,3.3,3.3h31.1c1.8,0,3.3-1.5,3.3-3.3V22.9h0.6c1.7,0,3-1.3,3-3v-3.1C54.4,15.1,53.1,13.7,51.4,13.7z    M21.1,10.1c0-2.8,2.3-5.1,5.1-5.1h11.7c2.8,0,5.1,2.3,5.1,5.1v3.7h-2.8v-3.7c0-1.3-1-2.3-2.3-2.3H26.2c-1.3,0-2.3,1-2.3,2.3v3.7   h-2.8V10.1z M25.9,13.7v-3.7c0-0.2,0.1-0.3,0.3-0.3h11.7c0.2,0,0.3,0.1,0.3,0.3v3.7H25.9z M48.9,57.7c0,0.7-0.6,1.3-1.3,1.3H16.5   c-0.7,0-1.3-0.6-1.3-1.3V22.9h33.7V57.7z M52.4,19.9c0,0.6-0.4,1-1,1H12.6c-0.6,0-1-0.4-1-1v-3.1c0-0.6,0.4-1,1-1h38.9   c0.6,0,1,0.4,1,1V19.9z" />
        <path d="M32,55c1.9,0,3.4-1.5,3.4-3.4V30.2c0-1.9-1.5-3.4-3.4-3.4s-3.4,1.5-3.4,3.4v21.4C28.6,53.5,30.1,55,32,55z M30.6,30.2   c0-0.8,0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4v21.4c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4V30.2z" />
        <path d="M21.9,52.7c1.9,0,3.4-1.5,3.4-3.4V32.6c0-1.9-1.5-3.4-3.4-3.4c-1.9,0-3.4,1.5-3.4,3.4v16.7C18.5,51.1,20,52.7,21.9,52.7z    M20.5,32.6c0-0.8,0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4v16.7c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4V32.6z" />
        <path d="M42.1,52.7c1.9,0,3.4-1.5,3.4-3.4V32.6c0-1.9-1.5-3.4-3.4-3.4s-3.4,1.5-3.4,3.4v16.7C38.7,51.1,40.3,52.7,42.1,52.7z    M40.7,32.6c0-0.8,0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4v16.7c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4V32.6z" />
      </g>
    </svg>
  )
}