import { Fragment } from "react"
import Image from "next/image"

import ChevronDownIcon from "@/assets/svg/chevron-right.svg"
import { Menu, Transition } from "@headlessui/react"

import Button from "../button"

import Dropdown from "./comp1"

interface MenuItemProps {
  active: boolean
  children: React.ReactNode
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const MenuItem: React.FC<MenuItemProps> = ({ active, children, icon: Icon }) => (
  <Button
    className={`${
      active ? "bg-secondary text-[#fff]" : "text-gray-900"
    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
  >
    <Icon className="w-5 h-5 mr-2 text-secondary" />
    {children}
  </Button>
)

const menuItems = [
  { label: "Edit", icon: EditInactiveIcon },
  { label: "Duplicate", icon: DuplicateInactiveIcon },
  { label: "Archive", icon: ArchiveInactiveIcon },
  { label: "Move", icon: MoveInactiveIcon },
  { label: "Delete", icon: DeleteInactiveIcon },
]

export default function Example() {
  const renderMenuItems = () => {
    return menuItems?.map((item, index) => (
      <Menu.Item key={index}>
        {({ active }) => (
          <MenuItem active={active} icon={item.icon}>
            {item.label}
          </MenuItem>
        )}
      </Menu.Item>
    ))
  }

  return (
    <div className="fixed w-56 text-right top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-black/20 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Options
            <Image
              width={2060}
              height={2060}
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              alt=""
              src={ChevronDownIcon}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
            <Menu.Item>name and profile</Menu.Item>

            {renderMenuItems()}
          </Menu.Items>
        </Transition>
      </Menu>
      <Dropdown />
    </div>
  )
}

function EditInactiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

// function EditActiveIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-[20px] w-[20px]"
//     >
//       <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
//     </svg>
//   )
// }

function DuplicateInactiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

// function DuplicateActiveIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M4 4H12V12H4V4Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M8 8H16V16H8V8Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
//     </svg>
//   )
// }

function ArchiveInactiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

// function ArchiveActiveIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect x="5" y="8" width="10" height="8" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
//       <rect x="4" y="4" width="12" height="4" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
//     </svg>
//   )
// }

function MoveInactiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

// function MoveActiveIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
//     </svg>
//   )
// }

function DeleteInactiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

// function DeleteActiveIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect x="5" y="6" width="10" height="10" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
//     </svg>
//   )
// }
