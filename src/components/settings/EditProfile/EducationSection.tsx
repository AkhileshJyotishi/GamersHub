import React, { useState } from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

// import Filter from '../filter/mainfilter/filter';
import { FilterDetail } from "@/interface/filter"
import { useUserContext } from "@/providers/user-context"

import Filter from "@/components/filter/mainfilter/filter"
import Button from "@/components/ui/button"

import { removeUserEducation, updateUserEducation } from "./editprofileHandler"

interface EducationSectionProps {
  // educationData?: EducationData;
  education: IuserEducation[]
  // onEducationChange?: (field: string, value: any) => void;
  EducationArray: edutypes
  setEducation: React.Dispatch<React.SetStateAction<IuserEducation[]>>
  onAddEducation: () => void
  // onRemoveEducation: (index: number) => void;
  handleEducationChange: (index: number, field: keyof IuserEducation, value: string | Date) => void
  initialEducation?: IuserEducation[]
}
type edutypes = Array<{ id?: number; detail: FilterDetail[] }>

const EducationSection: React.FC<EducationSectionProps> = ({
  // educationData,
  // onEducationChange,
  EducationArray,
  setEducation,
  education,
  // onAddEducation,
  // onRemoveEducation,
  // handleEducationChange,
  initialEducation,
}) => {
  const { data: session } = useSession()
  const { userData } = useUserContext()
  const [updateEdu, setUpdateEdu] = useState<boolean>(false)
  const [removeEdu, setRemoveEdu] = useState<boolean>(false)
  const router = useRouter()
  return (
    <>
      {EducationArray?.map((filterdetailarray, idx) => (
        <>
          {filterdetailarray?.detail.map((field, index) => (
            <>
              <div
                key={index}
                className={clsx(
                  "flex items-center   p-2 md:gap-8 ",
                  field.inputType == "date" ? "w-full sm:w-[50%]" : "w-full"
                )}
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
            </>
          ))}
          <div className="flex justify-between w-full">
            <Button
              id={String(filterdetailarray.id)}
              disabled={updateEdu}
              className={
                "px-[12px] py-[6px] border-green-500  border-[0.01px] flex items-center mt-6 rounded-xl"
              }
              onClick={async () => {
                setUpdateEdu(true)
                const edu = await updateUserEducation(
                  filterdetailarray.id,
                  education,
                  initialEducation,
                  session?.user?.name as string
                )
                if (!edu?.error) {
                  router.push(`${userData?.id}/profile/about`)
                }
                setUpdateEdu(false)
              }}
            >
              {updateEdu ? "Updating" : "Update"}
            </Button>

            {/* <Button className={"bg-[#00000085] p-3 rounded-xl text-secondary min-w-[115px] text-center"} onClick={() => onAddEducation()}>Add Education</Button> */}
            {
              <Button
                disabled={removeEdu}
                className="px-[12px] py-[6px] border-red-500  border-[0.01px] flex items-center mt-6 rounded-xl"
                onClick={async () => {
                  setRemoveEdu(true)
                  await removeUserEducation(
                    filterdetailarray.id,
                    setEducation,
                    idx,
                    session?.user?.name as string
                  )
                  setRemoveEdu(false)
                }}
              >
                {removeEdu ? "Removing" : "Remove"}
              </Button>
            }
          </div>
        </>
      ))}
    </>
  )
}

export default EducationSection
