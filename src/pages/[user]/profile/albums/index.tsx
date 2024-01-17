import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { title } from "process"
import { toast } from "react-toastify"

import image from "@/assets/image/void.svg"
import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import ProfileCard from "@/components/newPostCard"
import ProfilePageLayout from "@/components/profileLayout"
import Button from "@/components/ui/button"
// import Card from "@/components/ui/card/card2"
import HoizontalCard from "@/components/ui/Horizontalcard"
import Share from "@/components/ui/Share"
import SkeletonLoader from "@/components/ui/SkeletonLoader"

const Albums = () => {
  const router = useRouter()
  const [albumDetails, setalbumDetails] = useState<IAlbumBackend[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userData, setnewAlbum, setisCreateAlbumOpen } = useUserContext()
  const [postsDetails, setpostsDetails] = useState<IPostbackend[]>([])
  const [posts, setposts] = useState<boolean>()
  const [, setCopied] = useState<boolean>(false)
  const { setmodalData } = useModalContext()

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
  const handleClose = () => {
    setmodalData(() => ({
      buttonText: "",
      onClick: () => {},
      content: <></>,
      isOpen: false,
      onClose: () => {},
      title: <></>,
    }))
  }
  const copy = async () => {
    navigator.clipboard
      .writeText(`${window.location.href}`)
      .then(() => {
        setCopied(true)
        toast.dismiss()
        toast.success("Copied!")
      })
      .catch((error) => {
        console.error(error)
        setCopied(false)
      })
  }
  const onShare = (logoSrc: string, title: string) => {
    setmodalData(() => ({
      buttonText: "Copy Link",
      content: (
        <>
          {
            <Share
              description="description to the job post"
              hashtag="#GameCreators.io"
              image={logoSrc || window.location.href}
              title={title}
              key={Math.random() * 100}
            />
          }
          <div className="w-[80%] mx-auto  p-1 my-2 mt-4  text-text border-[0.1px] rounded border-secondary overflow-x-scroll no-scrollbar">
            {window.location.href}
          </div>
        </>
      ),
      onClick: () => {
        copy()
      },
      isOpen: true,
      onClose: () => {
        handleClose()
      },
      title: <>{title}</>,
    }))
  }

  const deletePost = async (id: number) => {
    const data = await fetchData(`/v1/post/${id}`, session.data?.user?.name as string, "DELETE")
    toast.dismiss()
    if (data?.error) {
      toast.error(data.message)
    } else {
      toast.success(data?.message)
    }
  }
  const onDelete = (id: number) => {
    setmodalData(() => ({
      buttonText: "Delete Post",
      content: <>Are you sure you want to delete Post</>,
      onClick: () => deletePost(id),
      isOpen: true,
      onClose: () => {
        handleClose()
      },
      title: <>{title}</>,
    }))
  }
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
                  if (albumDetails.length > 0)
                    router.push(`/${userData?.id}/profile/portfolio/CreatePost`)
                  else {
                    toast.info("First Create An Album")
                    setisCreateAlbumOpen(true)
                  }
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
        {!posts && (
          <>
            <div className="grid sm:w-[90%] sm:mx-auto my-4  sm:p-4  sm:grid-cols-2 xl:grid-cols-3  gap-[20px] 3xl:grid-cols-4">
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
            </div>
          </>
        )}

        {posts && (
          <>
            <div className="grid sm:w-[90%] sm:mx-auto my-4  sm:p-4  md:grid-cols-2 xl:grid-cols-3  gap-[20px] 3xl:grid-cols-4">
              {postsDetails.length > 0 ? (
                postsDetails?.map((post) => (
                  <ProfileCard
                    id={post.id}
                    key={post.id}
                    username={post.user.username}
                    userProfilePhoto={post.user.profileImage}
                    bannerImage={post.banner}
                    matureContent={post.matureContent}
                    title={post.title}
                    likedPost={(post?.postLikes?.likedUsers ?? []).map((like) => like) ?? []}
                    savedPost={post.savedUsers}
                    userId={post.userId}
                    actions={
                      userData?.id === post.userId
                        ? [
                            {
                              name: "Share",
                              onClick: () => {
                                onShare(post.user.profileImage, title)
                              },
                              className: "share-action",
                            },
                            {
                              name: "Edit",
                              onClick: () => {
                                router.push(
                                  `/${post.userId}/profile/portfolio/updatePost/${post.id}`
                                )
                              },
                              className: "edit-action",
                            },
                            {
                              name: "Delete",
                              onClick: () => {
                                onDelete(post.id)
                              },
                              className: "delete-action text-red-500 hover:!text-red-500  ",
                            },
                          ]
                        : [
                            {
                              name: "Share",
                              onClick: () => {
                                onShare(post.user.profileImage, title)
                              },
                              className: "share-action",
                            },
                            {
                              name: "Report",
                              onClick: () => {},
                              className: "report-action",
                            },
                          ]
                    }
                    likeCount={post?.postLikes?.likedUsers.length}
                    commentCount={post.comments.length}
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
            </div>
          </>
        )}
      </div>
    )
  }
}

Albums.getLayout = ProfilePageLayout
export default Albums
