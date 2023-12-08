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

export const isValidURL = (str: string): boolean => {
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      str
    )
  ) {
    return true
  } else {
    return false
  }
}
// export const remoteUrlToBase64 = async (url: string): Promise<string> => {
//   try {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (typeof reader.result === 'string') {
//           resolve(reader.result);
//         } else {
//           reject(new Error('Failed to convert image to Base64.'));
//         }
//       };
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     // throw new Error('Failed to fetch the remote URL.');
//     toast.error('Failed to fetch the remote URL.');
//   }
// };

export const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)
export const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
