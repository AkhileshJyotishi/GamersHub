import React from "react"

function PlusIcon({ className,handleclick }: { className: string,handleclick?:()=>void }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      onClick={handleclick}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.208"
        d="M7 4.666v4.667M4.668 7h4.667"
      ></path>
    </svg>
  )
}

export default PlusIcon
