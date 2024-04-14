import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import Head from "next/head"
import { toast } from "react-toastify"

import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import SettingsPage from "@/components/settings"

const Sett = ({ settingsDetails }: { settingsDetails: IsettingsDetails }) => {
  return (
    <>
      <Head>
        <title>GameCreators | Settings</title>
      </Head>
      <SettingsPage settingsDetails={settingsDetails} />
    </>
  )
}

export default Sett
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  // console.log(session?.user?.name)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  let settingsDetails = await fetchData(
    `/v1/users/allDetails/`,
    session?.user?.name as string,
    "GET"
  )
  toast.dismiss()
  if (settingsDetails?.error) {
    toast.error(settingsDetails?.message)
  } else {
    toast.success(settingsDetails?.message)
  }
  settingsDetails = settingsDetails?.data
  // console.log("that's settingsdetails  ", settingsDetails)
  return {
    props: {
      settingsDetails,
    },
  }
}
