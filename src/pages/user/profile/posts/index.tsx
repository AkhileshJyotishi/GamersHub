import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

// import { getSession } from "@/lib/auth"
// import { token } from "@/pages/settings"
import { fetchData } from "@/utils/functions"

import Card from "@/components/ui/card/card2"

// import HoizontalCard from "@/components/ui/Horizontalcard"
import { ProfilePageLayout } from "../ProfileLayout"
// const shadeVariant ="absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Albums = () => {
  const session = useSession()

  //
  const [postsDetails, setpostsDetails] = useState<IPostbackend[]>([])

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      const data = await fetchData(`/v1/post/user`, session.data?.user?.name as string, "GET")
      if (data?.error) {
        toast.error(data.message)
      }
      console.log("psot data", data?.data)

      setpostsDetails(data?.data?.posts || [])

      // return data?.data;
    }
    loadData()
  }, [session.data?.user?.name])

  return (
    <>
      {/* sdfsdfsdf */}
      {postsDetails &&
        postsDetails.map((post) => (
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
              likedPost={post.postLikes}
              
              // location={data.location}
              // views={data.views}
              className="h-[350px] w-[100%] md:w-[300px] justify-self-center"
              imageWidth={400}
            />
            {/* <HoizontalCard title={album.title} className='' description={"fdlsjlfd"} imageSrc={album.banner} key={album.id} tags={album.keyword} /> */}
          </>
        ))}
    </>
  )
}

Albums.getLayout = ProfilePageLayout
export default Albums
