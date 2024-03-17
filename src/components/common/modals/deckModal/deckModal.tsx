import { FC } from 'react'

import s from '../modals.module.scss'

import {
  ControlledCheckbox,
  ControlledTextField,
  CurrentDeckType,
  DialogButtons,
  Modal,
  UpdateDeckType,
  UploadFile,
  useDeckModal,
} from '@/components'

type Props = {
  title: string
  isOpen: boolean
  agreeText: string
  onOpenChange: () => void
  currentDeck?: CurrentDeckType
  callBack: (data: UpdateDeckType) => void
}
export const DeckModal: FC<Props> = ({
  title,
  isOpen,
  agreeText,
  onOpenChange,
  currentDeck,
  callBack,
}) => {
  const { submitHandler, setCover, control, handleSubmit, agreeButtonDisabled } = useDeckModal({
    currentDeck,
    onOpenChange,
    callBack,
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
          agreeButtonDisabled={agreeButtonDisabled}
          agreeHandler={handleSubmit(submitHandler)}
        />
      </form>
    </Modal>
  )
}
