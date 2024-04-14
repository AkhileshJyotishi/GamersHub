import React from "react"

function Icon({ className }: { className: string }) {
  return (
    <svg className={className} width="17" height="18" fill="none" viewBox="0 0 17 18">
      <path
        stroke="#E1E1E1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.417"
        d="M8.5 16.082a7.083 7.083 0 100-14.167 7.083 7.083 0 000 14.167z"
      ></path>
      <path
        stroke="#E1E1E1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.417"
        d="M6.44 6.875a2.125 2.125 0 014.129.709c0 1.416-2.125 2.125-2.125 2.125M8.5 12.54h.008"
      ></path>
    </svg>
  )
}

export default Icon
