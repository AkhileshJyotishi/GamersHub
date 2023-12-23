import { Fragment, useState } from "react"

import { Listbox, Transition } from "@headlessui/react"

import CheckIcon from "@/components/icons/tick-white"
import ChevronUpDownIcon from "@/components/icons/updown"

export default function Example({ people,setActiveTab,activeTab }: { people: string[],setActiveTab: React.Dispatch<React.SetStateAction<string>>,activeTab:string }) {
  // const [selected, setSelected] = useState<string>(people[0])

  return (
    <div className="w-full md:hidden bg-user_interface_2 rounded-xl">
      <Transition
        show={true}
        as={Fragment}
        enter="transition duration-300 ease-in-out"
        enterFrom=" translate-x-full"
        enterTo="translate-x-0"
        leave="transition duration-300 ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <Listbox value={activeTab} onChange={setActiveTab}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default focus:outline-none sm:text-sm">
              <span className="block text-center truncate">{activeTab}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon className="w-10 h-10 " aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="flex flex-col w-full gap-2 p-4 py-3 mt-1 overflow-auto text-base rounded-md shadow-lg max-h-64 focus:outline-none sm:text-sm bg-user_interface_2">
                {people?.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative  flex cursor-default select-none py-2 justify-around px-5 ${
                        active ? "bg-background text-secondary " : "text-light"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate text-center ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </Transition>
    </div>
  )
}
