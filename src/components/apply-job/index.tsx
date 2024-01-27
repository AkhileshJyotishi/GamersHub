import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import MultiStep from "react-multistep"
import { toast } from "react-toastify"

import { fetchData, fetchFile } from "@/utils/functions"

import RoleSelector from "./role-selector"
import StepTwo from "./step-two"

const ApplyJob = ({
  jobId,
  collabJob,
  rolesNeeded,
  applyMethod,
  JobApplicationInfo,
}: {
  jobId: number
  title: string
  collabJob: boolean
  rolesNeeded?: { role: string }[]
  applyMethod: "GCH" | "MANUAL" | null
  JobApplicationInfo?: IBasicInfo
}) => {
  const [selectedPlans, setSelectedPlans] = useState<ServerPlan[]>([])
  const { data: session } = useSession()
  const router = useRouter()
  const showtitles = useMemo(() => window.outerWidth >= 500, [])
  const [BasicInfo, setBasicInfo] = useState<IBasicInfo>({
    jobId,
    motivationToApply: "",
    rolesApplied: undefined,
    applyMethod,
    bio: JobApplicationInfo?.bio,
    city: JobApplicationInfo?.city,
    country: JobApplicationInfo?.country,
    email: JobApplicationInfo?.email,
    firstName: JobApplicationInfo?.firstName,
    lastName: null,
    phone: null,
    portfolio: JobApplicationInfo?.portfolio,
    resume: JobApplicationInfo?.resume,
    skills: JobApplicationInfo?.skills,
  })
  const hostingPlans = rolesNeeded?.map((role) => ({ name: role.role })) ?? []
  const OnSubmit = async () => {
    const formdata = new FormData()

    formdata.append("file", BasicInfo.resume as Blob)
    formdata.append("type", "jobs")
    toast.info("Uploading Resume ...")
    const isuploaded = await fetchFile(
      "/v1/upload/file",
      session?.user?.name as string,
      "POST",
      formdata
    )
    toast.dismiss()
    if (isuploaded?.error) {
      toast.error(isuploaded.error)
      return
    } else {
      BasicInfo.resume = isuploaded?.data.image.Location
    }
    const onSub = await fetchData(
      "/v1/job/application",
      session?.user?.name as string,
      "POST",
      BasicInfo
    )
    if (onSub?.error) {
      toast.error(onSub.message)
    } else {
      toast.success(onSub?.message)
      router.reload()
    }
  }

  useEffect(() => {
    setBasicInfo((prev) => ({ ...prev, rolesApplied: selectedPlans.map((plan) => plan.name) }))
  }, [selectedPlans])
  const steps = collabJob
    ? [
        {
          title: "step one",
          component: (
            <RoleSelector
              plans={hostingPlans}
              selectedPlans={selectedPlans}
              setSelectedPlans={setSelectedPlans}
            />
          ),
        },
        {
          title: "step two",
          component: (
            <StepTwo BasicInfo={BasicInfo} setBasicInfo={setBasicInfo} onSubmit={OnSubmit} />
          ),
        },
        // { title: 'step four', component:  },
      ]
    : [
        {
          title: "step One",
          component: (
            <StepTwo BasicInfo={BasicInfo} setBasicInfo={setBasicInfo} onSubmit={OnSubmit} />
          ),
        },
      ]

  const PrevButtonStyles = {
    title: "Previous",
    style: {
      backgroundColor: "#00B87D",
      borderRadius: "4px",
      padding: "4px",
      color: "#fff",
      marginTop: "25px",
    },
  }

  return (
    <div className="w-full ">
      <MultiStep
        activeStep={0}
        prevButton={PrevButtonStyles}
        nextButton={{
          title: "Next",
          style: {
            backgroundColor: "#00B87D",
            borderRadius: "4px",
            padding: "4px",
            minWidth: "70px",
            color: "#fff",
            marginLeft: "12px",
            marginTop: "45px",
          },
        }}
        steps={steps}
        showNavigation
        stepCustomStyle={{
          backgroundColor: "",
          width: "100%",
          color: "#00B87D",
          ...(showtitles ? { lineHeight: "4.8rem" } : { lineHeight: "0px" }),
        }}
        direction="row"
        showTitles={showtitles}
      />
    </div>
  )
}

export default ApplyJob
