import React from "react"
import Head from "next/head"

import CreateJob from "@/components/createJob"

const index = () => {
  return (
    <>
      <Head>
        <title>GameCreatorsHub | CreateJob</title>
      </Head>
      <CreateJob />
    </>
  )
}

export default index
