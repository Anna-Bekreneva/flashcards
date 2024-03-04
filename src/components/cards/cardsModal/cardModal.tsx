import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'

// todo: correct
import s from './cardsModal.module.scss'

import {
  ControlledTextField,
  DialogButtons,
  Modal,
  OptionType,
  Select,
  UploadFile,
} from '@/components'
import { CardType, CardSmallType } from '@/services'

type Props = {
  title: string
  isOpen: boolean
  agreeText: string
  currentCard?: CardType
  callback: (data: Omit<CardSmallType, 'id'>) => void
  onOpenChange: () => void
}

const CardSchema = z.object({
  question: string()
    .min(3, 'question must be longer than or equal to 3 characters')
    .max(500, 'question must be shorter than or equal to 500 characters'),
  answer: string()
    .min(3, 'answer must be longer than or equal to 3 characters')
    .max(500, 'answer must be shorter than or equal to 500 characters'),
})

type CardSchemaType = z.infer<typeof CardSchema>
export const CardModal: FC<Props> = ({
  title,
  isOpen,
  agreeText,
  currentCard,
  onOpenChange,
  callback,
}) => {
  // Хочу сделать тип, из объектов свойства value
  const selectItems: OptionType[] = [
    { label: 'Text' as const, value: 'text' },
    { label: 'Picture' as const, value: 'picture' },
    { label: 'Video' as const, value: 'video' },
  ]

  const [selectValue, setSelectValue] = useState(selectItems[0].value)
  const { control, handleSubmit, formState } = useForm<CardSchemaType>({
    defaultValues: { answer: currentCard?.answer, question: currentCard?.question },
    resolver: zodResolver(CardSchema),
  })
  const submitHandler = (data: CardSchemaType) => {
    callback({ ...data, answerImg, questionImg, questionVideo, answerVideo })
    onOpenChange()
  }

  const [answerImg, setAnswerImg] = useState<File | undefined>(undefined)
  const [questionImg, setQuestionImg] = useState<File | undefined>(undefined)
  const [questionVideo, setQuestionVideo] = useState<File | undefined>(undefined)
  const [answerVideo, setAnswerVideo] = useState<File | undefined>(undefined)

  return (
    <Modal
      myKey={currentCard.id}
      className={s.modal}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      title={title}
    >
      <form className={s.wrapper} onSubmit={handleSubmit(submitHandler)}>
        <div className={s.content}>
          <Select
            className={s.select}
            items={selectItems}
            value={selectValue}
            onValueChange={setSelectValue}
            id={'add-card-select'}
            label={'Choose a question format'}
          />

          <ControlledTextField
            control={control}
            name={'question'}
            label={'Question'}
            type={'text'}
          />

          {selectValue === 'picture' && (
            <UploadFile setCover={setQuestionImg} defaultLocalCover={currentCard?.questionImg} />
          )}
          {selectValue === 'video' && (
            <UploadFile
              setCover={setQuestionVideo}
              // typeCover={'video'}
              defaultLocalCover={currentCard?.questionVideo}
            />
          )}

          <ControlledTextField control={control} name={'answer'} label={'Answer'} type={'text'} />

          {selectValue === 'picture' && (
            <UploadFile setCover={setAnswerImg} defaultLocalCover={currentCard?.answerImg} />
          )}
          {selectValue === 'video' && (
            <UploadFile
              setCover={setAnswerVideo}
              // typeCover={'video'}
              defaultLocalCover={currentCard?.answerVideo}
            />
          )}
        </div>
        <DialogButtons
          cancelHandler={onOpenChange}
          agreeButtonType={'submit'}
          agreeText={agreeText}
          agreeButtonDisabled={!!Object.keys(formState.errors).length}
        />
      </form>
    </Modal>
  )
}
