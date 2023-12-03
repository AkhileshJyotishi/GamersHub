import React from "react"
import { Editor as NovelEditor } from "novel"

import { JSONContent } from "@tiptap/react"

const Editor = ({
  className,
  editable = false,
  defaultValue,
  disableLocalStorage = false,
}: {
  className: string
  editable: boolean
  defaultValue?: string | JSONContent | undefined
  disableLocalStorage?: boolean
}) => {
  // console.log("tis should work ", defaultValue)
  return (
    <NovelEditor
      className={className}
      editorProps={{ editable: () => editable }}
      defaultValue={defaultValue}
      disableLocalStorage={disableLocalStorage}
    />
  )
}

export default Editor
