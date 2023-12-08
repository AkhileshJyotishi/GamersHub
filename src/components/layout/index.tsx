import React from "react"
import clsx from "clsx"
import { ToastContainer } from "react-toastify"

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
            className={clsx("", className, " bg-background min-h-[539px]")}
            style={{ zIndex: 16 }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </UserProvider>
    </>
  )
}

export default Layout
