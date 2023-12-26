import { ChangeEvent, FC, useRef, useState } from 'react'

import s from './uploadFile.module.scss'

import { ImageIcon } from '@/assets/iconsComponents'
import video from '@/assets/video.mp4'
import { ButtonVariant } from '@/common'
import { Button, TextField } from '@/components'

type Props = {
  setCover: (cover: File) => void
  defaultLocalCover?: string
  typeCover?: 'image' | 'video'
}
export const UploadFile: FC<Props> = ({
  setCover,
  defaultLocalCover = '',
  typeCover = 'image',
}) => {
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

        console.log(downloadUrl)
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
      {localCover && typeCover === 'video' && (
        <video
          className={`${coverErrorMessage ? '' : s.img}`}
          src={video}
          width={484}
          height={120}
          onError={errorHandler}
          controls
          muted
        />
      )}
      {localCover && typeCover === 'image' && (
        <img
          className={`${coverErrorMessage ? '' : s.img}`}
          src={localCover}
          width={484}
          height={120}
          onError={errorHandler}
          alt="cover"
        />
      )}
      <Button variant={ButtonVariant.secondary} onClick={selectFileHandler} type={'button'}>
        <ImageIcon />
        {typeCover === 'image' ? 'Upload Cover' : 'Upload video'}
      </Button>
      <TextField
        className={s.imageField}
        ref={inputRef}
        type="file"
        accept={typeCover === 'image' ? 'image/*' : 'video/*'}
        errorMessage={coverErrorMessage}
        onChange={uploadHandler}
      />
    </div>
  )
}
