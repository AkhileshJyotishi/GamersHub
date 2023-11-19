// import Profile from "@/components/jobs/JobProfile";
// import React from "react";

// const App: React.FC = () => {

const profileData: BackendJob = {
  id: 1,
  slug: "a4b3e6c5-5a4e-4151-87ea-d034ecb027d9",
  role: "Developer",
  title: "Software Developer",
  description: "Exciting job opportunity for a skilled developer.",
  requirements: {
    skills: ["JavaScript", "React"],
    experience: "2+ years",
  },
  // about: {
  //     company: "Tech Co.",
  //     culture: "Innovative and collaborative",
  // },
  remote: true,
  country: "USA",
  city: "New York",
  expertise: "EXPERT",
  paymentType: "HOURLY",
  paymentValue: 50,
  jobType: "FULL_TIME",
  userId: 1,
  jobSoftwares: [
    {
      software: "VSCode",
    },
    {
      software: "Git",
    },
  ],
  banner:
    "bg-[url(" +
    "https://cdnb.artstation.com/p/recruitment_companies/headers/000/003/159/thumb/ArtStation_Header.jpg" +
    ")]",
  publishDate: null,
  jobDetails: {},
  user: {
    username: "sdf",
    profileImage: "https://picsum.photos/id/250/900/900",
  },
  // logoSrc: "https://picsum.photos/id/250/900/900",
  // website: "glgdlfhkghf.com"
}

//     return (
//         <div>
//             <Profile {...profileData} />
//         </div>
//     );
// };

// export default App;

import React from "react"

import Particularpage from "./particularpage"

const index = () => {
  return (
    <>
      <Particularpage profileData={profileData} />
    </>
  )
}

export default index

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//     const session = await getSession(req as NextApiRequest, res as NextApiResponse)

//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }

//     let settingsDetails = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/jobs/slug`, session.user?.name as string, "GET");

//     if (settingsDetails?.error) {
//         toast.error(settingsDetails?.message);
//     }
//     else {
//         toast.success(settingsDetails?.message)

//     }
//     // return resp.data;
//     console.log("settings detaisls", settingsDetails)

//     settingsDetails = settingsDetails?.data;
//     return {
//         props: {
//             settingsDetails,

//         },
//     }

//     // http://localhost:5000/v1/users/details

// }
