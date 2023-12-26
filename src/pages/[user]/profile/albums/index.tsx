import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import image from "@/assets/image/void.svg"
import { useUserContext } from "@/providers/user-context"
import { fetchWithoutAuthorization } from "@/utils/functions"

import ProfilePageLayout from "@/components/profileLayout"
import HoizontalCard from "@/components/ui/Horizontalcard"
import SkeletonLoader from "@/components/ui/SkeletonLoader"
// const shadeVariant = "absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"
const Albums = () => {
  const router = useRouter()
  const [albumDetails, setalbumDetails] = useState<IAlbumBackend[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userData } = useUserContext()

  useEffect(() => {
    if (!userData?.id) {
      router.replace("/?emessage=Please Authenticate")
      return
    }
    const loadData = async () => {
      const data = await fetchWithoutAuthorization(`/v1/album/user/${router.query.user}`, "GET")
      setLoading(false)
      if (!data?.error) {
        setalbumDetails(data?.data?.albums)
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
      <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
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
      </div>
    )
  }
}

Albums.getLayout = ProfilePageLayout
export default Albums
