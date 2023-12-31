import React, { useMemo, useState } from "react"
import Fuse, { IFuseOptions } from "fuse.js"

import Accordion from "@/components/ui/accordion"
import Sidebar from "@/components/ui/Sidebar"

import { BannerComponent } from "../filter"
import Filter from "../filter/mainfilter/filter"
import Button from "../ui/button"

type SidebarNavigator = {
  tabs: { [key: string]: Tab }
  initialRouteName: string
}
type Tab = {
  params: TabDetails
}

type TabDetails = {
  icon: string
  tabName: string
  className?: string
}
interface FAQItem {
  id: number
  question: string
  solution: string | null
  helpCategory: IFAQCategory | null
  helpCategoryId: number
}

interface SettingsLayoutProps {
  HelpCategories: IFAQCategory[]
}
const HelpLayout: React.FC<SettingsLayoutProps> = ({ HelpCategories }) => {
  const sortedCategories = HelpCategories.sort((a, b) => a.position - b.position).filter(
    (cat) => cat.helpQuestions.length != 0
  )
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<FAQItem[]>([])
  const [activeTab, setActiveTab] = useState<string>(sortedCategories[0]?.title)
  const [query, setQuery] = useState("")
  const sidebarNavigator: SidebarNavigator = {
    tabs: sortedCategories.reduce(
      (tabs, category) => {
        tabs[category.title] = {
          params: {
            icon: "default-icon", // You can replace this with the actual icon for each category
            tabName: category.title,
          },
        }

        return tabs
      },
      {} as { [key: string]: Tab }
    ),
    initialRouteName: sortedCategories.length > 0 ? sortedCategories[0].title : "",
  }
  sidebarNavigator.tabs["searchResults"] = {
    params: {
      icon: "search-icon", // Replace with the actual search icon
      tabName: "Search Results",
    },
  }
  const activeCategory = sortedCategories.find((category) => category.title === activeTab)
  const fuseOptions: IFuseOptions<IFAQQuestion> = {
    keys: ["question", "solution"],
    threshold: 0.7, // Adjust the threshold for fuzzy matching
  }
  const fuse = useMemo(
    () =>
      new Fuse(
        sortedCategories.flatMap((category) => category.helpQuestions),
        fuseOptions
      ),
    [sortedCategories]
  )
  const handleSearch = () => {
    setActiveTab("searchResults")
    const results = fuse.search(searchTerm)
    setSearchResults(results.map((result) => result.item) as FAQItem[])
    setQuery(searchTerm)
    setSearchTerm("")
  }

  return (
    <>
      <div className="w-full">
        <BannerComponent
          className={"w-[100%] py-[52px] text-center bg-user_interface_3 mx-auto"}
          bannerText={
            <>
              <div>Ask questions, Find answers and Contact us</div>
              <div className="mx-auto sm:60vw md:w-[40vw] flex items-center justify-between gap-4 md:flex-row flex-col">
                <Filter
                  key={"input"}
                  inputType={"text"}
                  title={""}
                  placeholder={"Search help..."}
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value as string)}
                  className={"bg-background text-text rounded-md  "}
                  Variant="flex flex-col  gap-[10px] text-[14px] w-full"
                />
                <div>
                  <Button
                    onClick={() => {
                      searchTerm !== "" && handleSearch()
                    }}
                    className="px-4 py-1 bg-secondary text-text rounded-md mt-2"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </>
          }
          bannerTitle={
            <>
              <span className="text-secondary"> GCH Help center</span>
            </>
          }
        />
      </div>
      <div className="flex w-full md:w-[80%] mx-auto gap-[30px] p-[10px] md:p-[20px] relative  flex-col md:flex-row ">
        <Sidebar
          navigator={sidebarNavigator}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="whitespace-nowrap md:whitespace-normal w-full md:w-[25%] md:sticky md:top-[65px] h-fit bg-user_interface_2 flex-col  "
        />
        <div className="w-full md:p-3 bg-user_interface_2 rounded-xl min-h-[80vh]">
          <div className="text-text text-[16px] bg-user_interface_2  shadow-secondary flex md:p-4  flex-col items-start mt-6 lg:w-[80%] w-[95%]  mx-auto mb-6 rounded-xl">
            {activeTab !== "searchResults" ? (
              activeCategory ? (
                activeCategory.helpQuestions
                  .sort(
                    (a, b) =>
                      activeCategory.order.indexOf(a.id) - activeCategory.order.indexOf(b.id)
                  )
                  .map((question) => (
                    <Accordion
                      key={question.id}
                      title={question.question}
                      content={question.solution || "No solution available."}
                    />
                  ))
              ) : (
                <div>No questions available for the selected category.</div>
              )
            ) : searchResults.length > 0 ? (
              <>
                {query && <div className="mb-2">Query:{query}</div>}
                {searchResults.map((result) => (
                  <>
                    <Accordion content={result.solution} title={result.question} key={result.id} />
                  </>
                ))}
              </>
            ) : (
              <div className="h-[40vh] center w-full">No results Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpLayout
