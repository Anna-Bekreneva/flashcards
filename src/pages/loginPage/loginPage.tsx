import { useNavigate } from 'react-router-dom'

import s from './loginPage.module.scss'

import { SignIn, SignInFormValues } from '@/components'
import { useLoginMutation } from '@/services'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const handleLogin = (args: SignInFormValues) => {
    login(args)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  return (
    <div className={s.page}>
      <SignIn className={s.form} onSubmit={handleLogin}></SignIn>
    </div>
  )
}
