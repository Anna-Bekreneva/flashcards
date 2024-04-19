import { ChangeEvent, useRef, useState } from 'react'

import { EditProfileFormType } from '@/components'
import { useLogoutMutation } from '@/services'
import { MeParamsType } from '@/services/auth/authTypes.ts'

export const usePersonalInformation = (onUserDataChange: (data: MeParamsType) => void) => {
  const [editNameMode, setEditNameMode] = useState(false)
  const [logout] = useLogoutMutation()
  const [avatarErrorMessage, setAvatarErrorMessage] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLDivElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.querySelector('input')?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        onUserDataChange({ avatar: file })
        setAvatarErrorMessage(undefined)
      } else {
        setAvatarErrorMessage('The file is too large')
      }
    }
  }
  const errorHandler = () => setAvatarErrorMessage('The file is broken')
  const handleNameChanged = (value: EditProfileFormType) => {
    onUserDataChange({ name: value.name })
    setEditNameMode(false)
  }

  const handleLogout = () => {
    logout()
  }

  return {
    editNameMode,
    avatarErrorMessage,
    inputRef,
    selectFileHandler,
    uploadHandler,
    errorHandler,
    handleNameChanged,
    handleLogout,
    setEditNameMode,
  }
}
