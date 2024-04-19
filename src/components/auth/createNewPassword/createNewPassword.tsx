import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, Typography } from '../../ui'

import s from './createNewPassword.module.scss'

import { ControlledTextField } from '@/components'

const schema = z.object({
  password: z.string().min(1, 'Please enter password'),
})

export type CreateNewPasswordFormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: CreateNewPasswordFormType) => void
}

export const CreateNewPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<CreateNewPasswordFormType>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = handleSubmit(props.onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <ControlledTextField
          control={control}
          name={'password'}
          label={'Password'}
          type={'password'}
          className={s.input}
        />
        <Typography className={s.info} variant={'caption'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type={'submit'} fullWidth>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
