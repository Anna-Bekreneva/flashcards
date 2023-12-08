import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from '../decksModals.module.scss'

import {
  ControlledCheckbox,
  ControlledTextField,
  DialogButtons,
  Modal,
  UploadFile,
} from '@/components'
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

  const [cover, setCover] = useState<File | undefined>(undefined)

  const { control, handleSubmit, formState } = useForm<AddDeckSchemaType>({
    resolver: zodResolver(AddDeckSchema),
  })

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
          <UploadFile setCover={setCover} />
          <ControlledCheckbox
            className={s.modalInput}
            label={'Private pack'}
            name={'isPrivate'}
            control={control}
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
