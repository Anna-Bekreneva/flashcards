import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './signIn.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '@/components'

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof signInSchema>
export const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(signInSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} as={'span'} variant={TypographyVariant.large}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.items}>
          <ControlledTextField
            control={control}
            name={'email'}
            type={'email'}
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
      </form>
      <div className={s.footer}>
        <Typography as={'span'} variant={TypographyVariant.body2}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
        </Typography>
        <Typography className={s.link} as={'a'} href={'#'} variant={TypographyVariant.subtitle1}>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
