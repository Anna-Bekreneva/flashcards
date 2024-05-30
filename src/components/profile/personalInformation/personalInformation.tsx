import s from './personalInformation.module.scss'

import { EditIcon, Logout } from '@/assets/iconsComponents'
import userPhoto from '@/assets/images/user.png'
import {
  Button,
  Card,
  EditProfile,
  TextField,
  Typography,
  usePersonalInformation,
} from '@/components'
import { MeParamsType } from '@/services/auth/authTypes.ts'

type Props = {
  avatar?: string
  email: string
  userName?: string
  onUserDataChange: (data: MeParamsType) => void
}
export const PersonalInformation = ({ avatar, email, userName, onUserDataChange }: Props) => {
  const {
    avatarErrorMessage,
    errorHandler,
    uploadHandler,
    selectFileHandler,
    inputRef,
    handleNameChanged,
    handleLogout,
    editNameMode,
    setEditNameMode,
  } = usePersonalInformation(onUserDataChange)

  return (
    <>
      {editNameMode ? (
        <EditProfile
          avatar={avatar ?? userPhoto}
          prevName={userName ?? ''}
          onSubmit={handleNameChanged}
        />
      ) : (
        <Card className={s.card}>
          <Typography className={s.title} variant={'large'}>
            Personal Information
          </Typography>

          <div className={s.picContainer}>
            <TextField
              type={'file'}
              name={'avatar'}
              className={s.imageField}
              accept={'image/*'}
              ref={inputRef}
              errorMessage={avatarErrorMessage}
              onChange={uploadHandler}
            />
            <img
              alt={'avatar'}
              src={avatar ?? userPhoto}
              className={s.avatar}
              onError={errorHandler}
            />
            <button className={s.editAvaBtn} onClick={selectFileHandler}>
              <EditIcon />
            </button>
          </div>

          <div className={s.nameWithBtn}>
            <Typography className={s.name} variant={'h1'}>
              {userName}
            </Typography>
            <button className={s.editNameBtn} onClick={() => setEditNameMode(true)}>
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
      )}
    </>
  )
}
