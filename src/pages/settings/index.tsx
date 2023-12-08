import React from "react"
// import axios from "axios"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
// import Error from "next/error"
// import { Session } from "next-auth"
import { toast } from "react-toastify"

// import { NODE_BACKEND_URL } from '@/config/env'
import { getSession } from "@/lib/auth"
import { fetchData } from "@/utils/functions"

import SettingsPage from "@/components/settings"

const Sett = ({ settingsDetails }: { settingsDetails: IsettingsDetails }) => {
  // console.log("session ", settingsDetails)
  // console.log(session?.user?.name)

  return (
    <>
      <SettingsPage settingsDetails={settingsDetails} />
    </>
  )
}

export default Sett

// export const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMDIyMTU1MiwiZXhwIjoxNzAwMjI1MDkyLCJ0eXBlIjoiQUNDRVNTIn0.wyZ69lhBGEPcqPrcMfQfATjctNzlMU5KAplb5637_BY"

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

  if (settingsDetails?.error) {
    toast.error(settingsDetails?.message)
  } else {
    toast.success(settingsDetails?.message)
  }
  // return resp.data;
  // console.log("settings detaisls", settingsDetails)

  settingsDetails = settingsDetails?.data
  // console.log("that's settingsdetails  ", settingsDetails)
  return {
    props: {
      settingsDetails,
    },
  }

  // http://localhost:5000/v1/users/details
}
