// Filter.tsx

import React from "react"
import clsx from "clsx"
import DatePicker from "react-date-picker"

import { FilterDetail } from "@/interface/filter"

import TagsInput from "@/components/ui/TagsInput"
import TextInput from "@/components/ui/textInput"

import CheckboxFilter from "./checkboxfilter"
import FileFilter from "./Filefilter"
import RadioFilter from "./radiofilter"
import SelectFilter from "./selectfilter"

import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

const Filter: React.FC<FilterDetail> = ({
  title,
  placeholder,
  value,
  onChange,
  inputType,
  onTagsChange,
  selectOptions,
  className,
  Variant,
  accept,
  multiple,
  initialtags,
  preview,
  errorMessage,
  dimensionsImage

  // hidden
}) => {
  const handleCheckboxChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue)
    }
  }
  const handleRadioChange = (newValue: boolean) => {
    if (onChange) {
      onChange(newValue)
    }
  }
  const handleSelectChange = (newValue: string) => {
    // setsetectedselect(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }
  // Handle tags input change
  const handleTagsChange = (tags: string[]) => {
    if (onTagsChange) {
      onTagsChange(tags)
      // console.log(tags)
    }
    // onChange(tags);
  }
  const handleFileChange = (files: File) => {
    if (onChange) {
      onChange(files)
    }
  }
  // console.log("selectOptions  ", selectOptions)
  return (
    <div className={clsx(Variant, "")}>
      <label className="mb-2 font-medium" htmlFor={title}>
        {title}
      </label>
      {inputType === "text" && (
        <>
          <TextInput
            onChange={(e) => onChange!(e.target.value)}
            type="text"
            className={className}
            value={value as string}
            name="text"
            placeholder={placeholder}
            id={title}
            errorMessage={errorMessage}
          />
        </>
      )}
      {inputType === "number" && (
        <>
          <TextInput
            onChange={(e) => onChange!(e.target.value)}
            type="number"
            className={className}
            value={value as number}
            name="number"
            placeholder={placeholder}
            id={title}
            errorMessage={errorMessage}
          />
        </>
      )}

      {inputType === "checkbox" && (
        <>
          <CheckboxFilter
            value={value as string}
            onChange={handleCheckboxChange}
            options={selectOptions}
            errorMessage={errorMessage}
          />
          {/* {errorMessage} */}
        </>
      )}
      {inputType === "radio" && (
        <>
          <RadioFilter
            onChange={handleRadioChange}
            options={selectOptions}
            value={value as boolean}
            errorMessage={errorMessage}
          />
        </>
      )}

      {inputType === "select" && (
        <>
          <SelectFilter
            onChange={handleSelectChange}
            value={value as string}
            options={selectOptions}
            errorMessage={errorMessage}

          // hidden={hidden}
          />
        </>
      )}
      {inputType === "date" && (
        <>
          <DatePicker
            name="date"
            onChange={(date) => onChange!(date as Date)}
            value={value as Date}
            id={title}
          />
          {errorMessage ? (
            <span className=" p-1 text-accent_red  font-[10px]">{errorMessage}</span>
          ) : (
            <></>
          )}
        </>
      )}
      {inputType === "tags" && (
        // Include the TagsInput component with the onTagsChange prop

        <TagsInput
          onTagsChange={handleTagsChange}
          id={title}
          predefinedTags={selectOptions?.map((option) => option.value as string) || []}
          initialtags={initialtags}
          errorMessage={errorMessage}
        />
      )}
      {inputType === "file" && (
        <>
          <FileFilter
            id={title}
            accept={accept || ""}
            multiple={multiple || false}
            onChange={(files) => {
              files && handleFileChange(files)
            }}
            className={className}
            preview={preview}
            value={value as string}
            errorMessage={errorMessage}
          />
          {dimensionsImage && dimensionsImage?.width !== null && dimensionsImage?.height !== null &&
            <>
              dimensions:{dimensionsImage?.width}x{dimensionsImage?.height}
            </>}
        </>
      )}
    </div>
  )
}

export default Filter
