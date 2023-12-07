import { ChangeEvent, FC, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ImageIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import { Button, ControlledTextField, DialogButtons, Modal } from '@/components'
import s from '@/pages/decksPage/decks.module.scss'
import { useCreateDeckMutation } from '@/services'

type Props = {
  title: string
  isOpen: boolean
  onOpenChange: () => void
}

const AddDeckSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be longer than or equal to 3 characters')
    .max(30, 'name must be shorter than or equal to 30 characters'),
  isPrivate: z.boolean().optional().default(false),
})

type AddDeckSchemaType = z.infer<typeof AddDeckSchema>

export const AddDeckModal: FC<Props> = ({ title, isOpen, onOpenChange }) => {
  const [createPack] = useCreateDeckMutation()
  const submitHandler = (data: AddDeckSchemaType) => {
    createPack({ ...data, cover })
    onOpenChange()
  }

  const { control, handleSubmit, formState } = useForm<AddDeckSchemaType>({
    resolver: zodResolver(AddDeckSchema),
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const [cover, setCover] = useState<File | undefined>(undefined)
  const [localCover, setLocalCover] = useState<string>('')
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        const formData = new FormData()

        formData.append('cover', file)
        setCover(file)

        const blob = new Blob([file], { type: 'image/jpeg' })

        const downloadUrl = window.URL.createObjectURL(blob)

        setLocalCover(downloadUrl)
      } else {
        alert('Файл слишком большого размера')
      }
    }
  }

  const errorHandler = () => {
    alert('Кривая картинка')
  }

  return (
    <Modal className={s.modal} title={title} isOpen={isOpen} onOpenChange={onOpenChange}>
      <form className={s.modalWrapper} onSubmit={handleSubmit(submitHandler)}>
        <div className={s.modalContent}>
          <ControlledTextField
            className={s.modalInput}
            label={'Name Pack'}
            type={'text'}
            placeholder={'Name'}
            control={control}
            name={'name'}
          />
          {localCover && (
            <img className={s.img} src={localCover} onError={errorHandler} alt="cover" />
          )}
          <Button variant={ButtonVariant.secondary} onClick={selectFileHandler} type={'button'}>
            <ImageIcon />
            Upload Cover
          </Button>
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            accept={'image/*'}
            onChange={uploadHandler}
          />
        </div>
        <DialogButtons
          cancelHandler={onOpenChange}
          agreeText={'Add New Pack'}
          agreeButtonType={'submit'}
          agreeHandler={() => {}}
          agreeButtonDisabled={!!Object.keys(formState.errors).length}
        />
      </form>
    </Modal>
  )
}
