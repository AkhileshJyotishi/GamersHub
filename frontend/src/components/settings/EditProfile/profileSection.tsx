import React, { useMemo, useState } from "react"
import _ from "lodash"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

// import Filter from '../filter/mainfilter/filter';
import { FilterDetail } from "@/interface/filter"
import { useUserContext } from "@/providers/user-context"

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
    profileImage: string | undefined | File
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
  const initProfile = useMemo(() => profileData, [])
  const [manageProfile, setManageProfile] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { userData } = useUserContext()
  return (
    <>
      {profileArray?.map((filter, index) => (
        <>
          <div key={index} className="flex items-center justify-between w-full p-2 md:gap-8">
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
              accept={filter.accept}
              initialtags={filter.initialtags}
              onTagsChange={filter.onTagsChange}
              errorMessage={filter.errorMessage}
              dimensionsImage={filter.dimensionsImage}
            />
          </div>
        </>
      ))}
      <div className="flex justify-between w-full">
        <Button
          disabled={manageProfile}
          className={
            "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl "
          }
          onClick={async () => {
            if (_.isEqual(initProfile, profileData)) {
              toast.info("please Update Information to upload")
              return
            } else {
              setManageProfile(true)
              let method = "POST"
              if (isProfileDataFilled) {
                method = "PATCH"
              }
              const x = await uploadProfileData(
                profileData,
                session?.user?.name as string,
                method,
                setProfileFilled
              )
              if (!x?.error) {
                router.push(`${userData?.id}/profile/about`)
              }
              setManageProfile(false)
            }
          }}
        >
          {manageProfile ? "Modifying..." : isProfileDataFilled ? "Update" : "Upload"}
        </Button>
      </div>
    </>
  )
}

export default ProfileSection
