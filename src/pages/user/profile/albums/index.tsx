import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { fetchData } from "@/utils/functions"

import HoizontalCard from "@/components/ui/Horizontalcard"

import { ProfilePageLayout } from "../ProfileLayout"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Albums = () => {
  const session = useSession()

  const router = useRouter()
  const [albumDetails, setalbumDetails] = useState<IAlbumBackend[]>([])
  // let albumDetails = await fetchData(`/v1/album/user`, token, "GET");

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      const data = await fetchData(`/v1/album/user`, session.data?.user?.name as string, "GET")
      console.log(data)
      if (data?.error) {
        router.push(`/?error=Please authenticate`)
      } else {
        setalbumDetails(data?.data?.albums)
      }
      // console.log(data?.data)

      // return data?.data;
    }
    loadData()
  }, [session.data?.user?.name, router])

  return (
    <>
      {/* sdfsdfsdf */}
      {albumDetails &&
        albumDetails.map((album) => (
          <>
            <HoizontalCard
              title={album.title}
              className=""
              description={"fdlsjlfd"}
              imageSrc={album.banner}
              key={album.id}
              tags={album.keyword}
            />
          </>
        ))}
    </>
  )
}

Albums.getLayout = ProfilePageLayout
export default Albums
