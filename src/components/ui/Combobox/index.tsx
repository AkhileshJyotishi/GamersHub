import React, { Fragment, useState, ChangeEvent } from "react"
import { Combobox, Transition } from "@headlessui/react"
import CheckIcon from "@/components/icons/tick-white"
import ChevronUpDownIcon from "@/components/icons/updown"
import clsx from "clsx"

interface ComboboxInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const ComboboxInput: React.FC<ComboboxInputProps> = ({ onChange }) => (
  <Combobox.Input
    className="w-full py-2 pl-3 pr-10 text-sm leading-5 border border-none text-text focus:ring-0 bg-user_interface_3 border-user_interface_4"
    displayValue={(option: Option) => option?.label ?? ""}
    onChange={onChange}
  />
)

const ComboboxButton: React.FC = () => (
  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
    <ChevronUpDownIcon className="w-5 h-5 text-gray-400 fill-text" aria-hidden="true" />
  </Combobox.Button>
)

interface ComboboxOptionsProps {
  filteredOptions: Option[]
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const ComboboxOptions: React.FC<ComboboxOptionsProps> = ({ filteredOptions, query, setQuery }) => (
  <Transition
    as={Fragment}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    afterLeave={() => setQuery("")}
  >
    <Combobox.Options
      className="absolute w-full py-1 overflow-auto text-base rounded-md bg-user_interface_2 max-h-60 ring-1 ring-user_interface_4 focus:outline-none sm:text-sm"
      style={{ zIndex: 19 }}
    >
      {filteredOptions.length === 0 && query !== "" ? (
        <div
          className="relative px-4 py-2 cursor-default select-none text-text"
          style={{ zIndex: 19 }}
        >
          Nothing found.
        </div>
      ) : (
        filteredOptions.map((option) => (
          <Combobox.Option
            key={String(option.value)}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-secondary text-text" : "text-text"
              }`
            }
            value={option}
            style={{ zIndex: 19 }}
          >
            {({ selected, active }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {option?.label}
                </span>
                {selected ? (
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                      active ? "text-text" : "text-secondary"
                    }`}
                  >
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  </Transition>
)

interface ComboboxWrapperProps {
  selected: Option
  onChange: (value: Option) => void
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  filteredOptions: Option[]
}

const ComboboxWrapper: React.FC<ComboboxWrapperProps> = ({
  selected,
  onChange,
  query,
  setQuery,
  filteredOptions,
}) => (
  <div className="w-full overflow-hidden text-left rounded-lg shadow-md cursor-default bg-user_interface_3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
    <ComboboxInput onChange={(event) => setQuery(event.target.value)} />
    <ComboboxButton />
    <ComboboxOptions filteredOptions={filteredOptions} query={query} setQuery={setQuery} />
  </div>
)
interface Option {
  label?: string
  value?: string | boolean | number
}

interface CustomComboboxProps {
  value: string | boolean | number
  onChange: (value: string) => void

  options?: Option[]
  defaultSelected?: Option
  className?: string
  hidden?: boolean
  errorMessage?: string | null
}

const CustomCombobox: React.FC<CustomComboboxProps> = ({
  value,
  onChange,
  options,
  defaultSelected,
  className,
  hidden,
  errorMessage,
}) => {
  const [selected, setSelected] = useState<Option>(
    defaultSelected || (options && options.length > 0 ? options[0] : {})
  )
  const [query, setQuery] = useState<string>("")

  const filteredOptions =
    query === ""
      ? options
      : options?.filter(
          (option) =>
            option?.label
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <div className={clsx("relative  ", className)}>
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value)
          onChange((value.value as string) || "")
        }}
      >
        <ComboboxWrapper
          selected={selected}
          onChange={setSelected}
          query={query}
          setQuery={setQuery}
          filteredOptions={filteredOptions || []}
        />
        {errorMessage && <span className="p-1 text-accent_red font-[10px]">{errorMessage}</span>}
      </Combobox>
    </div>
  )
}

export default CustomCombobox
