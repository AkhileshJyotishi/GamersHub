import React from "react"

import ServerPlanSelector from "../ui/headLessRadio"

const RoleSelector = ({
  plans,
  selectedPlans,
  setSelectedPlans,
}: {
  plans: ServerPlan[]
  selectedPlans: ServerPlan[]
  setSelectedPlans: React.Dispatch<React.SetStateAction<ServerPlan[]>>
}) => {
  return (
    <div className="w-full">
      <div className="font-bold ">Choose roles you want to apply to</div>
      <div className="text-dull text-sm">*You can select Multiple</div>
      <ServerPlanSelector
        plans={plans}
        selectedPlans={selectedPlans}
        setSelectedPlans={setSelectedPlans}
      />
    </div>
  )
}

export default RoleSelector
