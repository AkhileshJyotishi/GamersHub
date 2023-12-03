import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { fetchData } from "@/utils/functions"

import Layout from "@/components/creatPorfolio/layout"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
})

// import { Editor } from "novel";

const CreatePortfolio = ({ albums }: { albums: Allow }) => {
  const { data: session } = useSession()
  interface FiltersState {
    postKeywords: string[]
    albumId: number | undefined
    matureContent: boolean | undefined
    banner: File | null | string
    title: string
    content: object
  }

  const initState = {
    title: "",
    postKeywords: [],
    albumId: undefined,
    matureContent: undefined,
    banner: null,
    content: {},
  }
  const [filtersState, setFiltersState] = useState<FiltersState>(initState)

  const uploadPost = async () => {
    filtersState.content = JSON.parse(localStorage.getItem("novel__content") ?? "")
    filtersState.banner =
      "https://cdnb.artstation.com/p/recruitment_companies/headers/000/003/159/thumb/ArtStation_Header.jpg"
    const res = await fetchData(
      "/v1/post/user",
      session?.user?.name as string,
      "POST",
      filtersState
    )
    if (res?.error) toast.error(res.message)
    else {
      toast.success(res?.message)
      setFiltersState(initState)
    }
  }

  return (
    <Layout
      filtersState={filtersState}
      setFiltersState={setFiltersState}
      uploadPost={uploadPost}
      albums={albums}
    >
      {/* Render the filterDetails here */}
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-[22px] mt-4 font-semibold">About the Recruiter</h1>
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable={true}
          storageKey="noval__content"
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
