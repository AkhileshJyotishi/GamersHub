import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { ArticleProps, INews } from "@/interface/news"
import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import NewsPage from "@/components/news"

import { CreateNewsFrontend } from ".."

// type jobsDetails=
const Jobs = ({
  news,
  //   jobSoftwareSuggestions,
}: {
  news: ArticleProps[]
  //   jobSoftwareSuggestions: JobSoftwareSuggestions
}) => {
  return (
    <>
      <Head>
        <title>GameCreators | News</title>
      </Head>

      <NewsPage news={news} />
    </>
  )
}

export default Jobs

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let newsDetails
  if (!session) {
    newsDetails = await fetchWithoutAuthorization(`/v1/news`, "GET")
  } else {
    newsDetails = await fetchData(`/v1/news/others`, session.user?.name as string, "GET")
  }
  //   const res2 = await fetchWithoutAuthorization("/v1/users/software", "GET")

  //   if (res2?.error) {
  //     return {
  //       redirect: {
  //         destination: `/?emessage="Something went wrong."`,
  //         permanent: false,
  //       },
  //     }
  //   }
  if (newsDetails?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  console.log("newsDetails ", newsDetails)
  const parsedNewsDetails: INews[] = newsDetails?.data.AllNews
  //   const jobSoftwareSuggestions: JobSoftwareSuggestions = res2?.data
  const news: ArticleProps[] = CreateNewsFrontend(parsedNewsDetails)
  return {
    props: {
      news,
      //   jobSoftwareSuggestions,
    },
  }
}
