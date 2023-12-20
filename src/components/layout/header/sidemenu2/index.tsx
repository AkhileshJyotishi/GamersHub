import * as React from "react"
// import { useRef } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"

import { useUserContext } from "@/providers/user-context"

// import { MenuToggle } from "./menutoggle"
import { Navigation } from "./navigation"
import { useDimensions } from "./use-dimensions"

import styles from "./style.module.css"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 97vw 3vh)`,
    transition: {
      type: "spring",
      stiffness: 7,
    },
  }),
  closed: {
    clipPath: "circle(0px at 97vw 3vh)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

export const Example = () => {
  // const [isOpen, toggleOpen] = useCycle(false, true);
  const { isOpen, containerRef } = useUserContext()
  const { height } = useDimensions(containerRef)

  React.useEffect(() => {
    if (!isOpen) {
      containerRef?.current ? (containerRef.current.style.display = "none") : null
    }
  }, [isOpen, containerRef])

  const handleanimatecomplete = () => {
    // setTimeout(() => {
    if (!isOpen && containerRef.current) {
      containerRef.current.style.display = "none" // Set display to none when animation is complete and it's closed
    }
    // }, 1000);
  }

  return (
    <>
      {
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          onAnimationComplete={handleanimatecomplete}
          custom={height | 100}
          ref={containerRef}
          className={clsx(styles.nav, styles["mobile-nav"])}
          style={{ zIndex: 18 }}
        >
          <motion.div className={styles.background} variants={sidebar} />
          <Navigation />
        </motion.nav>
      }
    </>
  )
}
// !tap ? "invisible" : ""
