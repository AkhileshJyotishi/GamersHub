import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

// const handler = NextAuth(authOptions)
export default (req: NextApiRequest, res: NextApiResponse) => {
  // res.setHeader('Set-Cookie', ['cookie_name=cookie_value'])
  return NextAuth(req, res, authOptions(req, res))
}
// export default NextAuth(authOptions)
// export { handler as GET, handler as POST }
