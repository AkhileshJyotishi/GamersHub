interface FileInputProps {
  id: string
  accept: string // Define accepted file types, e.g., 'image/*,.pdf'
  multiple: boolean
  onChange: (files: File | null) => void
  className?: string
  preview?: boolean
  value?: string | null
}

import React, { useState } from "react"
import clsx from "clsx"

import Button from "@/components/ui/button"

const FileFilter: React.FC<FileInputProps> = ({
  // id,
  accept,
  multiple,
  onChange,
  className,
  // preview,
  value,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(value || null)
  const [fileType, setFileType] = useState<string | null>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    console.log(file.type)
    onChange(file)
    setFilePreview(URL.createObjectURL(file))
    setFileType(file.type)
    // Create an object URL to preview the selected file
  }

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          // handleFileChange(e)
          onChange(e.dataTransfer.files[0])
          setFileType(e.dataTransfer.files[0].type)

          setFilePreview(URL.createObjectURL(e.dataTransfer.files[0]))
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
                  <Button className="p-2 pointer-events-none bg-secondary rounded-xl">
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
                      Anotherone
                    </Button>
                  </label>
                  <div>drag and drop</div>
                </div>
              </div>
              <embed
                type={fileType ?? "image/*"}
                src={filePreview}
                title="File Preview"
                width="100%"
                height={"100%"}
                className="object-cover rounded-xl"
                style={{ zIndex: 16 }}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default FileFilter
