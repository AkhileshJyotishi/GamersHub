import React from "react"

interface IUserContext {
  handleLogin: (email: string, password: string) => Promise<{ success: boolean; message: string }>
}

interface IUserProvider {
  children: React.ReactNode
}

const Context = React.createContext<IUserContext>({} as IUserContext)

const UserProvider = ({ children }: IUserProvider) => {
  const handleLogin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    return { success: true, message: "Login success" }
  }

  return (
    <Context.Provider
      value={{
        handleLogin,
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
