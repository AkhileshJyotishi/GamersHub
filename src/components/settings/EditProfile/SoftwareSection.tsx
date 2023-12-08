import React from "react"

import Filter from "@/components/filter/mainfilter/filter"

interface SoftwareSectionProps {
  selectedTags?: string[]
  predefinedTagsAsSelectOptions?: any[]
  onTagsChange: (tags: string[]) => void
}

const SoftwareSection: React.FC<SoftwareSectionProps> = ({
  // selectedTags,
  predefinedTagsAsSelectOptions,
  onTagsChange,
}) => {
  return (
    <>
      <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
        Softwares
      </h1>
      <div className="flex items-center justify-between w-full p-2 md:gap-8">
        <Filter
          key={"index"}
          inputType={"tags"}
          title={"Softwares"}
          placeholder={"Softwares..."}
          onTagsChange={onTagsChange}
          selectOptions={predefinedTagsAsSelectOptions}
          className={""}
          Variant="flex-col w-full flex"
        />
      </div>
    </>
  )
}

export default SoftwareSection
