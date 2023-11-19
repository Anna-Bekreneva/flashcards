import s from './personalInformation.module.scss'

import { EditIcon, Logout } from '@/assets/iconsComponents'
import { Button, Card, Typography } from '@/components/ui'

type Props = {
  avatar: string
  email: string
  name: string
  onAvatarChange: (newAvatar: string) => void
  onLogout: () => void
  onNameChange: (newName: string) => void
}
export const PersonalInformation = ({
  avatar,
  email,
  name,
  onAvatarChange,
  onLogout,
  onNameChange,
}: Props) => {
  const handleAvatarChanged = () => {
    onAvatarChange('another avatar')
  }
  const handleNameChanged = () => {
    onNameChange('another name')
  }
  const handleLogout = () => {
    onLogout()
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.picContainer}>
        <div>
          <img alt={'avatar'} src={avatar} />
          <button className={s.editAvaBtn} onClick={handleAvatarChanged}>
            <EditIcon />
          </button>
        </div>
      </div>
      <div className={s.nameWithBtn}>
        <Typography className={s.name} variant={'h1'}>
          {name}
        </Typography>
        <button className={s.editNameBtn} onClick={handleNameChanged}>
          <EditIcon />
        </button>
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <div className={s.logoutBtn}>
        <Button onClick={handleLogout} variant={'secondary'}>
          <Logout />
          Logout
        </Button>
      </div>
    </Card>
  )
}
