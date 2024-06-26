// import { MediaHostURL } from "@/utils/apiClient";
import Image from "next/image"
import { useRouter } from "next/router"

import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultProfileImage from "@/assets/image/user-profile.svg"
import { shimmer, toBase64 } from "@/utils/functions"

import MapPinIcon from "@/components/icons/mappinicon"
// import { SecondaryTag } from "@/components/ui/badges"

const Card: React.FC<Creator> = ({ id, username, userDetails, bannerImage, profileImage }) => {
  //   let userProfile = creator?.profile_image?.url;
  //   let bgImage = creator?.banner?.url;
  const router = useRouter()
  return (
    <article className="flex flex-col bg-user_interface_2 rounded-[10px] p-[10px] sm:min-w-[200px] gap-[2px] w-full  h-fit capitalize">
      <div className="flex flex-col items-center rounded-t-[10px] h-[140px] relative ">
        <Image
          height={500}
          width={900}
          alt="banner"
          className="w-full h-[140px] rounded-t-[10px] absolute"
          src={bannerImage || defaultbannerImage}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        {!bannerImage}
        <Image
          width={100}
          height={100}
          className={
            "w-[60px] h-[60px] md:w-[60px] md:h-[60px] object-cover rounded-full  border-[2px] absolute top-[80%]"
          }
          src={profileImage || defaultProfileImage}
          alt={" "}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
      </div>

      <div className="flex flex-col items-center mt-[40px]">
        <h3
          className="transition duration-300 cursor-pointer text-lg hover:text-secondary"
          onClick={() => router.push(`/${id}/profile/albums`)}
        >
          {username ?? "Guest"}
          {/* {"Guest"} */}
        </h3>
        {userDetails && userDetails?.country ? (
          <span className="flex items-center gap-2 mt-[10px]">
            <MapPinIcon className="w-4 h-4 text-user_interface_6" />
            <span className="text-center text-user_interface_6">
              {userDetails?.city},{userDetails?.country}
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
          {userDetails?.userBio ? (
            <div className=" line-clamp-3 w-full  break-all">{userDetails?.userBio}</div>
          ) : null}
        </div>
      }

      {/* {
        <div className="flex flex-col items-start gap-1.5 p-3">
          <h3 className="text-lg">Skills</h3>
          <div className="flex flex-wrap gap-[10px] ">
            {userDetails?.userSkills?.length && userDetails?.userSkills?.length > 0 ? (
              <>
                {userDetails?.userSkills?.map((skill, idx) => (
                  <SecondaryTag name={skill?.skill ?? ""} key={idx} />
                ))}
              </>
            ) : (
              <>...</>
            )}
          </div>
        </div>
      } */}

      {/* <div className="flex flex-col items-start p-3 gap-1.5 mt-[10px]">
        <h3 className="text-lg">Softwares</h3>
        <div className="flex flex-wrap gap-[10px] ">
          {userDetails?.userSoftwares?.length && userDetails?.userSoftwares?.length > 0 ? (
            <>
              {userDetails?.userSoftwares?.map((software: Allow, idx) => (
                <SecondaryTag name={software?.software} key={idx} />
              ))}
            </>
          ) : (
            <>...</>
          )}
        </div>
      </div> */}
    </article>
  )
}
export default Card
