import { useNavigate } from 'react-router-dom'

import { ForgotPassword } from '@/components'
import { useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [verifyEmail] = useRecoverPasswordMutation()

  const submitHandler = (args: { email: string }) => {
    verifyEmail(args)
      .unwrap()
      .then(() => {
        navigate('/check-email')
      })
  }

  return (
    <div className={'page-modal'}>
      <ForgotPassword onSubmit={submitHandler} />
    </div>
  )
}
