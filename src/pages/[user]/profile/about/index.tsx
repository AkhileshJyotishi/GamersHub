import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { fetchWithoutAuthorization } from "@/utils/functions"
import Tippy from "@tippyjs/react"

import EditIcon from "@/components/icons/editIcon"
import ProfilePageLayout from "@/components/profileLayout"
import { SecondaryTag } from "@/components/ui/badges"
import SkeletonLoader from "@/components/ui/SkeletonLoader2"

import "tippy.js/dist/tippy.css"

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
        <div className="w-[90%] mx-auto flex flex-col gap-7 space-y-4 mt-[30px]">
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </>
    )
  } else {
    // aboutData?.userEducation![0].degree=""
    return (
      <div className="w-[90%] mx-auto">
        {aboutData && (
          <div className="flex flex-col w-full items-start mt-[30px] gap-[10px] sm:gap-[20px]">
            {aboutData.userBio && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">User Bio</h1>
                  <span
                    onClick={() => {
                      router.push("/settings?tab=Profile")
                    }}
                  >
                    <EditIcon className="h-[22px] w-[22px] text-secondary cursor-pointer hover:scale-110 transition duration-200" />
                  </span>
                </div>
                <div className="px-2 py-1">{aboutData.userBio}</div>
              </div>
            )}
            {aboutData.userEducation && !!aboutData.userEducation.length && (
              <div className="flex flex-col items-start sm:px-[5px] md:px-[10px] py-[10px] bg-user_interface_2 w-full rounded-[10px] gap-2">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Education</h1>
                  <span
                    onClick={() => {
                      router.push("/settings?tab=Education")
                    }}
                  >
                    <EditIcon className="h-[22px] w-[22px] text-secondary cursor-pointer hover:scale-110 transition duration-200" />
                  </span>
                </div>
                <div className="flex flex-row flex-wrap items-center w-full gap-4 px-2 py-1">
                  {(aboutData.userEducation ?? []).map((item, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[48%] bg-user_interface_3 p-4 rounded-md shadow-md mb-4 text-[18px]"
                    >
                      <Tippy content={item.degree}>
                        <div
                          className="text-3xl text-secondary font-bold mb-2 capitalize  text-ellipsis break-all line-clamp-1"
                          id="my-tooltip"
                        >
                          {item.degree}
                        </div>
                      </Tippy>
                      <div className="text-md text-secondary mb-2 text-ellipsis break-all line-clamp-1 capitalize">
                        {" "}
                        {item.university}
                      </div>
                      <div className="text-sm text-text mb-4 line-clamp-3  italic">
                        {item.description}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <div className="text-text mr-2 text-sm">
                          {new Date(item.startingDate as Date).toLocaleDateString(undefined, {
                            month: "long",
                            year: "numeric",
                            day: "numeric",
                          })}
                        </div>
                        {item?.endingDate && (
                          <>
                            <div className="text-sm text-text mr-2">-</div>
                            <div className="text-text text-sm">
                              {new Date(item.endingDate as Date).toLocaleDateString(undefined, {
                                month: "long",
                                year: "numeric",
                                day: "numeric",
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {aboutData.userExperience && !!aboutData.userExperience.length && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px] gap-2">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Experience</h1>
                  <span
                    onClick={() => {
                      router.push("/settings?tab=Experience")
                    }}
                  >
                    <EditIcon className="h-[22px] w-[22px] text-secondary cursor-pointer hover:scale-110 transition duration-200" />
                  </span>
                </div>
                <div className="flex flex-row flex-wrap items-center w-full gap-4 px-2 py-1">
                  {(aboutData.userExperience ?? []).map((item, index) => (
                    <div
                      key={index}
                      className="w-[100%] md:w-[48%] bg-user_interface_3 p-4 rounded-md shadow-md mb-4 text-[18px]"
                    >
                      <div className="text-3xl text-secondary font-bold mb-2 capitalize text-ellipsis break-all line-clamp-1">
                        {item.company}
                      </div>
                      <div className="text-md text-secondary mb-2 text-ellipsis break-all line-clamp-1 capitalize">
                        Role - {item.role}
                      </div>
                      <div className="text-sm text-text mb-4 line-clamp-3 italic">
                        {item.description}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <div className="text-text mr-2 text-sm">
                          {new Date(item.startingDate as Date).toLocaleDateString(undefined, {
                            month: "long",
                            year: "numeric",
                            day: "numeric",
                          })}
                        </div>
                        {item?.endingDate && (
                          <>
                            <div className="text-sm text-text mr-2">-</div>
                            <div className="text-text text-sm">
                              {new Date(item.endingDate as Date).toLocaleDateString(undefined, {
                                month: "long",
                                year: "numeric",
                                day: "numeric",
                              })}
                            </div>
                          </>
                        )}
                      </div>
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
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Skills</h1>
                  <span
                    onClick={() => {
                      router.push("/settings?tab=Profile")
                    }}
                  >
                    <EditIcon className="h-[22px] w-[22px] text-secondary cursor-pointer hover:scale-110 transition duration-200" />
                  </span>
                </div>
                <div className="flex items-center px-2 py-1 gap-4 overflow-x-scroll w-[100%] bg-[inherit] no-scroll mb-2">
                  {(aboutData.userSkills ?? [])?.map((tag, index) => (
                    <SecondaryTag name={tag.skill} key={index} className=" cursor-pointer" />
                  ))}
                </div>
              </div>
            )}
            {aboutData.userSoftwares && !!aboutData.userSoftwares?.length && (
              <div className="flex flex-col items-start px-[10px] sm:px-[20px] py-[10px] bg-user_interface_2 w-full rounded-[10px]">
                <div className="w-full flex items-center justify-between gap-4">
                  <h1 className="px-2 py-1 font-semibold text-secondary">Softwares</h1>
                  <span
                    onClick={() => {
                      router.push("/settings?tab=Profile")
                    }}
                  >
                    <EditIcon className="h-[22px] w-[22px] text-secondary cursor-pointer hover:scale-110 transition duration-200" />
                  </span>
                </div>
                <div className="flex items-center px-2 py-1 gap-4 overflow-x-scroll w-[100%] bg-[inherit] no-scroll mb-2">
                  {(aboutData.userSoftwares ?? [])?.map((tag, index) => (
                    <SecondaryTag name={tag.software} key={index} className=" cursor-pointer" />
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
