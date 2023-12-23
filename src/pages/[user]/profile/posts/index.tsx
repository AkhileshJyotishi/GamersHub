import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import image from "@/assets/image/void.svg"
// import { getSession } from "@/lib/auth"
// import { token } from "@/pages/settings"
import { fetchWithoutAuthorization } from "@/utils/functions"

import Card from "@/components/ui/card/card2"

// import HoizontalCard from "@/components/ui/Horizontalcard"
import ProfilePageLayout from "../ProfileLayout"
import SkeletonLoader from "@/components/ui/SkeletonLoader3"
// const shadeVariant ="absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Albums = () => {
  const router = useRouter()
  //
  const [postsDetails, setpostsDetails] = useState<IPostbackend[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/post/user/${router.query.user}`, "GET")
      setLoading(false)
      if (!data?.error) {
        setpostsDetails(data?.data?.posts || [])
      }
    }
    loadData()
  }, [router])

  return (
    <>
      {
        loading ?
          (<>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>) : (
            <>
              {postsDetails.length > 0 ? (
                postsDetails?.map((post) => (
                  <>
                    <Card
                      id={post.id}
                      key={post.id}
                      username={post.user.username}
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
                  </>
                ))
              ) : (
                <>
                  {
                    <>
                      <div className="flex flex-col items-center w-full gap-20 ">
                        <h3 className="text-3xl font-bold">No posts yet.</h3>
                        <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
                      </div>
                    </>
                  }
                </>
              )}

            </>)
      }
    </>
  )
}

Albums.getLayout = ProfilePageLayout
export default Albums
