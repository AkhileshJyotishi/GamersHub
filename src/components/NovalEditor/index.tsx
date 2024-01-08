import React, { useEffect } from "react"
import clsx from "clsx"
import { Editor as NovelEditor } from "novel"

import Placeholder from "@tiptap/extension-placeholder"
import { JSONContent } from "@tiptap/react"
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
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === "/" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Backspace"
      ) {
        const parentDiv = document.getElementById("slash-command")
        if (parentDiv) {
          const firstChild = parentDiv.childNodes[0]
          parentDiv.removeChild(firstChild)
        }
      }
    }

    document.addEventListener("keyup", handleKeyPress)

    return () => {
      document.removeEventListener("keyup", handleKeyPress)
    }
  }, [])

  return (
    <>
      <style>
        {`
          .is-empty::before {
            content: "Press '/' for Options..."  !important;
          }
      `}
      </style>

      <NovelEditor
        className={clsx("min-h-[40vh]", className)}
        editorProps={{ editable: () => editable }}
        defaultValue={defaultValue}
        disableLocalStorage={disableLocalStorage}
        storageKey={storageKey}
        extensions={[Placeholder]}

        // autofocus = 'start'
      />
    </>
  )
}

export default Editor
