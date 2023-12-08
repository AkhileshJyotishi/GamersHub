import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { getSession } from "@/lib/auth"
import { fetchData, fetchWithoutAuthorization } from "@/utils/functions"

import CreatorsPage from "@/components/creators"

const Creators = ({ users }: { users: Creator[] }) => {
  return (
    <>
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
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?emessage=${users.message}`,
        permanent: false,
      },
    }
  }
  users = users?.data.creators
  // const parsedgamesDetails: BackendGame[] = gameDetails?.data?.games

  return {
    props: {
      users,
    },
  }
}
