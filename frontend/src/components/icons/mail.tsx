import React from "react"

interface IconProps {
  className: string
  fill: string
}

const Icon: React.FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      className={className}
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill={fill}
          d="M92.188,84.862H7.833c-1.553,0-2.812-1.259-2.812-2.812V21.067c-0.028-0.225-0.028-0.441,0-0.666v-2.451c0-1.553,1.259-2.812,2.812-2.812h84.356c1.553,0,2.812,1.259,2.812,2.812V82.05C95,83.603,93.741,84.862,92.188,84.862z M10.644,79.239h78.732v-54.48L51.979,56.548c-1.033,1.208-5.893,1.113-6.748,0L10.644,27.565V79.239z M48.604,52.039L85.49,20.761H11.719L48.604,52.039z"
        />
      </g>
    </svg>
  )
}

export default Icon
