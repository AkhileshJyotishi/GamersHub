// import { useRouter } from 'next/router'
import React from "react"
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next"
import { signOut } from "next-auth/react"

import { getSession } from "@/lib/auth"
// import { token } from "@/pages/settings"
import { fetchData } from "@/utils/functions"

import UpdateJob from "@/components/updateJob"

const index = ({ job }: { job: JobInfo }) => {
  // const router = useRouter()
  // const { id } = router.query;
  // router.query.id;
  return (
    <>
      <UpdateJob job={job} />
    </>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req as NextApiRequest, res as NextApiResponse)
  if (!session) {
    signOut()
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  console.log("this  is session", session)
  const { id } = query
  const jobsDetails = await fetchData(`/v1/job/${id}`, session.user?.name as string, "GET")

  if (jobsDetails?.error) {
    // toast.error(jobsDetails.message)
    return {
      redirect: {
        destination: `/?error=${jobsDetails.message}`,
        permanent: false,
      },
    }
  }
  const parsedjobDetails: BackendJob = jobsDetails?.data.job

  // console.log("this is the job details ", parsedjobsDetails)

  // const FrontendCompatibleObject = (backendJob: BackendJob): Job => {
  //     return {
  //         title: backendJob.title,
  //         desc: backendJob.description,
  //         date: "SomeDate", // Replace with the relevant date field from the backend
  //         salary: `${backendJob.paymentValue} ${backendJob.paymentType}`, // Adjust based on your backend structure
  //         type: backendJob.jobType,
  //         location: `${backendJob.country}, ${backendJob.city}`, // Adjust based on your backend structure
  //         href: `/jobs/${backendJob.id}`, // Adjust based on your backend structure
  //         chips: backendJob.requirements.skills,
  //     };
  // };
  const convertBackendJobToJobInfo = (backendJob: BackendJob): JobInfo => {
    const {
      jobType,
      remote,
      country,
      city,
      paymentType,
      paymentValue,
      banner,
      expertise,
      jobSoftwares,
      title,
      publishDate,
      jobDetails,
    } = backendJob

    // jobSoftwares=
    return {
      jobType,
      remote,
      country: country || "", // Adjust based on your needs
      city: city || "", // Adjust based on your needs
      paymentType,
      paymentValue,
      banner,
      expertise,
      jobSoftwares: jobSoftwares.map((software) => software.software),
      title,
      publishDate: publishDate || null, // Adjust based on your needs
      jobDetails: jobDetails || null, // Adjust based on your needs
    }
  }

  // Example usage:
  const job: JobInfo = convertBackendJobToJobInfo(parsedjobDetails)
  console.log("this is update job  ", job)
  // const job = FrontendCompatibleObject(parsedjobDetails);
  // const jobs: Job[] = parsedjobsDetails.map((job) => FrontendCompatibleObject(job))

  job.banner =
    "https://cdnb.artstation.com/p/recruitment_companies/headers/000/003/159/thumb/ArtStation_Header.jpg"

  return {
    props: {
      job,
    },
  }
}
