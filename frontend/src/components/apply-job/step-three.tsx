import React, { useState } from "react"

interface ManualApplyProps {
  companyName: string
}

const ManualApply: React.FC<ManualApplyProps> = ({ companyName }) => {
  const [motivation, setMotivation] = useState<string>("")
  const [, setResume] = useState<File | null>(null)

  const handleMotivationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMotivation(event.target.value)
  }

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    setResume(selectedFile)
  }

  return (
    <div className="flex flex-col px-4 md:px-[75px] items-start ">
      <div>
        <h2 className="text-[24px] font-semibold ">Manual Apply</h2>
        <p className="text-[18px] font-medium mt-[10px]">{companyName}</p>
        <p className="text-[14px] text-user_interface_5 mt-[60px]">
          To easily apply through {companyName} profile, click
          <span className="text-secondary ml-1 cursor-pointer">here</span>
        </p>
      </div>

      {/* Motivation Section */}
      <div className="px-4 md:px-[39px] py-[32px] rounded-[10px] border-[0.8px] w-full my-4 border-user_interface_3">
        <h4 className="font-semibold text-[20px]">Motivation to apply</h4>
        <p className="text-user_interface_6 mt-9">
          Tell the recruiter why you are applying to this job.
        </p>
        <div className="flex flex-col w-full items-start relative">
          <textarea
            placeholder="You can explain your reason to apply for the position"
            name="motivation-to-apply"
            className="bg-user_interface_3 w-full rounded-[10px] border-[1px] border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm px-[12px] py-[10px] flex flex-row items-center mt-2 min-h-[140px]"
            value={motivation}
            onChange={handleMotivationChange}
          />
        </div>
      </div>

      <div className="md:px-[39px] py-[32px] rounded-[10px] border-[0.8px] w-full my-4 border-user_interface_3">
        <h4 className="font-semibold text-[20px]">Resume upload *</h4>
        <p className="text-user_interface_6 mt-6 mb-2">Upload your resume in PDF format</p>
        <label htmlFor="resume-upload" className="flex flex-row items-center gap-2 flex-wrap">
          <div className="bg-secondary hover:bg-secondary_2 active:bg-secondary_2  font-medium px-[30px] py-[10px] rounded-[10px] text-user_interface_2 flex items-center justify-center w-fit ">
            Upload
          </div>
        </label>
        <input
          id="resume-upload"
          type="file"
          className="appearance-none hidden"
          onChange={handleResumeChange}
        />
      </div>
    </div>
  )
}

export default ManualApply
