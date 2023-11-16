import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './signUp.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, ControlledTextField, Typography } from '@/components'

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

type FormValues = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: FormValues) => void
}

export const SignUp: FC<Props> = props => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = (data: FormValues) => props.onSubmit(data)

  return (
    <Card className={s.card}>
      <Typography className={s.title} as={'span'} variant={TypographyVariant.large}>
        Sign Up
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.items}>
          <ControlledTextField
            control={control}
            name={'email'}
            type={'text'}
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
        <Button className={s.button} type="submit">
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
