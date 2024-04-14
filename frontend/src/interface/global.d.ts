// declare type Callback<T = any, P = Error | null> = (error?: P, data?: T) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null
