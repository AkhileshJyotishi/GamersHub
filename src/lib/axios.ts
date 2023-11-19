import axios from "axios"

// import { API_BASE_URL } from "@/config/env"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
