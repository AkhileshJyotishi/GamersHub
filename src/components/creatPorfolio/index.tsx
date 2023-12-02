import React, { useState } from "react"
import dynamic from "next/dynamic"
import { toast } from "react-toastify"

import { token } from "@/pages/settings"
import { fetchData } from "@/utils/functions"

import Layout from "@/components/creatPorfolio/layout"
import { useSession } from "next-auth/react"

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
filtersState.banner="https://cdnb.artstation.com/p/recruitment_companies/headers/000/003/159/thumb/ArtStation_Header.jpg"
    const res = await fetchData("/v1/post/user", session?.user?.name as string, "POST", filtersState)
    if (res?.error) toast.error(res.message)
    else {
      toast.success(res?.message)
      setFiltersState(initState)
    }
  }

  return (
    <Layout filtersState={filtersState} setFiltersState={setFiltersState} uploadPost={uploadPost} albums={albums}>
      {/* Render the filterDetails here */}
      <>
        <Editor
          className={"bg-user_interface_2 w-full rounded-xl h-[80vh] overflow-y-scroll"}
          editable={true}
        />
      </>
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
