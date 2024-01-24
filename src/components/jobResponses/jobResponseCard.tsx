// import { MediaHostURL } from "@/utils/apiClient";
import Image from "next/image"
import { useRouter } from "next/router"

import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultProfileImage from "@/assets/image/user-profile.svg"
import { shimmer, toBase64 } from "@/utils/functions"

import MapPinIcon from "@/components/icons/mappinicon"
import { SecondaryTag } from "../ui/badges"
// import { SecondaryTag } from "@/components/ui/badges"

interface jobResponseCard {
  jobApplication: jobApplications
  mode: string
}

const Card: React.FC<jobResponseCard> = ({ jobApplication, mode }) => {
  const router = useRouter()
  return (
    <article className="flex flex-col bg-user_interface_2 rounded-[10px] p-[10px] sm:min-w-[200px] gap-[2px] w-full  h-fit capitalize">
      <div className="flex flex-col items-center rounded-t-[10px] h-[140px] relative ">
        <Image
          height={500}
          width={900}
          alt="banner"
          className="w-full h-[140px] rounded-t-[10px] absolute"
          src={jobApplication?.user?.bannerImage || defaultbannerImage}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        {!jobApplication?.user?.bannerImage}
        <Image
          width={100}
          height={100}
          className={
            "w-[60px] h-[60px] md:w-[60px] md:h-[60px] object-cover rounded-full  border-[2px] absolute top-[80%]"
          }
          src={jobApplication?.user?.profileImage || defaultProfileImage}
          alt={" "}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
      </div>

      <div className="flex flex-col items-center mt-[40px]">
        <h3 className="transition duration-300 text-lg">
          {mode == "MANUAL"
            ? jobApplication?.ApplicantInfo?.firstName +
                " " +
                jobApplication?.ApplicantInfo?.lastName ?? "Guest"
            : jobApplication?.user?.username ?? "Guest"}
        </h3>
        {mode == "MANUAL" ? (
          jobApplication?.ApplicantInfo && jobApplication.ApplicantInfo.country ? (
            <span className="flex items-center gap-2 mt-[10px]">
              <MapPinIcon className="w-4 h-4 text-user_interface_6" />
              <span className="text-center text-user_interface_6">
                {jobApplication.ApplicantInfo.country},{jobApplication.ApplicantInfo.city}
              </span>
            </span>
          ) : (
            <div className="h-8" />
          )
        ) : jobApplication.user.userDetails && jobApplication.user.userDetails?.country ? (
          <span className="flex items-center gap-2 mt-[10px]">
            <MapPinIcon className="w-4 h-4 text-user_interface_6" />
            <span className="text-center text-user_interface_6">
              {jobApplication.user.userDetails?.city},{jobApplication.user.userDetails?.country}
            </span>
          </span>
        ) : (
          <div className="h-8" />
        )}
      </div>

      <hr className="w-[70%] mx-auto my-[7px] h-[1px] border-user_interface_3" />

      {
        <div className="flex flex-col items-start gap-1.5 p-3 min-h-[100px]">
          <h3 className="text-lg">Bio</h3>
          {mode != "MANUAL" && jobApplication.user.userDetails?.userBio ? (
            <div className=" line-clamp-3 w-full  break-all">
              {jobApplication.user.userDetails?.userBio}
            </div>
          ) : null}
          {mode == "MANUAL" && jobApplication?.ApplicantInfo?.bio ? (
            <div className=" line-clamp-3 w-full  break-all">
              {jobApplication?.ApplicantInfo?.bio}
            </div>
          ) : null}
        </div>
      }

      {
        <div className="flex flex-col items-start gap-1.5 px-3 py-1">
          <h3 className="text-lg">Skills</h3>
          <div className="flex flex-wrap gap-[10px] ">
            {mode != "MANUAL" &&
              jobApplication.user.userDetails?.userSkills &&
              (jobApplication.user.userDetails?.userSkills?.length > 0 ? (
                <>
                  {jobApplication.user.userDetails?.userSkills?.map((skill, idx) => (
                    <SecondaryTag name={skill?.skill ?? ""} key={idx} />
                  ))}
                </>
              ) : (
                <>...</>
              ))}
            {mode == "MANUAL" &&
              jobApplication.ApplicantInfo.skills &&
              (jobApplication.ApplicantInfo.skills.length > 0 ? (
                <>
                  {(jobApplication.ApplicantInfo.skills ?? [])?.map((skill, idx) => (
                    <SecondaryTag name={skill ?? ""} key={idx} />
                  ))}
                </>
              ) : (
                <>...</>
              ))}
          </div>
        </div>
      }
      <div
        className="flex group w-fit flex-row items-center gap-1 text-secondary px-3 cursor-pointer"
        onClick={() => {
          let x
          if (jobApplication.applyMethod == "MANUAL") {
            x = `/jobs/response/${jobApplication?.ApplicantInfo?.id}`
          } else {
            x = `/${jobApplication?.user?.id}/profile/albums`
          }
          router.push(x)
        }}
      >
        <span>
          {jobApplication.applyMethod == "MANUAL" ? "View full response" : "View full profile"}
        </span>
        <svg
          className="text-secondary rotate-[-90deg] transition-all group-hover:translate-x-1"
          width="17"
          height="17"
          fill="none"
          viewBox="0 0 17 17"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.333"
            d="M8.5 5.086v9.333M13.166 9.75L8.5 14.417 3.833 9.75"
          ></path>
        </svg>
      </div>
    </article>
  )
}
export default Card
