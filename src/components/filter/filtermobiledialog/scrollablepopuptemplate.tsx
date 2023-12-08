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
        className="fixed inset-0 z-50 bg-black cursor-pointer opacity-70"
        onClick={onClose}
      ></div>

      <div className="fixed z-[90] inset-0  flex flex-col items-center justify-center overflow-x-hidden  overflow-y-scroll mt-12 w-full mx-auto backdrop-blur">
        {/* Container */}

        {displayWithoutContainer ? (
          <div className={"w-full flex items-center justify-center " + (containerClass ?? "")}>
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
