import React from "react"
import clsx from "clsx"

import MyListbox from "../ui/listbox"

type Tab = {
  params: {
    icon: string
    tabName: string
    className?: string
  }
}

type SidebarNavigator = {
  tabs: { [key: string]: Tab }
  initialRouteName: string
}

type SidebarProps = {
  navigator: SidebarNavigator
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  className: string
  // renderComponent: React.ComponentType;
}

const Sidebar: React.FC<SidebarProps> = ({ navigator, setActiveTab, activeTab, className }) => {
  // console.log(navigator?.tabs["DeleteAccount"]?.params?.className)
  const people = Object.keys(navigator?.tabs ?? {})?.map((val) => val)
  return (
    <>
      <div className={clsx(" rounded-xl p-4 hidden md:flex w-full gap-2  ", className)}>
        {Object.keys(navigator?.tabs ?? {})?.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              `text-center p-2 cursor-pointer items-center truncate ${
                activeTab === tab
                  ? `${
                      activeTab === "DeleteAccount" ? "" : "bg-secondary"
                    } text-background rounded-xl`
                  : ""
              }`,
              navigator?.tabs[tab]?.params?.className
            )}
          >
            {navigator?.tabs[tab]?.params?.tabName}
          </div>
        ))}
      </div>
      <MyListbox people={people} />
    </>
  )
}

export default Sidebar
