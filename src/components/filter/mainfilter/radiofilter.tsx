import React from "react"

import Radio from "@/components/ui/radio"

interface RadioFilterProps {
  value: boolean
  options?: { label?: string; value?: boolean | string | number }[]
  onChange: (value: boolean) => void
}

const RadioFilter: React.FC<RadioFilterProps> = ({ value, options, onChange }) => {
  return (
    <div className="flex flex-col items-start gap-y-[18px]">
      {options?.map((option, index) => (
        <span key={index} className="flex flex-row flex-wrap items-center gap-x-2 ">
          <Radio
            checked={value === option.value}
            onChange={() => onChange(option.value as boolean)}
          />
          <span className="text-[14px] break-all">{option.label}</span>
        </span>
      ))}
    </div>
  )
}

export default RadioFilter
