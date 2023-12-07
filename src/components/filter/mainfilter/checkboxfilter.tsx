// CheckboxFilter.tsx

import React from "react"

import CheckBox from "@/components/ui/checkbox2"

interface CheckboxFilterProps {
  value: string
  onChange: (value: string) => void
  options?: { label?: string; value?: string | boolean | number }[]
  errorMessage?: string | null
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  value,
  onChange,
  options,
  errorMessage,
}) => {
  return (
    <>
      <div className="flex flex-col items-start gap-y-[18px]">
        {options?.map((option, index) => (
          <>
            <span key={index} className="flex flex-row flex-wrap items-center gap-x-2">
              <CheckBox
                checked={value === option?.value}
                onChange={() => onChange(option?.value as string)}
              />
              <span className="text-[14px] break-all">{option?.label}</span>
            </span>
          </>
        ))}
      </div>
      {errorMessage ? (
        <span className=" p-1 text-accent_red  font-[10px]">{errorMessage}</span>
      ) : (
        <></>
      )}
    </>
  )
}

export default CheckboxFilter
