import React, { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import image from "@/assets/image/void.svg"
import { FrontendCompatibleObject } from "@/pages/jobs"
import { useUserContext } from "@/providers/user-context"
import { fetchData } from "@/utils/functions"

import SkeletonLoader from "@/components/ui/SkeletonLoader2"

type JobsPageProps = {
    ApplicantInfo: ApplicantInfo
}
const ParticularApplicant: React.FC<JobsPageProps> = ({ ApplicantInfo }) => {
  const [activetab, setactivetab] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)


  
  return (
    <></>
  )
}

export default ParticularApplicant
