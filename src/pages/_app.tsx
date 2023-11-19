import { NextPage } from "next"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar"

import Layout from "@/components/layout"

import "@/styles/globals.css"
// import { ReactNode } from "react";

const App: NextPage<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <NextNProgress
        color="#00E59B"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />

      <SessionProvider session={session}>
        <Layout>
          <RootLayout Component={Component} pageProps={pageProps} />
          {/* <Component {...pageProps} /> */}
        </Layout>
      </SessionProvider>
    </>
  )
}
const RootLayout: NextPage<any> = ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  } else {
    return <Component {...pageProps} />
  }
}

export default App
