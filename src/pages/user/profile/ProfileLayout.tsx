import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { fetchData } from "@/utils/functions"

import Filter from "@/components/filter/mainfilter/filter"
import CloseIcon from "@/components/icons/closeIcon"
import BannerImage from "@/components/profile/bannerImage"
import ProfileAccordion from "@/components/profile/profileAccordion"
import Button from "@/components/ui/button"
// import TabSelector from './tabnavigation'
// import Card from '@/components/ui/card/card2'
import Modal from "@/components/ui/modal"

import ProfileCard from "./profileCard"
import { toast } from "react-toastify"

// const data = {
//   username: "Alice Smith",
//   userProfilePhoto: "https://picsum.photos/200/301",
//   coverPhoto: "https://picsum.photos/id/250/900/900",
//   location: "Los Angeles, USA",
//   views: "2,345",
// }

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  useEffect(() => {
    console.log("kya ye mount hua")
  }, [])
  const tabs = ["posts", "albums"]

  const Tab = () => {
    return tabs.map((tab) => {
      return (
        <>
          <Link className={clsx("sm:min-w-[80px] active:current cursor-pointer")} href={tab}>
            <div
              // href="#"
              className={` inline-block   p-2 active:text-secondary  active:bg-[#00000090]
            bg-white
              text-light outline-none focus:outline-none   `}
            >
              {tab}
            </div>
          </Link>
        </>
      )
    })
  }

  const [isCreateAlbumOpen, setisCreateAlbumOpen] = useState<boolean>(false)
  type albumType = {
    title: string
    banner: File | null | string
    AlbumKeywords: string[]
  }
  const [newAlbum, setnewAlbum] = useState<albumType>({
    title: "",
    banner: null,
    AlbumKeywords: [],
  })
  const handlecreateAlbum = async () => {

    newAlbum.banner = "https://cdnb.artstation.com/p/recruitment_companies/headers/000/003/159/thumb/ArtStation_Header.jpg"
    const albumData = await fetchData(
      "/v1/album/user",
      session.data?.user?.name as string,
      "POST", {
      title: newAlbum.title,
      banner: newAlbum.banner,
      keywords: newAlbum.AlbumKeywords
    }
    )
    if (albumData?.error) {
      toast.error(albumData.message)
    }
    else {
      toast.success(albumData?.message)

    }
    console.log(albumData)
  }
  return (
    <div className="flex flex-col gap-5 p-5 lg:flex-row">
      <ProfileCard className="hidden lg:block" />
      <Modal isOpen={isCreateAlbumOpen} onClose={() => setisCreateAlbumOpen(false)} className="">
        <div className="bg-[#18181c] text-center text-[#bebec2] p-[15px] rounded-3xl flex flex-col gap-3">
          <div
            className="relative flex w-full bg-transparent rounded-md h-[19px]"
            onClick={() => setisCreateAlbumOpen(false)}
          >
            <CloseIcon className="absolute right-0 cursor-pointer fill-light hover:fill-secondary flex-end" />
          </div>
          <Filter
            key={"album"}
            inputType={"text"}
            title={"album name"}
            placeholder={""}
            value={newAlbum.title}
            onChange={(value) =>
              setnewAlbum((prevState) => ({ ...prevState, title: value as string }))
            }
            // selectOptions={filter.selectOptions}
            // onTagsChange={filter.onTagsChange}
            className={"bg-transparent rounded-md"}
            Variant="flex flex-col items-start gap-[10px] text-[14px] "
          />
          <Filter
            key={"album"}
            inputType={"tags"}
            title={"album keywords"}
            placeholder={""}
            onTagsChange={(tags) =>
              setnewAlbum((prevState) => ({ ...prevState, AlbumKeywords: tags }))
            }
            className={"bg-transparent rounded-md"}
            Variant="flex flex-col items-start gap-[10px] text-[14px] "
          />

          <Filter
            key={"album"}
            inputType={"file"}
            title={"album Cover"}
            accept="image/*"
            multiple={false}
            value={newAlbum.title}
            onChange={(value) =>
              setnewAlbum((prevState) => ({ ...prevState, banner: value as File }))
            }
            // className={"bg-transparent rounded-md"}
            Variant="flex flex-col items-start gap-[10px] text-[14px] "
          />
          <Button
            onClick={() => handlecreateAlbum()}
            className="border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl w-[40%] mx-auto mt-1"
          >
            Create Album
          </Button>
        </div>
      </Modal>
      <div className="w-full">
        <BannerImage setisCreateAlbumOpen={setisCreateAlbumOpen} />
        <ProfileAccordion className=" lg:hidden" />

        <div className="bg-[#00000085] w-[90%] sm:w-[50%]  text-sm font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-50 p-5 lg:sticky top-[61px] mt-[20px] ">
          <Tab />
        </div>
        <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export const ProfilePageLayout = (page: React.JSX.Element) => <ProfileLayout>{page}</ProfileLayout>
export default ProfileLayout
