import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ControlledCheckbox, ControlledTextField, DialogButtons, Modal } from '@/components'
import s from '@/pages/decksPage/decks.module.scss'
import { useUpdateDeckMutation } from '@/services'

type Props = {
  title: string
  id: string
  openChangeHandler: () => void
} & UpdateDeckSchemaType

const UpdateDeckSchema = (name: string, cover: string, isPrivate: boolean) => {
  return z.object({
    name: z
      .string()
      .min(3, 'name must be longer than or equal to 3 characters')
      .max(30, 'name must be shorter than or equal to 30 characters')
      .default(name),
    cover: z.string().optional().default(cover),
    private: z.boolean().optional().default(isPrivate),
  })
}

type UpdateDeckSchemaType = z.infer<ReturnType<typeof UpdateDeckSchema>>

export const UpdateDeckModal: FC<Props> = ({
  name,
  cover,
  private: isPrivate,
  id,
  title,
  openChangeHandler,
}) => {
  const [updatePack] = useUpdateDeckMutation()
  const submitHandler = (data: UpdateDeckSchemaType) => {
    updatePack({ ...data, id, isPrivate })
    openChangeHandler()
  }

  const { handleSubmit, control, formState } = useForm<UpdateDeckSchemaType>({
    resolver: zodResolver(UpdateDeckSchema(name, cover, isPrivate)),
  })

  return (
    <Modal className={s.modal} title={title} isOpen={!!id} onOpenChange={openChangeHandler}>
      <form className={s.modalWrapper} onSubmit={handleSubmit(submitHandler)}>
        <div className={s.modalContent}>
          <ControlledTextField
            className={s.modalInput}
            label={'Name Pack'}
            type={'text'}
            placeholder={name}
            name={'name'}
            control={control}
          />
          <ControlledTextField
            className={s.modalInput}
            label={'Name Pack'}
            type={'file'}
            placeholder={cover}
            name={'cover'}
            control={control}
          />
          <ControlledCheckbox label={'Private pack'} name={'private'} control={control} />
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
