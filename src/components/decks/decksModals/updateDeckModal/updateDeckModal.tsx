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
  const { handleSubmit, control, formState } = useForm<UpdateDeckSchemaType>({
    defaultValues: { name: currentDeck.name, isPrivate: currentDeck.isPrivate },
    resolver: zodResolver(UpdateDeckSchema),
  })
  const [updatePack] = useUpdateDeckMutation()

  const [cover, setCover] = useState<File | undefined>(undefined)
  const submitHandler = (data: UpdateDeckSchemaType) => {
    updatePack({ ...data, cover, id })
    openChangeHandler()
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
          <UploadFile setCover={setCover} defaultLocalCover={currentDeck.cover} />
          <ControlledCheckbox
            className={s.modalInput}
            label={'Private pack'}
            name={'isPrivate'}
            control={control}
          />
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
