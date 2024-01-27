import React, { useEffect, useState } from "react"
import Image from "next/image"

import image from "@/assets/image/void.svg"
import { shimmer, toBase64 } from "@/utils/functions"

import SkeletonLoader from "../ui/SkeletonLoader2"

import Card from "./jobResponseCard"
import Layout from "./jobResponseLayout"

const JobResponses = ({
  jobApplicants,
  jobTitle,
  customJobResponseTags,
}: {
  jobApplicants: jobApplications[]
  jobTitle: string
  customJobResponseTags: ICustomJobResponseTags
}) => {
  const [activetab, setactivetab] = useState<string>("Applied Manually")
  const [jobResponses, setJobResponses] = useState<jobApplications[]>(jobApplicants)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log(jobResponses)
  }, [jobResponses])
  if (loading) {
    return (
      <>
        <Layout
          jobTitle={jobTitle}
          activeTab={activetab}
          setActiveTab={setactivetab}
          jobResponses={jobResponses}
          jobApplicants={jobApplicants}
          setJobResponses={setJobResponses}
          setLoading={setLoading}
          loading={loading}
          customJobResponseTags={customJobResponseTags}
        >
          <div className="grid w-full grid-cols-1 gap-3 p-4 md:p-0 justify-items-center  lg:grid-cols-3">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        </Layout>
      </>
    )
  } else {
    return (
      <Layout
        jobTitle={jobTitle}
        activeTab={activetab}
        setActiveTab={setactivetab}
        jobResponses={jobResponses}
        jobApplicants={jobApplicants}
        setJobResponses={setJobResponses}
        setLoading={setLoading}
        loading={loading}
        customJobResponseTags={customJobResponseTags}
      >
        {activetab == "Applied through GCH" && (
          <>
            {(jobResponses ?? [])?.filter((jobres) => jobres.applyMethod == "GCH").length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-[20px ] md:gap-3 p-4 md:p-2 justify-items-center min-[1000px]:grid-cols-2  min-[1400px]:grid-cols-3 min-[2000px]:grid-cols-4">
                {((jobResponses ?? [])?.filter((jobres) => jobres.applyMethod == "GCH") ?? [])?.map(
                  (sampleCreator, idx) => (
                    <Card
                      jobApplication={sampleCreator}
                      mode={sampleCreator.applyMethod}
                      key={idx}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No Responses yet.</h3>
                <Image
                  width={2060}
                  height={2060}
                  alt={""}
                  className="w-[200px]"
                  src={image}
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
              </div>
            )}
          </>
        )}
        {activetab == "Applied Manually" && (
          <>
            {/* Alljobs?.filter((job) => job.savedUsers.some((user) => user.id === userData?.id)) */}
            {((jobResponses ?? [])?.filter((jobres) => jobres.applyMethod == "MANUAL") ?? [])
              .length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-[20px ] md:gap-3 p-4 md:p-2 justify-items-center min-[1000px]:grid-cols-2  min-[1400px]:grid-cols-3 min-[2000px]:grid-cols-4">
                {(jobResponses?.filter((jobres) => jobres.applyMethod == "MANUAL") ?? [])?.map(
                  (sampleCreator, idx) => (
                    <Card
                      jobApplication={sampleCreator}
                      mode={sampleCreator.applyMethod}
                      key={idx}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No Responses yet.</h3>
                <Image
                  width={2060}
                  height={2060}
                  alt={""}
                  className="w-[200px]"
                  src={image}
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
              </div>
            )}
          </>
        )}
      </Layout>
    )
  }
}

export default JobResponses
