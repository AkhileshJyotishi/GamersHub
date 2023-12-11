import React, { useState } from "react"
import Image from "next/image"

import image from "@/assets/image/void.svg"
import { shimmer, toBase64 } from "@/utils/functions"

import Card from "./creatorCard"
import Layout from "./creatorsLayout"

const CreatorsPage = ({ creatorsData }: { creatorsData: Creator[] }) => {
  const [creators, setCreators] = useState<Creator[]>(creatorsData)

  return (
    <Layout creators={creators} setCreators={setCreators}>
      {creators.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-3 p-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {creators?.map((sampleCreator, idx) => <Card {...sampleCreator} key={idx} />)}
        </div>
      ) : (
        <>
          {
            <>
              <div className="flex flex-col items-center w-full gap-20">
                <h3 className="text-3xl font-bold">No Creators yet.</h3>
                <Image
                  width={2060}
                  height={2060}
                  alt={""}
                  className="w-[400px]"
                  src={image}
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
              </div>
            </>
          }
        </>
      )}
    </Layout>
  )
}

export default CreatorsPage
