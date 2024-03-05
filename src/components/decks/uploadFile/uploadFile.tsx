import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import s from './uploadFile.module.scss'

import { ImageIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import { Button, TextField } from '@/components'

type Props = {
  text?: string
  setCover: (cover: File | undefined) => void
  defaultLocalCover?: string
  name?: string
}

export const UploadFile: FC<Props> = ({
  setCover,
  defaultLocalCover = '',
  text = 'Upload cover',
  name = 'image file',
}) => {
  useEffect(() => {
    return () => {
      setCover(undefined)
    }
  }, [])
  const inputRef = useRef<HTMLDivElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.querySelector('input')?.click()
  }

  const [localCover, setLocalCover] = useState(defaultLocalCover)
  const [coverErrorMessage, setCoverErrorMessage] = useState<string | undefined>(undefined)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        const formData = new FormData()

        formData.append('cover', file)
        setCover(file)

        const blob = new Blob([file], { type: file.type })

        const downloadUrl = window.URL.createObjectURL(blob)

        setLocalCover(downloadUrl)
        setCoverErrorMessage(undefined)
      } else {
        setCoverErrorMessage('The file is too large')
      }
    }
  }

  const errorHandler = () => setCoverErrorMessage('The file is broken')

  return (
    <div className={s.content}>
      {localCover && (
        <img
          className={`${coverErrorMessage ? '' : s.img}`}
          src={localCover}
          onError={errorHandler}
          alt="cover"
        />
      )}
      <Button variant={ButtonVariant.secondary} onClick={selectFileHandler} type={'button'}>
        <ImageIcon />
        {text}
      </Button>
      <TextField
        name={name}
        className={s.imageField}
        ref={inputRef}
        type="file"
        accept={'image/*'}
        errorMessage={coverErrorMessage}
        onChange={uploadHandler}
      />
    </div>
  )
}
