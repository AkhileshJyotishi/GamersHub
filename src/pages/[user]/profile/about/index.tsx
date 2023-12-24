import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { fetchWithoutAuthorization } from "@/utils/functions"
import image from "@/assets/image/void.svg"

import SkeletonLoader from "@/components/ui/SkeletonLoader2"

import ProfilePageLayout from "../ProfileLayout"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const About = () => {
  const session = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [aboutData, setAboutData] = useState<IDetails | null>(null)

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(
        `/v1/users/otherDetails/${router.query.user}`,
        "GET"
      )
      setLoading(false)
      if (data?.error) {
        router.push(`/?emessage=Please authenticate`)
      } else {
        setAboutData(data?.data?.details)
      }
    }
    loadData()
  }, [session.data?.user?.name, router])
  //   console.log("aboutData", aboutData)
  if (loading) {
    return (
      <>
        <SkeletonLoader />
        <SkeletonLoader />
      </>
    )
  } else {
    return (
      <div className="w-full">
        {aboutData && (
          <div className="flex flex-col w-full items-start mt-[30px] gap-[10px] sm:gap-[20px]">
            {aboutData.userBio && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <h1 className="text-secondary font-semibold py-1 px-2">User Bio</h1>
                <p className="py-1 px-2">{aboutData.userBio}</p>
              </div>
            )}
            {aboutData.userEducation && !!aboutData.userEducation.length && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px] gap-2">
                <h1 className="text-secondary font-semibold py-1 px-2">Education</h1>
                <div className="w-full py-1 px-2 flex flex-row gap-4 flex-wrap items-center">
                  {(aboutData.userEducation ?? []).map((item, index) => (
                    <div
                      key={index}
                      className="w-[100%] md:w-[48%] border-[0.01px] min-h-[210px] border-secondary p-3 rounded-md"
                    >
                      <p className="text-secondary text-3xl">{item.degree}</p>
                      <p className="text-md py-1">From - {item.university}</p>
                      <p className="text-sm py-1 line-clamp-3">{item.description}</p>
                      <span className="text-slate-400 ">
                        {new Date(item.startingDate as Date).toLocaleDateString()}
                      </span>
                      {item?.endingDate && (
                        <span className="text-slate-400 ">
                          {" "}
                          - {new Date(item.endingDate as Date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {aboutData.userExperience && !!aboutData.userExperience.length && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px] gap-2">
                <h1 className="text-secondary font-semibold py-1 px-2">Experience</h1>
                <div className="w-full py-1 px-2 flex flex-row gap-4 flex-wrap items-center">
                  {(aboutData.userExperience ?? []).map((item, index) => (
                    <div
                      key={index}
                      className="w-[100%] md:w-[48%] border-[0.01px] min-h-[210px] border-secondary p-3 rounded-md"
                    >
                      <p className="text-secondary text-3xl">{item.company}</p>
                      <p className="text-md py-1">Role - {item.role}</p>
                      <p className="text-sm py-1 line-clamp-3">{item.description}</p>
                      <span className="text-slate-400 mt-1 ">
                        {new Date(item.startingDate as Date).toLocaleDateString()}{" "}
                      </span>
                      {item?.endingDate && (
                        <span className="text-slate-400 pr-2 mt-1 ">
                          {" "}
                          - {new Date(item.endingDate as Date).toLocaleDateString()}
                        </span>
                      )}
                      {item.presentWorking && (
                        <p
                          key={index}
                          className="inline-block px-3 py-1 mt-2 mb-1 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full"
                        >
                          Currently working
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {aboutData.userSkills && !!aboutData.userSkills.length && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <h1 className="text-secondary font-semibold py-1 px-2">Skills</h1>
                <div className="py-1 px-2">
                  {(aboutData.userSkills ?? [])?.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full"
                    >
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {aboutData.userSoftwares && !!aboutData.userSoftwares?.length && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <h1 className="text-secondary font-semibold py-1 px-2">Softwares</h1>
                <div className="py-1 px-2">
                  {(aboutData.userSoftwares ?? [])?.map((software, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full"
                    >
                      {software.software}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {aboutData &&
          !aboutData.userBio &&
          (!aboutData.userEducation || !aboutData.userEducation?.length) &&
          (!aboutData.userExperience || !aboutData.userExperience?.length) &&
          (!aboutData.userSkills || !aboutData.userSkills?.length) &&
          (!aboutData.userSoftwares || !aboutData.userSoftwares?.length) && (
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No User Info yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
              </div>
            </>
          )}
      </div>
    )
  }
}

About.getLayout = ProfilePageLayout
export default About
