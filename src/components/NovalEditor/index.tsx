import React from "react"
import { Editor as NovelEditor } from "novel"

import { JSONContent } from "@tiptap/react"

const Editor = ({
  className,
  editable = false,
  defaultValue,
}: {
  className: string
  editable: boolean
  defaultValue?: string | JSONContent | undefined
}) => {
  // console.log("tis should work ", defaultValue)
  return (
    <NovelEditor
      className={className}
      editorProps={{ editable: () => editable }}
      defaultValue={defaultValue}
    />
  )
}

export default Editor
