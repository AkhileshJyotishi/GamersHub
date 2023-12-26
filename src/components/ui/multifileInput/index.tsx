import React, { ChangeEvent, useEffect, useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"

import ArrowRightIcon from "@/components/icons/chevrondownicon"
import CloseIcon from "@/components/icons/closeIcon"
import FullscreenIcon from "@/components/icons/fullScreenIcon"
import PlusIcon from "@/components/icons/plus"

import Button from "../button"

import animation from "./multifile.module.css"
import thumbnail from "@/components/carousel/thumbnail.module.css"
interface MultipleFileInputProps {
  onFileChange: (files: File[]) => void
  errorMessage?: string | null
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const MultipleFileInput: React.FC<MultipleFileInputProps> = ({ onFileChange, errorMessage }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList)
    const uniqueFiles = files.filter((file) => !selectedFiles.includes(file))
    // Add new files to the existing files
    setSelectedFiles((prevFiles) => [...prevFiles, ...uniqueFiles])

    // Callback to parent component
    onFileChange([...selectedFiles, ...uniqueFiles])
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)

    setSelectedFiles(newFiles)

    // Callback to parent component
    onFileChange(newFiles)
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

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={"appearance-none hidden"}
        id={"asset-preview"}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {errorMessage ? (
          <span className=" p-1 text-accent_red  font-[10px] mx-auto ">{errorMessage}</span>
        ) : (
          <></>
        )}

        <motion.div
          key="add-new-files"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={clsx(
            thumbnail["thumb-wrapper"],
            "gap-3",
            animation.fadeIn,
            "flex-row w-full overflow-hidden flex-wrap justify-center "
          )}
        >
          {selectedFiles.length > 0 ? (
            <>
              <div
                className="p-5 text-[14px] font-medium flex flex-col gap-3 items-center justify-center bg-background border-dashed border-[0.1px] border-gray-500 rounded-xl space-x-2 group"
                // style={{ zIndex: 16 }}
              >
                <label
                  htmlFor="asset-preview"
                  className="flex justify-center w-full h-full m-auto cursor-pointer "
                >
                  {" "}
                  <Button className="p-2 pointer-events-none rounded-xl">
                    <PlusIcon className="w-16 h-16 transition duration-200 group-hover:scale-150 group-hover:stroke-secondary" />
                  </Button>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="p-5 text-[14] font-medium flex flex-col gap-3 items-center justify-center bg-background border-dashed border-[0.1px]  border-gray-500 rounded-xl space-x-2">
                <label htmlFor="asset-preview" className="cursor-pointer w-fit">
                  {" "}
                  <Button className="p-2 pointer-events-none bg-secondary rounded-xl">
                    {" "}
                    Browse Files
                  </Button>
                </label>
                <div>drop</div>
              </div>
            </>
          )}
          {selectedFiles?.map((item, idx) => (
            <motion.div
              // key={idx}
              key={idx}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className={clsx(
                "p-2 relative border-[0.1px]   rounded-xl group",
                errorMessage ? "border-accent_red" : "border-gray-500"
              )}
            >

              <Image src={URL.createObjectURL(item)} alt={""} height={400} width={400} />
              <div className="absolute top-0 right-0 flex p-1 space-x-2 ">
                <Button className="hover:text-red-500" onClick={() => handleRemoveFile(idx)}>
                  <CloseIcon className="transition duration-200 hover:stroke-red-500 hover:fill-red-500" />
                </Button>
                <Button onClick={() => handleFullscreen(idx)}>
                  <FullscreenIcon className="w-8 h-8 text-light hover:scale-125" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
              src={URL.createObjectURL(selectedFiles[fullscreenImage])}
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
    </div>
  )
}

export default MultipleFileInput
