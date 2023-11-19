import * as React from "react"
import { motion } from "framer-motion"

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
  const { toggleOpen, isOpen } = useUserContext()

  return (
    <>
      {isOpen && <MenuToggle toggle={() => toggleOpen()} />}

      <motion.ul variants={variants} className={styles.ul}>
        {navmenu.map((data, index) => (
          <MenuItem data={data} key={index} />
        ))}
      </motion.ul>
    </>
  )
}

const navmenu = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "My feed",
    path: "/",
  },
  {
    title: "Find Professionals",
    path: "/myfeed",
  },
  {
    title: "Tutorials",
    path: "/",
  },
  {
    title: "Jobs",
    path: "/",
  },
  {
    title: "Assets",
    path: "/",
  },
]
