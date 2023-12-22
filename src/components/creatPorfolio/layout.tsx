import React, { useState } from "react"
import clsx from "clsx"
import { toast } from "react-toastify"

import { Errors, FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"

interface FiltersState {
  title: string
  // postInfo: PostInfo;
  // keywords: string[];
  albumId: number | undefined
  matureContent: boolean | undefined
  banner: File | null | string
  content: object

  postKeywords: string[]
  // toolUsed: string;
}

interface LayoutProps {
  children: React.ReactNode
  filtersState: FiltersState
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersState>>
  uploadPost: () => void
  albums: Allow
}

const Layout: React.FC<LayoutProps> = ({
  children,
  filtersState,
  setFiltersState,
  uploadPost,
  albums,
}) => {
  let albumsselectoptions = [{ label: "select an album", value: "" }]
  const [dimensions, setdimensions] = useState<{
    height: number | null
    width: number | null
  }>({
    height: null,
    width: null,
  })
  const [errors, setErrors] = useState<Errors<Partial<FiltersState>>>({
    albumId: "",
    banner: "",
    content: null,
    matureContent: null,
    postKeywords: null,
    title: "",
  })
  const handleInputChange = <K extends keyof FiltersState>(field: K, value: FiltersState[K]) => {
    // console.log("scgha")
    switch (field) {
      case "title":
        if (typeof value === "string") {
          if (value === "") {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length > 11) {
            setErrors((prev) => ({ ...prev, [field]: "*field too long" }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: null }))
          }
          setFiltersState((prevState) => ({ ...prevState, [field]: value as string }))
        }
        break
      case "banner":
        if (value instanceof File) {
          // Your validation logic for banner (File type)
          // Check file size
          // value.
          // console.log("banner working")
          const maxSizeInBytes = 1024 * 1024 // 1MB
          // console.log(value.size, maxSizeInBytes)
          if (value.size > maxSizeInBytes) {
            // console.log("errors")
            setErrors((prev) => ({ ...prev, banner: "File size must be less than 1MB" }))
            return // Stop further processing
          } else {
            setErrors((prev) => ({ ...prev, banner: null }))
          }

          // Create an image element to check dimensions
          const img = new Image()
          img.src = URL.createObjectURL(value)

          // Check image dimensions
          img.onload = () => {
            const maxWidth = 1920
            const maxHeight = 1080
            const minWidth = 640
            const minHeight = 320

            if (img.width > maxWidth || img.height > maxHeight) {
              // console.log(img.width, maxWidth)
              // console.log(img.height, maxHeight)
              setErrors((prev) => ({
                ...prev,
                banner: `Image dimensions must be ${maxWidth}x${maxHeight} or smaller`,
              }))
            } else if (img.width < minWidth || img.height < minHeight) {
              // console.log(img.width, minWidth)
              // console.log(img.height, minHeight)
              setErrors((prev) => ({
                ...prev,
                banner: `Image dimensions must be ${minWidth}x${minHeight} or larger`,
              }))
            } else {
              setErrors((prev) => ({ ...prev, banner: null }))
              // Proceed with setting the banner if all checks pass
            }
            setdimensions({
              height: img.height,
              width: img.width,
            })
            setFiltersState((prevState) => ({ ...prevState, [field]: value as File }))
          }

          // Handle image loading error
          img.onerror = () => {
            setErrors((prev) => ({ ...prev, banner: "Error loading image" }))
          }
          setFiltersState((prevState) => ({ ...prevState, [field]: value as File }))
        }
        break

      case "postKeywords":
        // console.log("executing")
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          if (value.length == 0) {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length >= 11) {
            setErrors((prev) => ({ ...prev, [field]: "*too many chosen" }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: null }))
          }
          setFiltersState((prevState) => ({ ...prevState, [field]: value as string[] }))
        }
        break

      case "albumId":
        // console.log(value)
        if (typeof value === "number") {
          // const chk = ["singlePlayer", "multiPlayer"].includes(value)
          if (value === 0) {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: null }))
          }

          setFiltersState((prevState) => ({ ...prevState, [field]: value as number }))
        }

        break

      case "matureContent":
        if (typeof value === "boolean") {
          // console.log(value);
          setFiltersState((prevState) => ({ ...prevState, [field]: value as boolean }))
        }

        break
    }
  }

  const alb = albums?.map((album: Allow) => ({ label: album.title, value: album.id }))
  albumsselectoptions = albumsselectoptions.concat(alb)
  const filterDetails: FilterDetail[] = [
    {
      inputType: "text",
      title: "Title",
      placeholder: "title",
      value: filtersState?.title,
      onChange: (value) => handleInputChange("title", value as string),

      // setFiltersState((prevState) => ({
      //   ...prevState,
      //   title: value as string,
      // })),
      className: "mt-2 bg-transparent rounded-md",
      errorMessage: errors.title,
    },

    {
      inputType: "tags",
      title: "Keyword Tags",
      onTagsChange: (value) => {
        handleInputChange("postKeywords", value)
      },
      // setFiltersState((prevState) => ({ ...prevState, postKeywords: tags })),
      placeholder: " keywords..",
      errorMessage: errors.postKeywords,
    },
    {
      inputType: "select",
      title: "Album Selection",
      selectOptions: albumsselectoptions,
      value: filtersState.albumId,
      onChange: (value) => handleInputChange("albumId", Number(value) as number),
      // setFiltersState((prevState) => ({ ...prevState, albumId: value as number })),
      className:
        "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
      errorMessage: errors.albumId,
    },

    {
      inputType: "radio",
      title: "Adult content",
      selectOptions: [
        { label: "true", value: false },
        { label: "false", value: true },
      ],
      value: filtersState.matureContent,
      onChange: (value) => handleInputChange("matureContent", value as boolean),
      // setFiltersState((prevState) => ({ ...prevState, matureContent: value as boolean })),
      errorMessage: errors.matureContent,
    },

    {
      inputType: "file",
      title: "Upload File",
      accept: "image/*", // Define accepted file types
      multiple: true, // Set to true if you want to allow multiple file selection
      value: null, // Initialize with null
      onChange: (value) => handleInputChange("banner", value as File),
      // setFiltersState((prevState) => ({ ...prevState, banner: value as File })), // Handle file input changes
      className:
        "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
      errorMessage: errors.banner,
    },
  ]

  return (
    <>
      <div className="flex gap-4 p-6 mt-3 w-[100vw] mx-auto md:flex-row flex-col items-center md:items-start">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex md:flex-row justify-center min-w-[280px] md:sticky top-[61px] h-fit flex-col"
          )}
        >
          <div className="flex flex-col w-full gap-4 p-2">
            <div className="flex w-full  bg-user_interface_2 border-user_interface_3 rounded-[15px] px-[6px] py-[15px] border-[1px]">
              <Button
                className="z-30 justify-center p-2 mx-auto rounded-md bg-secondary"
                onClick={() => {
                  const hasErrors = Object.values(errors).some((error) => error !== null)
                  if (hasErrors) {
                    // If there are errors, do not proceed with the upload
                    toast.error("Cannot upload. Please fix errors first")
                    return
                  } else {
                    // console.log("first")
                    uploadPost()
                  }
                }}
              >
                Upload Post
              </Button>
            </div>

            <div className="h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[25px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px] flex">
              {filterDetails?.map((filter, index) => (
                <Filter
                  key={index}
                  inputType={filter.inputType}
                  title={filter.title}
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={filter.onChange}
                  selectOptions={filter.selectOptions}
                  className={filter.className}
                  Variant="flex flex-col items-start gap-[10px] text-[14px]"
                  errorMessage={filter.errorMessage}
                  dimensionsImage={dimensions}
                  onTagsChange={filter.onTagsChange}
                />
              ))}
              {/* 
            <Button className="p-2 bg-secondary w-[80%] mx-auto" onClick={uploadPost}>
              Create Post
            </Button>
           */}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
