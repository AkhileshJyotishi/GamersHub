import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import image from "@/assets/image/void.svg"
import { fetchWithoutAuthorization } from "@/utils/functions"

import HoizontalCard from "@/components/ui/Horizontalcard"

import ProfilePageLayout from "../ProfileLayout"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Albums = () => {
  const router = useRouter()
  const [albumDetails, setalbumDetails] = useState<IAlbumBackend[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      router.replace("/?emessage=Please Authenticate")
      return
    }
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/album/user/${router.query.user}`, "GET")
      if (!data?.error) {
        setalbumDetails(data?.data?.albums)
      } else {
        toast.error(data.message)
      }
    }
    loadData()
  }, [router])
  // const memoizedAlbumDetails = useMemo(() => albumDetails, [albumDetails])
  return (
    <>
      {albumDetails.length > 0 ? (
        albumDetails?.map((album) => (
          <>
            <HoizontalCard
              title={album.title}
              className=""
              description={"fdlsjlfd"}
              imageSrc={album.banner || ""}
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
                <Image width={2060} height={2060} alt={""} className="w-[200px]" src={image} />
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
