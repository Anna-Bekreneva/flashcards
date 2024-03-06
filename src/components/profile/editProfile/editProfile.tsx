import { Button, Card, Typography } from '../../ui'

import s from './editProfile.module.scss'

import { ControlledTextField, EditProfileFormType, useEditProfile } from '@/components'

type Props = {
  avatar: string
  prevName: string
  onSubmit: (data: EditProfileFormType) => void
}

export const EditProfile = ({ avatar, prevName, onSubmit }: Props) => {
  const { handleFormSubmitted, control } = useEditProfile(onSubmit, prevName)

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
