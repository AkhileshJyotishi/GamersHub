import React from "react"

import SettingsLayout from "./settingsLayout"

const SettingsPage = ({ settingsDetails }: { settingsDetails: IsettingsDetails }) => {
  return (
    <>
      <SettingsLayout settingsDetails={settingsDetails} />
    </>
  )
}

export default SettingsPage
