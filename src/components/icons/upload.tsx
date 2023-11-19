import React from "react"

interface UploadIconProps {
  className: string
}

const UploadIcon: React.FC<UploadIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://ns.adobe.com/Extensibility/1.0/"
      //   xmlnsI="http://ns.adobe.com/AdobeIllustrator/10.0/"
      //   xmlnsGraph="http://ns.adobe.com/Graphs/1.0/"
      //   xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      //   style={{ enableBackground: 'new 0 0 100 100' }}
      xmlSpace="preserve"
      className={className}
    >
      <switch>
        <foreignObject
          requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
          x="0"
          y="0"
          width="1"
          height="1"
        />
        <g>
          <g>
            <path d="M89.3,27.6H62V34c0,4.6-3.7,8.4-8.4,8.4h-7.3c-4.6,0-8.4-3.7-8.4-8.4v-6.4H10.7c-2.2,0-3.9,1.8-3.9,3.9v62.1     c0,2.2,1.8,3.9,3.9,3.9h78.6c2.2,0,3.9-1.8,3.9-3.9V31.5C93.2,29.4,91.5,27.6,89.3,27.6z M73.7,43.1c3.5,0,6.2,2.8,6.2,6.2     s-2.8,6.2-6.2,6.2s-6.2-2.8-6.2-6.2S70.2,43.1,73.7,43.1z M85.4,88.2c0,0.8-0.7,1.5-1.5,1.5H16.1c-0.8,0-1.5-0.7-1.5-1.5v-4.8     c0-0.4,0.1-0.7,0.4-1l21.2-24.3c1.8-2.1,5.1-2.1,7,0l14,16.1c0.6,0.7,1.6,0.7,2.2,0l5.8-6.3c1.7-1.8,4.5-1.8,6.2,0L85,83     c0.2,0.3,0.4,0.6,0.4,1V88.2z" />
            <path d="M38.8,22.1h4.4V34c0,1.7,1.4,3.1,3.1,3.1h7.3c1.7,0,3.1-1.4,3.1-3.1V22.1h4.4c2.4,0,3.7-2.7,2.2-4.6l-11.2-14     c-1.1-1.4-3.3-1.4-4.4,0l-11.2,14C35.2,19.4,36.5,22.1,38.8,22.1z" />
          </g>
        </g>
      </switch>
    </svg>
  )
}

export default UploadIcon
