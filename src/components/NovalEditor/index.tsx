import React from "react"
import { Editor as NovelEditor } from "novel"

import { JSONContent } from "@tiptap/react"
import clsx from "clsx"

const Editor = ({
  className,
  editable = false,
  defaultValue,
  disableLocalStorage = false,
  storageKey,
}: {
  className: string
  editable: boolean
  defaultValue?: string | JSONContent | undefined
  disableLocalStorage?: boolean
  storageKey?: string
}) => {
  return (
    <NovelEditor
      className={clsx("min-h-[40vh]", className)}
      editorProps={{ editable: () => editable }}
      defaultValue={defaultValue}
      disableLocalStorage={disableLocalStorage}
      storageKey={storageKey}
    />
  )
}

export default Editor
