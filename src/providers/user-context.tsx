import React, { useEffect, useRef, useState } from "react"
import { Cycle, useCycle } from "framer-motion"
import { useSession } from "next-auth/react"

import { fetchData } from "@/utils/functions"

interface IUserContext {
  // handleLogin: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  isLoginModalOpen: boolean
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  verifyModal: boolean
  setVerifyModal: React.Dispatch<React.SetStateAction<boolean>>
  verifyMail: string
  setVerifyMail: React.Dispatch<React.SetStateAction<string>>
  isRegisterModalOpen: boolean
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isCreateAlbumOpen: boolean
  setisCreateAlbumOpen: React.Dispatch<React.SetStateAction<boolean>>
  newAlbum: albumType
  setnewAlbum: React.Dispatch<React.SetStateAction<albumType>>
  handleAlbumEdit: ({ AlbumKeywords, banner, id, title }: albumUpdateType) => Promise<void>
  openLoginModal: () => void
  openRegisterModal: () => void
  isOpen: boolean
  toggleOpen: Cycle
  tap: boolean
  setTap: React.Dispatch<React.SetStateAction<boolean>>
  containerRef: React.RefObject<HTMLDivElement>
  setuserData: React.Dispatch<React.SetStateAction<Iuser | null>>
  userData: Iuser | null
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

interface IUserProvider {
  children: React.ReactNode
}

const Context = React.createContext<IUserContext>({} as IUserContext)
type albumType = {
  title: string
  banner: File | null | string
  AlbumKeywords: string[]
  isEdit: boolean
  id?: number
}
type albumUpdateType = {
  id: number
  title: string
  banner: File | null | string
  AlbumKeywords: string[]
}

const UserProvider = ({ children }: IUserProvider) => {
  const [newAlbum, setnewAlbum] = useState<albumType>({
    title: "",
    banner: null,
    AlbumKeywords: [],
    isEdit: false,
  })
  const session = useSession()
  const [userSession, setUserSession] = useState(useSession().data?.user)
  const [userData, setuserData] = useState<Iuser | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false)
  const [isCreateAlbumOpen, setisCreateAlbumOpen] = useState<boolean>(false)
  const [verifyMail, setVerifyMail] = useState<string>("")
  const [verifyModal, setVerifyModal] = useState(false)
  const [isOpen, toggleOpen] = useCycle(false, true)
  const [tap, setTap] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const openLoginModal = () => {
    setIsRegisterModalOpen(false)
    setIsLoginModalOpen(true)
  }
  const openRegisterModal = (): void => {
    setIsRegisterModalOpen(true)
    setIsLoginModalOpen(false)
  }
  async function handleAlbumEdit({ AlbumKeywords, banner, id, title }: albumUpdateType) {
    setnewAlbum({
      title,
      banner,
      AlbumKeywords,
      id,
      isEdit: true,
    })
    setisCreateAlbumOpen(true)
  }
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (session.data?.user?.name && session.status == "authenticated" && session !== undefined) {
      const loaddata = async () => {
        const data = await fetchData("/v1/auth", session?.data?.user?.name as string, "GET")
        setuserData(data?.data?.user)
      } 
      if (session.status == "authenticated") {
        loaddata()
      }
    }
  }, [session])

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
        userData,
        setuserData,
        loading,
        setLoading,
        verifyMail,
        setVerifyMail,
        verifyModal,
        setVerifyModal,
        isCreateAlbumOpen,
        setisCreateAlbumOpen,
        newAlbum,
        setnewAlbum,
        handleAlbumEdit,
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
