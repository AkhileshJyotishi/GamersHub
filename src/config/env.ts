const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable]

  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`)
  } else {
    return unvalidatedEnvironmentVariable
  }
}

export const API_BASE_URL = getEnvironmentVariable("NEXT_PUBLIC_API_BASE_URL")

/* Appwrite */
