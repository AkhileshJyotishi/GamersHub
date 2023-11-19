import React from "react"

function SaveIcon({ className }: { className: string }) {
  return (
    <svg className={className} width="16" height="20" fill="none" viewBox="0 0 11 12">
      <path
        fill="currentColor"
        d="M.833 12V1.333c0-.366.13-.68.392-.942C1.485.131 1.8 0 2.166 0h6.667c.367 0 .68.13.942.391.26.262.391.576.391.942V12L5.5 10 .833 12z"
      ></path>
    </svg>
  )
}

export default SaveIcon
