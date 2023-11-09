import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './signIn.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '@/components'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
  rememberMe: z.boolean().optional().default(false),
})

type FormValues = z.infer<typeof loginSchema>
export const signIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

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
        <div className={s.footer}>
          <Typography as={'span'} variant={TypographyVariant.body2}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
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
