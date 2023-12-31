import React, { ReactNode } from "react"
import { FaChevronUp } from "react-icons/fa"

import { Disclosure } from "@headlessui/react"
interface AccordionProps {
  title: string
  content: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between  bg-user_interface_3  px-4 py-4 text-left text-sm font-medium text-secondary  focus:outline-none mt-4 ">
            <span>{title}</span>
            <FaChevronUp
              className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-secondary`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-text bg-user_interface_3 rounded-sm mb-4 p-3  w-full">
            <div className="w-full bg-user_interface_3">{content}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
export default Accordion
