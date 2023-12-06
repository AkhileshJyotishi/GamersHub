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
        options={{ showSpinner: false }}
      />

      <SessionProvider session={session}>
        <Layout>
          <RootLayout Component={Component} pageProps={pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

interface RootLayoutProps extends Omit<AppProps, "Component" | "router"> {
  Component: AppProps["Component"] & { getLayout?: (page: React.ReactNode) => React.ReactNode }
}

const RootLayout: NextPage<RootLayoutProps> = ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  } else {
    return <Component {...pageProps} />
  }
}

export default App
