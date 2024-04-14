import React from "react"
import Image from "next/image"

import ProfileSVG from "@/assets/svg/profile.svg"

const Dropdown = () => {
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center ">
        <Image
          className="gap-2 mb-3 rounded-full shadow-lg 12"
          src={ProfileSVG}
          alt="Bonnie image"
          height={24}
          width={24}
        />
        <div className="justify-end">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
