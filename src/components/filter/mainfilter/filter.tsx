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
  // hidden
}) => {
  // const [selectedCheckbox, setSelectedCheckbox] = useState<string>(value as string)
  // const [setectedselect, setsetectedselect] = useState<string>(value as string)
  // const [selectedRadio, setSelectedRadio] = useState<boolean>(value as boolean)
  // const [startDate, setStartDate] = useState<Date>(new Date())
  const handleCheckboxChange = (newValue: string) => {
    // setSelectedCheckbox(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }
  const handleRadioChange = (newValue: boolean) => {
    // setSelectedRadio(newValue)
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
      console.log(tags)
    }
    // onChange(tags);
  }
  const handleFileChange = (files: File) => {
    if (onChange) {
      onChange(files)
    }
  }

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
          />
        </>
      )}

      {inputType === "checkbox" && (
        <>
          <CheckboxFilter
            value={value as string}
            onChange={handleCheckboxChange}
            options={selectOptions}
          />
        </>
      )}
      {inputType === "radio" && (
        <>
          <RadioFilter
            onChange={handleRadioChange}
            options={selectOptions}
            value={value as boolean}
          />
        </>
      )}

      {inputType === "select" && (
        <>
          <SelectFilter
            onChange={handleSelectChange}
            value={value as string}
            options={selectOptions}
            // hidden={hidden}
          />
        </>
      )}
      {inputType === "date" && (
        // <input
        //     type="date"
        //     className={className}
        //     value={value as string}
        //     onChange={(e) => handleDateChange(new Date(e.target.value))}
        // />
        <DatePicker
          name="date"
          onChange={(date) => onChange!(date as Date)}
          value={value as Date}
          id={title}
        />
      )}
      {inputType === "tags" && (
        // Include the TagsInput component with the onTagsChange prop
        <TagsInput
          onTagsChange={handleTagsChange}
          id={title}
          predefinedTags={selectOptions?.map((option) => option.value as string) || []}
          initialtags={initialtags}
        />
      )}
      {inputType === "file" && (
        <>
          {/* gfxg */}
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
          />
        </>
      )}
    </div>
  )
}

export default Filter
