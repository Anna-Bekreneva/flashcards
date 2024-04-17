import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useResendVerifyEmailMutation, useVerifyEmailMutation } from '@/services'

export const useVerifyEmailPage = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation()
  const [resendVerify, { isLoading: isLoadingResend }] = useResendVerifyEmailMutation()
  const { id } = useParams()
  const [timer, setTimer] = useState(10)
  const navigate = useNavigate()
  const goBack = () => navigate('/sign-up')

  const resendVerifyHandler = () => {
    setTimer(10)
    resendVerify({ userId: id ?? '' })
      .unwrap()
      .then(() => navigate('./check-email'))
  }

  useEffect(() => {
    verifyEmail({ code: id ?? '' })
      .unwrap()
      .then(() => navigate('/login'))
  }, [])

  useEffect(() => {
    if (timer < 1) return
    const timerId = setTimeout(() => {
      setTimer(prevState => prevState - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [timer])

  return { isLoading, isLoadingResend, goBack, timer, resendVerifyHandler }
}
