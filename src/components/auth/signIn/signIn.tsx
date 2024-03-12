import { FC } from 'react'

import s from './signIn.module.scss'

import { TypographyVariant } from '@/common'
import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledTextField,
  SignInFormValues,
  Typography,
  useSignIn,
} from '@/components'

type Props = {
  onSubmit: (data: SignInFormValues) => void
}

export const SignIn: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleFormSubmitted } = useSignIn(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} as={'span'} variant={TypographyVariant.large}>
        Sign In
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
        </div>
        <ControlledCheckbox
          className={s.remember}
          control={control}
          name={'rememberMe'}
          label={'Remember me'}
        />
        <Typography
          className={s.forgot}
          as={'button'}
          type={'button'}
          variant={TypographyVariant.body2}
        >
          Forgot Password?
        </Typography>
        <Button className={s.button} type="submit">
          Sign In
        </Button>
        <div className={s.footer}>
          <Typography as={'span'} variant={TypographyVariant.body2}>
            Don&apos;t have an account?
          </Typography>
          <Typography
            className={s.signup}
            as={'a'}
            href={'#'}
            variant={TypographyVariant.subtitle1}
          >
            Sign Up
          </Typography>
        </div>
      </form>
    </Card>
  )
}
