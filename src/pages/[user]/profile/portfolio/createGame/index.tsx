import React from "react"
import Head from "next/head"

import CreateGame from "@/components/createGame"

const index = () => {
  return (
    <>
      <Head>
        <title>GameCreatorsHub | CreateGame</title>
      </Head>

      <CreateGame />
    </>
  )
}

export default index
