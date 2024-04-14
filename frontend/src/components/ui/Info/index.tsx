import Link from "next/link"

export const InfoTag = () => {
  return (
    <div className={"text-sm flex flex-col my-2 mt-4 gap-2"}>
      <div className="text-[#707074]">- At least 8 characters</div>
      <div className="text-[#707074]">- Contains Special characters</div>
      <div className="text-[#707074]">- Contains a digit(0-9)</div>
      <div className="text-[#707074]">- Contains uppercase and lowercase characters</div>
      <div className="mt-[6px] text-[#707074]  text-[10px]">
        {" "}
        *By signing up you are adhereing with the{" "}
        <Link
          href={"/terms-and-conditions"}
          className="text-secondary hover:underline cursor-pointer"
        >
          Terms and Service
        </Link>{" "}
        of platform
      </div>
    </div>
  )
}
