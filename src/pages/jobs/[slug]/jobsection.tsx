// import Editor from '@/components/NovalEditor'
import React from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

type OmittedProperties = "about" | "country" | "city" | "title" | "user" | "banner"
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
        {data.jobType}
      </span>
    ),
  },
  {
    title: "Payment",
    dataKey: "payment",
    render: (data) => (
      <div className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {data.paymentType !== "negotiable" ? (
          <>
            <span className="text-[12px]">${data.paymentValue}</span>
            <span className="font-normal text-[12px]">{data.paymentType}</span>
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
        {data.expertise}
      </span>
    ),
  },
  {
    title: "Softwares",
    dataKey: "jobSoftwares",
    render: (data) => (
      <div className="flex flex-wrap gap-2">
        {data.jobSoftwares.map((software, index) => (
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
  <div className="bg-background flex flex-col items-start rounded-xl gap-[12px] p-3 flex-wrap">
    <h3 className="mb-2 font-medium text-[18px]">{title}</h3>
    <div className="flex flex-wrap w-full gap-2">{render(data)}</div>
  </div>
)

const JobDetails: React.FC<{ jobData: jobdataprop }> = ({ jobData }) => (
  <>
    {sections.map((section, index) => (
      <SectionRenderer key={index} {...section} data={jobData} />
    ))}
  </>
)

// const defaultjobDetails = {
//   type: "doc",
//   content: [
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "fsidftet",
//           type: "text",
//           marks: [
//             {
//               type: "textStyle",
//               attrs: {
//                 color: "#FFA500",
//               },
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "sldfhsl",
//           type: "text",
//           marks: [
//             {
//               type: "textStyle",
//               attrs: {
//                 color: "#FFA500",
//               },
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "sfsdf",
//           type: "text",
//           marks: [
//             {
//               type: "textStyle",
//               attrs: {
//                 color: "#FFA500",
//               },
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "taskList",
//       content: [
//         {
//           type: "taskItem",
//           attrs: {
//             checked: false,
//           },
//           content: [
//             {
//               type: "paragraph",
//               content: [
//                 {
//                   text: "this is code ",
//                   type: "text",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: "taskItem",
//           attrs: {
//             checked: false,
//           },
//           content: [
//             {
//               type: "paragraph",
//               content: [
//                 {
//                   text: "hahah ",
//                   type: "text",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: "taskItem",
//           attrs: {
//             checked: false,
//           },
//           content: [
//             {
//               type: "paragraph",
//               content: [
//                 {
//                   text: "===",
//                   type: "text",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "anot her one nldfknlsadssldfslflds;klsdaflk hon ther one adn tis ois working ",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "taskList",
//       content: [
//         {
//           type: "taskItem",
//           attrs: {
//             checked: false,
//           },
//           content: [
//             {
//               type: "paragraph",
//               content: [
//                 {
//                   text: "sfsfsd",
//                   type: "text",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: "taskItem",
//           attrs: {
//             checked: true,
//           },
//           content: [
//             {
//               type: "paragraph",
//               content: [
//                 {
//                   text: "fsfdf",
//                   type: "text",
//                   marks: [
//                     {
//                       type: "bold",
//                     },
//                   ],
//                 },
//                 {
//                   text: "sFDGDFG ",
//                   type: "text",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: "taskItem",
//           attrs: {
//             checked: false,
//           },
//           content: [
//             {
//               type: "paragraph",
//               content: [
//                 {
//                   text: "xznczl;",
//                   type: "text",
//                   marks: [
//                     {
//                       type: "link",
//                       attrs: {
//                         rel: "noopener noreferrer nofollow",
//                         href: "https://swww.google.com/",
//                         class:
//                           "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer",
//                         target: "_blank",
//                       },
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "heading",
//       attrs: {
//         level: 2,
//       },
//       content: [
//         {
//           text: "heading two",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "blockquote",
//       content: [
//         {
//           type: "paragraph",
//           content: [
//             {
//               text: "a quote to display",
//               type: "text",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "the code pladfddsfhldf;d",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "dfd",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "fs",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "df",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "sf",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "dsf",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "-dsf",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "dsf",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "sdfsd",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "sdf",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       content: [
//         {
//           text: "sdf",
//           type: "text",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//     },
//   ],
// }

const Jobsection = ({ jobData }: { jobData: jobdataprop }) => {
  console.log("jobdetails from backend", jobData.jobDetails)
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="text-[25px] font-bold">Job Description</div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className={clsx("w-[23vw] flex justify-center min-w-[280px] sticky top-[61px] h-fit")}>
          <div className="flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px]  md:flex">
            <JobDetails jobData={jobData} />
          </div>
        </div>
        <div className="w-full">
          <Editor
            className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
            editable={false}
            defaultValue={jobData.jobDetails || {}}
            disableLocalStorage
          />
        </div>
      </div>
    </div>
  )
}

export default Jobsection
