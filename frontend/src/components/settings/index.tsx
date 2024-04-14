import React from "react"
// import SettingsLayout from "./settingsLayout"
import dynamic from "next/dynamic"
const SettingsLayout = dynamic(() => import("./settingsLayout"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const SettingsPage = ({ settingsDetails }: { settingsDetails: IsettingsDetails }) => {
  return (
    <>
      <SettingsLayout settingsDetails={settingsDetails} />
    </>
  )
}

export default SettingsPage
