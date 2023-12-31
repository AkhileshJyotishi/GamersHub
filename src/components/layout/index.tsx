import React from "react"
import clsx from "clsx"
import { ToastContainer } from "react-toastify"

import { ModalProvider } from "@/providers/modal-context"
import { UserProvider } from "@/providers/user-context"

import LoadingOverlay from "../ui/loadingOverlay"

import Footer from "./footer"
import Header from "./header"

// import LoadingOverlay  from 'react-loading-overlay'
import "react-toastify/dist/ReactToastify.css"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <>
      <UserProvider>
        <ModalProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="dark"
          />
          <div className="absolute h-fit text-text bg-background">
            <LoadingOverlay />
            <Header />
            <main
              className={clsx("", className, " bg-background min-h-[539px] max-w-[2000px] mx-auto")}
              style={{ zIndex: 16 }}
            >
              {children}
            </main>
            <Footer />
          </div>
        </ModalProvider>
      </UserProvider>
    </>
  )
}

export default Layout
