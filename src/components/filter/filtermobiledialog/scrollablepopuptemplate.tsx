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
        className="fixed z-50 top-0 bottom-0 left-0 right-0 h-full w-full bg-[#000] cursor-pointer opacity-70 backdrop-blur"
        onClick={onClose}
      ></div>

      <div className="fixed z-[90] top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-start overflow-x-hidden my-auto w-[75%] mx-auto h-fit max-h-[85vh] ">
        {/* Container */}

        {displayWithoutContainer ? (
          <div
            className={"w-full flex items-center justify-center h-full " + (containerClass ?? "")}
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
