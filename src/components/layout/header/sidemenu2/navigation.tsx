import * as React from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

import { useUserContext } from "@/providers/user-context"

import { MenuItem } from "./menuitem"
import { MenuToggle } from "./menutoggle"

import styles from "./style.module.css"
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const Navigation = () => {
  const session = useSession()
  const { toggleOpen, isOpen, userData } = useUserContext()
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
    {
      title: "profile",
      path: `/${userData?.id}/profile/albums`,
    },
  ]
  const authOptions = [
    {
      title: "Login",
      path: "/auth/login",
    },
    {
      title: "Sign Up",
      path: "/auth/signup",
    },
  ]
  React.useEffect(() => {}, [session])
  return (
    <>
      <div>{isOpen && <MenuToggle toggle={() => toggleOpen()} />}</div>

      <motion.ul variants={variants} className={styles.ul}>
        {navmenu.map((data, index) => (
          <MenuItem data={data} key={index} />
        ))}
        {!session.data?.user?.name &&
          authOptions.map((data, index) => <MenuItem data={data} key={index} />)}
      </motion.ul>
    </>
  )
}
