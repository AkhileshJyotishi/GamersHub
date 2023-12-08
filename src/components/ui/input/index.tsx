// import React from "react"
// import clsx from "clsx"
// import { Control, FieldError, FieldValues, RegisterOptions, useController } from "react-hook-form"

// interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   labelText?: string
//   name: string
//   inputDecor?: string
//   labelDecor?: string
//   initialValue?: string
//   rules?: Omit<
//     RegisterOptions<FieldValues, string>,
//     "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
//   >
//   control?: Control<FieldValues, any>
//   errorMessage?: () => string
//   variant?: keyof typeof VARIANTS
// }

// const ERROR_MESSAGES = {
//   required: "This field is required",
//   notBusinessEmail: "Please use a business email",
//   pattern: "Invalid format",
//   maxLength: "Too long",
//   minLength: "Too short",
// }

// const VARIANTS = {
//   primary: {
//     label:
//       "block w-full pb-1 text-sm font-medium uppercase text-gray-500 transition-all duration-200 ease-in-out",
//     input: `rounded-md bg-black font-thin outline-none text-white drop-shadow-sm focus:ring-2 focus:ring-black focus:ring-opacity-50`,
//     parent: ``,
//     error: ``,
//     errorState: ``,
//   },
//   secondary: {
//     label: `block w-full pb-1 text-sm font-medium uppercase text-gray-500 transition-all duration-200 ease-in-out`,
//     input: `rounded-md bg-black font-thin outline-none text-white drop-shadow-sm focus:ring-2 focus:ring-black focus:ring-opacity-50`,
//     parent: ``,
//     error: ``,
//     errorState: ``,
//   },
// }

// const Input = ({
//   variant,
//   labelText,
//   labelDecor,
//   inputDecor,
//   className,
//   name,
//   initialValue,
//   control,
//   errorMessage,
//   rules,
//   id,
//   ...props
// }: FieldInputProps) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController({
//     name,
//     defaultValue: initialValue || undefined,
//     control: control || undefined,
//     rules: rules || undefined,
//   })

//   const styles = VARIANTS[variant || "primary"]

//   return (
//     <div className={clsx("inline-block grow ", styles.parent, className)}>
//       {labelText && (
//         <label htmlFor={id || "field-input"} className={clsx(styles.label, labelDecor)}>
//           {labelText}
//         </label>
//       )}
//       <input
//         {...field}
//         {...props}
//         id={id || "field-input"}
//         className={clsx(
//           "peer h-10 w-full px-4 transition-all duration-200 ease-in-out ",
//           styles.input,
//           error && styles.errorState,
//           inputDecor
//         )}
//       />
//       {error && (
//         <div className={clsx("mt-0.5 text-sm pl-1 text-red-400", styles.error)}>
//           {errorMessage
//             ? errorMessage(error)
//             : ERROR_MESSAGES[error.type as keyof typeof ERROR_MESSAGES]}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Input
