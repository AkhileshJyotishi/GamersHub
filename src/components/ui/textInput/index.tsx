import React, { useEffect, useRef } from "react"
import clsx from "clsx"
import { PiWarningCircleFill } from "react-icons/pi"
interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>["value"]
  name: string
  className?: string
  element?: "input" | "textarea"
  id?: string
  errorMessage?: string | null
}

const TextInput: React.FC<Props> = ({
  onChange,
  placeholder,
  type,
  value,
  name,
  className,
  element,
  id,
  errorMessage,
  onKeyUp,
  onKeyPress,
  onBlur,
  pattern,
  onInvalid,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (element === "textarea" && textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "0px"
      const scrollHeight = textAreaRef.current.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + "px"
    }
  }, [textAreaRef.current, value])

  return (
    <div className="relative flex flex-col items-start w-full">
      {!element || element === "input" ? (
        <input
          onKeyUp={onKeyUp}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
          id={id}
          className={clsx(
            ` w-full  border-[0.01px] border-[#505054] shadow-sm px-[12px] py-[9px] flex flex-row items-center focus:outline-none  focus-within:border-secondary ${className}`,
            errorMessage ? "border-accent_red focus:border-accent_red focus:shadow-accent_red" : ""
          )}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          autoComplete="off"
          spellCheck={false}
          pattern={pattern}
          onInvalid={onInvalid}
        />
      ) : (
        <textarea
          onKeyUp={onKeyUp}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={id}
          className={clsx(
            ` w-full  border-[0.01px]  px-[12px] py-[9px] flex flex-row items-center focus:outline-none  focus-within:border-secondary ${className}`,
            errorMessage ? "border-accent_red focus:border-accent_red focus:shadow-accent_red" : ""
          )}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          autoComplete="off"
          spellCheck={false}
          onInvalid={onInvalid}
          ref={textAreaRef}
        ></textarea>
      )}
      {errorMessage ? (
        <span className="flex gap-1 p-1 text-accent_red text-[12px] items-center">
          <PiWarningCircleFill />
          <div>{errorMessage}</div>
        </span>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TextInput
