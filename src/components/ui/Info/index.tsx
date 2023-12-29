import Link from "next/link"

export const InfoTag = () => {
  return (
    <div className={"text-sm flex flex-col my-2 mt-4 gap-2"}>
      <p className="text-[#707074]">- At least 4 characters</p>
      <p className="text-[#707074]">- Contains Special characters</p>
      <p className="text-[#707074]">- Contains uppercase and lowercase characters</p>
      <p className="mt-[6px] text-[#707074]  text-[10px]">
        {" "}
        *By signing up you are adhereing with the{" "}
        <Link href={"/TnC"} className="text-secondary hover:underline cursor-pointer">
          Terms and Service
        </Link>{" "}
        of platform
      </p>
    </div>
  )
}
