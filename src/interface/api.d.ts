declare type APITypes<T = Allow, E = Allow> = {
  data: T
  error: E
  message: string
}
