// import { MediaHostURL } from "@/utils/apiClient";
import Image from "next/image"

// import ProfileImage from "../common/ProfileImage";
// import { SecondaryTag } from "../common/Tags";
// import ArrowDownIcon from "../Icons/arrow-down";
import testImage from "@/assets/image/profiles-slide-show.png"

import { SecondaryTag } from "@/components/ui/badges"

const Card: React.FC<Creator> = ({
  username,
  occupation,
  // banner,
  // profile_image,
  skills_lists,
  softwares_lists,
  user_bio,
}) => {
  //   let userProfile = creator?.profile_image?.url;
  //   let bgImage = creator?.banner?.url;

  return (
    <article className="flex flex-col bg-user_interface_2 rounded-[10px] p-[10px] sm:min-w-[200px] gap-[2px] ">
      <div className="flex flex-col items-center rounded-t-[10px] h-[140px] relative ">
        <Image
          height={500}
          width={900}
          alt="banner"
          className="w-full h-[110px] rounded-t-[10px]   absolute"
          src={testImage}
        />
        <Image
          width={100}
          height={100}
          className={
            "w-[60px] h-[60px] md:w-[60px] md:h-[60px] object-cover rounded-full  border-[2px] absolute top-[70%]"
          }
          src={testImage}
          alt={" "}
        />
      </div>

      <div className="flex flex-col items-center mt-[20px]">
        <h3 className="text-[18px] font-semibold ">
          {username ?? "Guest"}
          {/* {"Guest"} */}
        </h3>
        {/* <span className="mt-[10px]">{creator?.occupation ?? "..."}</span> */}
        <span className="mt-[10px] text-center">{occupation ?? "..."}</span>
      </div>

      <hr className="w-[70%] mx-auto my-[15px] h-[1px] border-user_interface_3" />

      {/* Bio */}
      {
        <div className="flex flex-col items-start gap-3 p-3 min-h-[130px]">
          <h3 className="text-[18px] font-semibold ">Bio</h3>
          <p className=" line-clamp-3">{user_bio?.bio ?? "bio comes here"}</p>
          {/* <p>{"bio comes here"}</p> */}
        </div>
      }

      {
        <div className="flex flex-col items-start gap-3 p-3">
          <h3 className="text-[18px] font-semibold ">Skills</h3>
          <div className="flex flex-wrap gap-[10px] ">
            {skills_lists?.map((skill, idx) => <SecondaryTag name={skill} key={idx} />)}
          </div>
        </div>
      }

      {softwares_lists && (
        <div className="flex flex-col items-start p-3 gap-3 mt-[10px]">
          <h3 className="text-[18px] font-semibold ">Softwares</h3>
          <div className="flex flex-wrap gap-[10px] ">
            {softwares_lists?.map((software: any, idx) => (
              <SecondaryTag name={software?.software} key={idx} />
            ))}
          </div>
        </div>
      )}
      {/* <Link
        href={`/${creator?.username}/portfolio`}
        className="text-secondary justify-self-end flex flex-row gap-[20px] items-center p-3 font-medium "
      >
        View full profile
        <ArrowDownIcon className={"text-secondary rotate-[270deg]"} />
      </Link> */}
    </article>
  )
}
export default Card
