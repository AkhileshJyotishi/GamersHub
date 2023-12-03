import React from "react"
import Image from "next/image"

import image from "@/assets/image/void.svg"

import Card from "./jobsCard"
import Layout from "./jobsLayout"

type JobsPageProps = {
  jobs: Job[]
}
const JobsPage: React.FC<JobsPageProps> = ({ jobs }) => {
  return (
    <Layout jobs={jobs}>
      {jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 w-[100%]">
            {jobs.map((job, idx) => (
              <Card {...job} className="" key={idx} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      {
        <>
          <div className="flex flex-col items-center w-full gap-20">
            <h3 className="text-3xl font-bold">No jobs yet.</h3>
            <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
          </div>
        </>
      }
    </Layout>
  )
}

export default JobsPage
