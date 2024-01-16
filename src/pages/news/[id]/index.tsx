import React from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"

import { BackendNews } from "@/interface/news"
import { fetchWithoutAuthorization } from "@/utils/functions"

import Particularpage from "@/components/particularNews"

const index = ({ newsData }: { newsData: BackendNews }) => {
  return (
    <>
      <Head>
        <title>News | {newsData.title || ""}</title>
      </Head>
      <Particularpage newsData={newsData} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  const { id } = query

  const res = await fetchWithoutAuthorization(`/v1/news/${id}`, "GET")

  if (res?.error) {
    return {
      notFound: true,
    }
  }
  const newsData: BackendNews = res?.data?.news
  return {
    props: {
      newsData,
    },
  }
}
