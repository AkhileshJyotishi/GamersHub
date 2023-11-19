import React from "react"

import Card from "./jobsCard"
import Layout from "./jobsLayout"

type JobsPageProps = {
  jobs: Job[]
}
const JobsPage: React.FC<JobsPageProps> = ({ jobs }) => {
  return (
    <Layout jobs={jobs}>
      <div className="grid grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 ">
        {jobs.map((job, idx) => (
          <Card {...job} className="" key={idx} />
        ))}
      </div>
    </Layout>
  )
}

export default JobsPage
