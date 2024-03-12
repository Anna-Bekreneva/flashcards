import { FC } from 'react'

import s from './uploadFile.module.scss'

import { DeleteIcon, ImageIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import { Button, TextField, CoverType, useUploadFile, PictureModal } from '@/components'

type Props = {
  text?: string
  setCover: (cover: CoverType) => void
  defaultLocalCover?: string
  name?: string
}

export const UploadFile: FC<Props> = ({
  setCover,
  defaultLocalCover,
  text = 'cover',
  name = 'image-file',
}) => {
  const {
    localCover,
    coverErrorMessage,
    errorHandler,
    selectFileHandler,
    inputRef,
    uploadHandler,
    deleteCoverHandler,
    isOpenPicture,
    changeIsOpenPicture,
  } = useUploadFile(setCover, defaultLocalCover)

  return (
    <div className={s.content}>
      {localCover ? (
        <>
          <div className={s.picture}>
            <img
              className={`${coverErrorMessage ? '' : s.img}`}
              src={localCover}
              onError={errorHandler}
              alt="cover"
            />
            <button
              className={s.buttonOpen}
              onClick={changeIsOpenPicture}
              aria-label={'open image'}
              type={'button'}
              aria-hidden
            />
          </div>
          {isOpenPicture && (
            <PictureModal
              src={localCover}
              isOpenPicture={isOpenPicture}
              callback={changeIsOpenPicture}
            />
          )}
          <div className={s.buttons}>
            <Button
              className={s.button}
              variant={ButtonVariant.secondary}
              onClick={deleteCoverHandler}
              type={'button'}
            >
              <DeleteIcon />
              Remove {text}
            </Button>
            <Button
              className={s.button}
              variant={ButtonVariant.secondary}
              onClick={selectFileHandler}
              type={'button'}
            >
              <ImageIcon />
              Change {text}
            </Button>
          </div>
        </>
      ) : (
        <Button variant={ButtonVariant.secondary} onClick={selectFileHandler} type={'button'}>
          <ImageIcon />
          Upload {text}
        </Button>
      )}
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
