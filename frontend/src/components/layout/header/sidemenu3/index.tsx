import React from "react"
import { useSession } from "next-auth/react"

import { useUserContext } from "@/providers/user-context"

import Drawer from "@/components/ui/drawer"

import { MenuItem } from "./menuItem"
const Sidemenu = () => {
  const { userData, drawerOpen, setIsDrawerOpen, setTap, tap } = useUserContext()
  const { data: session } = useSession()
  const navmenu = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Jobs",
      path: "/jobs",
    },
    {
      title: "Creators",
      path: "/creator",
    },
    {
      title: "Games",
      path: "/games",
    },
  ]

  const authOptions = [
    {
      title: "Profile",
      path: `/${userData?.id}/profile/albums`,
    },
  ]

  // const authOptions2 = [
  //   {
  //     title: "Login",
  //     path: "/auth/login",
  //   },
  //   {
  //     title: "Sign Up",
  //     path: "/auth/signup",
  //   },
  // ]

  return (
    <div>
      <Drawer
        isOpen={drawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        overlayClickClose={true}
        // header="GameCreators.io"
        handleOverlayClick={() => {
          setIsDrawerOpen(false)
          setTap(!tap)
        }}
      >
        {navmenu?.map((data, index) => <MenuItem data={data} key={index} />)}
        {session?.user?.name &&
          //  authOptions2?.map((data, index) => <MenuItem data={data} key={index} />)
          authOptions?.map((data, index) => <MenuItem data={data} key={index} />)}
      </Drawer>
    </div>
  )
}

export default Sidemenu
