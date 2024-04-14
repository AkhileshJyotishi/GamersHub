import React from "react"

function Icon({ className }: { className: string }) {
  return (
    <svg className={className} width="100" height="41" fill="none" viewBox="0 0 100 41">
      <path
        fill="#E1E1E1"
        d="M40.048 10.672L23.022 40.048 0 .84 46.163.6l-3.837 5.876H10.432l12.71 21.103 6.235-11.031h-8.634l-3.237-6.115 22.542.24z"
      ></path>
      <path
        fill="#5ABF8E"
        d="M46.044 40.048H26.979L49.641.6h19.424l-11.99 20.503H49.52l8.513-14.388h-5.036L37.77 34.413h4.796l5.156-10.072h7.075l-8.753 15.707z"
      ></path>
      <path
        fill="#E1E1E1"
        d="M58.513 40.168h-7.314L73.74.6h7.793L58.513 40.168zM78.057 40.168l-7.314.24L92.206.24 100 0 78.057 40.168z"
      ></path>
      <path fill="#E1E1E1" d="M85.252 20.623H63.43v5.156h21.822v-5.156z"></path>
    </svg>
  )
}

export default Icon
