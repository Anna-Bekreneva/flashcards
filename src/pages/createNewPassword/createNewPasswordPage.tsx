import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword, CreateNewPasswordFormType } from '@/components/auth/createNewPassword'
import { useResetPasswordMutation } from '@/services'

export const CreateNewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { id: token } = useParams()
  const navigate = useNavigate()

  const submitHandler = (args: CreateNewPasswordFormType) => {
    resetPassword({ password: args.password, token: token ?? '' })
      .unwrap()
      .then(() => navigate('./login'))
  }

  return (
    <section className={'page-modal'}>
      <CreateNewPassword onSubmit={submitHandler} />
    </section>
  )
}
