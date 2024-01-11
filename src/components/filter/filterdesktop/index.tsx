import clsx from "clsx"

import { filterprops } from "@/interface/filter"

import Button from "@/components/ui/button"

import Filter from "../mainfilter/filter"
// import Filter from '../../components/filter/filter';

const DesktpFilter: React.FC<filterprops> = ({
  clearFilters,
  className,
  searchWithFilters,
  FilterArray,
  loading,
}) => {
  return (
    <div
      className={clsx(
        "w-full md:w-[23vw] flex justify-center min-w-[280px] sticky top-[61px] h-fit",
        className
      )}
    >
      <div className="flex-col min-w-[260px] px-[16px] py-[28px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px] gap-[30px] hidden md:flex w-[85%]">
        <div className="flex flex-row items-baseline justify-between">
          <span className="text-[22px] font-bold">Filters</span>
          <span className="cursor-pointer text-lg scale-75" onClick={clearFilters}>
            Clear filters
          </span>
        </div>

        {FilterArray?.map((filter, index) => (
          <Filter
            key={index}
            inputType={filter.inputType}
            title={filter.title}
            placeholder={filter.placeholder}
            value={filter.value!}
            onChange={filter.onChange}
            selectOptions={filter.selectOptions}
            className={filter.className}
            Variant="flex flex-col items-start gap-[10px] text-[14px]"
            onTagsChange={filter.onTagsChange}
            initialtags={filter.initialtags}
          />
        ))}

        <Button
          onClick={searchWithFilters}
          className={clsx(
            "center w-full mt-5 md:w-full h-fit sm:mt-0 bg-secondary py-[10px] px-[20px] rounded-xl disabled:cursor-not-allowed"
          )}
          disabled={loading}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

export default DesktpFilter
