import React from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"

import { fetchWithoutAuthorization } from "@/utils/functions"

import Helppage from "@/components/help"

const Index = ({ Categories }: { Categories: IFAQCategory[] }) => {
  return (
    <>
      <Head>
        <title>GameCreators | Help</title>
      </Head>
      <Helppage Categories={Categories} />
    </>
  )
}

export default Index
export const getServerSideProps: GetServerSideProps = async () => {
  let Artists = await fetchWithoutAuthorization(`/v1/help/category`, "GET")
  if (Artists?.error) {
    return {
      notFound: true,
    }
  }

  Artists = Artists?.data.categories
  return {
    props: {
      Categories: Artists,
    },
  }
}
