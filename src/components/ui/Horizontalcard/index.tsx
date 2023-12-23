import React from "react"
import Image from "next/image"

interface CardProps {
  imageSrc: string
  title: string
  tags: Keyword[]
  className?: string
}

const CustomCard: React.FC<CardProps> = ({ imageSrc, title, tags, className }) => {
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg bg-user_interface_2 ${className}`}>
      <Image className="w-full" src={imageSrc} alt={""} height={400} width={400} />
      <div className="px-6 py-2">
        <div className="mb-2 text-xl font-bold">{title}</div>
        {/* <p className="text-base text-gray-700">{description}</p> */}
      </div>
      <div className="px-6 pb-2">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {tag.keyword}
          </span>
        ))}
      </div>
    </div>
  )
}

export default CustomCard
