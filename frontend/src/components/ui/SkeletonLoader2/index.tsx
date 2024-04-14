import React from "react"

const SkeletonLoader = () => {
  return (
    <div className="p-3 flex flex-col gap-3 h-[450px] rounded-xl shadow-md animate-pulse bg-[#161A1F]">
      <div>
        <div>
          <div className="flex flex-row flex-wrap justify-between gap-3 p-3">
            <div className="flex gap-[25px] flex-wrap justify-center ">
              <div className="my-auto">
                <div className="w-10 h-10 border-[0.1px] rounded-full "></div>
              </div>
              <div className="flex flex-col justify-center gap-1 text-center">
                <div className="flex items-center w-[60px] h-[20px] bg-gray-400"></div>
                <div className="flex items-center w-[80px] h-[20px] bg-gray-400"></div>
              </div>
            </div>
            <div className="flex items-center mx-auto ">
              <div className="h-[28px] w-[28px] bg-gray-400"></div>
            </div>
          </div>
          <hr className="w-[70%] mx-auto my-[7px] h-[1px] border-user_interface_3" />
          <div className="h-[100px] w-[280px] mt-2 p-3 bg-gray-400"></div>
        </div>
      </div>
      <div>
        <div className="w-[35%] h-8 ml-2 my-2 bg-gray-400 rounded"></div>
        <div className="w-[20%] h-8 ml-2 my-2 bg-gray-400 rounded"></div>
      </div>
      <div className="flex flex-row gap-2">
        {[1, 2, 3].map((idx) => (
          <span
            key={idx}
            className="h-[20px] w-[60px] text-xs font-normal leading-none max-w-full flex-initial p-[2px] rounded bg-gray-400 inline-block gap-4"
          ></span>
        ))}
      </div>
      <div className="w-[40%] h-8 ml-2 my-2 bg-gray-400 rounded"></div>
    </div>
  )
}

export default SkeletonLoader
