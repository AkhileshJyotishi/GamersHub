import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import CreatorsPage from "@/components/creators"

const Creators = ({
  users,
  customCreatorsTags,
}: {
  users: Creator[]
  customCreatorsTags: ICustomCreatorsTags
}) => {
  return (
    <>
      <Head>
        <title>GameCreators | Creators</title>
      </Head>
      <CreatorsPage creatorsData={users} customCreatorsTags={customCreatorsTags} />
    </>
  )
}

export default Creators
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  let users
  if (session) {
    users = await fetchData("/v1/users/creators", session.user?.name as string, "GET")
  } else {
    users = await fetchWithoutAuthorization("/v1/users/creators/all", "GET")
  }
  const res2 = await fetchWithoutAuthorization("/v1/users/customCreatorsTags", "GET")
  if (res2?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  const customCreatorsTags: ICustomCreatorsTags = res2?.data
  if (users?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  users = users?.data.creators
  return {
    props: {
      users,
      customCreatorsTags,
    },
  }
}
