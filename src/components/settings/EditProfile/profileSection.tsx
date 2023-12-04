import React from "react"
import { useSession } from "next-auth/react"

// import Filter from '../filter/mainfilter/filter';
import { FilterDetail } from "@/interface/filter"

import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"

import { uploadProfileData } from "./editprofileHandler"

interface ProfileSectionProps {
  profileData?: any
  onFieldChange?: (key: string, value: string) => void
  profileArray: FilterDetail[]
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileData,
  // onFieldChange,
  profileArray,
}) => {
  const { data: session } = useSession()
  return (
    <>
      {/* <h1 className="bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center">
        Profile
      </h1> */}
      {profileArray?.map((filter, index) => (
        <>
          <div
            key={index}
            className="flex items-center justify-between w-full p-2 overflow-hidden md:gap-8"
          >
            <Filter
              key={index}
              inputType={filter.inputType}
              title={filter.title}
              placeholder={filter.placeholder}
              value={filter.value}
              onChange={filter.onChange}
              selectOptions={filter.selectOptions}
              className={` ${filter.className || ""}`}
              Variant={"flex-col  w-full flex "}
              initialtags={filter.initialtags}
            />
          </div>
        </>
      ))}
      <div className="flex justify-between w-full">
        <Button
          className={
            "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
          }
          onClick={() => uploadProfileData(profileData, session?.user?.name as string)}
        >
          upload
        </Button>
      </div>
    </>
  )
}

export default ProfileSection
