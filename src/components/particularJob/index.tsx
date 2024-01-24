import React, { useState } from "react"
import clsx from "clsx"
import Image from "next/image"

import defaultbannerImage from "@/assets/image/user-banner.png"

import JobPageHeader from "@/components/particularJob/Head"
import Jobsection from "@/components/particularJob/Section"

import ApplyJob from "../apply-job"
import Modal from "../ui/modal"
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

  const [isApplyJobOpen, setisApplyJobOpen] = useState<boolean>(false)
  const [isApplyJobGCHOpen, setisApplyJobGCHOpen] = useState<boolean>(false)

  return (
    <>
      <Modal
        isOpen={isApplyJobOpen}
        onClose={() => setisApplyJobOpen(false)}
        className="!w-[90%] md:!w-[800px] md:!max-w-[95vw] mb-[20px]"
      >
        <div className="bg-[#18181c]  text-dull p-[15px] rounded-3xl flex flex-col gap-3 relative w-full max-w-[960px] mx-auto no-scrollbar no-scroll md:px-[70px] px-[15px] ">
          <ApplyJob
            jobId={profileData.id}
            title={profileData.title}
            collabJob={profileData.jobType === "COLLAB"}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isApplyJobGCHOpen}
        onClose={() => setisApplyJobGCHOpen(false)}
        className="!w-[90%] md:!w-[800px] md:!max-w-[95vw] mb-[20px]"
      >
        <div className="bg-[#18181c]  text-dull p-[15px] rounded-3xl flex flex-col gap-3 relative w-full max-w-[960px] mx-auto no-scrollbar no-scroll md:px-[70px] px-[15px] ">
          <ApplyJob
            jobId={profileData.id}
            title={profileData.title}
            collabJob={profileData.jobType === "COLLAB"}
          />
        </div>
      </Modal>

      <div
        className={clsx(
          "absolute w-full max-w-[2000px]",
          ` bg-cover  bg-no-repeat bg-top`,
          "h-[490px]"
        )}
      >
        <Image
          alt=""
          src={banner || defaultbannerImage}
          height={500}
          width={900}
          className="h-[490px] absolute w-full bg-cover  bg-no-repeat bg-top "
          fetchPriority="high"
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
          setisApplyJobOpen={setisApplyJobOpen}
          isApplyJobOpen={isApplyJobOpen}
          setisApplyJobGCHOpen={setisApplyJobGCHOpen}
          isApplyJobGCHOpen={isApplyJobGCHOpen}
        />
        <Jobsection jobData={profileDataJobSection} />
      </div>
    </>
  )
}

export default Particularpage
