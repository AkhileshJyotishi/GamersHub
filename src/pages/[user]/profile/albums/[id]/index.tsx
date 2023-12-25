import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import image from "@/assets/image/void.svg"
import { toast } from "react-toastify"
import Card from "@/components/ui/card/card2"
import { getSession } from "@/lib/auth"
import { fetchWithoutAuthorization } from "@/utils/functions"
import { useUserContext } from "@/providers/user-context"
import Image from "next/image"
import clsx from "clsx"
import { UserImage, UserInfo } from "@/pages/games/[slug]/GamePageHeader"
import Button from "@/components/ui/button"
import defaultbannerImage from "@/assets/image/user-banner.png"

import { useRouter } from "next/router"

const index = ({
  albumPosts,
  banner,
  title,
  profileImage,
}: {
  banner: string
  profileImage: string
  title: string
  userId: number
  albumPosts: IPostbackend[]
}) => {
  const router = useRouter()
  const { userData } = useUserContext()
  // console.log("working or not ", albumPosts)
  return (
    <>
      <Head>
        <title>Album Posts | {userData?.username || ""}</title>
      </Head>
      <div
        className={clsx("absolute w-full ", ` bg-cover  bg-no-repeat bg-top`, "h-[490px]")}
        style={{
          backgroundImage: `url(${defaultbannerImage})`,
        }}
      >
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div
        className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3  w-full "
        style={{ zIndex: 19 }}
      >
        <div className="p-4 font-extrabold ">
          <Button
            onClick={() => {
              router.back()
            }}
          >
            {" "}
            Back
          </Button>
        </div>
        <div className="flex flex-col flex-wrap justify-between gap-3 p-3">
          <div className="flex gap-[25px] flex-wrap justify-center md:justify-normal ">
            <UserImage href={profileImage} />
            <UserInfo title={title} />
          </div>
          <div className="flex gap-[25px]"></div>
        </div>
        {albumPosts.length > 0 && <h1 className="text-3xl font-bold text-center">Album Posts</h1>}
        {albumPosts.length > 0 ? (
          albumPosts?.map((post) => (
            <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
              <Card
                id={post.id}
                key={post.id}
                username={post?.user?.username}
                userProfilePhoto={post.user.profileImage}
                coverPhoto={post.banner}
                matureContent={post.matureContent}
                title={post.title}
                savedPost={post.savedUsers}
                likedPost={post.postLikes?.map((like) => like.likedUsers)}
                userId={post.userId}
                // location={data.location}
                // views={data.views}
                className="h-[350px] w-[100%] md:w-[300px] justify-self-center"
                imageWidth={400}
              />
              {/* <HoizontalCard title={album.title} className='' description={"fdlsjlfd"} imageSrc={album.banner} key={album.id} tags={album.keyword} /> */}
            </div>
          ))
        ) : (
          <>
            {
              <>
                <div className="flex flex-col items-center w-full gap-20 ">
                  <h3 className="text-3xl font-bold">No Album posts yet.</h3>
                  <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
                </div>
              </>
            }
          </>
        )}
      </div>
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  const { id } = query

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  let albumdata = await fetchWithoutAuthorization(`/v1/album/${id}`, "GET")

  if (albumdata?.error) {
    return {
      redirect: {
        destination: `/?emessage=${albumdata?.message}`,
        permanent: false,
      },
    }
  } else {
    toast.success(albumdata?.message)
  }
  // return resp.data;\

  let albumdata2 = albumdata?.data?.album
  console.log("albumdata2 ", albumdata2)
  return {
    props: {
      title: albumdata2?.title,
      banner: albumdata2?.banner,
      profileImage: albumdata2?.user?.profileImage,
      albumPosts: albumdata2?.posts,
    },
  }
}
