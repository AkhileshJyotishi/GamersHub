import React, { useCallback, useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { toast } from "react-toastify"

import { Errors, FilterDetail } from "@/interface/filter"
import { CustomGameTags, GameInfo } from "@/interface/games"
import {
  validateFileArrayField,
  validateFileField,
  validateStringArrayField,
  validateStringField,
  ValidationFunction,
  ValidationParams,
} from "@/utils/functions/validationUtils"

import InitMultipleFileInput from "@/components/ui/initialMultifile"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"
import MultipleFileInput from "../ui/multifileInput"

interface LayoutProps {
  children: React.ReactNode
  gameInfo: GameInfo
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>
  uploadGame: () => Promise<void>
  setoldAssets?: React.Dispatch<React.SetStateAction<string[]>>
  oldAssets?: string[]
  isUpdate: boolean
  customGameTags?: CustomGameTags
}

const Layout: React.FC<LayoutProps> = ({
  children,
  gameInfo,
  setGameInfo,
  uploadGame,
  setoldAssets,
  oldAssets,
  isUpdate,
  customGameTags,
}) => {
  const handleOldAssets = (remainingOldAssets: string[]) => {
    setoldAssets && setoldAssets(remainingOldAssets)
  }
  const x = useMemo(() => oldAssets?.length, [])
  const [errors, setErrors] = useState<Errors<Partial<GameInfo>>>({
    banner: "",
    description: "",
    developerName: "",
    developerType: "",
    distributionPlatforms: "",
    gameAssets: "",
    gameMode: "",
    genre: "",
    platforms: "",
    releaseDate: "",
    tags: "",
    title: "",
    // userId:""
  })
  const [dimensions] = useState<{
    height: number | null
    width: number | null
  }>({
    height: null,
    width: null,
  })

  const handleInputChange = useCallback(
    async <K extends keyof GameInfo>(
      field: K,
      value: GameInfo[K],
      validationFn: ValidationFunction<GameInfo[K]>,
      validationParams?: ValidationParams
    ) => {
      try {
        const validationError = value === null ? "" : await validationFn(value, validationParams)

        if (validationError) {
          setErrors((prev) => ({ ...prev, [field]: validationError }))
        } else {
          setErrors((prev) => ({ ...prev, [field]: null }))
        }
        if (field !== "gameAssets" && field !== "banner") {
          setGameInfo((prevState) => ({ ...prevState, [field]: value as string[] }))
        } else if (field == "gameAssets") {
          setGameInfo((prevState) => ({ ...prevState, [field]: value as File[] }))
        } else {
          setGameInfo((prevState) => ({ ...prevState, [field]: value as File }))
        }
      } catch (error) {
        console.error("Async validation error:", error)
      }
    },
    [setGameInfo, setErrors]
  )

  const initialDetailsArray: FilterDetail[] = [
    {
      title: "Game Name",
      inputType: "text",
      placeholder: "what's your game called",
      value: gameInfo?.title || "",
      onChange: (value) =>
        handleInputChange("title", value as string, validateStringField, {
          maxLength: 60,
          required: true,
        }),
      className: "bg-transparent rounded-md",
      errorMessage: errors.title,
    },
    {
      inputType: "file",
      title: "Game Cover",
      accept: "image/*",
      multiple: false,
      value: gameInfo.banner as string,
      onChange: async (value) =>
        await handleInputChange("banner", value as File | null, validateFileField, {
          required: true,
          fileMaxSize: 1024 * 1024,
        }),
      className: "",
      errorMessage: errors.banner,
    },
    {
      title: "Supported Platforms",
      inputType: "tags",
      placeholder: "Xbox, Play Station, etc",
      value: gameInfo.platforms,
      onTagsChange: (tags) =>
        handleInputChange("platforms", tags, validateStringArrayField, {
          required: true,
          maxLength: 10,
        }),
      initialtags: gameInfo.platforms,
      errorMessage: errors.platforms,
      selectOptions: [
        ...(customGameTags?.platform ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },

    {
      title: "Genre",
      inputType: "tags",
      placeholder: "Adventure, Action ,etc",
      value: gameInfo.genre,
      onTagsChange: (tags) =>
        handleInputChange("genre", tags, validateStringArrayField, {
          required: true,
          maxLength: 10,
        }),
      initialtags: gameInfo.genre,
      errorMessage: errors.genre,
      selectOptions: [
        ...(customGameTags?.genre ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },
    {
      title: "Mode",
      inputType: "select",
      selectOptions: [
        // {
        //   label: "Select Game Mode",
        //   value: "",
        // },
        {
          label: "single player",
          value: "singlePlayer",
        },
        {
          label: "multi player",
          value: "multiPlayer",
        },
      ],
      value: gameInfo.gameMode,
      onChange: (value) =>
        handleInputChange("gameMode", value as string, validateStringField, { required: true }),
      errorMessage: errors.gameMode,
      placeholder: "Select Game Mode",
    },

    {
      title: "Developer Name",
      inputType: "text",
      placeholder: "Developer Name",
      value: gameInfo.developerName,
      onChange: (value) =>
        handleInputChange("developerName", value as string, validateStringField, {
          maxLength: 60,
          required: true,
        }),
      className: "bg-transparent rounded-md",
      errorMessage: errors.developerName,
    },
    {
      title: "Developer Type",
      inputType: "select",
      selectOptions: [
        {
          label: "Select Developer Type",
          value: "",
        },
        {
          label: "Indie",
          value: "indie",
        },
        {
          label: "Studio",
          value: "studio",
        },
        {
          label: "Collaboration",
          value: "collaboration",
        },
      ],
      value: gameInfo.developerType,
      onChange: (value) =>
        handleInputChange("developerType", value as string, validateStringField, {
          required: true,
        }),
      errorMessage: errors.developerType,
      placeholder: "Enter Developer Type",
      // setGameInfo((prevState) => ({
      //   ...prevState,
      //   developerType: value as string,
      // })),
    },
    {
      title: "Distribution platforms",
      inputType: "tags",
      placeholder: "Windows, Linux etc",
      value: gameInfo.distributionPlatforms,
      onTagsChange: (value) =>
        handleInputChange("distributionPlatforms", value, validateStringArrayField, {
          required: true,
          maxLength: 10,
        }),
      errorMessage: errors.distributionPlatforms,
      initialtags: gameInfo.distributionPlatforms,
      selectOptions: [
        ...(customGameTags?.platform ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },
    {
      title: "Tags",
      inputType: "tags",
      placeholder: "Action, Shooting etc",
      value: gameInfo.tags,
      onTagsChange: (tags) =>
        handleInputChange("tags", tags, validateStringArrayField, {
          required: true,
          maxLength: 10,
        }),
      errorMessage: errors.tags,
      initialtags: gameInfo.tags || [],
      selectOptions: [
        ...(customGameTags?.tags ?? []).map((s) => ({
          label: s,
          value: s,
        })),
      ],
    },

    {
      title: "Release date",
      inputType: "date",
      value: gameInfo.releaseDate,
      className: "bg-transparent rounded-md w-[50%]",
      onChange: (value) => handleInputChange("releaseDate", value as string, validateStringField),
      errorMessage: errors.releaseDate,
    },
  ]
  useEffect(() => {
    gameInfo.gameAssets = []
  }, [])

  // const shadeVariant =
  //   " left-0 right-0 top-0  bg-gradient-to-b to-transparent from- group-hover:from-token-surface-primary dark:from-[#000]"
  const handleGameUpload = async () => {
    let flg = true
    const validationPromises = Object.entries(gameInfo).map(async ([field, value]) => {
      let validationFunction: (x: Allow, y: Allow) => string | Promise<string>
      const validationParams = getValidationParamsForField(field)

      switch (field) {
        case "title":
        case "gameMode":
        case "developerName":
        case "developerType":
        case "releaseDate":
          validationFunction = validateStringField
          flg === true && validationFunction(value, validationParams) === ""
            ? (flg = true)
            : (flg = false)
          setErrors((prev) => ({ ...prev, [field]: validationFunction(value, validationParams) }))
          break
        case "platforms":
        case "genre":
        case "distributionPlatforms":
        case "tags":
          validationFunction = validateStringArrayField
          flg === true && validationFunction(value, validationParams) === ""
            ? (flg = true)
            : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: validationFunction(value, validationParams) }))
          break

        case "gameAssets": {
          validationFunction = validateFileArrayField
          const x = await validationFunction(value, validationParams)
          flg === true && x === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: x }))

          break
        }

        case "description":
          validationFunction = validateStringField
          flg === true && validationFunction(value, validationParams) === ""
            ? (flg = true)
            : (flg = false)
          setErrors((prev) => ({
            ...prev,
            [field]: validationFunction(value, validationParams) as string,
          }))

          break

        case "banner": {
          validationFunction = validateFileField
          const y = await validationFunction(value, validationParams)
          flg === true && y === "" ? (flg = true) : (flg = false)

          setErrors((prev) => ({ ...prev, [field]: y }))

          break
        }
      }
    })
    await Promise.all(validationPromises)
    // let x = Object.values(errors).every((err) =>{ if(err==null){return true}else if(err==""){return true}else return false })

    if (flg) {
      uploadGame()
    } else {
      toast.info("Please fix the errors first!")
    }
  }
  const getValidationParamsForField = (field: string): ValidationParams => {
    // Define validation parameters for each field
    const validationParams: Record<string, ValidationParams> = {
      banner: { required: true, fileMaxSize: 1024 * 1024 },
      description: {},
      developerName: { required: true, maxLength: 60 },
      developerType: { required: true },
      distributionPlatforms: { required: true, maxLength: 10 },
      gameAssets: { required: true },
      gameMode: { required: true },
      genre: { required: true, maxLength: 10 },
      platforms: { required: true, maxLength: 10 },
      releaseDate: {},
      tags: { required: true, maxLength: 10 },
      title: { required: true, maxLength: 60 },
    }

    return validationParams[field] || {}
  }
  return (
    <>
      <div className="flex gap-4 p-6 mt-3 w-[100%] mx-auto md:flex-row flex-col items-center md:items-start">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex md:flex-row justify-center min-w-[280px] md:sticky top-[61px] h-fit flex-col"
          )}
        >
          <div className="flex flex-col w-full gap-4 p-2">
            <div className="flex w-full  bg-user_interface_2 border-user_interface_3 rounded-[15px] px-[6px] py-[15px] border-[1px]">
              <Button
                className="z-10 justify-center p-2 mx-auto rounded-md bg-secondary"
                // uploadGame()
                onClick={() => handleGameUpload()}
              >
                Publish Game
              </Button>
            </div>
            <div className=" relative h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[20px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px] flex ">
              {initialDetailsArray?.map((filter, index) => (
                <Filter
                  key={index}
                  inputType={filter.inputType}
                  title={filter.title}
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={filter.onChange}
                  selectOptions={filter.selectOptions}
                  onTagsChange={filter.onTagsChange}
                  className={filter.className}
                  Variant="flex flex-col items-start gap-[10px] text-[14px] "
                  errorMessage={filter.errorMessage}
                  dimensionsImage={dimensions}
                  initialtags={filter.initialtags}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 p-4">
          {isUpdate && x && (
            <div className="w-full bg-user_interface_2 py-[16px] px-[15px] ">
              <InitMultipleFileInput
                initFiles={oldAssets as string[] | null}
                onChange={(value) => handleOldAssets(value)}
              />
            </div>
          )}
          <div className="w-full bg-user_interface_2 py-[16px] px-[15px] ">
            <MultipleFileInput
              onFileChange={(value) =>
                handleInputChange("gameAssets", value, validateFileArrayField)
              }
              errorMessage={errors.gameAssets}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
