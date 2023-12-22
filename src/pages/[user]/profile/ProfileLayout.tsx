import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchFile, fetchWithoutAuthorization } from "@/utils/functions"

import Filter from "@/components/filter/mainfilter/filter"
import CloseIcon from "@/components/icons/closeIcon"
import BannerImage from "@/components/profile/bannerImage"
import ProfileAccordion from "@/components/profile/profileAccordion"
import Button from "@/components/ui/button"
import Modal from "@/components/ui/modal"

import ProfileCard from "./profileCard"
import Head from "next/head"

interface User {
  id: number
  createdAt: string
  username: string
  userDetails: {
    country: string
    city: string
  }
  _count: {
    followers_users: number
    following_users: number
  }
  add_on_web: Isocials
  profileImage: string
  socials: Isocials
}
const ProfileLayout = ({
  children,
}: {
  children: React.ReactNode
  page: React.JSX.Element
  id: number
}) => {
  const session = useSession()
  const router = useRouter()
  const { userData } = useUserContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<User | null>(null)
  const param = useParams()

  useEffect(() => {
    if (!session) router.replace(`/?emessage=Please Authenticate`)
    const loaddata = async () => {
      if (router.query.user) {
        const users = await fetchWithoutAuthorization(
          `/v1/users/customDetails/${router.query.user}`,
          "GET"
        )
        if (users?.error) {
          router.replace(`/?emessage=Please Authenticate`)
        } else {
          setData(users?.data?.user)
        }
      }
    }

    loaddata().finally(() => {
      setLoading(false)
    })
  }, [param, router.query])
  const tabs = ["posts", "albums", "jobs"]

  const Tab = () => {
    return tabs?.map((tab) => {
      return (
        <>
          <Link
            className={clsx("sm:min-w-[80px] active:current cursor-pointer")}
            href={`/${data?.id}/profile/${tab}`}
          >
            <div
              // href="#"
              className={clsx(` inline-block   p-2 active:text-secondary  active:bg-[#00000090]
            bg-white
              text-light outline-none focus:outline-none   `)}
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
    const formdata = new FormData()
    // console.log(newAlbum)
    // return
    toast.info("Creating Album...")
    if (newAlbum.banner) {
      formdata.append("file", newAlbum.banner as string)
      formdata.append("type", "portfolio")
      const isuploaded = await fetchFile(
        "/v1/upload/file",
        session?.data?.user?.name as string,
        "POST",
        formdata
      )
      // console.log("is uploaded", isuploaded)
      newAlbum.banner = isuploaded?.data?.image?.Location
    } else {
      newAlbum.banner = ""
    }
    toast.dismiss()
    toast.info("Uploading...")
    const albumData = await fetchData(
      "/v1/album/user",
      session.data?.user?.name as string,
      "POST",
      {
        title: newAlbum.title,
        banner: newAlbum.banner,
        keywords: newAlbum.AlbumKeywords,
      }
    )
    if (albumData?.error) {
      toast.error(albumData.message)
    } else {
      router.push("/")
      toast.success(albumData?.message)
    }
    // console.log(albumData)
  }
  if (loading) {
    return <>
      <Head>
        <title>Profile | {data?.username}</title>
      </Head>
      loading...
    </>
  } else {
    // console.log("why this user not coming  ", data)
    return (
      <>
        <Head>
          <title>Profile | {data?.username}</title>
        </Head>
        <div className="flex flex-col gap-5 p-5 lg:flex-row">
          <ProfileCard className="hidden lg:block" currentUser={data} />
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
                title={"Album name"}
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
                title={"Album keywords"}
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
                title={"Album Cover"}
                accept="image/*"
                multiple={false}
                value={newAlbum.title}
                onChange={(value) =>
                  setnewAlbum((prevState) => ({ ...prevState, banner: value as File }))
                }
                // className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
                fullScreen={false}
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
            <BannerImage
              setisCreateAlbumOpen={setisCreateAlbumOpen}
              bannerImage={userData?.bannerImage || ""}
            />
            <ProfileAccordion className=" lg:hidden" currentUser={data} />

            <div className="backdrop-blur-sm bg-[#00000060] w-[90%] sm:w-[90%]  text-sm font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-10 p-3 lg:sticky top-[61px] mt-[20px] ">
              <Tab />
            </div>
            <div className="grid w-[90%] mx-auto my-4  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
              {children}
            </div>
          </div>
        </div>
      </>
    )
  }
}

const ProfilePageLayout = (page: React.JSX.Element, id: number) => (
  <ProfileLayout page={page} id={id}>
    {page}
  </ProfileLayout>
)
export default ProfilePageLayout
