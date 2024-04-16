import { useNavigate } from 'react-router-dom'

import { SignUp, SignUpFormValues } from '@/components'
import { useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const handleSignUp = ({ confirmPassword, ...restArgs }: SignUpFormValues) => {
    signUp(restArgs)
      .unwrap()
      .then(() => navigate('/check-email'))
  }

  return (
    <section className={'page-modal'}>
      <SignUp onSubmit={handleSignUp} />
    </section>
  )
}
