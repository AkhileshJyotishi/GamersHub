import { NextApiRequest, NextApiResponse } from "next"

import instance from "@/lib/axios"

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password }: { username: string; email: string; password: string } =
      req.body
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields (name, email, or password)",
      })
    }

    const payload = {
      username,
      email,
      password,
      role: "ADMIN",
    }

    const ress = await instance.post(`/v1/auth/register`, payload)

    // console.log("clg in api registerv ", ress.data)

    res.status(201).json({
      data: {
        user: {
          name: ress.data?.data?.user?.username,
          email: ress.data?.data?.user?.email,
        },
      },
      error: null,
      message: ress.data.data.message,
    })
  } catch (error: Allow) {
    res.status(500).json({
      data: null,
      status: "error",
      message: error.response.data.message,
    })
  }
}

export default POST
