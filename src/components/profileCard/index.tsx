// import { MediaHostURL } from "@/utils/apiClient";
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import defaultbannerImage from "@/assets/image/user-profile.svg"
import { useUserContext } from "@/providers/user-context"

import ArtstationIcon from "@/components/icons/artstatio"
import EditIcon from "@/components/icons/editIcon"
import FaceBookIcon from "@/components/icons/facebook"
import GitHubIcon from "@/components/icons/github"
import GlobeIcon from "@/components/icons/globe"
import LinkedInIcon from "@/components/icons/linkedin"
import MailIcon from "@/components/icons/mail"
// import MailIcon from "@/components/icons/mail"
import MapPinIcon from "@/components/icons/mappinicon"
import PlusIcon from "@/components/icons/plus"
import TwitterIcon from "@/components/icons/twitter"
import YoutubeIcon from "@/components/icons/youtube"
import Button from "@/components/ui/button"

// import ViewIcon from "@/components/icons/viewIcon.svg"
interface Props {
  currentUser: User | null
  authUser?: Allow
  className?: string
  isFollowing?: boolean
}

export default function ProfileCard({
  currentUser: _currentUser,
  // authUser: _authUser,
  className,
  isFollowing: _isFollowing,
}: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  // const profileImage = currentUser?.profile_image?.url
  const { userData } = useUserContext()
  const [authUser] = useState(userData)
  const [isFollowing] = useState(_isFollowing)
  const router = useRouter()
  const memberSince = new Date(currentUser?.createdAt as string).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  useEffect(() => {
    if (_currentUser) setCurrentUser(_currentUser)
  }, [_currentUser])

  return (
    <>
      <div
        className={
          "bg-user_interface_2 flex flex-col items-center px-[4px] sm:px-[8px] md:px-[18px] md:min-h-[676px] py-8  rounded-xl h-[85vh] sticky top-[80px] overflow-y-scroll " +
          className
        }
      >
        {/* About section */}
        <div className="flex flex-col items-center gap-4 ">
          <Image
            width={300}
            height={300}
            loading="eager"
            src={currentUser?.profileImage || defaultbannerImage}
            className="w-[150px] h-[150px] rounded-full border-2 border-light"
            alt={""}
          />

          <div className="text-2xl font-semibold text-center break-words capitalize">
            {currentUser?.username || "User"}
          </div>
          {/* <h3 className="break-all text-dull">{currentUser?.occupation}</h3> */}
          {currentUser?.userDetails?.country && currentUser?.userDetails?.city && (
            <span className="flex flex-row flex-wrap items-center justify-center gap-2 break-words">
              <MapPinIcon className="h-5 min-w-5" />
              <p className="text-center">
                {currentUser?.userDetails.city}
                {"  , "} {currentUser?.userDetails.country}
              </p>
            </span>
          )}
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

              {currentUser?.userDetails?.resume ? (
                currentUser.userDetails.resume != "" ? (
                  <Link
                    href={currentUser.userDetails.resume}
                    // variant="primary"
                    target="_blank"
                    // onClick={() => {
                    //   convertLinktoObjectUrl(currentUser?.userDetails?.resume)
                    // }}
                    className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
                  >
                    <span className="flex flex-row items-center gap-2">
                      {/* <ViewIcon className="w-4 h-4 text-user_interface_7" /> */}
                      <p className="whitespace-nowrap">View resume</p>
                    </span>
                  </Link>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      router.push("/settings")
                    }}
                    className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
                  >
                    <span className="flex flex-row items-center gap-2">
                      {/* <ViewIcon className="w-4 h-4 text-user_interface_7" /> */}
                      <p className="whitespace-nowrap">Upload resume</p>
                    </span>
                  </Button>
                )
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => {
                    router.push("/settings")
                  }}
                  className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
                >
                  <span className="flex flex-row items-center gap-2">
                    {/* <ViewIcon className="w-4 h-4 text-user_interface_7" /> */}
                    <p className="whitespace-nowrap">Upload resume</p>
                  </span>
                </Button>
              )}
            </>
          ) : (
            <>
              {!isFollowing && (
                <Button
                  variant="primary"
                  className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
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
                  className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
                >
                  <span className="flex flex-row items-center gap-2">
                    <PlusIcon className="w-[28px] rotate-[45deg] text-user_interface_7 h-[28px] m-[-0.7rem]" />
                    <p className="text-user_interface_7">UnFollow</p>
                  </span>
                </Button>
              )}
              <Button
                // onClick={onMessageClick}
                variant="primary"
                className="flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px]"
              >
                <span className="flex flex-row items-center gap-2">
                  <MailIcon className="w-[18px] h-[18px]" fill="#fff" />
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
            <h4>{currentUser?._count.followers_users} </h4>
          </div>

          <div className="flex flex-row items-center justify-between w-[80%]">
            <h4>Following</h4>
            <h4>{currentUser?._count.following_users} </h4>
          </div>
        </div>

        {/* ==== On the web ==== */}
        {currentUser?.socials && (
          <div className="flex flex-col items-center w-full mt-10">
            <h3 className="mx-auto mb-4 font-semibold">ON THE WEB</h3>
            <div className="flex flex-wrap justify-center gap-8 mt-5">
              {currentUser?.socials?.facebook && (
                <Link title="Facebook" target="_blank" href={currentUser?.socials?.facebook || ""}>
                  <FaceBookIcon className="w-6 h-6" />
                </Link>
              )}

              {currentUser?.socials?.linkedin && (
                <Link title="Linked In" target="_blank" href={currentUser?.socials?.linkedin || ""}>
                  <LinkedInIcon className="w-6 h-6" />
                </Link>
              )}

              {currentUser?.socials?.twitter && (
                <Link title="Twitter" target="_blank" href={currentUser?.socials?.twitter || ""}>
                  <TwitterIcon className="w-6 h-6" />
                </Link>
              )}

              {currentUser?.socials?.artstation && (
                <Link
                  title="Artstation"
                  target="_blank"
                  href={"currentUser?.add_on_web?.artstation"}
                >
                  <ArtstationIcon className="w-6 h-6" />
                </Link>
              )}

              {currentUser?.socials?.github && (
                <Link title="Github" target="_blank" href={currentUser?.socials?.github || ""}>
                  <GitHubIcon className="w-6 h-6" />
                </Link>
              )}
              {currentUser?.socials?.youtube && (
                <Link title="YouTube" target="_blank" href={currentUser?.socials?.youtube || ""}>
                  <YoutubeIcon className="w-6 h-6" />
                </Link>
              )}
              {currentUser?.socials?.portfolio && (
                <Link
                  title="Personal Website"
                  target="_blank"
                  href={currentUser?.socials?.portfolio || ""}
                >
                  <GlobeIcon className="w-6 h-6 text-secondary_2" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* SOCIAL*/}

        <div className="flex flex-col items-center w-full gap-2 p-3 pt-8 pb-3 text-center text-text_dull">
          <h6>MEMBER SINCE {memberSince}</h6>
          {/* {currentUser?.id !== authUser?.id && (
            <span className="flex flex-row gap-2">
              <Link href={"#"} className="text-red-500">
                Report
              </Link>
              {"   "}
            </span>
          )} */}
        </div>
      </div>
    </>
  )
}
