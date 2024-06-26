import { FC } from 'react'

import { Link } from 'react-router-dom'

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
  className?: string
}

export const SignIn: FC<Props> = ({ onSubmit, className }) => {
  const { control, errors, handleFormSubmitted } = useSignIn(onSubmit)

  return (
    <Card className={`${s.card} ${className}`}>
      <Typography className={s.title} as={'h1'} variant={TypographyVariant.large}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleFormSubmitted}>
        <div className={s.items}>
          <ControlledTextField
            control={control}
            name={'email'}
            label={'Email'}
            placeholder={'Enter your email'}
            errorMessage={errors.email?.message}
          />
          <ControlledTextField
            type={'password'}
            control={control}
            name={'password'}
            label={'Password'}
            placeholder={'Your password'}
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
          as={Link}
          to={'/forgot-password'}
          variant={TypographyVariant.body2}
        >
          Forgot Password?
        </Typography>
        <Button className={s.button} disabled={!!Object.keys(errors).length} type="submit">
          Sign In
        </Button>
        <div className={s.footer}>
          <Typography as={'span'} variant={TypographyVariant.body2}>
            Don&apos;t have an account?
          </Typography>
          <Typography
            className={s.signup}
            as={'a'}
            href={'/sign-up'}
            variant={TypographyVariant.subtitle1}
          >
            Sign Up
          </Typography>
        </div>
      </form>
    </Card>
  )
}
