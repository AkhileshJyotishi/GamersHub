import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { fetchWithoutAuthorization } from "@/utils/functions"

import HoizontalCard from "@/components/ui/Horizontalcard"

import ProfilePageLayout from "../ProfileLayout"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Albums = () => {
  const router = useRouter()
  console.log("ye router ki query hia  ", router.query)
  const [albumDetails, setalbumDetails] = useState<IAlbumBackend[]>([])
  // let albumDetails = await fetchData(`/v1/album/user`, token, "GET");

  useEffect(() => {
    // console.log("jwt  ", document.cookie.length)
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/album/user/${router.query.user}`, "GET")
      console.log("yeh wala data ", data)
      if (!data?.error) {
        setalbumDetails(data?.data?.albums)
      }
      // console.log(data?.data)

      // return data?.data;
    }
    loadData()
  }, [router])

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
