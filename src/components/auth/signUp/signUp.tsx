import { FC } from 'react'

import s from './signUp.module.scss'

import { TypographyVariant } from '@/common'
import {
  Button,
  Card,
  ControlledTextField,
  SignUpFormValues,
  Typography,
  useSignUp,
} from '@/components'

type Props = {
  onSubmit: (data: SignUpFormValues) => void
}

export const SignUp: FC<Props> = ({ onSubmit }) => {
  const { handleFormSubmitted, control, errors } = useSignUp(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} as={'span'} variant={TypographyVariant.large}>
        Sign Up
      </Typography>
      <form className={s.form} onSubmit={handleFormSubmitted}>
        <div className={s.items}>
          <ControlledTextField
            control={control}
            name={'email'}
            label={'Email'}
            errorMessage={errors.email?.message}
          />
          <ControlledTextField
            type={'password'}
            control={control}
            name={'password'}
            label={'Password'}
            errorMessage={errors.password?.message}
          />
          <ControlledTextField
            type={'password'}
            control={control}
            name={'confirmPassword'}
            label={'Confirm Password'}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <Button className={s.button} disabled={!!Object.keys(errors).length} type="submit">
          Sign In
        </Button>
      </form>
      <div className={s.footer}>
        <Typography as={'span'} variant={TypographyVariant.body2}>
          Already have an account?
        </Typography>
        <Typography className={s.link} as={'a'} href={'#'} variant={TypographyVariant.subtitle1}>
          Sign In
        </Typography>
      </div>
    </Card>
  )
}
