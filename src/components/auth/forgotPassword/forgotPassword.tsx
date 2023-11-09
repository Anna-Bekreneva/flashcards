import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, ControlledTextField, Typography } from '@/components'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
})

type FormValues = z.infer<typeof forgotPasswordSchema>
export const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} as={'span'} variant={TypographyVariant.large}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.item}
          control={control}
          name={'email'}
          type={'email'}
          label={'Email'}
          errorMessage={errors.email?.message}
        />
        <Typography className={s.text} as={'p'} variant={TypographyVariant.body2}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} type="submit">
          Send Instructions
        </Button>
        <div className={s.footer}>
          <Typography as={'span'} variant={TypographyVariant.body2}>
            Did you remember your password?
          </Typography>
          <Typography className={s.link} as={'a'} href={'#'} variant={TypographyVariant.subtitle1}>
            Try logging in
          </Typography>
        </div>
      </form>
    </Card>
  )
}
