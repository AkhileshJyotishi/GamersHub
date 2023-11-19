import React from "react"

export default function MapPinIcon({ className }: { className: string }) {
  return (
    <svg className={className} width="19" height="19" fill="none" viewBox="0 0 19 19">
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.083"
        clipPath="url(#clip0_1503_44971)"
      >
        <path d="M14.282 7.812c0 4.666-6 8.666-6 8.666s-6-4-6-8.666a6 6 0 1112 0z"></path>
        <path d="M8.282 9.81a2 2 0 100-4 2 2 0 000 4z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1503_44971">
          <path fill="#fff" d="M0 0H18V18H0z" transform="translate(.07 .161)"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
