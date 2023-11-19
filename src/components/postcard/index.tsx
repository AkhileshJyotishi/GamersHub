import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
// import { MediaHostURL, strapiApiClient } from "@/utils/apiClient";
// import LikeIcon from "../../Icons/like";/
// import SaveIcon from "../../Icons/save";
import { useRouter } from "next/router"

import likeSVG from "@/assets/svg/like.svg"
import viewSVG from "@/assets/svg/view.svg"

// import { parseCookies } from "nookies";
// import GCHLink from "@/components/common/GCHLink";
import LikeIcon from "@/components/icons/likeIcon"
import SaveIcon from "@/components/icons/SaveIcon"

import styles from "./postcard.module.css"
interface Props {
  id: number
  cover: string
  views: number
  likes: number
  userProfileLink: string
  username: string
  title: string
  album_slug: string
  slug: string
  className?: string
  authUser?: any
  isSavedPost?: boolean
}

export default function PostCard({
  cover,
  likes,
  title,
  userProfileLink,
  username,
  views,
  album_slug,
  slug,
  className,
  // authUser,
  // id,
  isSavedPost: _isSavedPost,
}: Props) {
  //   let coverImage = cover?.url ? MediaHostURL + cover?.url : null;
  const router = useRouter()

  // const [savingPost, setSavingPost] = useState<boolean>(false)
  const [isSavedPost] = useState<boolean>(_isSavedPost || false)

  // if (cover?.formats?.medium) {
  //   coverImage = MediaHostURL + cover?.formats?.medium.url;
  // } else if (cover?.formats?.thumbnail) {
  //   coverImage = MediaHostURL + cover?.formats?.thumbnail.url;
  // } else {
  // }

  //   const handlePostSave = async () => {
  //     let jwt = parseCookies()["jwt"];
  //     if (!authUser || !jwt) {
  //       router.push("#login");
  //       return;
  //     }
  //     console.log({ slug, id });

  //     try {
  //       if (savingPost) {
  //         return;
  //       }
  //       setSavingPost(true);
  //       if (isSavedPost) {
  //         let res = await strapiApiClient.put(
  //           "/api/users/" + authUser?.id,
  //           {
  //             saved_posts: {
  //               disconnect: [id],
  //             },
  //           },
  //           {
  //             headers: {
  //               Authorization: "Bearer " + jwt,
  //             },
  //           }
  //         );
  //         setIsSavedPost(false);
  //       } else {
  //         let res = await strapiApiClient.put(
  //           "/api/users/" + authUser?.id,
  //           {
  //             saved_posts: {
  //               connect: [id],
  //             },
  //           },
  //           {
  //             headers: {
  //               Authorization: "Bearer " + jwt,
  //             },
  //           }
  //         );
  //         setIsSavedPost(true);
  //       }
  //       setSavingPost(false);
  //     } catch (error) {
  //       setSavingPost(false);
  //     }
  //   };
  return (
    <>
      <div
        className={
          "w-full max-w-[360px] sm:w-[270px] h-fit rounded-[10px] cursor-pointer " + className
        }
      >
        <div
          onClick={() => {
            router.push(`/${username}/portfolio/${album_slug}/${slug}`)
          }}
          className={"rounded-[10px] w-full h-[247px] relative " + styles["card-image-container"]}
        >
          {cover && (
            <Image
              width={600}
              height={600}
              alt={username}
              src={cover}
              className="rounded-[10px] object-cover w-full h-full hover:scale-125"
            />
          )}
          <div className="absolute inset-0 bg-[#00000067] opacity-0 hover:opacity-50 transition duration-500 ease-in-out"></div>
          <div className="absolute inset-0 w-full h-full to-bg-[#000] bg-gradient-to-t from-black/80 via-black/50"></div>
          <div
            className={
              "absolute flex-row flex justify-between items-center " +
              styles["card-buttons-container"]
            }
          >
            <Link
              href={`/${username}/portfolio/${album_slug}/${slug}`}
              className="text-sm font-semibold text-text"
            >
              {title}
            </Link>
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="p-2 bg-text hover:bg-text_dull rounded-[10px] shadow-sm cursor-pointer"
              >
                <LikeIcon className={"text-[#E54E51] w-5 h-5"} />
              </div>
              {isSavedPost ? (
                <div
                  className="p-2 bg-text_dull hover:bg-text rounded-[10px] shadow-sm cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    // handlePostSave();
                  }}
                >
                  <SaveIcon className={"text-user_interface_2 w-5 h-5"} />
                </div>
              ) : (
                <div
                  className="p-2 bg-text hover:bg-text_dull rounded-[10px] shadow-sm cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    // handlePostSave();
                  }}
                >
                  <SaveIcon className={"text-user_interface_2 w-5 h-5"} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={styles["card-details"] + " flex flex-row items-center  justify-between mt-5"}
        >
          <Link href={`/${username}/portfolio`} className="flex flex-row items-center gap-1 w-fit">
            {userProfileLink && (
              <Image
                width={50}
                height={50}
                alt={username}
                src={userProfileLink}
                className="rounded-[50%] w-[30px] h-[30px]"
              />
            )}
            <p
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              className="font-medium transition-all duration-100 text-text hover:text-secondary_2 "
            >
              {username}
            </p>
          </Link>
          <div className="flex flex-row items-center gap-3 ">
            <span className="flex items-center gap-1 flex-rows">
              <Image width={1060} height={1060} alt={""} className="w-[14px]" src={viewSVG} />
              <p className="text-xs">{views}</p>
            </span>
            <span className="flex items-center gap-1 flex-rows">
              <Image width={1060} height={1060} alt={""} className="w-[14px]" src={likeSVG} />
              <p className="text-xs">{likes}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
