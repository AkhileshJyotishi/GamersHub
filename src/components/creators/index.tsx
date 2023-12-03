import React, { useEffect, useState } from "react"
import Image from "next/image"

import image from "@/assets/image/void.svg"

import Card from "./creatorCard"
import Layout from "./creatorsLayout"

const CreatorsPage = ({ creatorsData }: { creatorsData: Creator[] }) => {
  // const sampleCreators: Creator[] = [
  //   {
  //     username: "JohnDoe",
  //     user_bio: {
  //       bio: "Passionate graphic designer with years of experience.",
  //     },
  //     skills_lists: ["Graphic Design", "Illustration", "Web Design"],
  //     softwares_lists: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
  //     profile_image: "path-to-profile-image.jpg", // Provide the URL to the profile image

  //     banner: "path-to-banner-image.jpg",
  //   },
  //   {
  //     username: "JohnDoe",
  //     occupation: "Graphic Designer",
  //     user_bio: {
  //       bio: "Passionate graphic designer with years of experience.",
  //     },
  //     skills_lists: ["Graphic Design", "Illustration", "Web Design"],
  //     softwares_lists: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
  //     profile_image: "path-to-profile-image.jpg", // Provide the URL to the profile image

  //     banner: "path-to-banner-image.jpg",
  //   },
  // ]
  useEffect(() => {
    console.log("abhi to ye aa rha hai ", creatorsData)
  }, [])
  const [creators, setCreators] = useState<Creator[]>(creatorsData)

  return (
    <Layout creators={creators} setCreators={setCreators}>
      {creators.length > 0 ? (
        <div className="grid w-[73vw] grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((sampleCreator, idx) => (
            <Card {...sampleCreator} key={idx} />
          ))}
        </div>
      ) : (
        <>
          {
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No Creators yet.</h3>
                <Image width={2060} height={2060} alt={""} className="w-[400px]" src={image} />
              </div>
            </>
          }
        </>
      )}
    </Layout>
  )
}

export default CreatorsPage
