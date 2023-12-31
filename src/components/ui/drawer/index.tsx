import React, { ReactNode, useCallback } from "react"
import { IoMdClose } from "react-icons/io"

import { useUserContext } from "@/providers/user-context"
interface DrawerProps {
  children: ReactNode
  isOpen: boolean
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>

  overlayClickClose?: boolean
  header?: ReactNode
  handleOverlayClick?: () => void
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  setIsDrawerOpen,
  overlayClickClose = true,
  header,
  // handleOverlayClick
}) => {
  const handleOverlayClick = useCallback(() => {
    if (overlayClickClose) {
      setIsDrawerOpen(false)
    }
  }, [overlayClickClose, setIsDrawerOpen])
  const { tap, setTap } = useUserContext()
  return (
    <main
      className={`
        fixed overflow-hidden z-10  inset-0 transform ease-in-out 
        ${isOpen ? "opacity-100 translate-x-0" : "delay-500 opacity-0 translate-x-full"}
        transition-opacity duration-500 backdrop-blur-lg
      `}
    >
      <section
        className={`
          w-screen  right-0 absolute  h-full shadow-xl
          delay-400 duration-500 ease-in-out transition-all 
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <article className="relative w-screen  pb-10 flex flex-col space-y-6 overflow-y-scroll h-full justify-center">
          {header && <header className="p-4 font-bold text-lg">{header}</header>}
          <div
            onClick={() => {
              setIsDrawerOpen(false)
              setTap(!tap)
            }}
            className="absolute top-4 right-7 cursor-pointer"
          >
            <IoMdClose className="h-7 w-7" />
          </div>
          {children}
        </article>
      </section>
      {overlayClickClose && (
        <section className="w-screen h-full cursor-pointer" onClick={handleOverlayClick} />
      )}
    </main>
  )
}

export default Drawer
