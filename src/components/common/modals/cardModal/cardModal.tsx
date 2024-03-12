import s from '../modals.module.scss'

import { ControlledTextField, DialogButtons, Modal, UploadFile, useCardModal } from '@/components'
import { CreateCardRequestType } from '@/services'

export type CurrentCardType = {
  questionImg: string | null
  answerImg: string | null
  question: string | null
  answer: string | null
}

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  title: string
  callback: (data: CreateCardRequestType) => void
  submitBtnCaption: string
  currentCard?: CurrentCardType
}
export const CardModal = ({
  isOpen,
  onOpenChange,
  submitBtnCaption,
  title,
  callback,
  currentCard,
}: Props) => {
  const { setImgQuestionCover, setImgAnswerCover, onSubmit, control, handleSubmit, formState } =
    useCardModal(callback, onOpenChange, currentCard)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} title={title} className={s.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <ControlledTextField type={'text'} control={control} name={'question'} label={'Question'} />
        <ControlledTextField type={'text'} control={control} name={'answer'} label={'Answer'} />
        <UploadFile
          key={currentCard?.questionImg ? currentCard?.questionImg : 'upload-question'}
          name={'image-question'}
          text={'Image Question'}
          setCover={setImgQuestionCover}
          defaultLocalCover={currentCard?.questionImg ?? ''}
        />
        <UploadFile
          key={currentCard?.answerImg ? currentCard?.answerImg : 'upload-answer'}
          name={'image-answer'}
          text={'Image Answer'}
          setCover={setImgAnswerCover}
          defaultLocalCover={currentCard?.answerImg ?? ''}
        />
        <DialogButtons
          agreeHandler={() => handleSubmit(onSubmit)}
          cancelHandler={onOpenChange}
          agreeText={submitBtnCaption}
          agreeButtonType={'submit'}
          agreeButtonDisabled={!!Object.keys(formState.errors).length}
        />
      </form>
    </Modal>
  )
}
