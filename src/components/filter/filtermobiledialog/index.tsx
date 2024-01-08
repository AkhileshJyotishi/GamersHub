import React from "react"

import { filterprops } from "@/interface/filter"

import Button from "@/components/ui/button"

import Filter from "../mainfilter/filter"

import { ScrollablePopupTemplate } from "./scrollablepopuptemplate"

interface FilterMobileDialogProps extends filterprops {
  popup: boolean
  setPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterMobileDialog: React.FC<FilterMobileDialogProps> = ({
  clearFilters,
  searchWithFilters,
  popup,
  setPopup,
  FilterArray,
}) => {
  return (
    <>
      {/* <div className="flex md:hidden"> */}
      {popup && (
        <ScrollablePopupTemplate
          onClose={() => {
            setPopup(false)
          }}
          displayWithoutContainer
          containerClass="flex w-full sm:justify-center"
        >
          <div
            className={`flex flex-col px-[12px] py-[10px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] w-5/6 gap-[20px] gap-y-4 `}
          >
            <div className="flex flex-row flex-wrap items-baseline justify-between">
              <span className="text-[22px] font-bold">Filters</span>
              <span className="cursor-pointer" onClick={clearFilters}>
                Clear filters
              </span>
            </div>
            {FilterArray?.map((filter, index) => (
              <Filter
                key={index}
                inputType={filter?.inputType}
                title={filter?.title}
                placeholder={filter.placeholder}
                value={filter?.value}
                onChange={filter.onChange}
                selectOptions={filter.selectOptions}
                className={filter.className}
                Variant="flex flex-col items-start gap-[10px] text-[14px]"
                onTagsChange={filter.onTagsChange}
              />
            ))}

            <div className="flex flex-row flex-wrap justify-between">
              <Button
                onClick={() => {
                  setPopup(false)
                }}
                className="p-2 bg-secondary rounded-xl"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  searchWithFilters!()
                }}
                className="p-2 bg-secondary rounded-xl"
              >
                Apply
              </Button>
            </div>
          </div>
        </ScrollablePopupTemplate>
      )}
      {/* </div> */}
    </>
  )
}

export default FilterMobileDialog
