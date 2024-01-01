import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import image from "@/assets/image/void.svg"
import { fetchWithoutAuthorization } from "@/utils/functions"

import ProfilePageLayout from "@/components/profileLayout"
import Card from "@/components/ui/card/card2"
import SkeletonLoader from "@/components/ui/SkeletonLoader3"
import { toast } from "react-toastify"
import { useUserContext } from "@/providers/user-context"

const Albums = () => {
  const { userData } = useUserContext()
  const router = useRouter()
  const [postsDetails, setpostsDetails] = useState<IPostbackend[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!userData?.id) {
      router.replace("/?emessage=Please Authenticate")
      return
    }
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/post/user/${router.query.user}`, "GET")
      setLoading(false)
      if (!data?.error) {
        setpostsDetails(data?.data?.posts || [])
      } else {
        toast.error(data.message)
      }
    }
    loadData()
  }, [router])

  return (
    <div className="grid w-[90%] mx-auto my-4 p-4  2xl:grid-cols-3 sm:grid-cols-2 gap-[20px]">
      {loading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <>
          {postsDetails.length > 0 ? (
            postsDetails?.map((post) => (
              <Card
                id={post.id}
                key={post.id}
                username={post.user.username}
                userProfilePhoto={post.user.profileImage}
                coverPhoto={post.banner}
                matureContent={post.matureContent}
                title={post.title}
                savedPost={post.savedUsers}
                likedPost={(post?.postLikes?.likedUsers ?? []).map((like) => like) ?? []}
                userId={post.userId}
                // location={data.location}
                // views={data.views}
                className="h-[350px] w-[100%] md:w-[300px] justify-self-center"
                imageWidth={400}
              />
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
        </>
      )}
    </div>
  )
}

Albums.getLayout = ProfilePageLayout
export default Albums
