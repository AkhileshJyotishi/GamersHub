// import Editor from '@/components/NovalEditor'
import React, { useState } from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageBox } from "react-chat-elements"
import 'react-chat-elements/dist/main.css'
import { useUserContext } from "@/providers/user-context"
import { useRouter } from "next/router"
import defaultUserImage from "@/assets/image/user-profile.svg"
import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"
import { fetchData } from "@/utils/functions"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

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
  const [comment, setComment] = useState<string>("")
  const [comments, setComments] = useState(postData.comments);
  const { data: session } = useSession()
  const addMessage = async () => {
    const message = await fetchData(`/v1/post/comment/${postData?.id}`, session?.user?.name as string, "POST", {
      comment
    })
    if (message?.error) {
      toast.error(message.message)
    }
    else {
      console.log(message?.message)
      userData?.id && setComments((prev) => ([
        ...prev, {
          comment,
          createdAt: new Date().toISOString(),
          id: postData.comments.length,
          user: {
            username: userData?.username || "",
            profileImage: userData?.profileImage || ""
          },
          userId: userData?.id

        }
      ]))
    }
  }

  return (
    <div className="flex flex-col gap-5 md:p-3">
      <div className="text-[25px] font-bold">Post Description</div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex justify-center min-w-[200px] md:sticky top-[61px] h-[91vh] md:overflow-y-scroll"
          )}
        >
          <div className="flex flex-col min-w-[200px] md:px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-8  md:flex">
            <JobDetails postData={postData} />
          </div>
        </div>
        <div className="w-[80%] sm:w-full">
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
                className={"bg-user_interface_2 w-full rounded-xl md:min-h-[73vh] md:overflow-y-scroll "}
                editable={false}
                // storageKey="noval__content2"
                defaultValue={postData?.content || {}}
                disableLocalStorage
              />
            </>
          </div>

          <div className="flex flex-col p-2 py-10">
            <div className="text-[25px]  font-bold mb-3">Comments</div>
            <div className="flex gap-2 mb-6" >

              <Filter inputType="text" title="" placeholder="Comment..." value={comment} onChange={(value) => setComment(value as string)} className="mt-2 bg-transparent rounded-md" />
              <Button className="  border-secondary border-[0.1px] h-[42px] font-medium rounded-xl p-2 self-end" onClick={() => { addMessage() }}>
                Send
              </Button>

            </div>
            {
              comments.map((comment) => {
                const currentUser = (comment.userId === userData?.id)
                const color = currentUser ? { backgroundColor: "#00B87D", marginTop: "12px" } : { backgroundColor: "#fff", marginTop: "12px" }
                return (
                  <>
                    <MessageBox
                      id={comment.id}
                      position={currentUser ? "right" : "left"}
                      type={"text"}
                      title={currentUser ? userData?.username : comment?.user.username}
                      text={comment.comment}
                      titleColor={currentUser ?"white":"black"}
                      avatar={(currentUser ? (userData?.profileImage || defaultUserImage) : (comment?.user?.profileImage || defaultUserImage))}

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
                      styles={color}
                    // styles={

                    // }
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

