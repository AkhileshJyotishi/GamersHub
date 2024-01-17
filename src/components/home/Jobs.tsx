import React from "react"

import BriefCaseIcon from "@/components/icons/briefcase"
import FormIcon from "@/components/icons/formIcon" // Import your icons here
import LikeIcon from "@/components/icons/likeIcon"
// Define the interface for job card data
interface JobCardData {
  icon: JSX.Element
  title: string
  description: string
}

const jobCards: JobCardData[] = [
  {
    icon: <FormIcon className="text-secondary w-[28px] h-[28px]" />,
    title: "Easy application",
    description: "Quick and Effortless Application Process",
  },
  {
    icon: <BriefCaseIcon className="text-secondary w-[28px] h-[28px]" />,
    title: "Best opportunities",
    description: "Find Your Ideal Career Path with Our Job Offerings",
  },
  {
    icon: <LikeIcon className="text-secondary w-[28px] h-[28px]" />,
    title: "Flexible Career Options",
    description: "Full-Time, Part-Time, Freelance etc are available",
  },
  // Add more job card data objects as needed
]

const JobCard: React.FC<JobCardData> = ({ icon, title, description }) => (
  <div className="flex flex-col max-w-[412px] items-center gap-[38px] py-[60px] px-[40px] border-[1px] border-user_interface_3 rounded-lg">
    <span className="p-[8px] rounded-lg bg-user_interface_3">{icon}</span>
    <div className="flex flex-col items-center gap-[22px]">
      <h6 className="font-semibold text-[20px]">{title}</h6>
      <p className="text-user_interface_6">{description}</p>
    </div>
  </div>
)

const JobSection: React.FC = () => (
  <section className="w-full flex flex-col py-24 px-[16px] md:px-[60px] bg-user_interface_2 my-[40px]">
    <h4 className="font-bold text-[32px] mx-auto break-normal text-center">
      Find Your Dream Career: Browse Our <span className="text-secondary">Job Openings</span>
    </h4>
    <div className="flex flex-wrap justify-center gap-5 mt-10 text-center">
      {jobCards?.map((jobCard, index) => (
        <JobCard
          key={index}
          icon={jobCard.icon}
          title={jobCard.title}
          description={jobCard.description}
        />
      ))}
    </div>
  </section>
)

export default JobSection
