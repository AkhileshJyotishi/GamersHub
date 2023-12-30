import React from "react"
import clsx from "clsx"
import Image from "next/image"

import defaultbannerImage from "@/assets/image/user-banner.png"

import JobPageHeader from "@/components/particularJob/Head"
import Jobsection from "@/components/particularJob/Section"
//  website locaation
const Particularpage = ({ profileData }: { profileData: BackendJob }) => {
  if (!profileData) {
    return <div>Loading...</div> // or any other handling mechanism
  }

  const {
    title,
    city,
    banner,
    country,
    user,
    remote,
    userId,
    savedUsers,
    ...profileDataJobSection
  } = profileData
  return (
    <>
      <div className={clsx("absolute w-full ", ` bg-cover  bg-no-repeat bg-top`, "h-[490px]")}>
        <Image
          alt=""
          src={banner || defaultbannerImage}
          height={500}
          width={900}
          className="h-[490px] absolute w-full bg-cover  bg-no-repeat bg-top"
        />
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div
        className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3  w-full"
        style={{ zIndex: 19 }}
      >
        <JobPageHeader
          title={title ?? ""}
          key={"1"}
          location={city + " " + country}
          logoSrc={user?.profileImage || ""}
          jobId={profileData?.id}
          userId={userId}
          remote={remote}
          savedUsers={savedUsers}
        />
        <Jobsection jobData={profileDataJobSection} />
      </div>
    </>
  )
}

export default Particularpage
