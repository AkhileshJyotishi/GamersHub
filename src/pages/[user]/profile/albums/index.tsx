import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import image from "@/assets/image/void.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchWithoutAuthorization } from "@/utils/functions"

import ProfilePageLayout from "@/components/profileLayout"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card/card2"
import HoizontalCard from "@/components/ui/Horizontalcard"
import SkeletonLoader from "@/components/ui/SkeletonLoader"

const Albums = () => {
  const router = useRouter()
  const [albumDetails, setalbumDetails] = useState<IAlbumBackend[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userData, setnewAlbum, setisCreateAlbumOpen } = useUserContext()
  const [postsDetails, setpostsDetails] = useState<IPostbackend[]>([])
  const [posts, setposts] = useState<boolean>()
  const session = useSession()
  const params = useParams()

  useEffect(() => {
    if (session && !userData?.id) {
      router.replace("/?emessage=Please Authenticate")
      return
    }
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/album/user/${router.query.user}`, "GET")
      setLoading(false)
      toast.dismiss()
      if (!data?.error) {
        setalbumDetails(data?.data?.albums)
      } else {
        toast.error(data.message)
      }
    }
    loadData()
  }, [router])

  useEffect(() => {
    if (!userData?.id) {
      router.replace("/?emessage=Please Authenticate")
      return
    }
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/post/user/${router.query.user}`, "GET")
      // setLoading(false)
      toast.dismiss()
      if (!data?.error) {
        setpostsDetails(data?.data?.posts || [])
      } else {
        toast.error(data.message)
      }
    }
    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-4">
        <div className="w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center  gap-3 mt-4 sm:justify-end">
            {session && params?.user && userData?.id === parseInt(params?.user as string) && (
              <Button
                className="bg-secondary w-[90%] min-[400px]:w-auto py-[10px] px-[30px] font-medium rounded-xl"
                onClick={() => {
                  setnewAlbum({
                    title: "",
                    banner: null,
                    AlbumKeywords: [],
                    isEdit: false,
                  })
                  setisCreateAlbumOpen(true)
                }}
              >
                New Album
              </Button>
            )}
            {session && params?.user && userData?.id === parseInt(params?.user as string) && (
              <Button
                className="bg-secondary w-[90%] min-[400px]:w-auto py-[10px] px-[30px] font-medium rounded-xl"
                onClick={() => {
                  router.push(`/${userData?.id}/profile/portfolio/CreatePost`)
                }}
              >
                New Post
              </Button>
            )}

            <Button
              title={!posts ? " Show  All  Posts" : "Back to Albums"}
              className="bg-secondary w-[90%] min-[400px]:w-auto py-[10px] px-[30px] font-medium rounded-xl"
              onClick={() => {
                setposts(!posts)
              }}
            />
          </div>
        </div>
        <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
          {!posts && (
            <>
              {albumDetails.length > 0 ? (
                albumDetails?.map((album, index) => (
                  <>
                    <HoizontalCard
                      title={album.title}
                      className=""
                      imageSrc={album.banner || ""}
                      id={album.id}
                      key={index}
                      tags={album.keyword}
                      userId={album.userId}
                      // handleAlbumEdit={handleAlbumEdit}
                    />
                  </>
                ))
              ) : (
                <>
                  <div className="flex flex-col items-center w-full gap-20">
                    <h3 className="text-3xl font-bold">No albums yet.</h3>
                    <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
                  </div>
                </>
              )}
            </>
          )}

          {posts && (
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
                        <Image
                          width={2060}
                          height={2060}
                          alt={""}
                          className="w-[200px]"
                          src={image}
                        />
                      </div>
                    </>
                  }
                </>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}

Albums.getLayout = ProfilePageLayout
export default Albums
