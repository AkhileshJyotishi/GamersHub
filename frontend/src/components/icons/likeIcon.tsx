import React from "react"

function Icon({ className }: { className: string }) {
  return (
    <svg className={className} width="15" height="13" fill="none" viewBox="0 0 15 13">
      <path
        fill="currentColor"
        d="M13.394 1.075a3.667 3.667 0 00-5.187 0l-.706.706-.707-.706A3.668 3.668 0 101.607 6.26l.707.707 5.187 5.187 5.186-5.187.707-.707a3.666 3.666 0 000-5.186z"
      ></path>
    </svg>
  )
}

export default Icon
