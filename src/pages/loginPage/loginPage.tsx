import { useNavigate } from 'react-router-dom'

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
    <div className={'page-modal'}>
      <SignIn onSubmit={handleLogin} />
    </div>
  )
}
