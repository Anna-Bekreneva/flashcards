import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, Typography } from '../../ui'

import s from './editProfile.module.scss'

import { ControlledTextField } from '@/components'

const schema = z.object({
  name: z.string().min(1, 'Enter new name'),
})

type FormType = z.infer<typeof schema>

type Props = {
  avatar: string
  prevName: string
  onSubmit: (data: FormType) => void
}

export const EditProfile = ({ avatar, prevName, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      name: prevName,
    },
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <img className={s.photo} alt={'avatar'} src={avatar} />
      <form onSubmit={handleFormSubmitted}>
        <ControlledTextField
          label={'Nickname'}
          name={'name'}
          control={control}
          className={s.input}
        />
        <Button type={'submit'} fullWidth>
          Save Changes
        </Button>
      </form>
    </Card>
  )
}
