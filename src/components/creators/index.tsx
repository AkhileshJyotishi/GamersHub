import React, { useState } from "react"

import Card from "./creatorCard"
import Layout from "./creatorsLayout"

const CreatorsPage = () => {
  const sampleCreators: Creator[] = [
    {
      username: "JohnDoe",
      occupation: "Graphic Designer",
      user_bio: {
        bio: "Passionate graphic designer with years of experience.",
      },
      skills_lists: ["Graphic Design", "Illustration", "Web Design"],
      softwares_lists: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
      profile_image: "path-to-profile-image.jpg", // Provide the URL to the profile image

      banner: "path-to-banner-image.jpg",
    },
    {
      username: "JohnDoe",
      occupation: "Graphic Designer",
      user_bio: {
        bio: "Passionate graphic designer with years of experience.",
      },
      skills_lists: ["Graphic Design", "Illustration", "Web Design"],
      softwares_lists: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
      profile_image: "path-to-profile-image.jpg", // Provide the URL to the profile image

      banner: "path-to-banner-image.jpg",
    },
  ]

  const [creators, setCreators] = useState<Creator[]>(sampleCreators)

  return (
    <Layout creators={creators} setCreators={setCreators}>
      <div className="grid grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 ">
        {sampleCreators.map((sampleCreator, idx) => (
          <Card {...sampleCreator} key={idx} />
        ))}
      </div>
    </Layout>
  )
}

export default CreatorsPage
