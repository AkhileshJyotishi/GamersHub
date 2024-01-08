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
export function dateToTimeAgo(date: Date) {
  const currentDate = new Date()
  const timestamp = currentDate.getTime() - date.getTime()

  const seconds = Math.floor(timestamp / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    if (years == 1) {
      return "1 year ago"
    } else {
      return years + " years ago"
    }
  } else if (months > 0) {
    if (months == 1) {
      return "1 mon ago"
    } else {
      return months + " mon ago"
    }
  } else if (weeks > 0) {
    if (weeks == 1) {
      return "1 week ago"
    } else {
      return weeks + " weeks ago"
    }
  } else if (days > 0) {
    if (days == 1) {
      return "1 day ago"
    } else {
      return days + " days ago"
    }
  } else if (hours > 0) {
    if (hours == 1) {
      return "1 hour ago"
    } else {
      return hours + " hours ago"
    }
  } else if (minutes > 0) {
    if (minutes == 1) {
      return "1 min ago"
    } else {
      return minutes + " mins ago"
    }
  } else if (seconds === 0) {
    return "Just now"
  } else {
    return seconds + " secs ago"
  }
}
/**
 * Generates a query parameter string based on the provided filter object.
 *
 * @param filter - The filter object containing key-value pairs.
 * @returns The generated query parameter string.
 */
export const generateQueryParams = (filter: Allow): string => {
  const queryParams: string[] = []

  Object.entries(filter).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle array values
      value.forEach((item) => {
        queryParams.push(`${key}[]=${encodeURIComponent(String(item))}`)
      })
    } else if (value !== undefined && value !== null && value != "" && value) {
      // Handle other types of values
      queryParams.push(`${key}=${encodeURIComponent(String(value))}`)
    }
  })

  return queryParams.join("&")
}
