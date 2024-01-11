export const SecondaryTag = ({ name, className }: { name: string; className?: string }) => {
  return (
    <div
      className={
        "px-3 py-1 flex flex-row items-center bg-user_interface_3 rounded-[5px] " + className
      }
    >
      <p className="text-base cursor-pointer">{name}</p>
    </div>
  )
}
