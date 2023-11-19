declare type APITypes<T = unknown, E = unknown> = {
  data: T
  error: E
  message: string
}
