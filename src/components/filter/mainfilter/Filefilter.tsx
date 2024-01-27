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
  viewonlyPdf?: boolean
  download?: boolean
}

import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { ErrorBoundary } from "react-error-boundary"
import { PiWarningCircleFill } from "react-icons/pi"

import { shimmer, toBase64 } from "@/utils/functions"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { SpecialZoomLevel } from "@react-pdf-viewer/core"
import { Icon, MinimalButton, Position, Tooltip } from "@react-pdf-viewer/core"
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen"
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file"
import { pageNavigationPlugin, RenderGoToPageProps } from "@react-pdf-viewer/page-navigation"

import CloseIcon from "@/components/icons/closeIcon"
import FullscreenIcon from "@/components/icons/fullScreenIcon"
import Button from "@/components/ui/button"

import "@react-pdf-viewer/page-navigation/lib/styles/index.css"
import "@react-pdf-viewer/full-screen/lib/styles/index.css"
import "@react-pdf-viewer/core/lib/styles/index.css"
const FileFilter: React.FC<FileInputProps> = ({
  id,
  accept,
  multiple,
  onChange,
  className,
  // preview,

  value,
  errorMessage,
  fullScreen = true,
  viewonlyPdf = true,
  download,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [, setFileType] = useState<string | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null)

  const pageNavigationPluginInstance = pageNavigationPlugin()
  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance
  const fullScreenPluginInstance = fullScreenPlugin()
  const { EnterFullScreenButton } = fullScreenPluginInstance
  const imageRef = useRef<HTMLImageElement | null>(null)

  const getFilePluginInstance = getFilePlugin({})
  const { Download } = getFilePluginInstance

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    // console.log(file.type)
    onChange(file)
    setFilePreview(URL.createObjectURL(file))

    setFileType(file.type)
  }

  const handleFullscreen = () => {
    setFullscreenImage(0)
  }

  const handleCloseFullscreen = () => {
    setFullscreenImage(null)
  }
  useEffect(() => {
    try {
      const initFile =
        accept === ".pdf" && typeof value === "object" && value !== null
          ? URL.createObjectURL(value as Allow)
          : value
      setFilePreview(initFile || null)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const PrevProp = (
    <div
      style={{
        left: 0,
        position: "absolute",
        top: "50%",
        transform: "translate(24px, -50%)",
        zIndex: 1,
      }}
    >
      <GoToPreviousPage>
        {(props: RenderGoToPageProps) => (
          <Tooltip
            position={Position.BottomCenter}
            target={
              <MinimalButton onClick={props.onClick}>
                <Icon size={16}>
                  <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                </Icon>
              </MinimalButton>
            }
            content={() => "Previous page"}
            offset={{ left: 0, top: 8 }}
          />
        )}
      </GoToPreviousPage>
    </div>
  )
  const NextProp = (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translate(-24px, -50%)",
        zIndex: 1,
      }}
    >
      <GoToNextPage>
        {(props: RenderGoToPageProps) => (
          <Tooltip
            position={Position.BottomCenter}
            target={
              <MinimalButton onClick={props.onClick}>
                <Icon size={16}>
                  <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                </Icon>
              </MinimalButton>
            }
            content={() => "Next page"}
            offset={{ left: 0, top: 8 }}
          />
        )}
      </GoToNextPage>
    </div>
  )

  return (
    <ErrorBoundary
      fallback={
        accept === ".pdf" ? <div>Unable to Preview PDF</div> : <div>Unable to Preview Image</div>
      }
    >
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
          "  shadow-sm  w-full  flex flex-col  gap-4 ",
          !filePreview ? "items-center justify-center" : "items-center justify-end"
        )}
      >
        <>
          {!filePreview && (
            <>
              <div
                className="p-5 text-[14px] font-medium flex flex-col gap-3 items-center justify-center bg-background border-dotted border-[0.1px]  border-gray-500 rounded-xl space-x-2 w-full"
                // style={{ zIndex: 17 }}
              >
                <label htmlFor={id} className="cursor-pointer w-fit">
                  {" "}
                  <Button className="p-2 pointer-events-none bg-secondary rounded-md text-text">
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
          id={id}
          accept={accept}
          multiple={multiple}
          className={"appearance-none hidden"}
          onChange={(e) => {
            e.target.files?.length && handleFileChange(e)
          }}
        />

        {filePreview && (
          <>
            <div
              className={clsx(" w-full relative   rounded-xl", accept === ".pdf" && "h-[450px]")}
              style={{ zIndex: 17 }}
            >
              {/* <div className='absolute w-full h-full opacity-50 z-18'></div> */}

              <div className="absolute w-full h-full overflow-hidden opacity-50 z-18  group">
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

              {accept === ".pdf" ? (
                <div
                  className="rpv-core__viewer"
                  style={{
                    height: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div
                      style={{
                        alignItems: "center",
                        backgroundColor: "#eeeeee",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        padding: "4px",
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        zIndex: 30,
                      }}
                    >
                      <EnterFullScreenButton />
                    </div>
                    {PrevProp}
                    {NextProp}
                    {viewonlyPdf && (
                      <label htmlFor={id} className="cursor-pointer w-fit">
                        {" "}
                        <Button className="p-2 pointer-events-none bg-secondary rounded-md text-text">
                          {" "}
                          Update PDF
                        </Button>
                      </label>
                    )}
                    <Viewer
                      fileUrl={filePreview}
                      plugins={
                        !download
                          ? [pageNavigationPluginInstance, fullScreenPluginInstance]
                          : [
                              pageNavigationPluginInstance,
                              getFilePluginInstance,
                              fullScreenPluginInstance,
                            ]
                      }
                      defaultScale={SpecialZoomLevel.PageFit}
                    />

                    <Download>
                      {(props: RenderDownloadProps) => (
                        <div className="">
                          <Button
                            className={
                              " px-6 py-2 rounded-lg hover:opacity-90 flex  sm:text-sm md:text-md bg-secondary text-text my-2"
                            }
                            onClick={() => props.onClick()}
                          >
                            Download
                          </Button>
                        </div>
                      )}
                    </Download>
                  </Worker>
                </div>
              ) : (
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
              )}

              {accept !== ".pdf" && fullScreen && (
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
    </ErrorBoundary>
  )
}

export default FileFilter
