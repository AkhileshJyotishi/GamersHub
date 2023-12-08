import React, { useState } from "react"
import clsx from "clsx"

import { Errors, FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"
import MultipleFileInput from "../ui/multifileInput"
import { GameInfo } from "@/interface/games"


interface LayoutProps {
  children: React.ReactNode
  gameInfo: GameInfo
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>
  uploadGame: () => Promise<void>
}

const Layout: React.FC<LayoutProps> = ({ children, gameInfo, setGameInfo, uploadGame }) => {
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
  const [dimensions, setdimensions] = useState<{
    height: number | null;
    width: number | null;
  }
  >({
    height: null,
    width: null
  });
  const handleInputChange = <K extends keyof GameInfo>(field: K, value: GameInfo[K]) => {
    switch (field) {
      case "developerName":
      case "title":
        if (typeof value === "string") {
          if (value === "") {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length > 11) {
            setErrors((prev) => ({ ...prev, [field]: "*field too long" }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: null }))
          }
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
              }
              else if (img.width < minWidth || img.height < minHeight) {
                // console.log(img.width, minWidth)
                // console.log(img.height, minHeight)
                setErrors((prev) => ({ ...prev, banner: `Image dimensions must be ${minWidth}x${minHeight} or larger` }))
  
              }
              else {
                setErrors((prev) => ({ ...prev, banner: null }))
                // Proceed with setting the banner if all checks pass
              }
              setdimensions({
                height: img.height,
                width: img.width
              })
              setGameInfo((prevState) => ({ ...prevState, [field]: value as File }))
            }
  
            // Handle image loading error
            img.onerror = () => {
              setErrors((prev) => ({ ...prev, banner: "Error loading image" }))
            }
            setGameInfo((prevState) => ({ ...prevState, [field]: value as File }))
  
          }
          break;
      case "platforms":
      case "genre":
      case "distributionPlatforms":
      case "tags":
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          if (value.length == 0) {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          } else if (value.length >= 11) {
            setErrors((prev) => ({ ...prev, [field]: "*too many chosen" }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: null }))
          }
        }
        break

      case "gameMode":
        if (typeof value === "string") {
          const chk = ["singlePlayer", "multiPlayer"].includes(value)
          if (chk) {
            setErrors((prev) => ({ ...prev, [field]: null }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          }
        }
        break

      case "developerType":
        if (typeof value === "string") {
          const chk = ["indie", "studio", "collaboration"].includes(value)
          if (chk) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
          } else {
            setErrors((prev) => ({ ...prev, [field]: "*required" }))
          }
        }
        break

      case "releaseDate":
        if (typeof value === "string") {
          const currentDate = new Date()
          const check = new Date(value)
          if (check < currentDate) {
            setErrors((prev) => ({ ...prev, releaseDate: "Release date cannot be in the past" }))
          }
        }
        break
      case "gameAssets":
        if (Array.isArray(value) && value.every((item) => item instanceof File)) {
          if (value.length >= 10) {
            setErrors((prev) => ({ ...prev, gameAssets: "*length must be less than 10" }))
          } else {
            setErrors((prev) => ({ ...prev, gameAssets: "" }))
          }
          setGameInfo((prevState) => ({ ...prevState, [field]: value as File[] }))
        }
        break

      default:
        break
    }
    if (field !== "gameAssets" && field !== "banner")
      setGameInfo((prevState) => ({ ...prevState, [field]: value as string[] }))
  }

  const initialDetailsArray: FilterDetail[] = [
    {
      title: "Game Name",
      inputType: "text",
      placeholder: "what's your game called",
      value: gameInfo?.title || "",
      onChange: (value) => handleInputChange("title", value as string),
      // setGameInfo((prevState) => ({ ...prevState, title: value as string })),
      className: "bg-transparent rounded-md",
      errorMessage: errors.title,
    },
    {
      inputType: "file",
      title: "Game Cover",
      accept: "image/*",
      multiple: false,
      value: null,
      onChange: (value) => handleInputChange("banner", value as File),
      // setGameInfo((prevState) => ({ ...prevState, banner: value as File })),
      className: "",
      errorMessage: errors.banner,
      // errorMessage:errors.title
    },
    {
      title: "Supported Platforms",
      inputType: "tags",
      placeholder: "platform",
      onTagsChange: (tags) => handleInputChange("platforms", tags),
      errorMessage: errors.platforms,

      //  setGameInfo((prevState) => ({ ...prevState, platforms: tags })),
    },

    {
      title: "Genre",
      inputType: "tags",
      placeholder: "genres...",
      onTagsChange: (tags) => handleInputChange("genre", tags),
      errorMessage: errors.genre,
    },
    {
      title: "Mode",
      inputType: "select",
      selectOptions: [
        {
          label: "Select Game Mode",
          value: "",
        },
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
      onChange: (value) => handleInputChange("gameMode", value as string),
      errorMessage: errors.gameMode,
    },

    {
      title: "Developer Name",
      inputType: "text",
      placeholder: "developer name",
      value: gameInfo.developerName,
      onChange: (value) => handleInputChange("developerName", value as string),
      // setGameInfo((prevState) => ({
      //   ...prevState,
      //   developerName: value as string,
      // })),
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
      onChange: (value) => handleInputChange("developerType", value as string),
      errorMessage: errors.developerType,

      // setGameInfo((prevState) => ({
      //   ...prevState,
      //   developerType: value as string,
      // })),
    },
    {
      title: "Distribution platforms",
      inputType: "tags",
      placeholder: "distribution platforms...",
      // value: gameInfo.distributionPlatforms,
      onTagsChange: (value) => handleInputChange("distributionPlatforms", value),
      errorMessage: errors.distributionPlatforms,

      // (value) =>
      //   setGameInfo((prevState) => ({
      //     ...prevState,
      //     distributionPlatforms: value,
      //   })),
    },
    {
      title: "Tags",
      inputType: "tags",
      placeholder: "Action, Shooting",
      onTagsChange: (tags) => handleInputChange("tags", tags),
      errorMessage: errors.tags,

      //  (tags) => setGameInfo((prevState) => ({ ...prevState, tags: tags })),
    },
    // {
    //     title: "Publisher name",
    //     inputType: "text",
    //     placeholder: "Publisher name",
    //     value: gameInfo.publisherName,
    //     onChange: (value) => setGameInfo((prevState) => ({
    //         ...prevState,
    //         publisherName: value as string
    //     })),
    //     className: 'bg-transparent rounded-md',

    // },
    {
      title: "Release date",
      inputType: "date",
      value: gameInfo.releaseDate,
      className: "bg-transparent rounded-md w-[50%]",
      onChange: (value) => handleInputChange("releaseDate", value as string),
      errorMessage: errors.releaseDate,

      // (value) =>
      //   setGameInfo((prevState) => ({
      //     ...prevState,
      //     releaseDate: value as string,
      //   })),
    },
  ]
  // const shadeVariant =
  //   " left-0 right-0 top-0  bg-gradient-to-b to-transparent from- group-hover:from-token-surface-primary dark:from-[#000]"

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
                className="z-30 justify-center p-2 mx-auto rounded-md bg-secondary"
                onClick={() => uploadGame()}
              >
                Upload Game
              </Button>
            </div>
            <div className=" relative h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px] flex ">
              {/* <div className={clsx("h-7 ")}></div> */}
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
                />
              ))}

              {/* <>{JSON.stringify(gameInfo)}</> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 p-4">
          <div className="w-full bg-user_interface_2 py-[16px] px-[15px] ">
            <MultipleFileInput
              onFileChange={(value) => handleInputChange("gameAssets", value)}
              errorMessage={errors.gameAssets}
            />
            {/* {errors.gameAssets}   */}
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
