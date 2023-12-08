import { ChangeEvent, FC, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ImageIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import { Button, ControlledCheckbox, ControlledTextField, DialogButtons, Modal } from '@/components'
import s from '@/pages/decksPage/decks.module.scss'
import { useUpdateDeckMutation } from '@/services'

type Props = {
  currentDeck?: { name?: string; isPrivate?: boolean; cover?: string }
  id: string
  title: string
  openChangeHandler: () => void
}

const UpdateDeckSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be longer than or equal to 3 characters')
    .max(30, 'name must be shorter than or equal to 30 characters'),
  isPrivate: z.boolean(),
})

type UpdateDeckSchemaType = z.infer<typeof UpdateDeckSchema>

export const UpdateDeckModal: FC<Props> = ({
  currentDeck = { name: '', isPrivate: false, cover: '' },
  id,
  title,
  openChangeHandler,
}) => {
  const [updatePack] = useUpdateDeckMutation()

  const { handleSubmit, control, formState } = useForm<UpdateDeckSchemaType>({
    defaultValues: { name: currentDeck.name, isPrivate: currentDeck.isPrivate },
    resolver: zodResolver(UpdateDeckSchema),
  })

  const [cover, setCover] = useState<File | undefined>(undefined)
  // const [localCover, setLocalCover] = useState(currentDeck.cover)
  const [localCover, setLocalCover] = useState(currentDeck.cover)
  const submitHandler = (data: UpdateDeckSchemaType) => {
    updatePack({ ...data, cover, id })
    openChangeHandler()
  }

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
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <Modal className={s.modal} title={title} isOpen={!!id} onOpenChange={openChangeHandler}>
      <form className={s.modalWrapper} onSubmit={handleSubmit(submitHandler)}>
        <div className={s.modalContent}>
          <ControlledTextField
            className={s.modalInput}
            label={'Name Pack'}
            type={'text'}
            name={'name'}
            control={control}
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
          <ControlledCheckbox label={'Private pack'} name={'isPrivate'} control={control} />
        </div>
        <DialogButtons
          cancelHandler={openChangeHandler}
          agreeText={'Save Changes'}
          agreeButtonType={'submit'}
          agreeHandler={() => {}}
          agreeButtonDisabled={!!Object.keys(formState.errors).length}
        />
      </form>
    </Modal>
  )
}
