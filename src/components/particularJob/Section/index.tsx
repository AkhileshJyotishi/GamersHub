// import Editor from '@/components/NovalEditor'
import React from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[40vh]"></div>
  },
})

type OmittedProperties = "about" | "country" | "city" | "title" | "user" | "banner" | "userId" |"remote" | "savedUsers"
type jobdataprop = Omit<BackendJob, OmittedProperties>

interface Section {
  title: string
  dataKey: string
  render: (data: jobdataprop) => React.ReactNode
}

const sections: Section[] = [
  {
    title: "Job Type",
    dataKey: "jobType",
    render: (data) => (
      <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {data?.jobType}
      </span>
    ),
  },
  {
    title: "Payment",
    dataKey: "payment",
    render: (data) => (
      <div className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {data?.paymentType !== "negotiable" ? (
          <>
            <span className="text-[12px]">${data?.paymentValue}</span>
            <span className="font-normal text-[12px]">{data?.paymentType}</span>
          </>
        ) : (
          <span className="font-normal text-[12px]">Negotiable</span>
        )}
      </div>
    ),
  },
  {
    title: "Level of Expertise",
    dataKey: "expertise",
    render: (data) => (
      <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {data?.expertise}
      </span>
    ),
  },
  {
    title: "Softwares",
    dataKey: "jobSoftwares",
    render: (data) => (
      <div className="flex flex-wrap gap-2">
        {data?.jobSoftwares?.map((software, index) => (
          <span
            key={index}
            className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
          >
            {software.software}
          </span>
        ))}
      </div>
    ),
  },
  // {
  //     title: "Experience",
  //     dataKey: "requirements",
  //     render: (data) => (
  //         <div className="flex flex-col items-start gap-2">
  //             <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
  //                 {data.requirements?.experience}
  //             </span>
  //         </div>
  //     ),
  // },
  // Add more sections as needed
]

const SectionRenderer: React.FC<Section & { data: jobdataprop }> = ({ title, data, render }) => (
  <div className="bg-background flex flex-col items-start rounded-xl gap-[12px] p-3 flex-wrap ">
    <h3 className="mb-2 font-medium text-[18px]">{title}</h3>
    <div className="flex flex-wrap w-full gap-2">{render(data)}</div>
  </div>
)

const JobDetails: React.FC<{ jobData: jobdataprop }> = ({ jobData }) => (
  <>
    {sections?.map((section, index) => <SectionRenderer key={index} {...section} data={jobData} />)}
  </>
)

const Jobsection = ({ jobData }: { jobData: jobdataprop }) => {
  // console.log("jobdetails from backend", jobData.jobDetails)
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="text-[25px] font-bold">Job Description</div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex justify-center min-w-[200px] md:sticky top-[61px] h-fit"
          )}
        >
          <div className="flex flex-col min-w-[200px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-8  md:flex">
            <JobDetails jobData={jobData} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-4">
            <>
              <h1 className="text-[22px] mt-4 font-semibold">Description</h1>
              {/* <Editor
          className={"bg-user_interface_2 w-full rounded-xl "}
          editable={false}
          storageKey="noval__content3"    
          defaultValue={jobData.jobDetails || {}}

          disableLocalStorage
        /> */}
              <div className="w-full p-12 bg-user_interface_2 rounded-xl">
                {jobData?.description}
              </div>
            </>
            <>
              <h1 className="text-[22px] font-semibold">Skills and requirements</h1>
              <Editor
                className={"bg-user_interface_2 w-full rounded-xl  md:overflow-y-scroll"}
                editable={false}
                storageKey="noval__content2"
                defaultValue={jobData?.jobDetails || {}}
                disableLocalStorage
              />
            </>

            <>
              <h1 className="text-[22px] mt-4 font-semibold">About the Recruiter</h1>
              <Editor
                className={"bg-user_interface_2 w-full rounded-xl "}
                editable={false}
                storageKey="noval__content1"
                defaultValue={jobData?.aboutRecruiter || {}}
                disableLocalStorage
              />
            </>
          </div>
          {/* <Editor
            className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
            editable={false}
            defaultValue={jobData.jobDetails || {}}
            disableLocalStorage
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Jobsection
