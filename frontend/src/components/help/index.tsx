import React from "react"

import HelpLayout from "./helpLayout"

const Helppage = ({ Categories }: { Categories: IFAQCategory[] }) => {
  return (
    <>
      <HelpLayout HelpCategories={Categories} />
    </>
  )
}

export default Helppage
