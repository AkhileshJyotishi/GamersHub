import React from "react"
import clsx from "clsx"

import JobPageHeader from "./jobPageHeader"
import Jobsection from "./jobsection"

//  website locaation
const Particularpage = ({ profileData }: { profileData: BackendJob }) => {
  const { title, city, banner, country, user, ...profileDataJobSection } = profileData
  console.log("is this rendering  ", profileData)
  return (
    <>
      <div
        className={clsx(
          "absolute w-full ",
          ` bg-cover  bg-no-repeat bg-top`,
          "h-[490px]",
          banner && banner
        )}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3 z-20 w-full">
        <JobPageHeader
          title={title}
          key={"1"}
          location={city + " " + country}
          logoSrc={user.profileImage || banner}
          jobId={profileData.id}
        />
        <Jobsection jobData={profileDataJobSection} />
      </div>
    </>
  )
}

export default Particularpage
