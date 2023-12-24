// import Editor from '@/components/NovalEditor'
import React from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageBox } from "react-chat-elements"
import 'react-chat-elements/dist/main.css'
import { useUserContext } from "@/providers/user-context"
import { useRouter } from "next/router"
import defaultUserImage from "@/assets/image/user-profile.svg"

const Editor = dynamic(() => import("@/components/NovalEditor"), {
  ssr: false,
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[40vh]"></div>
  },
})

type OmittedProperties = "title" | "banner"
type postdataProp = Omit<IPostbackend, OmittedProperties>

interface Section {
  title: string
  dataKey: string
  render: (data: postdataProp) => React.ReactNode
}

const sections: Section[] = [
  {
    title: "mature Content",
    dataKey: "matureContent",
    render: (data) => (
      <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {data?.matureContent ? "YES" : "NO"}
      </span>
    ),
  },
  {
    title: "Posted by",
    dataKey: "user",
    render: (data) => (
      <Link className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
        // onClick={() => router.push(`/${id}/profile/albums`)}
        href={`/${data.userId}/profile/albums`}
      >
        {data?.user.username}
      </Link>
    ),
  },
  {
    title: "Saved by",
    dataKey: "savedUsers",
    render: (data) => (
      <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {(data?.savedUsers.length || 0) + " users"}
      </span>
    ),
  },
  {
    title: "Liked by",
    dataKey: "savedUsers",
    render: (data) => (
      <span className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer">
        {(data?.postLikes?.length || 0) + " users"}
      </span>
    ),
  },
  {
    title: "Post Keywords",
    dataKey: "postKeywords",
    render: (data) => (
      <div className="flex flex-wrap gap-2">
        {data?.postKeywords?.map((software, index) => (
          <span
            key={index}
            className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
          >
            {software.keyword}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Post Skills",
    dataKey: "postSkills",
    render: (data) => (
      <div className="flex flex-wrap gap-2">
        {data.postSkills.length > 0 ? data?.postSkills?.map((software, index) => (
          <span
            key={index}
            className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
          >
            {software.skill}
          </span>
        )) :
          (
            <span
              key={"index"}
              className="w-fit flex flex-row items-center flex-wrap p-[6px] gap-[4px] bg-user_interface_4 rounded-[5px] text-[12px] cursor-pointer"
            >
              No Skills yet
            </span>
          )
        }
      </div>
    ),
  }
]

const SectionRenderer: React.FC<Section & { data: postdataProp }> = ({ title, data, render }) => (
  <div className="bg-background flex flex-col items-start rounded-xl gap-[12px] p-3 flex-wrap ">
    <h3 className="mb-2 font-medium text-[18px]">{title}</h3>
    <div className="flex flex-wrap w-full gap-2">{render(data)}</div>
  </div>
)

const JobDetails: React.FC<{ postData: postdataProp }> = ({ postData }) => (
  <>
    {sections?.map((section, index) => <SectionRenderer key={index} {...section} data={postData} />)}
  </>
)

const Jobsection = ({ postData }: { postData: postdataProp }) => {
  const { userData } = useUserContext()
  const router = useRouter()
  console.log("jobdetails from backend", postData)
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="text-[25px] font-bold">Post Description</div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex justify-center min-w-[280px] md:sticky top-[61px] h-fit"
          )}
        >
          <div className="flex flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-8  md:flex">
            <JobDetails postData={postData} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-4">
            {/* <>
              <h1 className="text-[22px] mt-4 font-semibold">Description</h1>
              <div className="w-full p-12 bg-user_interface_2 rounded-xl">
                {postData?.description}
              </div>
            </> */}
            <>
              <h1 className="text-[22px] font-semibold">Post</h1>
              <Editor
                className={"bg-user_interface_2 w-full rounded-xl md:min-h-[73vh] md:overflow-y-scroll"}
                editable={false}
                // storageKey="noval__content2"
                defaultValue={postData?.content || {}}
                disableLocalStorage
              />
            </>
          </div>

          <div className="flex flex-col w-full p-2 py-10">
            <div className="text-[25px]  font-bold mb-6">Comments</div>
            {
              postData.comments.map((comment) => {
                const currentUser = (comment.userId === userData?.id)
                return (
                  <>
                    <MessageBox
                      id={comment.id}
                      position={currentUser ? "right" : "left"}
                      type={"text"}
                      title={currentUser ? userData?.username : comment?.user.username}
                      text={comment.comment}
                      titleColor="white"
                      avatar={(currentUser ? userData?.profileImage : comment?.user?.profileImage) ?? defaultUserImage}

                      // router.push("")
                      onTitleClick={() => { router.push(`/${comment.userId}/profile/albums`) }}
                      forwarded={false}
                      status={"sent"}
                      notch={false}
                      retracted={false}
                      className={"text-[#000]"}
                      date={new Date(comment.createdAt)}
                      focus
                      removeButton={false}
                      replyButton={false}
                      styles={
                        currentUser ?
                          { backgroundColor: "#464E55" } : { backgroundColor: "#00B87D" }
                      }
                    />
                  </>
                )
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Jobsection

