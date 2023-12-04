const MEDIA_HOST_URL = ""
import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { useUserContext } from "@/providers/user-context"

import UploadIcon from "@/components/icons/upload"
import Button from "@/components/ui/button"

const BannerImage = ({
  currentUser,
  // authUser,
  setisCreateAlbumOpen,
  className,
}: {
  authUser?: any
  currentUser?: any
  className?: string
  setisCreateAlbumOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const url = currentUser?.banner?.url

  const [, setBannerImage] = useState<File | undefined>()

  const [bannerImageLink, setBannerImageLink] = useState<string | undefined>(
    url ? MEDIA_HOST_URL + url : undefined
  )

  return (
    <div className={"group relative w-full h-[15vh]" + className}>
      <div className="relative rounded-xl  h-[20vh]">
        <Image
          alt="Banner image"
          width={1500}
          height={800}
          loading="lazy"
          className="absolute w-full h-[18vh] object-cover "
          src={bannerImageLink || defaultbannerImage}
        />
        <div className="absolute top-0 w-full h-full bg-top bg-no-repeat rounded-xl">
          <div
            className="absolute flex items-end justify-center w-full h-full overflow-hidden group"
            style={{ zIndex: 17 }}
          >
            <div className="absolute top-0 right-0 flex flex-wrap justify-center gap-4 mt-3 md:justify-normal ">
              {session && (
                <Button
                  className="  bg-secondary  py-[10px] px-[30px] font-medium rounded-xl"
                  onClick={() => setisCreateAlbumOpen(true)}
                >
                  New Album
                </Button>
              )}
              {session && (
                <Button
                  className="  bg-secondary  py-[10px] px-[30px] font-medium rounded-xl"
                  onClick={() => {
                    router.push(`/${userData?.id}/profile/portfolio/CreatePost`)
                  }}
                >
                  New Post
                </Button>
              )}
            </div>
            <>
              {session && (
                <>
                  {bannerImageLink ? (
                    <>
                      <div className="flex flex-row items-end p-4 overflow-hidden transition duration-500 translate-y-32 opacity-0 gap-9 group-hover:translate-y-0 group-hover:opacity-100">
                        <Button
                          variant="primary"
                          className=" cursor-pointer flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px] "
                        >
                          <label htmlFor="file-replace" className="">
                            Replace Image
                          </label>
                          <input
                            onChange={(e) => {
                              if (!e.target.files) return
                              if (e.target.files?.length > 0) {
                                const file = e.target.files[0]
                                const url = URL.createObjectURL(file)
                                setBannerImage(file)
                                setBannerImageLink(url)
                                // URL.revokeObjectURL(url);
                                // uploadImage(file);
                              }
                            }}
                            multiple={false}
                            name="banner-image"
                            accept="image/*"
                            id="file-replace"
                            type="file"
                            className="hidden appearance-none"
                          ></input>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="transition duration-500 translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <label
                        htmlFor="banner-file-upload"
                        className="flex items-center mt-5 bg-white rounded-full cursor-pointer w-fit"
                      >
                        {/* <Image
                                        width={150}
                                        height={130}
                                        alt={""}
                                        loading="lazy"
                                        src={UploadImage}
                                    /> */}
                        <UploadIcon className="h-[200px] fill-secondary" />
                      </label>

                      <input
                        onChange={(e) => {
                          if (!e.target.files) return
                          if (e.target.files?.length > 0) {
                            const file = e.target.files[0]
                            const url = URL.createObjectURL(file)
                            setBannerImage(file)
                            setBannerImageLink(url)
                            // URL.revokeObjectURL(url);

                            // uploadImage(file);
                          }
                        }}
                        multiple={false}
                        accept="image/*"
                        id="banner-file-upload"
                        type="file"
                        className="hidden appearance-none"
                      />
                    </div>
                  )}
                </>
              )}
            </>
          </div>

          <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
          <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
          <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-background "></div>
        </div>
      </div>
    </div>
  )
}

export default BannerImage
