interface FileInputProps {
  id: string
  accept: string // Define accepted file types, e.g., 'image/*,.pdf'
  multiple: boolean
  onChange: (files: File | null) => void
  className?: string
  preview?: boolean
  value?: string | null
  errorMessage?: string | null
  fullScreen?: boolean
}

import React, { useRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { PiWarningCircleFill } from "react-icons/pi"

import { shimmer, toBase64 } from "@/utils/functions"

import CloseIcon from "@/components/icons/closeIcon"
import FullscreenIcon from "@/components/icons/fullScreenIcon"
import Button from "@/components/ui/button"
const FileFilter: React.FC<FileInputProps> = ({
  // id,
  accept,
  multiple,
  onChange,
  className,
  // preview,
  value,
  errorMessage,
  fullScreen = true,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(value || null)
  const [, setFileType] = useState<string | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    // console.log(file.type)
    onChange(file)
    setFilePreview(URL.createObjectURL(file))
    setFileType(file.type)
    // Create an object URL to preview the selected file
  }

  const handleFullscreen = () => {
    setFullscreenImage(0)
  }

  const handleCloseFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <>
      {/* ghgdh */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          // handleFileChange(e)
          if (e.dataTransfer.files[0] !== undefined) {
            onChange(e.dataTransfer.files[0])
            setFileType(e.dataTransfer.files[0].type)

            setFilePreview(URL.createObjectURL(e.dataTransfer.files[0]))
          }
        }}
        className={clsx(
          "  shadow-sm  w-full  flex flex-col  gap-4 relative",
          !filePreview ? "items-center justify-center" : "items-center justify-end"
        )}
      >
        <>
          {!filePreview && (
            <>
              <div
                className="p-5 text-[14px] font-medium flex flex-col gap-3 items-center justify-center bg-background border-dotted border-[0.1px]  border-gray-500 rounded-xl space-x-2 w-full"
                style={{ zIndex: 18 }}
              >
                <label htmlFor="asset-upload" className="cursor-pointer w-fit">
                  {" "}
                  <Button className="p-2 pointer-events-none bg-secondary rounded-md">
                    {" "}
                    Browse Files
                  </Button>
                </label>
                <div>drop</div>
              </div>
            </>
          )}
        </>

        <input
          type="file"
          id={"asset-upload"}
          accept={accept}
          multiple={multiple}
          className={"appearance-none hidden"}
          onChange={(e) => {
            e.target.files?.length && handleFileChange(e)
          }}
        />

        {filePreview && (
          <>
            <div className="w-full relative  bg-[#00000050] rounded-xl" style={{ zIndex: 17 }}>
              {/* <div className='absolute w-full h-full opacity-50 z-18'></div> */}

              <div className="absolute w-full h-full overflow-hidden opacity-50 z-18 bg-background group">
                <div
                  className={clsx(
                    "p-5 text-[14px] font-medium flex flex-col gap-3 items-center -translate-y-36 overflow-hidden group-hover:translate-y-0 transition duration-200",
                    className
                  )}
                  style={{ zIndex: 18 }}
                >
                  <label htmlFor="asset-upload" className="cursor-pointer w-fit">
                    {" "}
                    <Button className="p-2 pointer-events-none bg-secondary rounded-xl">
                      Update
                    </Button>
                  </label>
                  <div>drag and drop</div>
                </div>
              </div>
              <Image
                src={filePreview}
                alt="File Preview"
                width="400"
                height="400"
                className="object-cover w-full h-full rounded-xl"
                style={{ zIndex: 16 }}
                ref={imageRef}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
              {fullScreen && (
                <div className="absolute top-0 right-0 flex p-1 space-x-2">
                  <Button onClick={handleFullscreen}>
                    <FullscreenIcon className="w-8 h-8 text-light hover:scale-125" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {fullscreenImage != null && (
          <div
            className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-black bg-opacity-20 backdrop-blur-lg"
            style={{ zIndex: 9999 }}
          >
            <div
              className="relative w-[80%] h-[80%] transition-all duration-1000 ease-in-out flex"
              style={{ zIndex: 9999 }}
            >
              <Image
                src={imageRef.current!}
                alt="Fullscreen Preview"
                className="relative object-cover w-full h-full mx-auto backdrop-blur-md"
                height={500}
                width={500}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}

                // style={{ zIndex: 9999 }}
              />
              <Button
                className="absolute top-0 right-0 p-2 bg-red-600"
                onClick={handleCloseFullscreen}
              >
                <CloseIcon className="fill-light " />
              </Button>
            </div>
          </div>
        )}

        {errorMessage ? (
          <span className="self-start flex gap-1 p-1 text-accent_red text-[12px] items-center">
            <PiWarningCircleFill />
            <div>{errorMessage}</div>
          </span>
        ) : null}
      </div>
    </>
  )
}

export default FileFilter
