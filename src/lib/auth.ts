import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"

// import cookies from cookies;
// import {
//   FACEBOOK_CLIENT_ID,
//   FACEBOOK_CLIENT_SECRET,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
// } from "@/config/env"
import instance from "./axios"
export const authOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => {
  return {
    pages: {
      signIn: "/auth/login",
      signOut: "/",
      error: "/",
    },
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30,
    },
    secret: "agsua",
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials.password) {
              return null
            }
            const payload = {
              email: credentials?.email,
              password: credentials?.password,
            }
            // console.log("loggin ", payload)
            let response = await instance.post(`/v1/auth/login`, payload)
            response = response.data

            res.setHeader(
              "Set-Cookie",
              `token=${response.data.tokens.access.token}; HttpOnly;Secure;Expires=${new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              )}`
            )
            // console.log("token ", response.data.tokens.access.token)

            if (!res) return null
            const user = {
              id: response.data?.user?.id,
              email: response?.data?.user?.email,
              name: response?.data?.tokens.access.token,

              tokens: response?.data?.tokens.access.token,
            }
            return user
          } catch (error: Allow) {
            throw new Error(
              JSON.stringify({
                status: error?.response?.status,
                message: error?.response?.data?.message || error?.message,
              })
            )
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      }),
      FacebookProvider({
        clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        try {
          if (account?.provider != "credentials") {
            const registerUser = await instance.post(`/v1/auth/register-provider`, {
              email: user?.email,
              username: user?.name,
              isEmailVerified: true,
              profileImage: user?.image,
            })
            const userId = registerUser.data?.data?.user?.id
            await instance.post(`/v1/auth/add-provider`, {
              userId: userId,
              response: account,
              providerType: account?.provider.toLocaleUpperCase(),
            })
            // console.log(userr)
            user.name = registerUser.data.data.token.access.token
          }
        } catch (error) {
          console.log("catch error", error)
          return false
        }
        return true
      },
      session: ({ session, token }) => {
        // console.log("session", session)
        // console.log(user)
        return {
          ...session,
          user: {
            ...session.user,
            id: token?.sub,
            // token: user.
          },
        }
      },
      async jwt({ token }) {
        return token
      },
    },
  }
}

export const getSession = (req: NextApiRequest, res: NextApiResponse) => {
  const session = getServerSession(req, res, authOptions(req, res))
  return session
}
