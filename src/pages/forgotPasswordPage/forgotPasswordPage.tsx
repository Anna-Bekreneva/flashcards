import { useNavigate } from 'react-router-dom'

import { ForgotPassword, ProgressBar } from '@/components'
import { useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [verifyEmail, { isLoading }] = useRecoverPasswordMutation()

  const submitHandler = (args: { email: string }) => {
    verifyEmail(args)
      .unwrap()
      .then(() => {
        navigate('/check-email')
      })
  }

  if (isLoading) return <ProgressBar />

  return (
    <section className={'page-modal'}>
      <ForgotPassword onSubmit={submitHandler} />
    </section>
  )
}
