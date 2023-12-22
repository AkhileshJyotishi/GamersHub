import React from "react"

const SkeletonLoader = () => {
  return (
    <div className="max-w-sm h-[360px] bg-white rounded shadow-md animate-pulse bg-user_interface_3">
      <div className="w-full bg-gray-400 h-[150px] rounded"></div>
      <div className="w-[35%] h-8 ml-2 my-2 bg-gray-400 rounded"></div>
      <div className="w-[20%] h-8 ml-2 my-2 bg-gray-400 rounded"></div>
      <div className="px-6 pt-4 pb-2 mt-2">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="w-[60px] h-[28px] inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-400 rounded-full "
          ></div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonLoader
