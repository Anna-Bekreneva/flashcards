import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  ControlledCheckbox,
  ControlledTextField,
  DialogButtons,
  Modal,
  UploadFile,
} from '@/components'
import s from '@/components/decks/decksModals/decksModals.module.scss'

type DataType = {
  name: string
  isPrivate: boolean
  cover: File | undefined
}
export type CurrentDeckType = {
  name?: string
  isPrivate?: boolean
  cover?: string
}

type Props = {
  title: string
  isOpen: boolean
  agreeText: string
  onOpenChange: () => void
  currentDeck?: CurrentDeckType
  callBack: (data: DataType) => void
}

const DeckSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be longer than or equal to 3 characters')
    .max(30, 'name must be shorter than or equal to 30 characters'),
  isPrivate: z.boolean().optional().default(false),
})

type DeckSchemaType = z.infer<typeof DeckSchema>

export const DeckModal: FC<Props> = ({
  title,
  isOpen,
  agreeText,
  onOpenChange,
  currentDeck,
  callBack,
}) => {
  const submitHandler = (data: DeckSchemaType) => {
    callBack({ ...data, cover })
    onOpenChange()
  }

  const [cover, setCover] = useState<File | undefined>(undefined)

  const { control, handleSubmit, formState } = useForm<DeckSchemaType>({
    defaultValues: { name: currentDeck?.name, isPrivate: currentDeck?.isPrivate },
    resolver: zodResolver(DeckSchema),
  })

  return (
    <Modal
      key={nanoid()}
      className={s.modal}
      title={title}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
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
          <UploadFile setCover={setCover} defaultLocalCover={currentDeck?.cover} />
          <ControlledCheckbox
            className={s.modalInput}
            label={'Private pack'}
            name={'isPrivate'}
            control={control}
          />
        </div>
        <DialogButtons
          cancelHandler={onOpenChange}
          agreeText={agreeText}
          agreeButtonType={'submit'}
          agreeButtonDisabled={!!Object.keys(formState.errors).length}
          agreeHandler={handleSubmit(submitHandler)}
        />
      </form>
    </Modal>
  )
}
