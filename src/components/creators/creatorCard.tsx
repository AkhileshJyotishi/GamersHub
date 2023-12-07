// import { MediaHostURL } from "@/utils/apiClient";
import Image from "next/image"
import { useRouter } from "next/router"

import defaultbannerImage from "@/assets/image/user-banner.png"

import MapPinIcon from "@/components/icons/mappinicon"
import { SecondaryTag } from "@/components/ui/badges"

const Card: React.FC<Creator> = ({ id, username, userDetails, bannerImage, profileImage }) => {
  //   let userProfile = creator?.profile_image?.url;
  //   let bgImage = creator?.banner?.url;
  const router = useRouter()
  return (
    <article className="flex flex-col bg-user_interface_2 rounded-[10px] p-[10px] sm:min-w-[200px] gap-[2px] w-full max-w-[450px]">
      <div className="flex flex-col items-center rounded-t-[10px] h-[140px] relative ">
        <Image
          height={500}
          width={900}
          alt="banner"
          className="w-full h-[140px] rounded-t-[10px]   absolute"
          src={bannerImage || defaultbannerImage}
        />
        <Image
          width={100}
          height={100}
          className={
            "w-[60px] h-[60px] md:w-[60px] md:h-[60px] object-cover rounded-full  border-[2px] absolute top-[80%]"
          }
          src={profileImage || defaultbannerImage}
          alt={" "}
        />
      </div>

      <div className="flex flex-col items-center mt-[40px]">
        <h3
          className="text-[18px] font-semibold hover:text-secondary transition duration-200 cursor-pointer"
          onClick={() => router.push(`/${id}/profile/albums`)}
        >
          {username ?? "Guest"}
          {/* {"Guest"} */}
        </h3>
        {userDetails && userDetails?.country && (
          <span className="flex items-center gap-2 mt-[10px]">
            <MapPinIcon className="w-4 h-4 text-user_interface_6" />
            <span className="text-center text-user_interface_6">
              {userDetails?.city},{userDetails?.country}
            </span>
          </span>
        )}
      </div>

      <hr className="w-[70%] mx-auto my-[7px] h-[1px] border-user_interface_3" />

      {
        <div className="flex flex-col items-start gap-3 p-3 min-h-[100px]">
          <h3 className="text-[18px] font-semibold ">Bio</h3>
          {userDetails?.userSoftwares?.length && userDetails?.userSoftwares?.length > 0 ? (
            <>
              <p className=" line-clamp-3">{userDetails?.userBio}</p>
            </>
          ) : (
            <>...</>
          )}
        </div>
      }

      {
        <div className="flex flex-col items-start gap-3 p-3">
          <h3 className="text-[18px] font-semibold ">Skills</h3>
          <div className="flex flex-wrap gap-[10px] ">
            {userDetails?.userSoftwares?.length && userDetails?.userSoftwares?.length > 0 ? (
              <>
                {userDetails?.userSkills?.map((skill: any, idx) => (
                  <SecondaryTag name={skill?.skill} key={idx} />
                ))}
              </>
            ) : (
              <>...</>
            )}
          </div>
        </div>
      }

      <div className="flex flex-col items-start p-3 gap-3 mt-[10px]">
        <h3 className="text-[18px] font-semibold ">Softwares</h3>
        <div className="flex flex-wrap gap-[10px] ">
          {userDetails?.userSoftwares?.length && userDetails?.userSoftwares?.length > 0 ? (
            <>
              {userDetails?.userSoftwares?.map((software: any, idx) => (
                <SecondaryTag name={software?.software} key={idx} />
              ))}
            </>
          ) : (
            <>...</>
          )}
        </div>
      </div>
    </article>
  )
}
export default Card
