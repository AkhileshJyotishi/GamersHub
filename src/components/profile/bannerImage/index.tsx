import React, { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import defaultbannerImage from "@/assets/image/user-banner.png"
import { useUserContext } from "@/providers/user-context"
import { fetchData, shimmer, toBase64 } from "@/utils/functions"
import { fetchFile } from "@/utils/functions"

import UploadIcon from "@/components/icons/upload"
import Button from "@/components/ui/button"

type albumType = {
  title: string
  banner: File | null | string
  AlbumKeywords: string[]
  isEdit: boolean
}
const BannerImage = ({
  bannerImage,
  className,
}: {
  bannerImage: string | undefined
  className?: string
  setisCreateAlbumOpen: React.Dispatch<React.SetStateAction<boolean>>
  setnewAlbum: React.Dispatch<React.SetStateAction<albumType>>
}) => {
  const { data: session } = useSession()
  const params = useParams()
  const { userData, setuserData } = useUserContext()
  const [img, setBannerImage] = useState<File | undefined>(undefined)

  const [bannerImageLink, setBannerImageLink] = useState<string | undefined>(bannerImage)
  const uploadBanner = async () => {
    const formdata = new FormData()
    formdata.append("file", img as Blob)
    formdata.append("type", "user")
    toast.info("Uploading new Banner...")
    const isuploaded = await fetchFile(
      "/v1/upload/file",
      session?.user?.name as string,
      "POST",
      formdata
    )
    if (isuploaded?.error) {
      toast.error(isuploaded.error)
      return
    }
    const data = await fetchData(
      `/v1/users/${userData?.id}`,
      session?.user?.name as string,
      "PATCH",
      {
        bannerImage: isuploaded?.data.image.Location,
      }
    )
    if (data?.error) {
      toast.error(data.message)
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setuserData((prev) => ({ ...prev, bannerImage: isuploaded?.data.image.Location }))
      toast.dismiss()
      toast.success(data?.message)
    }
  }
  return (
    <div className={"group relative w-full h-[15vh]" + className}>
      <div className="relative rounded-xl  h-[20vh]">
        <Image
          alt=""
          width={1500}
          height={800}
          loading="eager"
          className="absolute w-full h-[18vh] object-cover "
          src={bannerImageLink || defaultbannerImage}
          priority
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        {session && params?.user && userData?.id === parseInt(params?.user as string) && (
          <div className="absolute top-0 w-full h-full bg-top bg-no-repeat rounded-xl">
            <div
              className="absolute flex items-end justify-center w-full h-full overflow-hidden group"
              style={{ zIndex: 17 }}
            >
              <>
                {session && (
                  <>
                    {bannerImageLink ? (
                      <>
                        {img ? (
                          <>
                            <div className="flex flex-row items-end p-4 overflow-hidden transition duration-500 translate-y-8 opacity-0 gap-9 group-hover:translate-y-0 group-hover:opacity-100">
                              <Button
                                variant="primary"
                                className=" cursor-pointer flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px] "
                                onClick={() => {
                                  uploadBanner()
                                }}
                              >
                                Upload
                              </Button>
                              <Button
                                variant="primary"
                                className=" cursor-pointer flex justify-center w-full p-2 bg-secondary rounded-xl max-w-[200px] "
                              >
                                <label htmlFor="file-replace" className="">
                                  Replace
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
                          <>
                            <div className="flex flex-row items-end p-4 overflow-hidden transition duration-500 translate-y-32 opacity-0 gap-9 group-hover:-translate-y-8 group-hover:opacity-100">
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
                        )}
                      </>
                    ) : (
                      <div className="transition duration-500 translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <label
                          htmlFor="banner-file-upload"
                          className="flex items-center mt-5 bg-white rounded-full cursor-pointer w-fit"
                        >
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
        )}
      </div>
    </div>
  )
}

export default BannerImage
