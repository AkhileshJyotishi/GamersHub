import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Head from "next/head"
// import Link from "next/link"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchFile, fetchWithoutAuthorization } from "@/utils/functions"

import Filter from "@/components/filter/mainfilter/filter"
import CloseIcon from "@/components/icons/closeIcon"
import Loading from "@/components/Loading"
import BannerImage from "@/components/profile/bannerImage"
import ProfileAccordion from "@/components/profile/profileAccordion"
import ProfileCard from "@/components/profileCard"
import Button from "@/components/ui/button"
import Modal from "@/components/ui/modal"

interface User {
  id: number
  createdAt: string
  username: string
  bannerImage: string
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
/**
 * Renders the profile page layout, including the profile card, banner image, profile accordion, and tabs for different sections of the profile.
 * Handles the creation and editing of albums.
 *
 * @param children - React node representing the content of the profile page.
 * @param page - React JSX element representing the content of the profile page.
 * @param id - Number representing the user ID.
 *
 * @returns The rendered profile page layout with the profile card, banner image, profile accordion, and tabs for different sections of the profile.
 */
const ProfileLayout = ({
  children,
}: {
  children: React.ReactNode
  page: React.JSX.Element
  id: number
}) => {
  const session = useSession()
  const router = useRouter()

  const { userData, isCreateAlbumOpen, setisCreateAlbumOpen, newAlbum, setnewAlbum } =
    useUserContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [createAlbum, setCreateAlbum] = useState<boolean>(false)
  const [data, setData] = useState<User | null>(null)
  const [initialKeywords, setInitialKeywords] = useState<string[]>([])
  const param = useParams()

  useEffect(() => {
    // userData?.id
    if (router.query.user) {
      const loaddata = async () => {
        if (router.query.user) {
          const users = await fetchWithoutAuthorization(
            `/v1/users/customDetails/${router.query.user}`,
            "GET"
          )
          // const data = await fetchWithoutAuthorization("/v1/users/keyword","GET")

          if (users?.error) {
            router.replace(`/?emessage=Please Authenticate`)
          } else {
            // console.log("router ",)
            const x = router.pathname.split("/")
            setInitialKeywords(users?.data?.tags)
            setData(users?.data?.user)
            setActiveTab(x[x.length - 1])
          }
        }
      }
      loaddata().finally(() => {
        setLoading(false)
      })
    }
  }, [param, router.query, userData?.id, router])
  const tabs = [
    // { name: "posts", href: "posts" },
    { name: "Portfolio", href: "albums" },
    { name: "Jobs", href: "jobs" },
    { name: "About", href: "about" },
  ]
  const [activeTab, setActiveTab] = useState<string>("albums")

  const Tab = () => {
    return tabs?.map((tab) => {
      return (
        <>
          <div
            className={clsx(
              `sm:min-w-[80px]  rounded-xl active:current cursor-pointer ${
                activeTab == tab.href && "bg-user_interface_4"
              } `
            )}
            onClick={() => {
              setActiveTab(tab.href)
              router.push(`/${data?.id}/profile/${tab.href}`)
            }}
          >
            <div
              // href="#"
              className={clsx(` inline-block   p-2 active:text-secondary  active:bg-[#00000090]
            bg-white text-light outline-none focus:outline-none capitalize`)}
            >
              {tab.name}
            </div>
          </div>
        </>
      )
    })
  }

  const handlecreateAlbum = async () => {
    setCreateAlbum(true)
    toast.dismiss()
    if (newAlbum.title == "") {
      toast.error("Please fill the title")
      setCreateAlbum(false)
      return
    }
    const formdata = new FormData()
    if (newAlbum.isEdit) {
      toast.dismiss()

      toast.info("Updating Album...")
    } else {
      toast.dismiss()

      toast.info("Creating Album...")
    }

    if (newAlbum.banner && typeof newAlbum.banner == "object") {
      formdata.append("file", newAlbum.banner as Blob)
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
      if (!newAlbum.isEdit) {
        newAlbum.banner = ""
      }
    }
    toast.dismiss()
    toast.info("Uploading...")
    if (newAlbum.isEdit) {
      const albumData = await fetchData(
        `/v1/album/${newAlbum?.id}`,
        session.data?.user?.name as string,
        "PATCH",
        {
          title: newAlbum.title,
          banner: newAlbum.banner,
          keywords: newAlbum.AlbumKeywords,
        }
      )
      if (albumData?.error) {
        toast.dismiss()
        toast.error(albumData.message)
      } else {
        setisCreateAlbumOpen(false)
        setnewAlbum({
          title: "",
          banner: null,
          AlbumKeywords: [],
          isEdit: false,
        })
        router.push(`/${userData?.id}/profile/albums`)
        toast.dismiss()
        toast.success(albumData?.message)
      }
    } else {
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
      toast.dismiss()
      if (albumData?.error) {
        toast.error(albumData.message)
      } else {
        setisCreateAlbumOpen(false)
        setnewAlbum({
          title: "",
          banner: null,
          AlbumKeywords: [],
          isEdit: false,
        })
        router.push(`/${userData?.id}/profile/albums`)
        toast.dismiss()
        toast.success(albumData?.message)
      }
    }
    setCreateAlbum(false)
    // console.log(albumData)
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Profile | {data?.username}</title>
        </Head>
        <Loading className="h-[80vh]" />
      </>
    )
  } else {
    // console.log("why this user not coming  ", data)
    return (
      <>
        <Head>
          <title>Profile | {data?.username}</title>
        </Head>
        <div className="flex flex-col gap-5 p-2 sm:p-3 md:p-4 lg:p-5 lg:flex-row">
          <ProfileCard className="hidden lg:block" currentUser={data} />
          <Modal
            isOpen={isCreateAlbumOpen}
            onClose={() => setisCreateAlbumOpen(false)}
            className=""
          >
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
                placeholder={"Enter Album Name"}
                value={newAlbum.title}
                onChange={(value) =>
                  setnewAlbum((prevState) => ({ ...prevState, title: value as string }))
                }
                className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
              />
              <Filter
                key={"album"}
                inputType={"tags"}
                title={"Album keywords"}
                placeholder={"Enter Keywords"}
                onTagsChange={(tags) =>
                  setnewAlbum((prevState) => ({ ...prevState, AlbumKeywords: tags }))
                }
                selectOptions={initialKeywords.map((i) => ({ label: i, value: i }))}
                value={newAlbum.AlbumKeywords}
                className={"w-full bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
                initialtags={newAlbum.AlbumKeywords}
              />

              <Filter
                key={"album"}
                inputType={"file"}
                title={"Album Cover"}
                accept="image/*"
                multiple={false}
                value={newAlbum.banner as string}
                onChange={(value) =>
                  setnewAlbum((prevState) => ({ ...prevState, banner: value as File }))
                }
                className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
                fullScreen={false}
              />
              <Button
                disabled={createAlbum}
                onClick={() => handlecreateAlbum()}
                className="border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl w-[40%] mx-auto mt-1"
              >
                {createAlbum ? "Uploading..." : newAlbum.isEdit ? "Edit Album" : "Create Album"}
              </Button>
            </div>
          </Modal>
          <div className="w-full">
            <BannerImage
              setnewAlbum={setnewAlbum}
              setisCreateAlbumOpen={setisCreateAlbumOpen}
              bannerImage={data?.bannerImage || ""}
            />
            <ProfileAccordion className=" lg:hidden" currentUser={data} />

            <div className="backdrop-blur-sm sm:bg-[#00000060] w-[90%] sm:w-[90%]  text-sm font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-10 p-3 lg:sticky top-[61px] mt-[20px] ">
              <Tab />
            </div>
            <div className="w-full">{children}</div>
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
