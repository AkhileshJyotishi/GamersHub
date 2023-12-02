// import { MediaHostURL } from "@/utils/apiClient";
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import EditIcon from "@/components/icons/editIcon"
import FaceBookIcon from "@/components/icons/facebook"
import GitHubIcon from "@/components/icons/github"
import GlobeIcon from "@/components/icons/globe"
import LinkedInIcon from "@/components/icons/linkedin"
import MailIcon from "@/components/icons/mail"
import MapPinIcon from "@/components/icons/mappinicon"
import PlusIcon from "@/components/icons/plus"
import TwitterIcon from "@/components/icons/twitter"
import YoutubeIcon from "@/components/icons/youtube"
import Button from "@/components/ui/button"

// import ViewIcon from "@/components/icons/viewIcon.svg"

interface Props {
  currentUser?: Allow
  authUser?: Allow
  className?: string
  isFollowing?: boolean
}

export default function ProfileCard({
  currentUser: _currentUser,
  authUser: _authUser,
  className,
  isFollowing: _isFollowing,
}: Props) {
  const [currentUser] = useState(_currentUser)
  // const profileImage = currentUser?.profile_image?.url

  const [authUser] = useState(_authUser)
  const [isFollowing] = useState(_isFollowing)
  const router = useRouter()
  const memberSince = new Date(currentUser?.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <div
        className={
          "bg-user_interface_2 flex flex-col items-center px-[18px]  lg:w-[22vw] md:w-[23vw] md:min-h-[900px] py-8 w-full rounded-xl h-[85vh] sticky top-[80px] " +
          className
        }
      >
        {/* About section */}
        <div className="flex flex-col items-center gap-4 ">
          <Image
            width={300}
            height={300}
            loading="lazy"
            src={
              "https://picsum.photos/id/250/900/900"
              // "/assets/placeholders/user-profile.png"
            }
            className="w-[150px] h-[150px] rounded-full border-2 border-light"
            alt={currentUser?.username}
          />
          <p className="text-2xl font-semibold text-center break-all ">
            {currentUser?.username}
            akhilesh
          </p>
          <h3 className="break-all text-dull">{currentUser?.occupation} enthusiasst</h3>
          {/* currentUser?.country && currentUser?.city && */}
          {
            <span className="flex flex-row items-center gap-2 break-all">
              <MapPinIcon className="h-5 xmin-w-5" />
              <p>
                {/* {AllCountries[currentUser?.country]} */}
                llucknow india
              </p>
            </span>
          }
        </div>
        {/* About section end */}

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4 p-3 mt-6 max-w-40 text-text">
          {currentUser?.id === authUser?.id ? (
            <>
              <Button
                onClick={() => router.push("/settings")}
                variant="primary"
                className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
              >
                <span className="flex flex-row items-center gap-2">
                  <EditIcon className="w-5 h-5 text-user_interface_7" />
                  <p className="text-text whitespace-nowrap">Edit profile</p>
                </span>
              </Button>

              <Button
                variant="secondary"
                className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
              >
                <span className="flex flex-row items-center gap-2">
                  {/* <ViewIcon className="w-4 h-4 text-user_interface_7" /> */}
                  <p className="whitespace-nowrap">View resume</p>
                </span>
              </Button>
            </>
          ) : (
            <>
              {!isFollowing && (
                <Button
                  variant="primary"
                  className="flex justify-center w-full p-2 bg-secondary rounded-xl"
                >
                  <span className="flex flex-row items-center gap-2">
                    <PlusIcon className="w-[28px] text-user_interface_7 h-[28px] m-[-0.7rem]" />
                    <p className="text-text whitespace-nowrap">Follow</p>
                  </span>
                </Button>
              )}

              {isFollowing && (
                <Button
                  //   onClick={unFollow}
                  variant="primary"
                  className="flex justify-center w-full p-2 bg-secondary rounded-xl"
                >
                  <span className="flex flex-row items-center gap-2">
                    <PlusIcon className="w-[28px] rotate-[45deg] text-user_interface_7 h-[28px] m-[-0.7rem]" />
                    <p className="text-user_interface_7">UnFollow</p>
                  </span>
                </Button>
              )}
              <Button
                // onClick={onMessageClick}
                variant="secondary"
                className="w-full"
              >
                <span className="flex justify-center w-full p-2 bg-secondary rounded-xl">
                  <MailIcon className="w-[14px] h-[14px]" fill="#000"/>
                  <p className="">Message</p>
                </span>
              </Button>
            </>
          )}
        </div>
        {/* Action Button  End*/}

        <div className="flex flex-col items-center w-full gap-4 mx-auto mt-12 text-text_dull">
          {/* <div className="flex flex-row items-center justify-between w-[80%]">
            <h4>Likes</h4>
            <h4>{currentUser?.likes} 34</h4>
          </div> */}

          <div className="flex flex-row items-center justify-between w-[80%]">
            <h4>Followers</h4>
            <h4>{currentUser?.followers} 45</h4>
          </div>

          <div className="flex flex-row items-center justify-between w-[80%]">
            <h4>Following</h4>
            <h4>{currentUser?.following} 45</h4>
          </div>
        </div>

        {/* ==== On the web ==== */}
        {
          // currentUser?.add_on_web &&
          //     Object.values(currentUser?.add_on_web).some(
          //         (value) => value !== ""
          //     ) &&
          <div className="flex flex-col items-center w-full mt-10">
            <h3 className="mx-auto mb-4 font-semibold">ON THE WEB</h3>
            <div className="flex flex-wrap justify-center gap-8 mt-5">
              {
                <Link title="Facebook" target="_blank" href={"currentUser?.add_on_web?.facebook"}>
                  <FaceBookIcon className="w-6 h-6" />
                </Link>
              }

              {
                <Link title="Linked In" target="_blank" href={"currentUser?.add_on_web?.linkedin"}>
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

        {/* SOCIAL*/}

        <div className="flex flex-col items-center w-full gap-2 p-3 pt-8 pb-3 text-center text-text_dull">
          <h5>MEMBER SINCE {memberSince.replace(" ", ",")}</h5>
          <span className="flex flex-row gap-2">
            <Link href={"#"}>Report</Link>|<Link href={"#"}>Block</Link>
          </span>
        </div>
      </div>
    </>
  )
}
