import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import sample from "@/assets/image/user-profile.svg"
import { useUserContext } from "@/providers/user-context"
import { shimmer, toBase64 } from "@/utils/functions"

import ArtstationIcon from "@/components/icons/artstatio"
import EditIcon from "@/components/icons/editIcon"
import FaceBookIcon from "@/components/icons/facebook"
import GitHubIcon from "@/components/icons/github"
import GlobeIcon from "@/components/icons/globe"
import LinkedInIcon from "@/components/icons/linkedin"
import MailIcon from "@/components/icons/mail"
import MapPinIcon from "@/components/icons/mappinicon"
import PlusIcon from "@/components/icons/plus"
// import PlusIcon from "@/components/icons/plus"
import TwitterIcon from "@/components/icons/twitter"
import YoutubeIcon from "@/components/icons/youtube"
import Button from "@/components/ui/button"

interface User {
  id: number
  createdAt: string
  username: string
  userDetails: {
    country: string
    city: string
  }
  _count: {
    followers_users: number
    following_users: number
  }
  add_on_web: Isocials
  profileImage: string
  socials: Isocials
}
interface Props {
  currentUser: User | null
  authUser?: Allow
  className?: string
  isFollowing?: boolean
}
export default function ProfileAccordion({
  currentUser: _currentUser,
  // authUser: _authUser,
  className,
  isFollowing: _isFollowing,
}: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const router = useRouter()
  const { userData } = useUserContext()
  const [authUser] = useState(userData)
  const [isFollowing] = useState(_isFollowing)

  // const [currentUser] = useState(_currentUser)

  const memberSince = new Date(currentUser?.createdAt as string).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  useEffect(() => {
    if (_currentUser) setCurrentUser(_currentUser)
  }, [_currentUser])
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
                loading="eager"
                src={currentUser?.profileImage || sample}
                className="w-[100px] h-[100px] rounded-full"
                alt={""}
                priority
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </div>
            <div className="flex justify-center text-xl font-bold text-center">
              <span className="capitalize">{currentUser?.username}</span>
            </div>
            {/* <span className="text-[14px] text-dull "> artist</span> */}
          </div>
          {currentUser?.userDetails?.country && currentUser?.userDetails?.city && (
            <span className="flex flex-row flex-wrap items-center gap-2 text-center">
              <MapPinIcon className="h-5 mx-auto min-w-5" />
              <p>
                {currentUser?.userDetails.city}
                {"  , "} {currentUser?.userDetails.country}
              </p>
            </span>
          )}
          {/* About section end */}

          {/* Action Button */}
          <div className="flex flex-col items-center w-full gap-4 p-3 mt-6 text-text">
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
          <div className="flex justify-around w-[90%]  flex-end text-dull gap-1 flex-wrap gap-y-2">
            <div className="flex flex-row py-1 text-center break-words">
              <div>
                {/* {formatLargeNumber(1)} <br /> */}
                <span>Followers:</span>
                {currentUser?._count?.followers_users}
              </div>
            </div>
            <div className="flex flex-row gap-2 py-1 text-center break-words">
              <span>Following:</span>
              <span>{currentUser?._count?.following_users} </span>
            </div>
          </div>
          {/* ==== On the web ==== */}
          {currentUser?.socials && (
            <div className="flex flex-col w-full mt-10">
              <div className="flex  flex-col flex-wrap justify-center mt-2  gap-7">
                <h3 className="mx-auto mb-4 font-semibold">ON THE WEB</h3>
                <div className="flex flex-wrap justify-center gap-8 mt-2 ">
                  {currentUser?.socials?.facebook && (
                    <Link
                      title="Facebook"
                      target="_blank"
                      href={currentUser?.socials?.facebook || ""}
                    >
                      <FaceBookIcon className="w-6 h-6" />
                    </Link>
                  )}

                  {currentUser?.socials?.linkedin && (
                    <Link
                      title="Linked In"
                      target="_blank"
                      href={currentUser?.socials?.linkedin || ""}
                    >
                      <LinkedInIcon className="w-6 h-6" />
                    </Link>
                  )}

                  {currentUser?.socials?.twitter && (
                    <Link
                      title="Twitter"
                      target="_blank"
                      href={currentUser?.socials?.twitter || ""}
                    >
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
                    <Link
                      title="YouTube"
                      target="_blank"
                      href={currentUser?.socials?.youtube || ""}
                    >
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
            </div>
          )}

          {/* Report section*/}
          <div className="flex flex-col items-center text-center w-full mt-[50px] text-text_dull gap-2">
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

  return (
    <>
      <ProfileAccordion />
    </>
  )
}
