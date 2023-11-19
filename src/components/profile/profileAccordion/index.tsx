import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import sample from "@/assets/image/user-banner.png"

import EditIcon from "@/components/icons/editIcon"
import FaceBookIcon from "@/components/icons/facebook"
import GitHubIcon from "@/components/icons/github"
import GlobeIcon from "@/components/icons/globe"
import LinkedInIcon from "@/components/icons/linkedin"
// import MailIcon from "@/components/icons/mail"
import MapPinIcon from "@/components/icons/mappinicon"
// import PlusIcon from "@/components/icons/plus"
import TwitterIcon from "@/components/icons/twitter"
import YoutubeIcon from "@/components/icons/youtube"
import Button from "@/components/ui/button"

interface Props {
  currentUser?: any
  authUser?: any
  className?: string
  isFollowing?: boolean
}
export default function ProfileAccordion({
  currentUser: _currentUser,
  // authUser: _authUser,
  className, // isFollowing: _isFollowing,
}: Props) {
  const router = useRouter()

  const formatLargeNumber = (number: number): string => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "b"
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "m"
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "k"
    } else {
      return number.toString()
    }
  }
  const [currentUser] = useState(_currentUser)

  const memberSince = new Date(currentUser?.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const ProfileAccordion = () => {
    return (
      <>
        <div
          className={
            "text-text text-[16px] bg-user_interface_2  shadow-secondary flex p-3  flex-col items-center mt-12 lg:w-[40rem] w-11/12 sm:w-5/6 md:w-[55%] mx-auto my-10 rounded-xl gap-3" +
            className
          }
        >
          <div className="flex flex-col items-center w-[90%]">
            <div className="p-4">
              <Image
                width={100}
                height={100}
                loading="lazy"
                src={sample}
                className="w-[100px] h-[100px] rounded-full"
                alt={"currentUser?.username"}
              />
            </div>
            <h1 className="text-xl font-bold">ahilesh</h1>
            <span className="text-[14px] text-dull "> artist</span>
          </div>
          {
            <span className="flex flex-row items-center gap-2 break-all">
              <MapPinIcon className="h-5 xmin-w-5" />
              <p>
                {/* {AllCountries[currentUser?.country]} */}
                llucknow india
              </p>
            </span>
          }
          {/* <div className=" text-[14px] text-dull w-[90%] p-3 ml-2">
                        location
                    </div> */}
          <div className="flex justify-center w-[90%] py-2">
            <Button
              onClick={() => router.push("/settings/#softwares")}
              variant="primary"
              className="flex justify-center p-2 bg-secondary rounded-xl"
            >
              <span className="flex flex-row items-center gap-2">
                <EditIcon className="w-5 h-5 text-user_interface_7" />
                <p className="text-text whitespace-nowrap">Edit profile</p>
              </span>
            </Button>
          </div>
          <div className="flex justify-around w-[90%]  flex-end text-dull gap-1">
            <div className="flex flex-row py-1 text-center break-words">
              <div>
                {formatLargeNumber(1)} <br />
                followers
              </div>
            </div>
            <div className="py-1 text-center">
              {formatLargeNumber(20000000000)}
              <br />
              followers
            </div>
          </div>
          {/* ==== On the web ==== */}
          {
            // currentUser?.add_on_web &&
            //     Object.values(currentUser?.add_on_web).some(
            //         (value) => value !== ""
            //     ) &&
            <div className="flex flex-col w-full mt-10">
              <div className="flex flex-wrap justify-center mt-5 gap-7">
                {
                  <Link title="Facebook" target="_blank" href={"currentUser?.add_on_web?.facebook"}>
                    <FaceBookIcon className="w-6 h-6" />
                  </Link>
                }

                {
                  <Link
                    title="Linked In"
                    target="_blank"
                    href={"currentUser?.add_on_web?.linkedin"}
                  >
                    <LinkedInIcon className="w-6 h-6" />
                  </Link>
                }

                {
                  <Link title="Twitter" target="_blank" href={"currentUser?.add_on_web?.twitter"}>
                    <TwitterIcon className="w-6 h-6" />
                  </Link>
                }
                {/* 
                                {(
                                    <Link
                                        title="Artstation"
                                        target="_blank"
                                        href={"currentUser?.add_on_web?.artstation"}
                                    >
                                        <Image
                                            src="/assets/icons/artstation.svg"
                                            alt=""
                                            width={50}
                                            height={50}
                                            className="w-10 h-10 mt-[-0.5rem] "
                                        />
                                    </Link>
                                )} */}

                {
                  <Link title="Github" target="_blank" href={"currentUser?.add_on_web?.github"}>
                    <GitHubIcon className="w-6 h-6" />
                  </Link>
                }
                {
                  <Link title="YouTube" target="_blank" href={"currentUser?.add_on_web?.youtube"}>
                    <YoutubeIcon className="w-6 h-6" />
                  </Link>
                }
                {
                  <Link
                    title="Personal Website"
                    target="_blank"
                    href={"currentUser?.add_on_web?.personal_website"}
                  >
                    <GlobeIcon className="w-6 h-6 text-secondary_2" />
                  </Link>
                }
              </div>
            </div>
          }

          <div className="flex flex-col items-center text-center w-full mt-[50px] text-text_dull gap-2">
            <h5>MEMBER SINCE {memberSince.replace(" ", ",")}</h5>
            <span className="flex flex-row gap-2">
              <Link href={"#"}>Report</Link>|<Link href={"#"}>Block</Link>
            </span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <ProfileAccordion />
    </>
  )
}
