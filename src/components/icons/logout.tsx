import React from "react"

function Icon({ className }: { className: string }) {
  return (
    <svg className={className} width="17" height="18" fill="none" viewBox="0 0 17 18">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.375 15.375H3.542a1.417 1.417 0 01-1.417-1.417V4.042a1.417 1.417 0 011.417-1.417h2.833M11.334 12.54L14.876 9l-3.542-3.542M14.875 9h-8.5"
      ></path>
    </svg>
  )
}

export default Icon
