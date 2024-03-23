import { useNavigate } from 'react-router-dom'

import { ProgressBar, SignIn, SignInFormValues } from '@/components'
import { useLoginMutation } from '@/services'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const handleLogin = (args: SignInFormValues) => {
    login(args)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  if (isLoading) return <ProgressBar />

  return (
    <section className={'page-modal'}>
      <SignIn onSubmit={handleLogin} />
    </section>
  )
}
