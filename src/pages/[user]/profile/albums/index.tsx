import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import image from "@/assets/image/void.svg"
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
      } else {
        toast.error(data.message)
      }
      // console.log(data?.data)

      // return data?.data;
    }
    loadData()
  }, [router])
  const memoizedAlbumDetails = useMemo(() => albumDetails, [albumDetails])
  return (
    <>
      {memoizedAlbumDetails.length > 0 ? (
        memoizedAlbumDetails.map((album) => (
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
        ))
      ) : (
        <>
          {
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No albums yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
              </div>
            </>
          }
        </>
      )}
    </>
  )
}

Albums.getLayout = ProfilePageLayout
export default Albums
