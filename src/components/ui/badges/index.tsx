export const SecondaryTag = ({ name, className }: { name: string; className?: string }) => {
  return (
    <div
      className={
        "px-[5.5px] py-[6px]  flex flex-row items-center  bg-user_interface_3 rounded-[5px] " +
        className
      }
    >
      <p className="text-[15px]">{name}</p>
    </div>
  )
}
