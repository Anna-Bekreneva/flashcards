import { FC } from 'react'

import s from './uploadFile.module.scss'

import { ImageIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import { Button, TextField, useUploadFile } from '@/components'

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
  const {
    localCover,
    coverErrorMessage,
    errorHandler,
    selectFileHandler,
    inputRef,
    uploadHandler,
  } = useUploadFile(setCover, defaultLocalCover)

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
