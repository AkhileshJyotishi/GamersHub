import React from "react"

// import Filter from '../filter/mainfilter/filter';
import Filter from "@/components/filter/mainfilter/filter"

interface SkillsSectionProps {
  selectedTags?: string[]
  predefinedTagsAsSelectOptions?: { label: string; value: string }[]
  onTagsChange: (tags: string[]) => void
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  predefinedTagsAsSelectOptions,
  onTagsChange,
}) => {
  return (
    <>
      <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
        Skills
      </h1>
      <div className="flex items-center justify-between w-full p-2 md:gap-8">
        <Filter
          key={"index"}
          inputType={"tags"}
          title={"skills"}
          placeholder={"skills..."}
          onTagsChange={onTagsChange}
          selectOptions={predefinedTagsAsSelectOptions}
          className={""}
          Variant="flex-col w-full flex"
        />
      </div>
    </>
  )
}

export default SkillsSection
