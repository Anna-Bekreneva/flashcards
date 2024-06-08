import { toast } from 'react-toastify'

type ResponseErrorType = {
  error: {
    data: {
      message?: string
      statusCode: number
      errorMessages?: string[]
    }
    status: number
  }
}
export const errorServerHandler = (error: unknown) => {
  const err = error as ResponseErrorType
  const errorMessage =
    err?.error?.data?.message ?? err?.error?.data?.errorMessages?.[0] ?? 'Some error'

  toast(errorMessage)
}
