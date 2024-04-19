export type MeResponseType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type MeParamsType = {
  avatar?: string | File
  name?: string
}
