import React from "react"
// import { Job } from "./types"; // Import the appropriate type for Job

interface JobDetailsProps {
  job: BackendJob
}

const JobData: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <div className="flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-fit gap-[30px] hidden md:flex">
      <div className="flex flex-row items-baseline justify-between">
        <span className="text-[22px] font-bold">{job.title}</span>
        {/* Add other job details or actions */}
      </div>

      {/* Display other job details using appropriate components */}
      <div className="text-[14px]">{job.description}</div>
      {/* <div className="text-[14px]">Company: {job.}</div> */}
      {/* Add more job details as needed */}
    </div>
  )
}

export default JobData
