import React from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>["value"]
  name: string
  className?: string
  element?: "input" | "textarea"
  id?: string
  errorMessage?: string
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
onInvalid
}: Props) => {
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
          className={` w-full  border-[0.01px] border-[#505054] shadow-sm px-[12px] py-[9px] flex flex-row items-center focus:outline-none  ${className}`}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          autoComplete="off"
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
          className={`bg-user_interface_3 w-full rounded-[10px] border-[1px] border-transparent hover:bg-transparent  focus:outline-none focus:border-secondary active:bg-transparent focus:shadow-secondary_2 shadow-sm px-[12px] py-[10px] flex flex-row items-center ${
            errorMessage ? "border-accent_red focus:border-accent_red focus:shadow-accent_red" : ""
          }   ${className}`}
        ></textarea>
      )}
      {errorMessage ? (
        <span className=" p-1 text-accent_red  font-[14px]">{errorMessage}</span>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TextInput
