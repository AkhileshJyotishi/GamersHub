import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

// import Filter from '../filter/mainfilter/filter';
import { FilterDetail } from "@/interface/filter"
import { useUserContext } from "@/providers/user-context"

import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"

import { removeuserExperience, updateUserExperience } from "./editprofileHandler"

type exptypes = Array<{ id?: number; detail: FilterDetail[] }>

interface ExperienceSectionProps {
  experience: IuserExperience[]
  ExperienceArray: exptypes
  setExperience: React.Dispatch<React.SetStateAction<IuserExperience[]>>
  onaddExperience: () => void
  handleExperienceChange: (
    index: number,
    field: keyof IuserExperience,
    value: Date | string
  ) => void
  // onremoveExperience: (index: number) => void
  initialExperience: IuserExperience[] | undefined
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  ExperienceArray,
  experience,
  setExperience,
  // onaddExperience,
  // handleExperienceChange,
  initialExperience,
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { userData } = useUserContext()
  const [updateExp, setUpdateExp] = useState<boolean>(false)
  const [removeExp, setRemoveExp] = useState<boolean>(false)

  return (
    <>
      {ExperienceArray?.map((filterdetailarray, idx) => (
        <>
          {filterdetailarray?.detail?.map((field, index) => (
            <>
              {!(field.title === "Ending Date" && experience[idx].presentWorking) && (
                <div
                  key={index}
                  className={`flex items-center p-2 md:gap-8 w-full ${
                    field.inputType == "date" ? "sm:w-[50%]" : ""
                  }`}
                >
                  <Filter
                    key={index}
                    inputType={field.inputType}
                    title={field.title}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    selectOptions={field.selectOptions}
                    className={field.className || ""}
                    Variant="flex-col w-full flex"
                    errorMessage={field.errorMessage}
                  />
                </div>
              )}
            </>
          ))}

          <div className="flex justify-between w-full">
            <Button
              id={String(filterdetailarray.id)}
              disabled={updateExp}
              className={
                "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
              }
              onClick={async () => {
                setUpdateExp(true)
                const exp = await updateUserExperience(
                  filterdetailarray.id,
                  experience,
                  session?.user?.name as string,
                  initialExperience
                )
                if (!exp?.error) {
                  router.push(`${userData?.id}/profile/about`)
                }
                setUpdateExp(false)
              }}
            >
              {updateExp ? "Updating" : "Update"}
            </Button>
            {ExperienceArray.length > 1 && (
              <Button
                disabled={removeExp}
                className="px-[12px] py-[6px] border-red-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                onClick={async () => {
                  setRemoveExp(true)
                  await removeuserExperience(
                    filterdetailarray.id,
                    setExperience,
                    idx,
                    session?.user?.name as string
                  )
                  setRemoveExp(false)
                }}
              >
                {removeExp ? "Removing" : "Remove"}
              </Button>
            )}
          </div>
        </>
      ))}
    </>
  )
}

export default ExperienceSection
