interface ServerPlan {
  name: string
}

interface ServerPlanSelectorProps {
  plans: ServerPlan[]
  selectedPlans: ServerPlan[]
  setSelectedPlans: React.Dispatch<React.SetStateAction<ServerPlan[]>>
}

const ServerPlanSelector: React.FC<ServerPlanSelectorProps> = ({
  plans,
  selectedPlans,
  setSelectedPlans,
}) => {
  const handlePlanToggle = (plan: ServerPlan) => {
    setSelectedPlans((prevSelectedPlans) => {
      const isPlanSelected = prevSelectedPlans.some(
        (selectedPlan) => selectedPlan.name === plan.name
      )

      if (isPlanSelected) {
        return prevSelectedPlans.filter((selectedPlan) => selectedPlan.name !== plan.name)
      } else {
        return [...prevSelectedPlans, plan]
      }
    })
  }

  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto w-full ">
        <div className="space-y-2 p-1">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => handlePlanToggle(plan)}
              className={`
                cursor-pointe bg-user_interface_1 ${
                  selectedPlans.some((selectedPlan) => selectedPlan.name === plan.name)
                    ? "text-text border-secondary border-[0.1px]"
                    : ""
                }
                relative flex rounded-lg px-5 py-3 focus:outline-none
              `}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <div className="font-bold tracking-widest">{plan.name}</div>
                  </div>
                </div>
                {selectedPlans.some((selectedPlan) => selectedPlan.name === plan.name) && (
                  <div className="shrink-0 text-white">
                    <CheckIcon className="h-6 w-6 " />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#00B87D" opacity="1" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ServerPlanSelector
