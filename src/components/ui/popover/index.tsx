// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { useModalContext } from "@/providers/modal-context"
import { useUserContext } from "@/providers/user-context"
import { Popover, Transition } from "@headlessui/react"

interface PopoverItem {
  name: string
  description: string
  hrefOrState: string | Setjob
  applyWith?: "GCH" | "MANUAL"
  icon: React.ReactNode
}

interface DynamicPopoverProps {
  items: PopoverItem[]
  buttonText: string
}

interface DynamicPopoverItemProps extends PopoverItem {}

const DynamicPopoverItem: React.FC<DynamicPopoverItemProps> = ({
  name,
  description,
  hrefOrState,
  icon: Icon,
  applyWith,
}) => {
  const router = useRouter()
  const session = useSession()
  const { setmodalData } = useModalContext()
  const { setIsLoginModalOpen } = useUserContext()
  const handleClose = () => {
    setmodalData(() => ({
      buttonText: "",
      onClick: () => {},
      content: <></>,
      isOpen: false,
      onClose: () => {},
      title: <></>,
    }))
  }
  const isProfileFilled = true
  const handlePopOverItemClick = () => {
    if (!session.data?.user) {
      setIsLoginModalOpen(true)
      return
    }
    if (typeof hrefOrState == "string") {
      router.push(hrefOrState)
    } else {
      if (applyWith == "GCH") {
        if (isProfileFilled) {
          hrefOrState(true)
        } else {
          setmodalData(() => ({
            buttonText: "Proceed To Fill",
            content: (
              <div className="text-dull my-2 mb-4">
                Complete your profile for a tailored hiring experience and seamless job
                applications.
              </div>
            ),
            onClick: () => {
              router.push(`/settings`)
              handleClose()
            },
            isOpen: true,
            onClose: () => {
              handleClose()
            },
            title: <h3 className="text-text text-xl font-[800]">Complete Profile</h3>,
          }))
        }
      } else {
        hrefOrState(true)
      }
    }
  }
  return (
    <div
      className={`group flex items-center rounded-lg p-2 transition duration-200 ease-in-out  border-[0.1px] border-user_interface_4 hover:bg-secondary text-text `}
      onClick={() => handlePopOverItemClick()}
    >
      <div
        className={`rounded-md flex h-10 w-10 shrink-0 items-center justify-center  sm:h-12 sm:w-12 bg-user_interface_4`}
      >
        {Icon}
      </div>
      <div className="ml-4">
        <div className={`text-sm font-bold `}>{name}</div>
        <div className="text-sm mt-2 text-dull group-hover:text-text duration-200">
          {description}
        </div>
      </div>
    </div>
  )
}

const DynamicPopover: React.FC<DynamicPopoverProps> = ({ items, buttonText }) => (
  <Popover className="relative">
    {() => (
      <>
        <Popover.Button
          className={`group inline-flex items-center  bg-secondary  text-base  hover:text-text     hover:bg-secondary border-secondary border-[0.1px] py-[10px] px-[15px] md:px-[30px] font-medium rounded-xl gap-2`}
        >
          <span>{buttonText}</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-[30px] md:left-1/2 z-10 mt-3  w-[290px] sm:w-[310px] -translate-x-1/2 transform px-4 sm:px-0 ">
            <div className="overflow-hidden rounded-lg shadow-lg  ">
              <div className="relative gap-2 md:gap-4 bg-user_interface_2 p-3  flex flex-col">
                {items.map((item) => (
                  <DynamicPopoverItem key={item.name} {...item} />
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
)

export default DynamicPopover
