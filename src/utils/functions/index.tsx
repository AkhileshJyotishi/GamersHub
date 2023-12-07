import { AxiosRequestConfig } from "axios"
import { signOut } from "next-auth/react"
import { toast } from "react-toastify"

import instance, { fileInstance } from "@/lib/axios"

export function getLocalRecentSearches(): string[] | null {
  const recentSearchesString = localStorage.getItem("recent-searches")
  if (!recentSearchesString) {
    localStorage.setItem("recent-searches", "[]")
    return []
  }
  try {
    const recentSearches = JSON.parse(recentSearchesString)
    if (!Array.isArray(recentSearches)) {
      localStorage.setItem("recent-searches", "[]")
      return []
    }

    return recentSearches.splice(0, 5)
  } catch (error) {
    console.error(error)
    return null
  }
}

export function setLocalRecentSearches(search: string) {
  const recentSearches = getLocalRecentSearches()
  // console.log({ recentSearches })

  if (!recentSearches) {
    return
  }
  recentSearches.push(search)
  localStorage.setItem("recent-searches", JSON.stringify(recentSearches))
}

export const fetchWithAuthorization = async (
  url: string,
  token: string,
  method: string,
  data?: AxiosRequestConfig["data"],
  customHeaders?: { [key: string]: string }
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    ...customHeaders,
  }

  return instance.request({
    url,
    method,
    data,
    headers,
  })
}

export const fetchData = async (
  url: string,
  token: string,
  method: string,
  data?: Allow,
  customHeaders?: { [key: string]: string },
  session?: Allow
): Promise<APITypes | null> => {
  try {
    // if( navigator && !navigator.onLine)
    // {
    //   throw new Error("No Network Connection")

    // }
    const response = await fetchWithAuthorization(url, token, method, data, customHeaders)
    // console.log("authchecker ", response.data)

    const resp = response.data
    if (resp?.error) {
      if (!session) {
        signOut()
      }
    }
    return await resp
  } catch (error: Allow) {
    console.log(error)
    // console.log("nulliscoming")
    // if(error.message.contains(" request timed out")){

    // }
    return {
      error: error,
      message: error?.response?.data?.message,
      data: null,
    }
  }
}
export const fetchWithoutAuthorization = async (
  url: string,
  method: string,
  data?: Allow,
  customHeaders?: { [key: string]: string }
): Promise<APITypes | null> => {
  try {
    const response = await instance.request({
      url,
      method,
      data,
      headers: customHeaders,
    })

    // console.log("Response without authorization:", response.data)

    const resp = response.data
    return await resp
  } catch (error: unknown) {
    console.error(error)
    // console.log("Null is coming")
    return {
      error: error,
      message: "Request failed",
      data: null,
    }
  }
}
export const fetchFile = async (
  url: string,
  token: string,
  method: string,
  data?: Allow,
  customHeaders?: { [key: string]: string }
): Promise<APITypes | null> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      ...customHeaders,
    }
    const response = await fileInstance.request({
      url,
      method,
      headers,
      data,
    })
    const resp = await response.data
    if (resp?.error) {
      toast.info(resp?.message)
      // return
    }
    return resp
  } catch (error) {
    console.error(error)
    // console.log("Null is coming")
    return {
      error: error,
      message: "Request failed",
      data: null,
    }
  }
}
