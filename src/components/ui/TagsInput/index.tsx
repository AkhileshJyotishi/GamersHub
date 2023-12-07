import React, { useState } from "react"
import clsx from "clsx"

import CloseIcon from "@/components/icons/closeIcon"

// import { SecondaryTag } from "../badges"
import TextInput from "../textInput"

interface TagsInputProps {
  predefinedTags: string[]
  onTagsChange: (tags: string[]) => void
  id?: string
  className?: string
  initialtags?: string[]
  errorMessage?: string | null
}

const TagsInput: React.FC<TagsInputProps> = ({
  predefinedTags,
  onTagsChange,
  id,
  // className,
  initialtags,
  errorMessage,
}) => {
  const [tags, setTags] = useState<string[]>(initialtags ?? [])
  const [inputValue, setInputValue] = useState<string>("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    setInputValue(inputText)
    let matchedTags: string[] = [];
    console.log("predefinedTags ",predefinedTags)
    if (predefinedTags.length > 0) {

      matchedTags = predefinedTags.filter((tag) =>
        tag.toLowerCase().includes(inputText.toLowerCase().trim())
      )

    }

    setSuggestions(matchedTags)

  }

  const addTag = (tagText?: string) => {
    if (tagText) {
      onTagsChange([...tags, tagText])
      console.log(tags);
      setTags((tags) => [...tags, tagText])
      setInputValue("")
      setSuggestions([])
    } else if (inputValue.trim() !== "") {
      onTagsChange([...tags, inputValue])
      setTags([...tags, inputValue])
      setInputValue("")
      setSuggestions([])
    }
  }

  const removeTag = (tagText: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagText)
    setTags(updatedTags)
    onTagsChange(updatedTags)
  }
  const handleBlur = () => {
    setSuggestions([])
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // console.log("the current inputValue is ", inputValue)
      // console.log(e.currentTarget.value)
      addTag()
    }
  }

  return (
    <div className="flex flex-col items-start w-full ">
      <TextInput
        type="text"
        placeholder="Enter tags"
        name="tags"
        className={clsx(
          "bg-transparent rounded-md",
          errorMessage && "border-accent_red focus:border-accent_red focus:shadow-accent_red"
        )}
        value={inputValue}
        onChange={handleInput}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        id={id}
      />

      {suggestions.length > 0 && (
        <div
          className="absolute flex flex-col gap-2 p-4 mt-12 rounded-lg shadow-md bg-background "
          style={{ zIndex: 18 }}
        >
          {suggestions.map((tag, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-user_interface_2"
              onMouseDown={() => addTag(tag)}
              tabIndex={0}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2 ">
        {tags &&
          tags.map((chip, index) => (
            <span key={index} className="flex items-center ">
              <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full hover:border-secondary">
                {/* Add your Chip SVG or Icon here */}
                <span className="" onClick={() => removeTag(chip)}>
                  <CloseIcon className="h-[15px] w-[12px] mt-[6px] fill-light hover:fill-red-500" />
                </span>
                <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px] break-all">
                  {chip}
                </div>
              </div>
            </span>
          ))}

        {/* another tag variant but looks bulky */}
        {/* {tags.map((tag, index) => (
                    <>
                        <span className='flex justify-start bg-user_interface_3 w-fit rounded-xl px-[5.5px] cursor-pointer mt-[6px]' >
                            <SecondaryTag name={tag} className='rounded-xl px-[1px] py-[1px]' />
                            <span
                                className="p-[1px] mt-[6px] "
                                onClick={() => removeTag(tag)}
                            >
                                <CloseIcon className='' />
                            </span>
                        </span>
                    </>
                ))} */}
      </div>
      {errorMessage ? (
        <span className=" p-1 text-accent_red  font-[10px]">{errorMessage}</span>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TagsInput
