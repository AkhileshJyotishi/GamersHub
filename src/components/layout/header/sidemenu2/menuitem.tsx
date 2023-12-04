import * as React from "react"
import { motion } from "framer-motion"

import styles from "./style.module.css"
import { useRouter } from "next/router"
import { useUserContext } from "@/providers/user-context"
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

// const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"]
type menuProps = {
  data: {
    title: string
    path: string
  }
}
export const MenuItem = ({ data }: menuProps) => {
  // const style = { border: `2px solid white` }
  const router=useRouter()
  const {toggleOpen,setTap,tap}=useUserContext()
  return (
    <>
      <motion.li
        variants={variants}
        whileHover={{ color: "white" }}
        whileTap={{ scale: 0.95 }}
        className={styles.li}
      >
        <div onClick={()=>{
          toggleOpen()
          setTap(!tap)
          router.replace(data.path)
          
        }
        }  className="hover:text-secondary hover:scale-125">
          {" "}
          {data.title}
        </div>
      </motion.li>
    </>
  )
}
