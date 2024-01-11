import React from "react"

interface Props {
  onClose?: React.MouseEventHandler
  containerClass?: string
  children: React.ReactNode
  displayWithoutContainer?: boolean
}

export function ScrollablePopupTemplate({
  onClose,
  children,
  containerClass,
  displayWithoutContainer,
}: Props) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-[#000] cursor-pointer opacity-70 backdrop-blur"
        onClick={onClose}
      ></div>

      <div className="fixed z-[90] inset-0  flex flex-col items-center justify-center overflow-x-hidden   w-full mx-auto  h-fit top-[30%]">
        {/* Container */}

        {displayWithoutContainer ? (
          <div
            className={"w-full flex items-center justify-center h-fit " + (containerClass ?? "")}
          >
            {children}
          </div>
        ) : (
          <div
            className={
              "shadow-glow w-[90%] lg:w-[930px] h-full rounded-[10px] bg-user_interface_2 overflow-scroll " +
              (containerClass || "")
            }
          >
            {children}
          </div>
        )}
      </div>
    </>
  )
}
