import React, { useState } from "react"
import clsx from "clsx"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import defaultUserImage from "@/assets/image/user-profile.svg"
import image from "@/assets/image/void.svg"
import { getSession } from "@/lib/auth"
import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import ProfileCard from "@/components/newPostCard"
import { UserImage, UserInfo } from "@/components/ParticularGame/Head"
import Button from "@/components/ui/button"
import Share from "@/components/ui/Share"

const Index = ({
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
  const { setmodalData } = useModalContext()
  const [, setCopied] = useState<boolean>(false)
  const session = useSession()
  // console.log("working or not ", albumPosts)
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

  return (
    <>
      <Head>
        <title>Album Posts | {userData?.username || ""}</title>
      </Head>
      <div
        className={clsx(
          "absolute w-full max-w-[2000px]",
          ` bg-cover  bg-no-repeat bg-top`,
          "h-[490px]"
        )}
      >
        {
          <Image
            alt=""
            src={banner || defaultbannerImage}
            height={500}
            width={900}
            className="h-[490px] absolute w-full bg-cover  bg-no-repeat bg-top"
          />
        }
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background ">
          II
        </div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
      </div>
      <div
        className="relative max-w-[1500px] mx-auto top-10 flex gap-20 flex-col p-3  w-full min-h-screen"
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
            <UserImage href={profileImage || defaultUserImage} />
            <UserInfo title={title} />
          </div>
          <div className="flex gap-[25px]"></div>
        </div>
        {albumPosts.length > 0 && <h1 className="text-3xl font-bold text-center">Album Posts</h1>}
        {albumPosts.length > 0 ? (
          albumPosts?.map((post, key) => (
            <div
              className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]"
              key={key}
            >
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
                            router.push(`/${post.userId}/profile/portfolio/updatePost/${post.id}`)
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

export default Index

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

  const albumdata = await fetchWithoutAuthorization(`/v1/album/${id}`, "GET")

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

  const albumdata2 = albumdata?.data?.album
  return {
    props: {
      title: albumdata2?.title,
      banner: albumdata2?.banner,
      profileImage: albumdata2?.user?.profileImage,
      albumPosts: albumdata2?.posts,
    },
  }
}
