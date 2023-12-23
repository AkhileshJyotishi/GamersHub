import React from "react"
import { useSession } from "next-auth/react"

// import Filter from '../filter/mainfilter/filter';
import { FilterDetail } from "@/interface/filter"

import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"

import { uploadProfileData } from "./editprofileHandler"

interface ProfileSectionProps {
  profileData?: {
    userBio: string | null | undefined
    country: string | null | undefined
    city: string | null | undefined
    userSkills: IuserSkill[] | string[] | undefined
    userSoftwares: IuserSoftware[] | undefined | string[]
    profileImage: string | undefined
  }
  onFieldChange?: (key: string, value: string) => void
  profileArray: FilterDetail[]
  isProfileDataFilled: boolean
  setProfileFilled: Allow
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileData,
  // onFieldChange,
  profileArray,
  isProfileDataFilled,
  setProfileFilled,
}) => {
  const { data: session } = useSession()
  // console.log(profileArray)
  return (
    <>
      {profileArray?.map((filter, index) => (
        <>
          <div
            key={index}
            className="flex items-center justify-between w-full p-2 md:gap-8"
          >
            {/* vxbc */}
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
              onTagsChange={filter.onTagsChange}
            />
          </div>
        </>
      ))}
      <div className="flex justify-between w-full">
        <Button
          className={
            "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
          }
          onClick={() => {
            let method = "POST"
            if (isProfileDataFilled) {
              method = "PATCH"
            }
            uploadProfileData(profileData, session?.user?.name as string, method, setProfileFilled)
          }}
        >
          {isProfileDataFilled ? "Update" : "Upload"}
        </Button>
      </div>
    </>
  )
}

export default ProfileSection
