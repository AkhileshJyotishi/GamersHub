import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"

import { getSession } from "@/lib/auth"

import SettingsLayout from "./settingsLayout"

const SettingsPage = ({ settingsDetails }: { settingsDetails: IsettingsDetails }) => {
  return (
    <>
      <SettingsLayout settingsDetails={settingsDetails} />
    </>
  )
}

export default SettingsPage
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (!session) {
    return {
      redirect: {
        destination: "/?emessage=Please Authenticate",
        permanent: false,
      },
    }
  } else {
    return {
      props: {},
    }
  }
}
