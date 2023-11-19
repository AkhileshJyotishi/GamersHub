import React, { useRef, useState } from "react"
import { Cycle, useCycle } from "framer-motion"
import { useSession } from "next-auth/react"

// type IhandleCredentialsLoginProps = {
//   credentials: {
//     redirect: boolean
//     email: string
//     password: string
//     callbackUrl: string
//   }
// }
interface IUserContext {
  // handleLogin: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  isLoginModalOpen: boolean
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isRegisterModalOpen: boolean
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  openLoginModal: () => void
  openRegisterModal: () => void
  isOpen: boolean
  toggleOpen: Cycle
  tap: boolean
  setTap: React.Dispatch<React.SetStateAction<boolean>>
  containerRef: React.RefObject<HTMLDivElement>
  userSession:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
    | undefined
  setUserSession: React.Dispatch<
    React.SetStateAction<
      | {
          name?: string | null | undefined
          email?: string | null | undefined
          image?: string | null | undefined
        }
      | undefined
    >
  >
  // handleCredentialsLogin: ({ credentials }: IhandleCredentialsLoginProps) => Promise<SignInResponse | undefined>
}

interface IUserProvider {
  children: React.ReactNode
}

const Context = React.createContext<IUserContext>({} as IUserContext)

const UserProvider = ({ children }: IUserProvider) => {
  const [userSession, setUserSession] = useState(useSession().data?.user)

  // const handleLogout = async () => {
  //   await signOut();
  //   setUserSession(undefined);
  // };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false)

  const openLoginModal = () => {
    setIsRegisterModalOpen(false)
    setIsLoginModalOpen(true)
  }
  const openRegisterModal = (): void => {
    setIsRegisterModalOpen(true)
    setIsLoginModalOpen(false)
  }

  const [isOpen, toggleOpen] = useCycle(false, true)
  const [tap, setTap] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <Context.Provider
      value={{
        // handleLogin,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        openLoginModal,
        openRegisterModal,
        isOpen,
        toggleOpen,
        tap,
        setTap,
        containerRef,
        userSession,
        setUserSession,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useUserContext = () => {
  const c = React.useContext(Context)

  if (c === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return c
}

export { UserProvider, useUserContext }
