import Image from "next/image"

import profileSVG from "@/assets/svg/profile.svg"

// const MediaHostURL=
const ProfileImage = ({
  className,
  onClick,
}: {
  // user?: any
  className?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
}) => {
  //   let profileImage = user?.profile_image?.url;

  // if (user?.profile_image?.formats?.thumbnail?.url) {
  //   profileImage = MediaHostURL + user?.profile_image?.formats?.thumbnail?.url;
  // } else if (user?.profile_image?.formats?.small?.url) {
  //   profileImage = MediaHostURL + user?.profile_image?.formats?.small?.url;
  // } else if (user?.profile_image?.formats?.medium?.url) {
  //   profileImage = MediaHostURL + user?.profile_image?.formats?.medium?.url;
  // } else if (user?.profile_image) {
  //   profileImage = MediaHostURL + user?.profile_image?.url;
  // }

  return (
    <Image
      width={100}
      height={100}
      className={"w-[36px] h-[25px] md:w-[36px] md:h-[25px] object-cover rounded-full " + className}
      src={
        // profileImage
        //   ? MediaHostURL + profileImage
        //   :
        profileSVG
      }
      alt={" "}
      onClick={onClick}
    />
  )
}
export default ProfileImage
