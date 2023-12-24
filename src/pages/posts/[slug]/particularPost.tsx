import React, { useEffect } from "react"
import clsx from "clsx"

// import spinner from "@/assets/svg/spinner.svg"
import JobPageHeader from "./postPageHeader"
import Jobsection from "./postSection"
//  website locaation
const Particularpage = ({ profileData }: { profileData: IPostbackend }) => {
  if (!profileData) {
    // Handle the case when profileData is undefined
    return <div>Loading...</div> // or any other handling mechanism
  }

  const { title,  banner, ...profileDataJobSection } = profileData
  const user=profileData.user
  const userId=profileData.userId
  useEffect(()=>{
console.log("working",window.location.href)
  },[])
  // console.log("is this rendering  ", profileData)
  return (
    <>
      <div
        className={clsx("absolute w-full ", ` bg-cover  bg-no-repeat bg-top`, "h-[490px]")}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3  w-full" style={{zIndex:19}}>
        <JobPageHeader
          title={title ?? ""}
          key={"1"}
          logoSrc={user?.profileImage || banner}
          postId={profileData?.id}
          userId={userId}
        />
        <Jobsection postData={profileDataJobSection} />
      </div>
    </>
  )
}

export default Particularpage
