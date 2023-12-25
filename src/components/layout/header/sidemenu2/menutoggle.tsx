import * as React from "react"

// import { motion } from "framer-motion"
import { useUserContext } from "@/providers/user-context"

import Button from "@/components/ui/button"

// import styles from "./style.module.css"

// type PathProps = React.HTMLProps<SVGPathElement>;
// const Path = (props: any) => (
//   <motion.path
//     fill="transparent"
//     strokeWidth="3"
//     stroke="hsl(0, 0%, 18%)"
//     strokeLinecap="round"
//     {...props}
//   />
// )
type MenuToggleProps = {
  toggle: () => void
}

export const MenuToggle: React.FC<MenuToggleProps> = () => {
  const {
    // isOpen,
    toggleOpen,
    tap,
    setTap,
  } = useUserContext()

  return (
    // <Button onClick={toggle} className={styles.button}>
    //   <svg width="23" height="23" viewBox="0 0 23 23">
    //     <Path
    //       variants={{
    //         closed: { d: "M 2 2.5 L 20 2.5" },
    //         open: { d: "M 3 16.5 L 17 2.5" }
    //       }}
    //     />
    //     <Path
    //       d="M 2 9.423 L 20 9.423"
    //       variants={{
    //         closed: { opacity: 1 },
    //         open: { opacity: 0 }
    //       }}
    //       transition={{ duration: 0.1 }}
    //     />
    //     <Path
    //       variants={{
    //         closed: { d: "M 2 16.346 L 20 16.346" },
    //         open: { d: "M 3 2.5 L 17 16.346" }
    //       }}
    //     />
    //   </svg>
    // </Button>

    <Button
      className="relative flex flex-col gap-1 px-8 py-5 mt-1 cursor-pointer"
      onClick={() => {
        setTap(!tap)
        toggleOpen()
      }}
    >
      <div
        className={`w-[20px] h-[2px] bg-[#fff] rounded-lg transform transition-all ${
          tap ? "rotate-45 translate-y-[6px]" : "rotate-0 translate-y-0"
        } duration-[0.5s] ease-out`}
      ></div>
      <div
        className={`w-[20px] h-[2px] bg-[#fff]  rounded-lg transform transition-all ${
          tap ? "opacity-0" : "opacity-100"
        } duration-[1s] ease-out`}
      ></div>
      <div
        className={`w-[20px] h-[2px] bg-[#fff]  rounded-lg transform transition-all ${
          tap ? "rotate-[-45deg] translate-y-[-6px]" : "rotate-0 translate-y-0"
        } duration-[1s] ease-out`}
      ></div>
    </Button>
  )
}
