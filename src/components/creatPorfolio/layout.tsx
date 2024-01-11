import React, { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { toast } from "react-toastify"

import { Errors, FilterDetail } from "@/interface/filter"
import {
  validateBooleanField,
  validateFileField,
  validateNumberField,
  validateStringArrayField,
  validateStringField,
  ValidationFunction,
  ValidationParams,
} from "@/utils/functions/validationUtils"

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

  postKeywords: readonly string[]
  // toolUsed: string;
}

interface LayoutProps {
  children: React.ReactNode
  filtersState: FiltersState
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersState>>
  uploadPost: () => void
  albums: Allow
  isUpdate?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  filtersState,
  setFiltersState,
  uploadPost,
  albums,
  isUpdate,
}) => {
  let albumsselectoptions = [{ label: "select an album", value: "" }]
  const [dimensions] = useState<{
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
  const isInitialRender = useRef<boolean>(true)
  const handleInputChange = useCallback(
    async <K extends keyof FiltersState>(
      field: K,
      value: FiltersState[K],
      validationFn: ValidationFunction<FiltersState[K]>,
      validationParams?: ValidationParams
    ) => {
      // console.log("scgha")
      try {
        const validationError = value === null ? "" : await validationFn(value, validationParams)
        if (validationError) {
          setErrors((prev) => ({ ...prev, [field]: validationError }))
        } else {
          setErrors((prev) => ({ ...prev, [field]: null }))
        }
        if (field !== "banner") {
          setFiltersState((prevState) => ({ ...prevState, [field]: value as string[] }))
        } else {
          setFiltersState((prevState) => ({ ...prevState, [field]: value as File }))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [setFiltersState]
  )

  const alb = albums?.map((album: Allow) => ({ label: album.title, value: album.id }))
  albumsselectoptions = albumsselectoptions.concat(alb)
  const filterDetails: FilterDetail[] = [
    {
      inputType: "text",
      title: "Title",
      placeholder: "title",
      value: filtersState?.title,
      onChange: (value) =>
        handleInputChange("title", value as string, validateStringField, {
          required: true,
          maxLength: 60,
        }),
      className: "mt-2 bg-transparent rounded-md",
      errorMessage: errors.title,
    },

    {
      inputType: "tags",
      title: "Keyword Tags",
      onTagsChange: (value) => {
        handleInputChange("postKeywords", value, validateStringArrayField, {
          required: true,
          maxLength: 10,
        })
      },
      placeholder: " keywords..",
      errorMessage: errors.postKeywords,
      initialtags: filtersState?.postKeywords,
    },
    {
      inputType: "select",
      title: "Album Selection",
      selectOptions: albumsselectoptions,
      value: filtersState.albumId,
      onChange: (value) =>
        handleInputChange("albumId", Number(value) as number, validateNumberField, {
          required: true,
        }),
      className:
        "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
      errorMessage: errors.albumId,
    },

    {
      inputType: "radio",
      title: "Mature content",
      selectOptions: [
        { label: "true", value: true },
        { label: "false", value: false },
      ],
      value: filtersState.matureContent,
      onChange: (value) =>
        handleInputChange("matureContent", value as boolean, validateBooleanField, {}),
      errorMessage: errors.matureContent,
    },

    {
      inputType: "file",
      title: "Post Cover",
      accept: "image/*",
      multiple: true,
      value: filtersState.banner as string,
      onChange: (value) =>
        handleInputChange("banner", value as File, validateFileField, {
          required: true,
          fileMaxSize: 1024 * 1024,
        }),
      className:
        "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
      errorMessage: errors.banner,
    },
  ]
  const getValidationParamsForField = (field: string): ValidationParams => {
    const validationParams: Record<string, ValidationParams> = {
      title: { required: true, maxLength: 60 },
      banner: { required: true, fileMaxSize: 1024 * 1024 },
      albumId: { required: true },
      matureContent: {},
      postKeywords: { required: true, maxLength: 10 },
    }

    return validationParams[field] || {}
  }
  const handleUploadPortfolio = async () => {
    let flg = true

    const validationPromises = Object.entries(filtersState).map(async ([field, value]) => {
      let validationFunction: (x: Allow, y: Allow) => string | Promise<string>
      const validationParams = getValidationParamsForField(field)

      switch (field) {
        case "title": {
          validationFunction = validateStringField
          const x = await validationFunction(value as string, validationParams)
          flg === true && x === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: x }))
          break
        }
        case "banner": {
          validationFunction = validateFileField
          const y = await validationFunction(value, validationParams)
          flg === true && y === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: y }))
          break
        }
        case "albumId": {
          validationFunction = validateNumberField
          const q = await validationFunction(value as number, validationParams)
          flg === true && q === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: q }))
          break
        }
        case "postKeywords": {
          validationFunction = validateStringArrayField
          const w = await validationFunction(value, validationParams)
          flg === true && w === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: w }))
          break
        }
        default:
          return ""
      }
    })
    await Promise.all(validationPromises)
    if (flg) {
      uploadPost()
    } else {
      toast.info("Please fix the errors first!")
    }
  }
  useEffect(() => {
    if (!isInitialRender.current) {
      handleUploadPortfolio()
      isInitialRender.current = true
    }
  }, [errors])

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
                  const hasErrors = Object.values(errors).some(
                    (error) => !(error === null || error == "")
                  )
                  if (hasErrors) {
                    toast.dismiss()
                    toast.error("Cannot upload. Please fix errors first")
                    return
                  } else {
                    handleUploadPortfolio()
                  }
                }}
              >
                {isUpdate ? "Update Post" : "Upload Post"}
              </Button>
            </div>

            <div className="h-fit md:h-[73vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[25px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px] flex">
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
                  initialtags={filter.initialtags}
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
