// import React, { useState } from "react"
// import clsx from "clsx"
// import { Control, FieldValues } from "react-hook-form"

// type CheckboxProps = {
//   name: string
//   checked?: boolean
//   onChange?: (checked: boolean) => void
//   label?: string
//   labelDecor?: string
//   customSVG?: React.ReactNode
//   bgColor?: string
//   tickColor?: string
//   className?: string
// }

// const Checkbox = ({
//   name,
//   checked,
//   onChange,
//   customSVG,
//   label,
//   labelDecor,
//   bgColor = "bg-gray-200",
//   tickColor = "text-gray-800",
//   className,
// }: CheckboxProps) => {
//   const [isChecked, setIsChecked] = useState(checked)

//   const handleClick = () => {
//     const newCheckedState = !isChecked
//     setIsChecked(newCheckedState)
//     onChange?.(newCheckedState)
//   }

//   return (
//     <>
//       <div className={`grid grid-cols-12 items-center ${className}`}>
//         <div
//           className={`w-[1.25rem] h-[1.25rem] rounded-md cursor-pointer flex items-center justify-center border-2 border-accent-4 transition-colors duration-200 ${
//             isChecked ? bgColor : "bg-accent-4/10"
//           }`}
//           onClick={handleClick}
//         >
//           <input type="checkbox" className="sr-only" id="checkbox" />
//           {isChecked &&
//             (customSVG || (
//               <svg
//                 className={`w-4 h-4 ${tickColor}`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             ))}
//         </div>
//         <label
//           htmlFor="checkbox"
//           className={clsx("text-base col-span-11 pl-2 md:pl-1 text-white", labelDecor)}
//         >
//           {label}
//         </label>
//       </div>
//     </>
//   )
// }

// export default Checkbox
