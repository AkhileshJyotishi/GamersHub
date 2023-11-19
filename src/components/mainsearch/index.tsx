import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
// import BriefcaseIcon from '../Icons/briefcase'
// import ChevronDownIcon from '../Icons/chevron-down'
import { useRouter } from "next/navigation"

// import SearchIcon from '@/components/Icons/search'
import { getLocalRecentSearches, setLocalRecentSearches } from "@/utils/functions/index"
interface Props {}

const SearchFor = [
  {
    link: "/jobs",
    title: "Jobs",
    icon: "BriefcaseIcon",
  },
  {
    link: "/portfolio",
    title: "Portfolio’s",
    icon: "BriefcaseIcon",
  },
  {
    link: "/creators",
    title: "Game creator’s",
    icon: "BriefcaseIcon",
  },
]
// props: Props
const Search = () => {
  const router = useRouter()
  const [openDropDown, setOpenDropDown] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchText, setSearchText] = useState("")

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const _recentSearches = getLocalRecentSearches()
    if (_recentSearches) {
      setRecentSearches(_recentSearches)
    }
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenDropDown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const search = () => {
    setLocalRecentSearches(searchText)
    router.push(`/search/${searchText}`)
  }

  return (
    <div
      className="relative flex flex-col gap-0 "
      // onBlur={() => setOpenDropDown(false)}
      onFocus={() => setOpenDropDown(true)}
      ref={searchRef}
    >
      <div className="relative m-0 rounded-md shadow-sm ">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              search()
            }
          }}
          placeholder="Search"
          type="text"
          className={`bg-transparent  ${
            openDropDown ? "rounded-[10px] rounded-b-none" : "rounded-[10px]"
          } border-[1px] border-transparent hover:bg-transparent  focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm w-fit px-[12px] py-[10px] flex flex-row items-center outline-none`}
        />
        <div className="absolute translate-y-[-50%] top-[50%] left-[5%] flex items-center pointer-events-none">
          {/* <img src='/assets/icons/search.svg' /> */}
          {/* <SearchIcon className='' /> */}
        </div>
      </div>

      {openDropDown && (
        <div className="absolute z-40 top-[100%]  rounded-b-[10px] border-t-[1.5px] border-user_interface_3 py-[5px] px-[22px] w-full">
          <div className="flex flex-col items-start ">
            <span className="text-[14px] font-medium text-user_interface_6">RECENT SEARCH</span>
            {recentSearches?.length > 0 &&
              recentSearches?.map((recent) => (
                <Link
                  href={`/search/${recent}`}
                  key={recent}
                  className="text-[15px] font-medium  cursor-pointer"
                >
                  {recent}
                </Link>
              ))}
          </div>
          <div className="flex flex-col items-start mt-5 ">
            <span className="text-[14px] font-medium text-user_interface_6">SEARCH FOR</span>
            {SearchFor.map((val, i) => (
              <Link
                href={val?.link}
                key={i}
                className="flex flex-row gap-2 my-1 items-center border-user_interface_4 rounded-[11px] py-[5px] px-2 border-[2px] w-full"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-md bg-user_interface_3">
                  {/* <val.icon className='w-6 h-6 text-secondary' /> */}
                </span>
                <span className="text-[15px] font-medium cursor-pointer">{val?.title}</span>
                {/* <ChevronDownIcon className='rotate-[-90deg] w-3 h-3 ml-auto' /> */}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
