import clsx from "clsx"

import { filterprops, Props } from "@/interface/filter"

import Button from "@/components/ui/button"

import Filter from "../mainfilter/filter"
// import Filter from '../../components/filter/filter';

const DesktpFilter: React.FC<filterprops & Props> = ({
  clearFilters,
  className,
  searchWithFilters,
  FilterArray,
}) => {
  return (
    <div
      className={clsx(
        "w-full md:w-[23vw] flex justify-center min-w-[280px] sticky top-[61px] h-fit",
        className
      )}
    >
      <div className="flex-col min-w-[260px] px-[16px] py-[35px] border-[1px] bg-user_interface_2 border-user_interface_3 rounded-[10px]  gap-[30px] hidden md:flex w-[85%]">
        <div className="flex flex-row items-baseline justify-between">
          <span className="text-[22px] font-bold">Filters</span>
          <span className="cursor-pointer" onClick={clearFilters}>
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
          />
        ))}

        <Button
          onClick={searchWithFilters}
          className="  flex flex-row items-center w-full mx-auto mt-5 md:w-fit h-fit sm:mt-0 bg-secondary py-[10px] px-[20px] rounded-xl"
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

export default DesktpFilter
