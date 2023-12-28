import React from "react"

const SkeletonLoader = () => {
  return (
    <div className="p-3 flex flex-col gap-3 h-[360px] rounded-xl shadow-md animate-pulse bg-[#161A1F]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row flex-wrap justify-between gap-3 p-3 ">
          <div className="flex gap-[25px] flex-wrap justify-center ">
            <div className="my-auto">
              <div className="w-10 h-10 border-[0.1px] rounded-full "></div>
            </div>
            <div className="flex flex-col justify-center gap-1 text-center">
              <div className="flex items-center w-[160px] h-[20px] bg-gray-400"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-2 h-fit">
          <div className="w-[70%] ml-auto flex gap-2">
            <div className="w-20 h-6 border-[0.1px] bg-gray-400 mr-3"></div>
            <div className="w-6 h-6 border-[0.1px] rounded-full mr-3"></div>
            <div className="w-6 h-6 border-[0.1px] rounded-full "></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
