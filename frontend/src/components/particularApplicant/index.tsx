import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa"
import { toast } from "react-toastify"

import defaultProfileImage from "@/assets/image/user-profile.svg"

import Filter from "../filter/mainfilter/filter"
import MapPinIcon from "../icons/mappinicon"
import TabButtons from "../tabbuttons"
import { SecondaryTag } from "../ui/badges"
import Button from "../ui/button"

type JobsPageProps = {
  applicant: ApplicantInfo
}
const ParticularApplicant: React.FC<JobsPageProps> = ({ applicant }) => {
  const [activetab, setactivetab] = useState<string>("Profile")
  return (
    <>
      <div
        className={
          "md:px-[10rem] px-[2rem] w-[100%] flex mx-auto justify-between items-center py-[52px] bg-user_interface_3 flex-wrap sm:gap-4 gap-10 "
        }
      >
        <div className=" flex flex-wrap items-center gap-4">
          <Image
            width={600}
            height={600}
            alt={""}
            className=" w-[106px] h-[106px] rounded-full mx-auto"
            src={applicant?.relatedJob?.user?.profileImage || defaultProfileImage}
          />
          <div className="font-medium  flex flex-col gap-[4px] mx-auto">
            <div className="text-text font-[700] text-[28px] text-center">
              {applicant.firstName + " " + applicant.lastName}
            </div>
            {applicant && applicant?.country && (
              <span className="flex items-center gap-2 [@media(max-width:500px)]:mx-auto">
                <MapPinIcon className="w-4 h-4 text-user_interface_6" />
                <span className="text-center text-user_interface_6">
                  {applicant?.city},{applicant?.country}
                </span>
              </span>
            )}
            <div className="flex flex-wrap items-center gap-4 pt-[4px] [@media(max-width:500px)]:mx-auto">
              <Link href={`mailto:${applicant.email}`}>
                <FaEnvelope className="hover:text-secondary_2 text-secondary_2 h-[22px] w-[22px]" />
              </Link>
              {applicant.phone && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    // your code here
                    navigator.clipboard
                      .writeText(`${applicant?.phone}`)
                      .then(() => {
                        toast.dismiss()
                        toast.success("Phone Number Copied!")
                      })
                      .catch(() => {})
                  }}
                >
                  <FaPhoneAlt className="hover:text-secondary_2 text-secondary_2 h-[20px] w-[20px]" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" [@media(max-width:500px)]:mx-auto">
          <Button
            className="text-sm justify-center py-2 px-4 mx-auto rounded-md bg-secondary disabled:cursor-not-allowed"
            style={{ zIndex: 19 }}
            onClick={() => {
              // route to chat section
            }}
          >
            Message
          </Button>
        </div>
      </div>
      <TabButtons
        seperator={false}
        tabNames={["Profile", "Portfolio", "Resume"]}
        setActiveTab={setactivetab}
        activeTab={activetab}
      />
      {activetab == "Profile" && (
        <>
          <div className="mx-auto flex flex-col w-[90%] sm:w-[80%] md:w-[70%] items-start mt-[30px] gap-[10px] sm:gap-[20px]">
            {applicant.bio && (
              <div className="flex flex-col items-start px-[5px] sm:px-[10px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Bio</h1>
                </div>
                <div className="px-2 py-1 flex-wrap break-all">{applicant.bio}</div>
              </div>
            )}
            {applicant.skills && !!applicant.skills.length && (
              <div className="flex flex-col items-start  sm:px-[5px] md:px-[10px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Skills</h1>
                </div>
                <div className="flex items-center px-2 py-1 gap-4 overflow-x-scroll w-[100%] bg-[inherit] no-scroll mb-2">
                  {(applicant.skills ?? [])?.map((tag, index) => (
                    <SecondaryTag name={tag} key={index} className=" cursor-pointer" />
                  ))}
                </div>
              </div>
            )}
            {applicant?.relatedJob?.motivationToApply && (
              <div className="flex flex-col items-start px-[5px] sm:px-[10px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Motivation to Apply</h1>
                </div>
                <div className="px-2 py-1 flex-wrap break-all">
                  {applicant?.relatedJob?.motivationToApply}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {activetab == "Portfolio" && (
        <>
          <div className="mx-auto flex flex-col w-[90%] sm:w-[80%] md:w-[70%] items-start mt-[30px] gap-[10px] sm:gap-[20px]">
            {applicant.portfolio ? (
              <div className="flex flex-col items-start px-[5px] sm:px-[10px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Link to Portfolio</h1>
                </div>
                <div className="px-2 py-1 flex-wrap break-all">{applicant.portfolio}</div>
              </div>
            ) : (
              <div className="flex flex-col items-start px-[5px] sm:px-[10px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold ">Nothing to see here</h1>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {activetab == "Resume" && (
        <>
          <div className="mx-auto flex flex-col w-[90%] sm:w-[80%] md:w-[70%] items-start mt-[30px] gap-[10px] sm:gap-[20px]">
            <Filter
              title=""
              inputType="file"
              accept=".pdf"
              value={applicant.relatedJob.resume as string}
              viewonlyPdf={false}
              downloadPDF={true}
              Variant="flex-col w-full flex"
              className="bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center"
            />
          </div>
        </>
      )}
    </>
  )
}

export default ParticularApplicant
