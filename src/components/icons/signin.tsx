import React from "react"

interface IconProps {
  className: string
}

function Icon({ className }: IconProps) {
  const style = `
    .cls-1 {
      fill: none;
      stroke: #00B87D;
      stroke-linecap: round;
      strokeLinejoin: round;
      stroke-width: 4px;
    }
  `

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72.53 122.27499999999999"
      // viewBox="0 0 39 39"
      width="39"
      height="20"
      className={className}
    >
      <defs>
        <style>{style}</style>
      </defs>
      <title>Asset 55</title>
      <g data-name="Layer 2">
        <g>
          <polyline className="cls-1" points="2 48.97 2 2 70.53 2 70.5 95.82 2 95.82 2 76.85" />
          <line className="cls-1" x1="2" y1="62.91" x2="44.06" y2="62.91" />
          <polyline className="cls-1" points="30.13 48.97 44.06 62.91 30.13 76.85" />
        </g>
      </g>
    </svg>
  )
}

export default Icon
