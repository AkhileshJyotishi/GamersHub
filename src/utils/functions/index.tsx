import { AxiosRequestConfig } from "axios"

import instance from "@/lib/axios"

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
  console.log({ recentSearches })

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
  data?: AxiosRequestConfig["data"],
  customHeaders?: { [key: string]: string }
): Promise<APITypes | null> => {
  try {
    const response = await fetchWithAuthorization(url, token, method, data, customHeaders)
    console.log("authchecker ", response.data)

    const resp = response.data
    return await resp
  } catch (error: unknown) {
    console.log(error)
    console.log("nulliscoming")
    return {
      error: error,
      message: "please authenticate",
      data: null,
    }
  }
}
