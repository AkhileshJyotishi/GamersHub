import React, { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { IoIosUndo } from "react-icons/io"

import ArrowRightIcon from "@/components/icons/chevrondownicon"
import CloseIcon from "@/components/icons/closeIcon"
import FullscreenIcon from "@/components/icons/fullScreenIcon"

import Button from "../button"
const index = ({
  initFiles = [],
  onChange,
}: {
  initFiles: string[] | null
  onChange: (selectedFiles: string[]) => void
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>(initFiles || [])
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null)
  const [removedFiles, setRemovedFiles] = useState<string[]>([])
  const handleRemoveFile = (index: number) => {
    const removedFile = selectedFiles[index]
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)

    setSelectedFiles(newFiles)
    setRemovedFiles([removedFile, ...removedFiles])
  }
  const handleUndoRemove = () => {
    if (removedFiles.length > 0) {
      const lastRemovedFile = removedFiles[0]
      const newFiles = [lastRemovedFile, ...selectedFiles]

      setSelectedFiles(newFiles)
      setRemovedFiles(removedFiles.slice(1))
    }
  }

  const handleFullscreen = (index: number) => {
    setFullscreenImage(index)
  }

  const handleCloseFullscreen = () => {
    setFullscreenImage(null)
  }
  const handleNextImage = () => {
    if (fullscreenImage !== null && fullscreenImage < selectedFiles.length - 1) {
      setFullscreenImage(fullscreenImage + 1)
    }
  }

  const handlePrevImage = () => {
    if (fullscreenImage !== null && fullscreenImage > 0) {
      setFullscreenImage(fullscreenImage - 1)
    }
  }
  useEffect(() => {
    onChange(selectedFiles)
  }, [selectedFiles])

  return (
    <>
      {
        <div className="mt-2">
          <Button
            onClick={handleUndoRemove}
            className={clsx("flex gap-2 p-2  rounded-md bg-secondary disabled:bg-transparent ")}
            disabled={removedFiles.length > 0 ? false : true}
          >
            <IoIosUndo className="h-[inherit]" /> Undo
          </Button>
        </div>
      }
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedFiles?.map((item, idx) => (
          <div
            // key={idx}
            key={idx}
            className={clsx("p-2 relative border-[0.1px]   rounded-xl group", "border-gray-500")}
          >
            <Image src={item} alt={""} height={400} width={400} />
            <div className="absolute top-0 right-0 flex p-1 space-x-2 ">
              <Button className="hover:text-red-500" onClick={() => handleRemoveFile(idx)}>
                <CloseIcon className="transition duration-200 hover:stroke-red-500 hover:fill-red-500" />
              </Button>
              <Button onClick={() => handleFullscreen(idx)}>
                <FullscreenIcon className="w-8 h-8 text-light hover:scale-125" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {fullscreenImage != null && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen p-4 bg-black bg-opacity-20 backdrop-blur-lg "
          style={{ zIndex: 18 }}
        >
          <div className="relative w-[80%] h-[80%] transition-all duration-1000 ease-in-out flex">
            <Button onClick={handlePrevImage} className="p-2">
              <ArrowRightIcon className="w-8 h-8 rotate-180 text-light hover:scale-125" />
            </Button>
            <Image
              src={selectedFiles[fullscreenImage]}
              alt="Fullscreen Preview"
              className="relative object-cover w-full h-full mx-auto backdrop-blur-md"
              onBlur={() => {
                handleCloseFullscreen()
              }}
              height={500}
              width={500}
            />
            <Button
              className="absolute top-0 right-0 p-2 -translate-x-12 bg-red-600"
              onClick={handleCloseFullscreen}
            >
              <CloseIcon className="fill-light " />
            </Button>
            <Button onClick={handleNextImage} className="p-2">
              <ArrowRightIcon className="w-8 h-8 text-light hover:scale-125" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default index
