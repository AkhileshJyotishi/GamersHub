import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"

import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import CreatorsPage from "@/components/creators"

const Creators = ({ users }: { users: Creator[] }) => {
  return (
    <>
      <Head>
        <title>GameCreatorsHub | Creators</title>
      </Head>
      <CreatorsPage creatorsData={users} />
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

  if (users?.error) {
    return {
      redirect: {
        destination: `/?emessage="Something went wrong."`,
        permanent: false,
      },
    }
  }
  users = users?.data.creators
  console.log(users)
  return {
    props: {
      users,
    },
  }
}
