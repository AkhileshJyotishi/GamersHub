import React from "react"
import Image from "next/image"

interface PostHeaderProps {
  username: string
  location: string
}

interface PostActionsProps {
  likes: number
}

const PostHeader: React.FC<PostHeaderProps> = ({ username, location }) => {
  return (
    <div className="flex items-center px-4 py-3">
      <Image
        className="w-8 h-8 rounded-full"
        src="https://picsum.photos/id/1027/150/150"
        height={200}
        width={200}
        alt=""
      />
      <div className="ml-3">
        <span className="block text-sm antialiased font-semibold leading-tight">{username}</span>
        <span className="block text-xs text-gray-600">{location}</span>
      </div>
    </div>
  )
}

const PostImage: React.FC = () => {
  return <Image src="https://picsum.photos/id/244/900/900" alt="Post" height={200} width={200} />
}

const PostActions: React.FC<PostActionsProps> = () => {
  return (
    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
      <div className="flex gap-5">
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
      </div>
      <div className="flex">
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
          <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
        </svg>
      </div>
    </div>
  )
}

const InstagramPost: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <div className="p-4 bg-gray-100">
        <div className="max-w-md bg-white border rounded-sm">
          <PostHeader username="8fact" location="Asheville, North Carolina" />
          <PostImage />
          <PostActions likes={92372} />
          <div className="mx-4 mt-2 mb-4 text-sm font-semibold">92,372 likes</div>
        </div>
      </div>
    </div>
  )
}

export default InstagramPost
