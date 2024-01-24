import React, { useMemo, useState } from "react"
import MultiStep from "react-multistep"

import RoleSelector from "./role-selector"
import StepTwo from "./step-two"

const ApplyJob = ({ jobId, collabJob }: { jobId: number; title: string; collabJob: boolean }) => {
  const [selectedPlans, setSelectedPlans] = useState<ServerPlan[]>([])
  const showtitles = useMemo(() => window.outerWidth >= 500, [])
  const [BasicInfo, setBasicInfo] = useState<IBasicInfo>({
    jobId,
    motivationToApply: "",
    rolesApplied: undefined,
    applyMethod: null,
    bio: null,
    city: null,
    country: null,
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    portfolio: null,
    resume: null,
    skills: null,
  })
  const hostingPlans = [
    {
      name: "Basic",
    },
    {
      name: "Pro",
    },
    {
      name: "Enterprise",
    },
  ]

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
          component: <StepTwo BasicInfo={BasicInfo} setBasicInfo={setBasicInfo} />,
        },
        // { title: 'step four', component:  },
      ]
    : [
        {
          title: "step One",
          component: <StepTwo BasicInfo={BasicInfo} setBasicInfo={setBasicInfo} />,
        },
      ]

  const NextButtonStyles = {
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
        prevButton={NextButtonStyles}
        nextButton={{
          title: "Next",
          style: {
            backgroundColor: "#00B87D",
            borderRadius: "4px",
            padding: "4px",
            minWidth: "70px",
            color: "#fff",
            marginLeft: "12px",
            marginTop: "25px",
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
