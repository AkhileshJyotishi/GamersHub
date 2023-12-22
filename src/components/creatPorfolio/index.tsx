import React, { useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { useUserContext } from "@/providers/user-context"
import { fetchData, fetchFile } from "@/utils/functions"

import Layout from "@/components/creatPorfolio/layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

// import { Editor } from "novel";

const CreatePortfolio = ({ albums, post }: { albums: Allow; post?: IPostbackend }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const path = usePathname()
  const { setLoading } = useUserContext()
  // console.log("that is the path  ",path.includes("updatePost"),post)
  const isUpdate = path.includes("updatePost")
  interface FiltersState {
    postKeywords: string[]
    albumId: number | undefined
    matureContent: boolean | undefined
    banner: File | null | string
    title: string
    content: object
  }
  let initState: FiltersState
  if (isUpdate) {
    initState = {
      title: post?.title ?? "",
      postKeywords: post?.postKeywords?.map((key) => key.keyword) ?? [],
      albumId: post?.albumId,
      matureContent: post?.matureContent,
      banner: post?.banner ?? "",
      content: post?.content ?? {},
    }
  } else {
    initState = {
      title: "",
      postKeywords: [],
      albumId: undefined,
      matureContent: undefined,
      banner: null,
      content: {},
    }
  }
  const [filtersState, setFiltersState] = useState<FiltersState>(initState)

  const uploadPost = async () => {
    setLoading(true)
    filtersState.content = JSON.parse(localStorage.getItem("noval__content") ?? "")
    const formdata = new FormData()
    formdata.append("file", filtersState.banner as string)
    formdata.append("type", "portfolio")

    if (filtersState.banner) {
      const isuploaded = await fetchFile(
        "/v1/upload/file",
        session?.user?.name as string,
        "POST",
        formdata
      )
      if (isuploaded?.error) {
        // toast.info(isuploaded?.message)
        setLoading(false)
        return
      }
      filtersState.banner = isuploaded?.data.image.Location
    } else {
      filtersState.banner = ""
    }
    let method
    let res
    if (isUpdate) {
      method = "PATCH"
      res = await fetchData(
        `/v1/post/${post?.id}`,
        session?.user?.name as string,
        method,
        filtersState
      )
    } else {
      method = "POST"
      res = await fetchData("/v1/post/user", session?.user?.name as string, method, filtersState)
    }
    if (res?.error) toast.error(res.message)
    else {
      toast.success(res?.message)
      setFiltersState(initState)
    }
    setLoading(false)
    router.push("/")
  }

  return (
    <Layout
      filtersState={filtersState}
      setFiltersState={setFiltersState}
      uploadPost={uploadPost}
      albums={albums}
    >
      {/* Render the filterDetails here */}
      <div className="flex flex-col md:max-w-[59vw] w-full gap-4 lg:max-w-[67vw]">
        <h1 className="text-[22px] mt-4 font-semibold">Content</h1>
        <Editor
          className={"bg-user_interface_2  rounded-xl min-h-[80vh]  "}
          editable={true}
          storageKey="noval__content"
          defaultValue={{}}
        />
      </div>
    </Layout>
  )
}

export default CreatePortfolio
// async () => {
//     await axios.post("/sdfds", "sdf", {
//         // onUploadProgress:(ProgressEvent)=>{

//         //         const progress=Math.round((ProgressEvent.loaded*100)/ProgressEvent?.total)

//         // }
//     })
// }
