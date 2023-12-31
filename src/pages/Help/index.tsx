import React from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"

import { fetchWithoutAuthorization } from "@/utils/functions"

import Helppage from "@/components/help"

const Index = ({ Categories }: { Categories: IFAQCategory[] }) => {
  return (
    <>
      <Head>
        <title>GameCreatorsHub | Help</title>
      </Head>
      <Helppage Categories={Categories} />
    </>
  )
}

export default Index
export const getServerSideProps: GetServerSideProps = async () => {
  let Artists = await fetchWithoutAuthorization(`/v1/help/category`, "GET")
  // console.log("thse re commision of user ")
  if (Artists?.error) {
    return {
      notFound: true,
    }
  }

  Artists = Artists?.data.categories

  // const Categories: IFAQCategory[] = [
  //   {
  //     id: 1,
  //     title: "General",
  //     order: [1, 2, 3],
  //     helpQuestions: [
  //       {
  //         id: 1,
  //         solution: "This is a solution for the General question.",
  //         question: "What is General?",
  //         helpCategory: null as any,
  //         helpCategoryId: 1,
  //       },
  //       {
  //         id: 2,
  //         solution: "Another solution for the General question.",
  //         question: "Can you provide more information about General?",
  //         helpCategory: null as any,
  //         helpCategoryId: 1,
  //       },
  //     ],
  //     position: 1,
  //   },
  //   {
  //     id: 2,
  //     title: "Account",
  //     order: [1, 2, 3],
  //     helpQuestions: [
  //       {
  //         id: 3,
  //         solution: "This is a solution for the Account question.",
  //         question: "What is Account?",
  //         helpCategory: null as any,
  //         helpCategoryId: 2,
  //       },
  //       {
  //         id: 4,
  //         solution: "Another solution for the Account question.",
  //         question: "Can you provide more information about Account?",
  //         helpCategory: null as any,
  //         helpCategoryId: 2,
  //       },
  //     ],
  //     position: 2,
  //   },
  //   {
  //     id: 4,
  //     title: "Security",
  //     order: [1, 2, 3],
  //     helpQuestions: [
  //       {
  //         id: 5,
  //         solution: "This is a solution for the Security question.",
  //         question: "What is Security?",
  //         helpCategory: null as any,
  //         helpCategoryId: 4,
  //       },
  //       {
  //         id: 6,
  //         solution: "Another solution for the Security question.",
  //         question: "Can you provide more information about Security?",
  //         helpCategory: null as any,
  //         helpCategoryId: 4,
  //       },
  //     ],
  //     position: 4,
  //   },
  //   {
  //     id: 3,
  //     title: "Billing",
  //     order: [1, 2, 3],
  //     helpQuestions: [
  //       {
  //         id: 7,
  //         solution: "This is a solution for the Billing question.",
  //         question: "What is Billing?",
  //         helpCategory: null as any,
  //         helpCategoryId: 3,
  //       },
  //       {
  //         id: 8,
  //         solution: "Another solution for the Billing question.",
  //         question: "Can you provide more information about Billing?",
  //         helpCategory: null as any,
  //         helpCategoryId: 3,
  //       },
  //     ],
  //     position: 3,
  //   },
  //   {
  //     id: 6,
  //     title: "Other",
  //     order: [1, 2, 3],
  //     helpQuestions: [
  //       {
  //         id: 9,
  //         solution: "This is a solution for the Other question.",
  //         question: "What is Other?",
  //         helpCategory: null as any,
  //         helpCategoryId: 6,
  //       },
  //       {
  //         id: 10,
  //         solution: "Another solution for the Other question.",
  //         question: "Can you provide more information about Other?",
  //         helpCategory: null as any,
  //         helpCategoryId: 6,
  //       },
  //     ],
  //     position: 6,
  //   },
  //   {
  //     id: 5,
  //     title: "Privacy",
  //     order: [1, 2, 3],
  //     helpQuestions: [
  //       {
  //         id: 11,
  //         solution: "This is a solution for the Privacy question.",
  //         question: "What is Privacy?",
  //         helpCategory: null as any,
  //         helpCategoryId: 5,
  //       },
  //       {
  //         id: 12,
  //         solution: "Another solution for the Privacy question.",
  //         question: "Can you provide more information about Privacy?",
  //         helpCategory: null as any,
  //         helpCategoryId: 5,
  //       },
  //     ],
  //     position: 5,
  //   },
  // ];
  return {
    props: {
      Categories: Artists,
    },
  }
}
