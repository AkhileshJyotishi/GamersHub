import React from "react"
import clsx from "clsx"

import { FilterDetail } from "@/interface/filter"

import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"

// Add more properties if needed

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

  const alb = albums.map((album: Allow) => ({ label: album.title, value: album.id }))
  albumsselectoptions = albumsselectoptions.concat(alb)
  const filterDetails: FilterDetail[] = [
    {
      inputType: "text",
      title: "Title",
      placeholder: "title",
      value: filtersState?.title,
      onChange: (value) =>
        setFiltersState((prevState) => ({
          ...prevState,
          title: value as string,
        })),
      className: "mt-2 bg-transparent rounded-md",
    },
    // {
    //     inputType: 'text',
    //     title: 'Title',
    //     placeholder: 'title',
    //     value: filtersState?.postKeywords,
    //     onChange: (value) => setFiltersState((prevState) => ({
    //         ...prevState,
    //         postKeywords: value as string,

    //     })),
    //     className: 'mt-2 bg-transparent rounded-md',

    // },
    {
      inputType: "tags",
      title: "Keyword Tags",
      onTagsChange: (tags) =>
        setFiltersState((prevState) => ({ ...prevState, postKeywords: tags })),
      placeholder: " keywords..",
    },
    // {
    //     inputType: 'text',
    //     title: 'Tools Used',
    //     placeholder: 'Search for tools you used',
    //     value: filtersState.postInfo.toolUsed,
    //     onChange: (value) => setFiltersState((prevState) => ({
    //         ...prevState,
    //         postInfo: {
    //             ...prevState.postInfo,
    //             toolUsed: value as string,
    //         },
    //     })),
    //     className: 'mt-2 bg-transparent rounded-md',

    // },
    // {
    //     inputType: 'tags',
    //     title: 'Tools Tags',
    //     onTagsChange: (tags) => setFiltersState((prevState) => ({ ...prevState, toolsUsed: tags })),
    //     placeholder: 'Search for tools you used',
    // },

    {
      inputType: "select",
      title: "Album Selection",
      selectOptions: albumsselectoptions,
      value: filtersState.albumId,
      onChange: (value) =>
        setFiltersState((prevState) => ({ ...prevState, albumId: value as number })),
      className:
        "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
    },
    {
      inputType: "radio",
      title: "Adult content",
      selectOptions: [
        { label: "true", value: false },
        { label: "false", value: true },
      ],
      value: filtersState.matureContent,
      onChange: (value) =>
        setFiltersState((prevState) => ({ ...prevState, matureContent: value as boolean })),
    },
    {
      inputType: "file",
      title: "Upload File",
      accept: "image/*", // Define accepted file types
      multiple: true, // Set to true if you want to allow multiple file selection
      value: null, // Initialize with null
      onChange: (value) =>
        setFiltersState((prevState) => ({ ...prevState, banner: value as File })), // Handle file input changes
      className:
        "bg-gray_dull text-text bg-user_interface_3 rounded-md border-2 border-transparent hover:bg-transparent focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-full px-3 py-2 flex flex-row items-center",
    },
  ]

  return (
    <>
      <div className="flex gap-4 p-6 mt-3 w-[100%] mx-auto md:flex-row flex-col items-center md:items-start">
        <div
          className={clsx(
            "w-full md:w-[23vw] flex md:flex-row justify-center min-w-[280px] md:sticky top-[61px] h-fit flex-col"
          )}
        >
          <div className="h-fit md:h-[80vh] md:overflow-y-scroll  flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-full gap-[30px]    flex">
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
              />
            ))}

            <Button className="p-2 bg-secondary w-[80%] mx-auto" onClick={uploadPost}>
              Create Post
            </Button>
            <></>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
