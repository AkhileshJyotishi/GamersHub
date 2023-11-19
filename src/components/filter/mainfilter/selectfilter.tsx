// SelectFilter.tsx
import React from "react"
import clsx from "clsx"

import Select from "@/components/ui/select"

interface SelectFilterProps {
  value: string
  onChange: (value: string) => void
  options?: { label?: string; value?: string | boolean | number }[]
  hidden?: boolean
}

const SelectFilter: React.FC<SelectFilterProps> = ({ value, onChange, options, hidden }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx("p-1 border rounded-md border-user_interface_4", hidden ? "hidden" : "")}
      options={options}
    />
  )
}

export default SelectFilter
